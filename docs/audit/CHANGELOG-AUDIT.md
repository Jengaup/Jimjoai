# Registro de cambios de la auditoría · JimjoAI

Fecha: 8 de noviembre de 2026 · Sin commit, push ni deploy (pendiente de aprobación).

## Formulario (`assets/js/site.js`, `contacto.html`, `en/contact.html`)
- Éxito solo con respuesta 2xx **y** `success: true` de Web3Forms.
- Tiempo límite de 15 s con `AbortController` y mensaje propio.
- Mensaje “Enviando…”, foco al resultado, alternativa visible para agendar si falla.
- Los campos se conservan en cualquier error.
- Aviso junto al botón: el mensaje pasa por Web3Forms.
- `?solicitud=datos` abre el formulario con una solicitud de privacidad ya redactada.

## Privacidad y legales
- `privacidad.html` y `en/privacy.html` reescritas con prácticas verificadas.
- **Nuevas:** `terminos.html`, `en/terms.html`, `accesibilidad.html`, `en/accessibility.html`.
- Pie de página: nueva columna “Legal” (Privacidad, Términos, Accesibilidad, Solicitud de datos) en las 17 páginas. “Privacidad” salió de la columna “Idioma”.

## Rendimiento y privacidad técnica
- Google Fonts eliminado. Fuentes en `assets/fonts/` (6 WOFF2 + 3 licencias OFL) y `@font-face` al inicio de `site.css`, con precarga.
- CSP: `font-src 'self'`, sin dominios de Google, y `upgrade-insecure-requests`.
- Animación de entrada del encabezado por CSS (mejora LCP).
- Versión `?v=20261108b` en CSS y JS.

## Contenido y SEO
- Etiqueta visible “ejemplo / example” en el tablero animado de inicio.
- Cinco meta descriptions recortadas a ≤ 160 caracteres (`casos`, `como-trabajo`, `servicios`, `en/case-studies`, `en/how-i-work`).
- `sitemap.xml` regenerado: 16 URL con `lastmod`.

## Otros
- `tests/test_site.py`: nuevas parejas ES/EN para términos y accesibilidad.
- `README.md`: estructura actualizada y nota sobre la caché.
- `docs/audit/`: 12 documentos de auditoría.

## Archivos eliminados
Ninguno del repositorio. (Solo se eliminó un archivo temporal `assets/css/fonts.css` creado durante el trabajo, que se integró en `site.css`.)
