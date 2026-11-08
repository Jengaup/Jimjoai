# JimjoAI

Sitio web estático y bilingüe (español e inglés) de JimjoAI: consultoría e implementación de inteligencia artificial y automatización para negocios. Es HTML, CSS y JavaScript sin dependencias ni proceso de compilación, listo para publicar en GitHub Pages.

## Estructura

```
/                      Español (idioma principal)
  index.html           Inicio
  servicios.html       Servicios
  casos.html           Casos de éxito
  como-trabajo.html    Cómo trabajo
  contacto.html        Contacto (formulario)
  privacidad.html      Aviso de privacidad (incluye solicitud de acceso, corrección o eliminación)
  terminos.html        Términos de uso
  accesibilidad.html   Declaración de accesibilidad
  404.html             Página no encontrada
/en/                   Inglés
  index.html, services.html, case-studies.html, how-i-work.html,
  contact.html, privacy.html, terms.html, accessibility.html
/assets/
  css/site.css         Estilos de todo el sitio (incluye las tipografías)
  fonts/               Tipografías alojadas en el sitio (sin Google Fonts)
  js/site.js           Animaciones, menú, autoevaluación y formulario
  js/quiz-data.js      Tipos de negocio y señales de la autoevaluación
  js/config.js         Tu configuración (formulario, agenda, correo, LinkedIn)
  img/                 Favicon e imagen para redes sociales (og.png)
sitemap.xml, robots.txt, .nojekyll, CNAME
tests/test_site.py     Pruebas automáticas del sitio
docs/audit/            Auditoría técnica, de seguridad, privacidad, accesibilidad, SEO y rendimiento
```

Cada página en español tiene su versión en inglés y el botón ES / EN lleva de una a la otra.

## Verlo en tu computadora

Desde la carpeta del proyecto:

```bash
python3 -m http.server 8000
```

Abre http://localhost:8000 en el navegador. La versión en inglés está en http://localhost:8000/en/.

## Configuración (`assets/js/config.js`)

Todo lo que cambia de un negocio a otro está en un solo archivo:

```js
window.JIMJO_CONFIG = {
  web3formsKey: "",
  bookingUrl: "",
  email: "",
  linkedinUrl: ""
};
```

- **web3formsKey**: para recibir las solicitudes del formulario en tu correo.
  1. Entra a [web3forms.com](https://web3forms.com).
  2. Escribe el correo donde quieres recibir las solicitudes.
  3. Te llega una clave de acceso (access key). Pégala aquí.

  Es gratis y la clave es pública por diseño, así que no hay problema en que esté en el código. Mientras esté vacía, el formulario funciona en modo demostración y no envía nada.
- **bookingUrl**: enlace para agendar llamadas, por ejemplo uno gratuito de [Cal.com](https://cal.com) (`https://cal.com/tu-usuario/30min`) o Calendly. Si lo dejas vacío, los botones de "Agenda tu diagnóstico" llevan al formulario de contacto.
- **email** (opcional): correo visible en el pie de página. Si lo dejas vacío, no aparece.
- **linkedinUrl** (opcional): tu perfil de LinkedIn. Si lo dejas vacío, no aparece.

**Recomendación:** no publiques tu número de teléfono. Usa el formulario, el enlace de agenda y, si quieres, un correo dedicado solo para el negocio. Así evitas llamadas de spam y todo te llega organizado.

## Publicar en GitHub Pages

1. Haz merge de los cambios a la rama `main`.
2. En GitHub ve a **Settings → Pages**.
3. En **Source** escoge **Deploy from a branch**, rama `main` y carpeta `/ (root)`. Guarda.
4. En **Custom domain** escribe `ai.josealbertopr.com` y guarda. El archivo `CNAME` del repo ya tiene ese dominio.
5. Cuando GitHub termine de verificar, marca **Enforce HTTPS**.

El archivo `.nojekyll` le indica a GitHub que sirva los archivos tal cual.

## Dominio en Cloudflare

En Cloudflare, dentro de `josealbertopr.com`, ve a **DNS → Records → Add record**:

| Tipo | Nombre | Contenido | Proxy |
|---|---|---|---|
| CNAME | `ai` | `jengaup.github.io` | DNS only (nube gris) |

Deja la nube gris hasta que GitHub emita el certificado HTTPS. Si luego quieres activar el proxy (nube naranja), pon **SSL/TLS** en **Full (strict)**.

Opcional: verifica el dominio en GitHub (**Settings de tu cuenta → Pages → Add a domain**) para que nadie más pueda usarlo. GitHub te da un registro TXT para añadir en Cloudflare.

Las URL del sitio (canonical, hreflang, sitemap, og) ya apuntan a `https://ai.josealbertopr.com/`. Si cambias de dominio, busca y reemplaza esa dirección en todo el proyecto.

## Pruebas

```bash
python3 -m unittest discover -s tests -v
```

Las pruebas revisan que cada página tenga idioma, título, descripción y un solo `<h1>`, que todos los enlaces internos funcionen, que existan las versiones en español e inglés de cada página, que tengan `canonical` y `hreflang`, que los formularios tengan los campos necesarios y que no haya rayas largas en el texto visible.

## Pendientes

- [ ] Pedir permiso a los clientes antes de mencionar sus empresas por nombre en los casos.
- [ ] Añadir foto y una biografía corta, si quieres darle una cara al sitio.
- [ ] Llenar `assets/js/config.js` (clave de Web3Forms y enlace de agenda).
- [ ] Conectar un dominio propio.

## Caché del navegador

GitHub Pages guarda los archivos en caché unos 10 minutos. Las páginas cargan el CSS y el JS con un número de versión (`?v=20261108b`). Si cambias `site.css`, `site.js`, `config.js` o `quiz-data.js`, cambia ese número en todas las páginas (un buscar y reemplazar) para que los visitantes reciban la versión nueva enseguida.
