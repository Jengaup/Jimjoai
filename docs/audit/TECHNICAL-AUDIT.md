# Auditoría técnica · JimjoAI

Fecha: 8 de noviembre de 2026 · Alcance: repositorio `Jengaup/Jimjoai` (rama `claude/gifted-hawking-2v04no`, basada en `main` + PR #3 sin fusionar).
Sitio: https://ai.josealbertopr.com/

> El sitio en vivo no se pudo abrir desde el entorno de auditoría (el proxy de salida rechaza el dominio). Todo lo marcado como **verificado** se comprobó sobre los archivos del repositorio servidos en local. Lo que depende del servidor real (encabezados HTTP, HTTPS, DNS) está marcado como **no verificable**.

## Arquitectura

| Aspecto | Hallazgo |
|---|---|
| Tipo | Sitio estático: HTML + CSS + JavaScript sin frameworks |
| Dependencias | Ninguna. No hay `package.json`, `node_modules` ni paso de compilación |
| Lenguajes | HTML5, CSS3, JavaScript (ES2017+), Python 3 (solo pruebas) |
| Páginas | 8 en español (raíz), 8 en inglés (`/en/`) y `404.html` |
| Traducciones | Páginas duplicadas por idioma, enlazadas con `hreflang`. Textos dinámicos de la autoevaluación en `assets/js/quiz-data.js` (`es` / `en`) |
| Componentes compartidos | Encabezado, pie de página y barra móvil repetidos en cada HTML (no hay plantillas) |
| JS | `config.js` (configuración pública), `quiz-data.js` (datos), `site.js` (menú, animaciones, autoevaluación, formulario) |
| Formularios | Uno: contacto (`contacto.html`, `en/contact.html`) → Web3Forms |
| Agenda | Calendly solo como **enlace** (`bookingUrl` en `config.js`). No hay widget ni script de Calendly |
| IA | **No hay integraciones de IA** (ni OpenAI, Anthropic, Gemini, etc.). El sitio solo presenta servicios de consultoría |
| Variables de entorno | No existen. La configuración es `assets/js/config.js`, pública por diseño |
| Hosting | GitHub Pages, rama `main`, carpeta raíz, dominio propio por `CNAME` |
| DNS | Cloudflare (según el propietario). Modo proxy no verificable |
| Pruebas | `tests/test_site.py` (unittest, solo biblioteca estándar) |
| Build | No aplica: los archivos se publican tal cual |

## Hallazgos por severidad

### Altos (confirmados y corregidos)
1. **Falso éxito del formulario.** `site.js` aceptaba como enviado cualquier respuesta 2xx aunque no trajera JSON (`json.success !== false` con `{}`). Ahora solo es éxito con 2xx **y** `success: true`.
2. **Sin tiempo límite en el envío.** Si Web3Forms no respondía, el botón quedaba deshabilitado sin aviso. Ahora hay `AbortController` con 15 s, mensaje específico y los campos se conservan.

### Medios (confirmados y corregidos)
3. **Google Fonts como tercero.** Cada visita enviaba la IP del visitante a Google. Tipografías ahora alojadas en `assets/fonts/`.
4. **Aviso de privacidad incompleto.** Faltaban GitHub Pages, Cloudflare, Calendly por nombre, el `sessionStorage`, la autoevaluación y un procedimiento claro de acceso/corrección/eliminación. Actualizado en ES/EN.
5. **Sin Términos de uso ni Declaración de accesibilidad.** Creados en ES/EN y enlazados desde el pie.
6. **LCP retrasado ~1 s** por la animación de entrada del titular (dependía del JS). Ahora la misma animación corre con CSS desde el primer pintado.
7. **Nombres de clientes ficticios en el tablero animado sin aviso visible.** Se añadió la etiqueta “ejemplo / example”.

### Bajos (corregidos)
8. Cinco meta descriptions superaban 160 caracteres.
9. `sitemap.xml` sin las páginas nuevas ni `lastmod`.
10. El formulario no anunciaba el estado “enviando” ni ofrecía alternativa si fallaba.

### No verificables desde aquí
- Encabezados HTTP reales de GitHub Pages / Cloudflare (HSTS, X-Content-Type-Options, framing).
- Estado del certificado HTTPS y “Enforce HTTPS”.
- Configuración de la cuenta de Web3Forms (dominios permitidos, filtro de spam).
- Configuración del evento de Calendly (duración, idioma, preguntas).

### Recomendaciones futuras
- Activar el proxy de Cloudflare y añadir encabezados de seguridad (ver `SECURITY-AUDIT.md` y `OWNER-APPROVAL-REQUIRED.md`).
- Generar encabezado/pie desde una sola plantilla (por ejemplo, un script de compilación pequeño) para evitar 17 copias.
- Pruebas de navegador (Playwright) dentro del repositorio si el proyecto crece.

Documentos relacionados: `SECURITY-AUDIT.md`, `PRIVACY-AUDIT.md`, `ACCESSIBILITY-AUDIT.md`, `SEO-AUDIT.md`, `PERFORMANCE-AUDIT.md`, `THIRD-PARTY-SERVICES.md`, `THIRD-PARTY-NOTICES.md`, `CONTENT-VERIFICATION.md`, `TEST-RESULTS.md`, `CHANGELOG-AUDIT.md`, `OWNER-APPROVAL-REQUIRED.md`.
