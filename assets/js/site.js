(() => {
  'use strict';
  const root = document.documentElement;
  const cfg = window.JIMJO_CONFIG || {};
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const readJSON = (el, attr) => { try { return JSON.parse(el.getAttribute(attr)); } catch (e) { return null; } };

  /* Configuración: agenda, correo, LinkedIn.
     Solo se aceptan enlaces https: y un correo con formato simple, para que un valor
     mal escrito (o un "javascript:") nunca termine en un href. */
  const safeHttps = (value) => {
    if (typeof value !== 'string' || !value.trim()) return '';
    try {
      const u = new URL(value.trim());
      return u.protocol === 'https:' ? u.href : '';
    } catch (e) { return ''; }
  };
  const safeEmail = (value) => {
    const v = typeof value === 'string' ? value.trim() : '';
    return /^[A-Za-z0-9._%+-]{1,64}@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/.test(v) && v.length <= 254 ? v : '';
  };
  const bookingUrl = safeHttps(cfg.bookingUrl);
  const linkedinUrl = safeHttps(cfg.linkedinUrl);
  const email = safeEmail(cfg.email);
  $$('[data-booking]').forEach((a) => {
    if (bookingUrl) {
      a.href = bookingUrl;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    }
  });
  $$('[data-email]').forEach((el) => {
    if (email) {
      el.hidden = false;
      $$('a', el).concat(el.tagName === 'A' ? [el] : []).forEach((a) => { a.href = `mailto:${email}`; a.textContent = email; });
    } else {
      el.hidden = true;
    }
  });
  $$('[data-linkedin]').forEach((el) => {
    if (linkedinUrl) {
      el.hidden = false;
      const a = el.tagName === 'A' ? el : $('a', el);
      if (a) { a.href = linkedinUrl; a.target = '_blank'; a.rel = 'noopener noreferrer'; }
    } else {
      el.hidden = true;
    }
  });
  $$('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

  /* Header y barra de progreso */
  const header = $('.site-header');
  const progress = $('.scroll-progress');
  const mobileCta = $('.mobile-cta');
  const hero = $('.hero, .page-hero');
  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle('is-scrolled', y > 8);
    if (progress) {
      const max = document.body.scrollHeight - window.innerHeight;
      progress.style.setProperty('--p', max > 0 ? Math.min(1, y / max) : 0);
    }
    if (mobileCta) {
      const limit = hero ? hero.offsetTop + hero.offsetHeight - 80 : 400;
      const nearEnd = window.innerHeight + y > document.body.scrollHeight - 420;
      mobileCta.classList.toggle('is-shown', y > limit && !nearEnd);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Menú móvil */
  const toggle = $('.menu-toggle');
  const menu = $('#nav-menu');
  if (toggle && menu) {
    const setOpen = (open) => {
      menu.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('menu-open', open);
      const labels = readJSON(toggle, 'data-labels');
      if (labels) toggle.setAttribute('aria-label', open ? labels[1] : labels[0]);
      /* Con el menú abierto, el contenido de atrás no recibe foco */
      Array.from(document.body.children).forEach((el) => {
        if (el !== header && el.tagName !== 'SCRIPT') el.inert = open;
      });
    };
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    $$('a', menu).forEach((a) => a.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setOpen(false); toggle.focus(); }
    });
    window.matchMedia('(min-width: 861px)').addEventListener('change', (e) => { if (e.matches) setOpen(false); });
  }

  /* Contadores */
  const runCounter = (el) => {
    const target = parseFloat(el.dataset.count);
    if (reduceMotion || Number.isNaN(target)) { el.textContent = el.dataset.count; return; }
    const start = performance.now();
    const dur = 1400;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3)));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  /* Animaciones al entrar en pantalla */
  const revealables = $$('.reveal, .mark, [data-count], .steps');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add('is-visible');
        if (el.dataset.count) runCounter(el);
        if (el.classList.contains('steps')) el.style.setProperty('--progress', '100%');
        io.unobserve(el);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealables.forEach((el) => io.observe(el));
    /* Respaldo: si el scroll es muy rápido, revela lo que ya quedó arriba */
    let pending = false;
    window.addEventListener('scroll', () => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => {
        pending = false;
        revealables.forEach((el) => {
          if (el.classList.contains('is-visible') || el.getBoundingClientRect().top > window.innerHeight) return;
          el.classList.add('is-visible');
          if (el.dataset.count) runCounter(el);
          if (el.classList.contains('steps')) el.style.setProperty('--progress', '100%');
          io.unobserve(el);
        });
      });
    }, { passive: true });
  } else {
    revealables.forEach((el) => { el.classList.add('is-visible'); if (el.dataset.count) el.textContent = el.dataset.count; });
  }

  /* Palabras rotativas del titular */
  $$('.rotator').forEach((rot) => {
    const words = $$('span', rot);
    if (words.length < 2 || reduceMotion) return;
    let i = 0;
    setInterval(() => {
      const current = words[i];
      i = (i + 1) % words.length;
      current.classList.remove('is-active');
      current.classList.add('is-leaving');
      words[i].classList.remove('is-leaving');
      words[i].classList.add('is-active');
      setTimeout(() => current.classList.remove('is-leaving'), 700);
    }, 2600);
  });

  /* Tablero animado */
  const board = $('.board');
  if (board) {
    const states = readJSON(board, 'data-states') || [];
    const toasts = readJSON(board, 'data-toasts') || [];
    const rows = $$('.board-row', board);
    const toast = $('.board-toast', board);
    const kpis = $$('[data-kpi]', board);
    const updateKpis = () => {
      const counts = [0, 0, 0, 0];
      rows.forEach((r) => { counts[Number($('.chip', r).dataset.s)] += 1; });
      kpis.forEach((k) => {
        const idx = Number(k.dataset.kpi);
        k.textContent = String(counts[idx] + Number(k.dataset.base || 0));
      });
    };
    const setRow = (row, s) => {
      const chip = $('.chip', row);
      chip.dataset.s = String(s);
      chip.textContent = states[s] || '';
      const track = $('[data-track]', row);
      if (track) track.hidden = s < 2;
    };
    rows.forEach((r) => setRow(r, Number($('.chip', r).dataset.s)));
    updateKpis();
    if (!reduceMotion && states.length) {
      let turn = 0;
      let hideTimer;
      const step = () => {
        if (document.hidden) return;
        const row = rows[turn % rows.length];
        const next = (Number($('.chip', row).dataset.s) + 1) % states.length;
        setRow(row, next);
        updateKpis();
        row.classList.add('is-updated');
        setTimeout(() => row.classList.remove('is-updated'), 1400);
        if (toast && toasts[next]) {
          $('[data-toast-title]', toast).textContent = toasts[next][0];
          $('[data-toast-text]', toast).textContent = `${toasts[next][1]} · ${$('.who', row).textContent}`;
          toast.classList.add('is-shown');
          clearTimeout(hideTimer);
          hideTimer = setTimeout(() => toast.classList.remove('is-shown'), 2300);
        }
        turn += 1;
      };
      setTimeout(step, 1200);
      setInterval(step, 3000);
    }
  }

  /* Diagnóstico rápido */
  const quiz = $('[data-quiz]');
  if (quiz) {
    const copy = readJSON(quiz, 'data-quiz') || {};
    const boxes = $$('input[type="checkbox"]', quiz);
    const meter = $('.meter i', quiz);
    const title = $('[data-quiz-title]', quiz);
    const text = $('[data-quiz-text]', quiz);
    const count = $('[data-quiz-count]', quiz);
    const update = () => {
      const checked = boxes.filter((b) => b.checked);
      const n = checked.length;
      const pct = Math.round((n / boxes.length) * 100);
      if (meter) meter.style.width = `${Math.max(n ? 8 : 0, pct)}%`;
      if (count) count.textContent = (copy.count || '{n}/{t}').replace('{n}', n).replace('{t}', boxes.length);
      const band = n === 0 ? 'none' : n <= 2 ? 'low' : n <= 4 ? 'mid' : 'high';
      const tally = {};
      checked.forEach((b) => { tally[b.dataset.area] = (tally[b.dataset.area] || 0) + 1; });
      const top = Object.keys(tally).sort((a, b) => tally[b] - tally[a])[0];
      const bandCopy = (copy.bands || {})[band] || {};
      if (title) title.textContent = bandCopy.title || '';
      if (text) text.textContent = n && copy.areas && copy.areas[top] ? `${bandCopy.text} ${copy.areas[top]}` : (bandCopy.text || '');
    };
    boxes.forEach((b) => b.addEventListener('change', update));
    update();
  }

  /* Formulario de contacto (Web3Forms) */
  const form = $('[data-contact-form]');
  if (form) {
    const status = $('.form-status', form);
    const btn = $('button[type="submit"]', form);
    const msg = (key) => form.dataset[key] || '';
    const show = (type, text) => {
      status.className = `form-status is-${type}`;
      status.textContent = text;
    };
    /* ?interes= solo marca una casilla existente; el valor nunca entra a un selector ni al DOM */
    const params = new URLSearchParams(window.location.search);
    const preset = params.get('interes') || params.get('interest');
    if (preset) {
      const chip = $$('input[name="interest"]', form).find((c) => c.value === preset);
      if (chip) chip.checked = true;
    }

    /* Límites contra abuso. Son solo disuasivos en el navegador: el filtro de spam y el
       límite real de envíos los aplica Web3Forms. */
    const MIN_FILL_MS = 3000;      /* envíos más rápidos que esto casi siempre son bots */
    const COOLDOWN_MS = 60000;     /* espera después de un envío correcto */
    const COOLDOWN_KEY = 'jimjo:lastSent';
    const readyAt = performance.now();
    let sending = false;
    const lastSent = () => {
      try { return Number(window.sessionStorage.getItem(COOLDOWN_KEY)) || 0; } catch (e) { return 0; }
    };
    const markSent = () => {
      try { window.sessionStorage.setItem(COOLDOWN_KEY, String(Date.now())); } catch (e) { /* sin almacenamiento */ }
    };
    let memSent = 0; /* respaldo si sessionStorage no está disponible */
    const inCooldown = () => Date.now() - Math.max(lastSent(), memSent) < COOLDOWN_MS;
    const trimFields = () => {
      $$('input[type="text"], input[type="email"], input[type="tel"], textarea', form).forEach((f) => {
        const max = Number(f.getAttribute('maxlength')) || 0;
        let v = f.value.trim();
        if (max && v.length > max) v = v.slice(0, max);
        if (v !== f.value) f.value = v;
      });
    };

    const validate = () => {
      let firstBad = null;
      $$('input[required], select[required], textarea[required]', form).forEach((field) => {
        const ok = field.checkValidity();
        field.setAttribute('aria-invalid', ok ? 'false' : 'true');
        const err = document.getElementById(`${field.id}-error`);
        if (err) err.textContent = ok ? '' : (field.dataset.error || field.validationMessage);
        if (!ok && !firstBad) firstBad = field;
      });
      if (firstBad) firstBad.focus();
      return !firstBad;
    };
    $$('input, select, textarea', form).forEach((field) => {
      field.addEventListener('input', () => {
        if (field.getAttribute('aria-invalid') === 'true' && field.checkValidity()) {
          field.setAttribute('aria-invalid', 'false');
          const err = document.getElementById(`${field.id}-error`);
          if (err) err.textContent = '';
        }
      });
    });
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (sending) return;
      trimFields();
      if (!validate()) { show('error', msg('msgInvalid')); return; }
      const trap = form.querySelector('[name="botcheck"]');
      if (trap && trap.checked) return;
      if (performance.now() - readyAt < MIN_FILL_MS || inCooldown()) { show('info', msg('msgWait')); return; }
      if (!cfg.web3formsKey) { show('info', msg('msgDemo')); return; }
      sending = true;
      btn.disabled = true;
      const data = new FormData(form);
      data.append('access_key', cfg.web3formsKey);
      data.append('subject', `${msg('subject')} — ${data.get('company') || data.get('name')}`);
      data.append('from_name', 'JimjoAI web');
      data.append('page', window.location.href);
      const interests = data.getAll('interest');
      data.delete('interest');
      data.append('interest', interests.join(', '));
      btn.setAttribute('aria-busy', 'true');
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: data
        });
        const json = await res.json().catch(() => ({}));
        if (res.ok && json.success !== false) {
          memSent = Date.now();
          markSent();
          form.reset();
          show('ok', msg('msgOk'));
        } else {
          show('error', msg('msgError'));
        }
      } catch (err) {
        show('error', msg('msgError'));
      } finally {
        sending = false;
        btn.disabled = false;
        btn.removeAttribute('aria-busy');
      }
    });
  }
})();
