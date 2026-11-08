# Auditoría SEO · JimjoAI

Fecha: 8 de noviembre de 2026

## Estado por página (después de los cambios)

| Página | Título (car.) | Descripción (car.) | Canonical | hreflang | JSON-LD |
|---|---|---|---|---|---|
| index.html | 61 | 153 | Sí | es/en/x-default | ProfessionalService |
| servicios.html | 56 | 150 | Sí | Sí | Sí |
| casos.html | 45 | 144 | Sí | Sí | Sí |
| como-trabajo.html | 54 | 147 | Sí | Sí | Breadcrumb + FAQPage |
| contacto.html | 41 | 149 | Sí | Sí | Sí |
| privacidad.html | 29 | 125 | Sí | Sí | — |
| terminos.html (nueva) | 25 | 148 | Sí | Sí | — |
| accesibilidad.html (nueva) | 23 | 133 | Sí | Sí | — |
| en/* (8 páginas) | 22–57 | 113–157 | Sí | Sí | Equivalentes |
| 404.html | — | — | No (correcto) | No | `noindex` |

Sin títulos ni descripciones duplicados. Todos los JSON-LD son JSON válido.

## Revisión
- **URLs:** estables, `.html` explícito, ES en raíz y EN en `/en/`. Sin redirecciones propias.
- **Sitemap:** regenerado con las 16 URL, `lastmod` y alternativas `hreflang`.
- **robots.txt:** permite todo y apunta al sitemap. Sin cambios.
- **Open Graph / Twitter:** `og:title`, `og:description`, `og:url`, `og:image` (1200×630) y `twitter:card` en todas las páginas.
- **Encabezados:** un `h1` por página, jerarquía sin saltos.
- **Enlaces internos:** 0 enlaces rotos. Nuevas rutas legales enlazadas desde el pie en todas las páginas.
- **Contenido duplicado:** ES/EN declarados como alternativas; sin duplicados internos.
- **Rendimiento:** ver `PERFORMANCE-AUDIT.md` (LCP en laboratorio bajó a ~1.3 s en 4G lento).

## Cambios implementados
- Cinco descripciones recortadas a ≤ 160 caracteres sin cambiar el mensaje.
- Sitemap actualizado.
- Páginas legales con metadatos completos y canonical propio.

## Visibilidad en buscadores y sistemas de IA
- El contenido está en HTML plano, legible sin JavaScript (excepto la autoevaluación, que tiene alternativa estática).
- Servicios, casos y preguntas frecuentes están en texto real con datos estructurados.
- No se añadió `llms.txt` ni técnicas especiales: no hay una justificación técnica y no se promete posicionamiento en ningún sistema.

## Pendiente de validación
- `areaServed` en el JSON-LD de inicio declara `PR`, `US` y `Latinoamérica`. No está confirmado por el propietario (ver `CONTENT-VERIFICATION.md`).
- Si se usa otro dominio en el futuro, reemplazar `https://ai.josealbertopr.com/` en todo el proyecto.
