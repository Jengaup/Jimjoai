"""Static checks for the JimjoAI site. Standard library only.

Run: python3 -m unittest discover -s tests -v
"""
import base64
import hashlib
import os
import re
import unittest
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EXCLUDE_DIRS = {"node_modules", ".git", "tests"}
EM_DASH = "—"

# Spanish page (repo root) -> English counterpart (en/)
PAIRS = {
    "index.html": "en/index.html",
    "servicios.html": "en/services.html",
    "casos.html": "en/case-studies.html",
    "como-trabajo.html": "en/how-i-work.html",
    "contacto.html": "en/contact.html",
    "privacidad.html": "en/privacy.html",
    "terminos.html": "en/terms.html",
    "accesibilidad.html": "en/accessibility.html",
}
CONTACT_PAGES = ["contacto.html", "en/contact.html"]
VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta",
        "param", "source", "track", "wbr"}


def html_files():
    found = []
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames if d not in EXCLUDE_DIRS]
        for name in filenames:
            if name.endswith(".html"):
                found.append(os.path.relpath(os.path.join(dirpath, name), ROOT).replace(os.sep, "/"))
    return sorted(found)


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.html_lang = None
        self.title = ""
        self.in_title = False
        self.description = None
        self.h1_count = 0
        self.canonical = None
        self.hreflangs = {}
        self.refs = []  # (attr, value)
        self.form_fields = []  # list of (form_index, name)
        self.form_count = 0
        self.in_form = None
        self.visible_text = []
        self.stack = []  # (tag, hidden_flag)

    def _hidden(self):
        return any(h for _, h in self.stack)

    def handle_starttag(self, tag, attrs):
        a = {k: (v or "") for k, v in attrs}
        classes = a.get("class", "").split()
        if tag == "html":
            self.html_lang = a.get("lang")
        elif tag == "title":
            self.in_title = True
        elif tag == "meta" and a.get("name", "").lower() == "description":
            self.description = a.get("content", "")
        elif tag == "h1":
            self.h1_count += 1
        elif tag == "link":
            rel = a.get("rel", "").lower().split()
            if "canonical" in rel:
                self.canonical = a.get("href")
            if "alternate" in rel and a.get("hreflang"):
                self.hreflangs[a["hreflang"]] = a.get("href")
        elif tag == "form":
            self.form_count += 1
            self.in_form = self.form_count
        if tag in ("input", "textarea", "select") and self.in_form and a.get("name"):
            self.form_fields.append((self.in_form, a["name"]))
        for attr in ("href", "src"):
            if attr in a:
                self.refs.append((attr, a[attr]))
        if tag not in VOID:
            hidden = tag in ("script", "style", "title") or "sr-only" in classes
            self.stack.append((tag, hidden))

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID and self.stack and self.stack[-1][0] == tag:
            self.stack.pop()

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False
        if tag == "form":
            self.in_form = None
        if tag in VOID:
            return
        for i in range(len(self.stack) - 1, -1, -1):
            if self.stack[i][0] == tag:
                del self.stack[i:]
                break

    def handle_data(self, data):
        if self.in_title:
            self.title += data
        if not self._hidden():
            self.visible_text.append(data)


_cache = {}


def parse(rel):
    if rel not in _cache:
        p = PageParser()
        with open(os.path.join(ROOT, rel), encoding="utf-8") as fh:
            p.feed(fh.read())
        p.close()
        _cache[rel] = p
    return _cache[rel]


def is_local(url):
    u = url.strip()
    if not u or u.startswith("#"):
        return False
    low = u.lower()
    if low.startswith(("http:", "https:", "mailto:", "tel:", "data:", "javascript:", "//")):
        return False
    return True


def resolve(page, url):
    path = unquote(urlsplit(url).path)
    if not path:
        return None
    if path.startswith("/"):
        if page == "404.html" and path.startswith("/"):
            path = path[1:]
        else:
            path = path.lstrip("/")
        target = os.path.join(ROOT, path)
    else:
        target = os.path.join(ROOT, os.path.dirname(page), path)
    if path.endswith("/") or os.path.isdir(target):
        target = os.path.join(target, "index.html")
    return os.path.normpath(target)


