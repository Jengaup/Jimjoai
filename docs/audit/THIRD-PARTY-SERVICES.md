# Servicios de terceros · JimjoAI

Fecha: 8 de noviembre de 2026. Verificado con el código y con un registro de todas las peticiones de red al cargar las 16 páginas (resultado: **0 conexiones a otros dominios** al navegar; solo el envío del formulario y el clic en “Agenda una llamada” salen del sitio).

| Servicio | Propósito | Dónde se usa | Cuándo se activa | Datos que recibe | Cookies / almacenamiento | Necesidad | Recomendación | Documentación |
|---|---|---|---|---|---|---|---|---|
| **Web3Forms** | Entregar el formulario por correo | `assets/js/site.js`, `config.js` (`web3formsKey`), CSP | Solo al enviar el formulario | Nombre, negocio, correo, teléfono opcional, intereses, mensaje, URL de la página, IP y datos técnicos de la petición | El sitio no crea cookies para esto | Esencial para el formulario | Mantener. Activar filtro de spam y restricción de dominio en su panel | https://web3forms.com/privacy |
| **Proton Mail** (correo del propietario) | Recibir los mensajes | Fuera del sitio | Al llegar cada mensaje | Contenido completo del formulario | — | Esencial | Mantener | https://proton.me/legal/privacy |
| **Calendly** | Agendar llamadas | `config.js` (`bookingUrl`); `site.js` convierte los botones `[data-booking]` en enlaces | Solo al pulsar un botón de agenda (se abre en otra pestaña) | Lo que la persona escriba en Calendly; datos técnicos de su visita a Calendly | Cookies en el dominio de Calendly, no en este sitio | Opcional (hay formulario como alternativa) | Mantener como enlace. No incrustar el widget (añadiría scripts y cookies de terceros al sitio) | https://calendly.com/privacy |
| **GitHub Pages** | Hosting | Configuración del repositorio, `CNAME` | En cada visita | IP, agente de usuario, URL solicitada (registros del servidor) | No usa cookies en el sitio publicado | Esencial | Mantener | https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement |
| **Cloudflare** | DNS del dominio | Fuera del repositorio | Resolución DNS. Si se activa el proxy, cada visita pasaría por Cloudflare | En modo “DNS only”: consultas DNS. En modo proxy: IP y datos de la petición | En modo proxy puede añadir cookies técnicas de seguridad | Esencial (DNS) | Mantener. Ver propuesta de encabezados en `SECURITY-AUDIT.md` | https://www.cloudflare.com/privacypolicy/ |
| **Google Fonts** | Tipografías | — | — | — | — | — | **Eliminado** el 8 de noviembre de 2026: fuentes alojadas en `assets/fonts/` | — |

## Servicios no encontrados
Google Analytics, Google Tag Manager, píxeles de redes sociales, YouTube, mapas, chatbots, proveedores de IA, CDN de scripts: **no se usan**.

## Almacenamiento en el navegador
| Clave | Tipo | Contenido | Duración | Finalidad |
|---|---|---|---|---|
| `jimjo:lastSent` | sessionStorage | Marca de tiempo numérica, sin datos personales | Hasta cerrar la pestaña | Evitar envíos duplicados durante 60 s |

No hay cookies propias ni `localStorage`.

## Conclusión sobre cookies
No hay rastreadores ni cookies no esenciales. **No se requiere banner de cookies** y no se añadió.
