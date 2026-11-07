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
  privacidad.html      Privacidad
  404.html             Página no encontrada
/en/                   Inglés
  index.html, services.html, case-studies.html,
  how-i-work.html, contact.html, privacy.html
/assets/
  css/site.css         Estilos de todo el sitio
  js/site.js           Animaciones, menú, diagnóstico y formulario
  js/config.js         Tu configuración (formulario, agenda, correo, LinkedIn)
  img/                 Favicon e imagen para redes sociales (og.png)
sitemap.xml, robots.txt, .nojekyll
tests/test_site.py     Pruebas automáticas del sitio
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
4. En uno o dos minutos el sitio queda en https://jengaup.github.io/Jimjoai/

El archivo `.nojekyll` le indica a GitHub que sirva los archivos tal cual.

## Usar un dominio propio más adelante

1. Configura el dominio en **Settings → Pages → Custom domain** y en tu proveedor de dominio.
2. Reemplaza `https://jengaup.github.io/Jimjoai/` por tu dominio nuevo en:
   - las etiquetas `canonical`, `hreflang` y `og:` de cada página,
   - los datos estructurados (JSON-LD) de las páginas de inicio,
   - `sitemap.xml` y `robots.txt`.
3. En `404.html`, las rutas que empiezan con `/Jimjoai/` pasan a empezar con `/`.

Un buscar y reemplazar en todo el proyecto resuelve casi todo.

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
