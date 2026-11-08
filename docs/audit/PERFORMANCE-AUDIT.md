# Auditoría de rendimiento · JimjoAI

Fecha: 8 de noviembre de 2026

## Método
Mediciones de **laboratorio** con Chromium (Playwright) contra un servidor local, porque el sitio en vivo no es accesible desde el entorno de auditoría. No hay datos de campo (percentil 75 de usuarios reales).

- Perfil móvil: 390×844, latencia 150 ms, 1.6 Mbps de bajada, CPU ×4 más lenta.
- Perfil escritorio: 1440×900, latencia 20 ms, 10 Mbps, CPU normal.
- LCP y CLS con `PerformanceObserver`. INP no se puede medir sin interacción real; el JS es pequeño y sus manejadores son mínimos.

## Resultados

| Perfil | Página | LCP antes | LCP después | CLS después | Peticiones | Terceros |
|---|---|---|---|---|---|---|
| Móvil 4G lento | Inicio | 3 260 ms | **1 348 ms** | 0.004 | 8 | 0 |
| Móvil 4G lento | Contacto | 2 800 ms | **1 264 ms** | 0.056 | 8 | 0 |
| Móvil 4G lento | Inicio EN | 2 000 ms | **1 324 ms** | 0.007 | 8 | 0 |
| Escritorio | Inicio | 516 ms* | **312 ms** | 0.003 | 8 | 0 |
| Escritorio | Contacto | 432 ms* | **236 ms** | 0 | 8 | 0 |
| Escritorio | Inicio EN | 484 ms* | **280 ms** | 0.003 | 8 | 0 |

\* En la medición “antes”, los archivos de fuente de Google no llegaron a descargarse en este entorno, así que esos valores son optimistas. Después de alojar las fuentes, una medición intermedia mostró LCP de ~1.3 s en escritorio: el titular esperaba a la animación de entrada controlada por JS. Ese era el problema real.

Objetivos de referencia: LCP ≤ 2.5 s ✔, CLS ≤ 0.1 ✔, INP ≤ 200 ms (no medido; riesgo bajo).

## Cambios implementados
1. **Animación del titular por CSS.** La entrada de `.hero` y `.page-hero` ahora arranca con el primer pintado (misma duración, curva y desfases). LCP pasa a coincidir con FCP. No se eliminó ninguna animación.
2. **Fuentes locales.** Solo subconjuntos `latin` y `latin-ext` en WOFF2 (288 KB en total, pero normalmente se descargan 3 archivos, ~157 KB). Precarga de las dos fuentes del titular y el texto. Elimina dos conexiones a dominios de Google.
3. **Versión en CSS/JS** (`?v=20261108b`) para que los cambios lleguen sin esperar la caché de 10 minutos de GitHub Pages.

## Peso por visita (inicio)
HTML ~22 KB, CSS ~43 KB, JS ~37 KB (sin comprimir; GitHub Pages sirve con gzip), fuentes ~157 KB, imágenes: solo favicon SVG (og.png solo lo usan las redes sociales). 8 peticiones.

## Recomendaciones futuras
- Si se activa el proxy de Cloudflare: compresión Brotli y caché más largo para `/assets/fonts/`.
- Revisar en Search Console (datos de campo) un mes después de publicar.
