# Auditoría de seguridad · JimjoAI

Fecha: 8 de noviembre de 2026 · Referencia: buenas prácticas OWASP (Top 10 aplicable a un sitio estático).

## Superficie de ataque
- Sitio estático sin backend, sin base de datos, sin autenticación ni sesiones.
- Único punto que recibe datos: formulario de contacto → `https://api.web3forms.com/submit` (POST desde el navegador).
- Único dato configurable: `assets/js/config.js` (público).

## Revisión

| Área | Resultado | Estado |
|---|---|---|
| Claves API / credenciales | Solo `web3formsKey`, que Web3Forms diseñó para ser pública (solo permite enviar mensajes al buzón del dueño). No hay otros secretos en archivos ni en el historial revisado | OK |
| Variables de entorno | No existen | N/A |
| XSS | Ningún `innerHTML`, `outerHTML`, `insertAdjacentHTML`, `eval` ni `document.write` (lo verifica una prueba). Todo texto dinámico usa `textContent`/`createElement`. El SVG de la autoevaluación se construye con `createElementNS` | OK |
| Parámetros de URL | `?interes=`, `?negocio=`, `?senales=` y `?solicitud=` solo se comparan con valores conocidos; nunca entran al DOM ni a selectores. Probado con `?solicitud=<script>` → ignorado | OK |
| Validación de entradas | `required`, `type=email`, `maxlength` (100/120/254/30/3000), recorte de espacios. Es validación de experiencia de usuario, **no** una barrera de seguridad: el filtrado real lo hace Web3Forms | OK, con límite documentado |
| Abuso del formulario | Campo trampa (`botcheck`), tiempo mínimo de 3 s, 60 s de espera tras un envío correcto, bloqueo de doble envío, tiempo límite de 15 s | Mejorado |
| Manejo de errores | Mensajes genéricos sin detalles técnicos. No se registra nada en consola | Mejorado |
| CORS | No hay endpoints propios. Web3Forms acepta peticiones de navegador | N/A |
| Redirecciones | No hay redirecciones propias | N/A |
| Enlaces `target="_blank"` | Los únicos son los que `site.js` crea para Calendly/LinkedIn, con `rel="noopener noreferrer"` (verificado en las 16 páginas) | OK |
| Dependencias | No hay dependencias de terceros en el sitio | OK |
| Exposición de información | El repositorio es público: `config.js`, pruebas, README y estos documentos son visibles. No contienen secretos. El correo del autor aparece en el primer commit del historial de git | Informativo |

## Encabezados de seguridad

GitHub Pages no permite configurar encabezados HTTP. Lo que se puede hacer desde el HTML ya está aplicado:

| Encabezado | Estado |
|---|---|
| Content-Security-Policy | `<meta>` en las 17 páginas: `default-src 'self'`; scripts propios + hash del único script en línea; `style-src 'self' 'unsafe-inline'` (necesario por atributos `style` de las animaciones); `font-src 'self'` (antes Google); `connect-src` y `form-action` solo Web3Forms; `object-src 'none'`; `base-uri 'self'`; **nuevo:** `upgrade-insecure-requests` |
| Referrer-Policy | `<meta name="referrer" content="strict-origin-when-cross-origin">` |
| Strict-Transport-Security | No configurable en GitHub Pages. **No verificable** desde aquí |
| X-Content-Type-Options | No configurable vía `<meta>`. **No verificable** |
| Permissions-Policy | No configurable vía `<meta>` |
| Protección contra framing | `frame-ancestors` no funciona en `<meta>`. Sin protección hoy |

**Propuesta (requiere aprobación):** activar el proxy de Cloudflare (nube naranja, SSL “Full (strict)”) y crear una regla de *Response Header Transform* con:

```
Strict-Transport-Security: max-age=31536000
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Content-Security-Policy: frame-ancestors 'none'
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
```

Riesgo de compatibilidad: bajo (el sitio no se incrusta en otros sitios ni usa esas APIs). Se recomienda probar primero sin `includeSubDomains` para no afectar otros subdominios de `josealbertopr.com`.

## Pendiente del propietario
- En Web3Forms: activar filtro de spam/captcha y limitar dominios a `ai.josealbertopr.com` si el plan lo permite.
- Confirmar que “Enforce HTTPS” está activo en GitHub Pages.