class SiteTests(unittest.TestCase):
    def setUp(self):
        self.pages = html_files()

    def test_pages_found(self):
        self.assertIn("index.html", self.pages)

    def test_es_en_pairs_exist(self):
        missing = [p for pair in PAIRS.items() for p in pair if not os.path.isfile(os.path.join(ROOT, p))]
        if not os.path.isfile(os.path.join(ROOT, "404.html")):
            missing.append("404.html")
        self.assertEqual(missing, [], "Missing pages: " + ", ".join(missing))

    def test_html_lang_matches_folder(self):
        for page in self.pages:
            with self.subTest(page=page):
                expected = "en" if page.startswith("en/") else "es"
                lang = (parse(page).html_lang or "").split("-")[0].lower()
                self.assertEqual(lang, expected, f"{page}: <html lang> is {lang!r}")

    def test_title_and_description(self):
        for page in self.pages:
            with self.subTest(page=page):
                p = parse(page)
                self.assertTrue(p.title.strip(), f"{page}: missing <title>")
                self.assertTrue((p.description or "").strip(), f"{page}: missing meta description")

    def test_single_h1(self):
        for page in self.pages:
            with self.subTest(page=page):
                self.assertEqual(parse(page).h1_count, 1, f"{page}: expected exactly one <h1>")

    def test_local_links_resolve(self):
        for page in self.pages:
            with self.subTest(page=page):
                broken = []
                for attr, url in parse(page).refs:
                    if not is_local(url):
                        continue
                    target = resolve(page, url)
                    ref = f"{attr}={url}"
                    if target and not os.path.isfile(target) and ref not in broken:
                        broken.append(ref)
                self.assertEqual(broken, [], f"{page}: broken local references")

    def test_no_em_dash_in_visible_text(self):
        for page in self.pages:
            with self.subTest(page=page):
                text = "".join(parse(page).visible_text)
                hits = [line.strip() for line in text.splitlines() if EM_DASH in line]
                self.assertEqual(hits, [], f"{page}: em dash in visible text")

    def test_canonical_and_hreflang(self):
        for page in self.pages:
            if page == "404.html":
                continue
            with self.subTest(page=page):
                p = parse(page)
                self.assertTrue(p.canonical, f"{page}: missing rel=canonical")
                for lang in ("es", "en", "x-default"):
                    self.assertIn(lang, p.hreflangs, f"{page}: missing hreflang={lang}")

    def test_contact_forms(self):
        missing = [p for p in CONTACT_PAGES if not os.path.isfile(os.path.join(ROOT, p))]
        for page in CONTACT_PAGES:
            if page in missing:
                continue
            with self.subTest(page=page):
                p = parse(page)
                self.assertGreater(p.form_count, 0, f"{page}: no <form>")
                names = {name for _, name in p.form_fields}
                for field in ("name", "email", "message", "botcheck"):
                    self.assertIn(field, names, f"{page}: form missing field {field!r}")
        self.assertEqual(missing, [], "Missing contact pages: " + ", ".join(missing))


def read(rel):
    with open(os.path.join(ROOT, rel), encoding="utf-8") as fh:
        return fh.read()


class SecurityParser(HTMLParser):
    """Collects what the security checks need: CSP, inline scripts, handlers, links, fields."""

    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.csp = None
        self.referrer = None
        self.inline_scripts = []
        self.handlers = []
        self.blank_links = []  # (href, rel)
        self.fields = []  # (tag, type, name, maxlength)
        self._script = None

    def handle_starttag(self, tag, attrs):
        a = {k.lower(): (v or "") for k, v in attrs}
        for k in a:
            if k.startswith("on"):
                self.handlers.append(f"<{tag} {k}>")
        if tag == "meta":
            if a.get("http-equiv", "").lower() == "content-security-policy":
                self.csp = a.get("content", "")
            if a.get("name", "").lower() == "referrer":
                self.referrer = a.get("content", "")
        elif tag == "script" and "src" not in a:
            if a.get("type", "").lower() not in ("application/ld+json",):
                self._script = []
        elif tag == "a" and a.get("target", "").lower() == "_blank":
            self.blank_links.append((a.get("href", ""), a.get("rel", "")))
        elif tag in ("input", "textarea"):
            self.fields.append((tag, a.get("type", "text").lower(), a.get("name", ""), a.get("maxlength")))

    def handle_data(self, data):
        if self._script is not None:
            self._script.append(data)

    def handle_endtag(self, tag):
        if tag == "script" and self._script is not None:
            self.inline_scripts.append("".join(self._script))
            self._script = None


