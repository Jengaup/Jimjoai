# Auditoría de accesibilidad · JimjoAI

Fecha: 8 de noviembre de 2026 · Objetivo: WCAG 2.2 nivel AA. No se afirma cumplimiento perfecto.

## Método
- axe-core 4.x (reglas wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa y best-practice) en las 16 páginas a 1440 px y 390 px, y con el menú móvil abierto.
- Recorrido completo con teclado (Tab) en inicio, contacto e inicio en inglés.
- Emulación de `prefers-reduced-motion: reduce`.
- Reflow: 720×450 con DPR 2 (equivale a 1440×900 al 200% de zoom) y 320 px de ancho.
- Revisión de tamaño de objetivos táctiles (mínimo 24×24 px, WCAG 2.5.8).

## Resultados

| Criterio | Resultado |
|---|---|
| `lang` correcto (`es` en raíz, `en` en `/en/`) | 16/16 páginas |
| Un solo `h1` y sin saltos de nivel | 16/16 |
| Enlace “Saltar al contenido” | Presente; es el primer foco y es visible |
| Regiones semánticas | `header`, `nav`, `main`, `footer`, `aside` (barra móvil) |
| Teclado | Recorrido completo sin trampas de foco; orden lógico |
| Menú móvil | `aria-expanded`, `aria-controls`; Escape lo cierra y devuelve el foco al botón; el contenido detrás queda inerte |
| Foco visible | `outline` sólido de 3 px con color de contraste suficiente |
| Formularios | Etiquetas asociadas, `aria-invalid`, errores con `aria-describedby`, foco al primer campo inválido, estado con `role="status"`. **Nuevo:** “Enviando…” anunciado, foco al mensaje de resultado, botón deshabilitado durante el envío |
| Contraste | axe sin violaciones con la página estable. Ver nota |
| Imágenes / SVG | SVG decorativos con `aria-hidden`; el tablero animado es `role="img"` con descripción |
| Movimiento reducido | Todo el contenido visible, una sola palabra en el titular rotativo, tablero estático, 0 animaciones infinitas activas |
| Zoom 200% / reflow 320 px | Sin desplazamiento horizontal en las 16 páginas |
| Objetivos táctiles | Ningún control bajo 24×24 px (los enlaces dentro de texto están exentos) |

**Nota sobre contraste:** cuando la prueba corre 0.4 s después de un scroll rápido, axe detecta a veces un párrafo del bloque “Cómo trabajo” a mitad de su animación de entrada (color intermedio, distinto en cada corrida). Con la página estable (3 s) no hay violaciones. Es un falso positivo transitorio.

## Cambios implementados
- Declaración de accesibilidad ES/EN (`accesibilidad.html`, `en/accessibility.html`) con objetivo, pruebas realizadas, limitaciones conocidas y cómo reportar barreras (página, problema, navegador, tecnología de asistencia).
- Mensajes de estado del formulario mejorados (ver arriba).
- Etiqueta visible “ejemplo” en el tablero animado.
- La animación del titular ahora es CSS y respeta `prefers-reduced-motion` como el resto.

## Limitaciones conocidas
- No se ha probado con lectores de pantalla reales (NVDA, VoiceOver) ni con personas usuarias de tecnologías de asistencia.
- La accesibilidad de Calendly depende del proveedor.
