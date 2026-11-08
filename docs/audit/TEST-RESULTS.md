# Resultados de pruebas · JimjoAI

Fecha: 8 de noviembre de 2026. Entorno: servidor local (`python3 -m http.server`), Chromium de Playwright, axe-core. **No se envió ningún formulario real ni se abrió Calendly:** todas las peticiones a `api.web3forms.com` se interceptaron y cualquier otro dominio externo se bloqueó.

## Resumen

| # | Prueba | Resultado |
|---|---|---|
| 1 | Carga de inicio ES/EN | Pasa |
| 2 | Rutas existentes (16 páginas + 404) | Pasa |
| 3 | Navegación principal | Pasa |
| 4 | Menú móvil (abre, cierra con Escape, devuelve foco) | Pasa |
| 5 | Enlaces internos | Pasa: 0 rotos |
| 6 | Enlaces externos con `target=_blank` y `rel="noopener noreferrer"` | Pasa |
| 7 | Formulario vacío | Pasa: errores por campo, foco al primero |
| 8 | Formulario inválido | Pasa |
| 9 | Envío simulado exitoso (`200` + `success:true`) | Pasa: mensaje de éxito, campos vaciados |
| 10 | `200` con `success:false` | Pasa: error, campos conservados |
| 11 | `200` sin JSON | Pasa: error (antes mostraba éxito falso) |
| 12 | HTTP 500 y 429 | Pasa: error, campos conservados |
| 13 | Error de red | Pasa |
| 14 | Timeout (sin respuesta, 15 s) | Pasa: mensaje de tiempo agotado, campos conservados |
| 15 | Doble envío (clic + `requestSubmit` + Enter durante el envío) | Pasa: 1 sola petición |
| 16 | Ausencia de envíos reales | Pasa: 0 peticiones fuera de las interceptadas |
| 17 | Calendly sin reservas reales | Pasa: el botón apunta a `calendly.com/jimjoai/consultoria` con `noopener noreferrer`; no se abrió |
| 18 | Cambio de idioma | Pasa: cada página enlaza su equivalente |
| 19 | Navegación por teclado | Pasa: primer Tab = “Saltar al contenido”; sin trampas |
| 20 | Foco visible | Pasa: outline sólido |
| 21 | Labels | Pasa (axe) |
| 22 | Contraste | Pasa con página estable. Falso positivo transitorio a mitad de una animación (ver `ACCESSIBILITY-AUDIT.md`) |
| 23 | Zoom 200% y reflow 320 px | Pasa: 0 desplazamiento horizontal en 16 páginas |
| 24 | `prefers-reduced-motion` | Pasa: todo visible, 0 animaciones infinitas |
| 25 | Móvil (320, 390), tablet (768, 1024), escritorio (1440) | Pasa |
| 26 | Páginas legales ES/EN | Pasa |
| 27 | SEO y metadatos | Pasa: sin duplicados, JSON-LD válido |
| 28 | Sitemap y robots | Pasa: 16 URL, XML válido |
| 29 | Encabezados de seguridad | Parcial: CSP y Referrer-Policy por `<meta>` verificados; encabezados HTTP **no verificables** (sitio en vivo inaccesible desde aquí) |
| 30 | Dependencias vulnerables | No aplica: el sitio no tiene dependencias |
| 31 | Secretos nuevos | Pasa: ninguno (prueba automática sobre `config.js`) |
| 32 | Datos personales en consola | Pasa: los únicos mensajes son los avisos del navegador por los errores HTTP simulados, sin datos |
| 33 | Tracking añadido | Pasa: 0 dominios externos al navegar |
| 34 | Errores de consola nuevos | Pasa: 0 en las 16 páginas |
| 35 | Solicitud de datos `?solicitud=datos` | Pasa ES/EN; valor no válido ignorado |
| 36 | Type checking / lint | No aplica: no hay TypeScript ni linter configurado |
| 37 | Pruebas unitarias existentes | Pasa: 18/18 |
| 38 | Build de producción | No aplica: sitio estático sin compilación |

## Pruebas unitarias
```
python3 -m unittest discover -s tests -v
Ran 18 tests ... OK
```

## Formulario: escenarios simulados (14/14)
Cada escenario se corrió en español e inglés: éxito, `success:false`, respuesta sin JSON, HTTP 500, HTTP 429, error de red y timeout. En todos: 1 petición, botón deshabilitado durante el envío, foco al mensaje de resultado, alternativa de agenda visible en errores y sin datos personales en consola ni en almacenamiento.

## Rendimiento (laboratorio)
Ver `PERFORMANCE-AUDIT.md`. LCP móvil 4G lento: 1.26–1.35 s. CLS ≤ 0.056.

## Pendientes
- Verificar en producción: HTTPS, encabezados HTTP, y que la versión nueva de CSS/JS se sirve tras publicar.
- Prueba con lector de pantalla real.
- Un envío real controlado por el propietario después de publicar.