def security(rel):
    p = SecurityParser()
    p.feed(read(rel))
    p.close()
    return p


def csp_directives(csp):
    out = {}
    for part in csp.split(";"):
        bits = part.split()
        if bits:
            out[bits[0].lower()] = bits[1:]
    return out


MAXLENGTHS = {"name": 100, "company": 120, "email": 254, "phone": 30, "message": 3000}


class SecurityTests(unittest.TestCase):
    def setUp(self):
        self.pages = html_files()

    def test_csp_meta_present_and_strict(self):
        for page in self.pages:
            with self.subTest(page=page):
                p = security(page)
                self.assertTrue(p.csp, f"{page}: missing Content-Security-Policy meta")
                d = csp_directives(p.csp)
                self.assertEqual(d.get("object-src"), ["'none'"], f"{page}: object-src must be 'none'")
                self.assertEqual(d.get("default-src"), ["'self'"], f"{page}: default-src must be 'self'")
                self.assertEqual(d.get("base-uri"), ["'self'"], f"{page}: base-uri must be 'self'")
                script_src = d.get("script-src", [])
                self.assertNotIn("'unsafe-inline'", script_src, f"{page}: script-src allows unsafe-inline")
                self.assertNotIn("'unsafe-eval'", script_src, f"{page}: script-src allows unsafe-eval")
                self.assertIn("https://api.web3forms.com", d.get("connect-src", []))
                self.assertIn("https://api.web3forms.com", d.get("form-action", []))
                self.assertEqual(p.referrer, "strict-origin-when-cross-origin", f"{page}: referrer meta")

    def test_csp_hashes_match_inline_scripts(self):
        for page in self.pages:
            with self.subTest(page=page):
                p = security(page)
                allowed = set(re.findall(r"'(sha256-[A-Za-z0-9+/=]+)'", p.csp or ""))
                self.assertTrue(p.inline_scripts, f"{page}: expected the inline js-class script")
                for code in p.inline_scripts:
                    digest = base64.b64encode(hashlib.sha256(code.encode("utf-8")).digest()).decode()
                    self.assertIn(f"sha256-{digest}", allowed, f"{page}: inline script not allowed by CSP hash: {code!r}")

    def test_no_inline_event_handlers(self):
        for page in self.pages:
            with self.subTest(page=page):
                self.assertEqual(security(page).handlers, [], f"{page}: inline on* handler attributes")

    def test_no_javascript_urls(self):
        for page in self.pages:
            with self.subTest(page=page):
                bad = [v for _, v in parse(page).refs if v.strip().lower().startswith("javascript:")]
                self.assertEqual(bad, [], f"{page}: javascript: URLs")

    def test_target_blank_has_noopener(self):
        for page in self.pages:
            with self.subTest(page=page):
                bad = [href for href, rel in security(page).blank_links
                       if not {"noopener", "noreferrer"} <= set(rel.lower().split())]
                self.assertEqual(bad, [], f"{page}: target=_blank without rel=noopener noreferrer")

    def test_site_js_sets_noopener(self):
        js = read("assets/js/site.js")
        self.assertNotRegex(js, r"rel\s*=\s*'noopener'", "site.js sets rel without noreferrer")
        for sink in ("innerHTML", "outerHTML", "insertAdjacentHTML", "eval(", "new Function", "document.write"):
            self.assertNotIn(sink, js, f"site.js uses {sink}")

    def test_form_fields_have_maxlength(self):
        for page in CONTACT_PAGES:
            with self.subTest(page=page):
                seen = {}
                for tag, typ, name, maxlength in security(page).fields:
                    if tag == "textarea" or typ in ("text", "email", "tel", "url", "search"):
                        self.assertTrue(maxlength, f"{page}: field {name!r} has no maxlength")
                        seen[name] = int(maxlength)
                for name, expected in MAXLENGTHS.items():
                    self.assertEqual(seen.get(name), expected, f"{page}: maxlength of {name!r}")

    def test_contact_forms_have_wait_message(self):
        for page in CONTACT_PAGES:
            with self.subTest(page=page):
                self.assertIn("data-msg-wait=", read(page), f"{page}: missing data-msg-wait copy")

    def test_no_secrets_in_config(self):
        cfg = read("assets/js/config.js")
        self.assertNotRegex(cfg, r"(?i)(secret|password|private|token)\s*:", "config.js looks like it holds a secret")


if __name__ == "__main__":
    unittest.main()
