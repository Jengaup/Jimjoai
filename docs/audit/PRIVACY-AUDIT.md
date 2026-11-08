# Auditoría de privacidad · JimjoAI

Fecha: 8 de noviembre de 2026. Esto es una implementación técnica de buenas prácticas, no asesoría legal.

## Datos que el sitio recoge (verificado en el código)

| Dato | Origen | Obligatorio | Finalidad | Destino |
|---|---|---|---|---|
| Nombre | Formulario | Sí | Contestar | Web3Forms → correo del propietario |
| Negocio o empresa | Formulario | Sí | Contexto | Igual |
| Correo electrónico | Formulario | Sí | Contestar | Igual |
| Teléfono | Formulario | No | Contestar | Igual |
| Temas de interés | Formulario | No | Contexto | Igual |
| Mensaje | Formulario | Sí | Contexto | Igual |
| URL de la página (puede incluir tipo de negocio y señales de la autoevaluación) | Automático al enviar | — | Saber de dónde llegó | Igual |
| Hora del último envío | `sessionStorage` (`jimjo:lastSent`) | — | Evitar duplicados 60 s | Solo el navegador; se borra al cerrar la pestaña |

La autoevaluación no envía ni guarda nada: solo copia texto al formulario si la persona pulsa el botón.

No hay cookies propias, analítica, píxeles, chat ni servicios de IA que procesen datos de visitantes.

## Proveedores
Web3Forms (formulario), Proton Mail (correo del propietario), GitHub Pages (hosting, registros técnicos), Cloudflare (DNS), Calendly (solo al pulsar “Agenda una llamada”). Antes también Google Fonts: **eliminado**. Detalle en `THIRD-PARTY-SERVICES.md`.

## Riesgos identificados
1. Texto libre: la persona puede escribir información sensible. **Mitigado** con un aviso en la política (escribir solo lo necesario).
2. Web3Forms recibe el contenido completo. Sus condiciones de almacenamiento no se pudieron verificar desde aquí; la política enlaza su aviso de privacidad sin afirmar nada sobre su retención.
3. Retención: **60 días**, confirmado por el propietario e incluido en la política.
4. Responsable: **José Alberto Jiménez**, confirmado e incluido en privacidad y términos.
5. No se sabe si el propietario procesa los mensajes con herramientas de IA. La política **no** afirma nada al respecto. Pendiente de confirmación.

## Cambios implementados
- Política de privacidad ES/EN reescrita solo con prácticas verificadas: responsable, datos, autoevaluación, finalidad, proveedores con enlaces a sus políticas, almacenamiento en navegador, conservación, derechos, menores, seguridad sin promesas absolutas, fecha de vigencia.
- **Mecanismo de acceso, corrección y eliminación:** sección `#tus-datos` / `#your-data` y enlace “Solicitud de datos / Data request” en el pie de todas las páginas. Abre el formulario existente con un mensaje fijo ya redactado (`?solicitud=datos`). No se creó otro formulario ni se piden documentos.
- Aviso junto al botón de envío: el mensaje pasa por Web3Forms, con enlace a la política.
- Eliminación de Google Fonts (ya no se envía la IP a Google en cada visita).

## Afirmaciones que se mantienen y requieren validación
- “No vendo, alquilo ni comparto tus datos con terceros para fines comerciales.” (existía antes; depende de la práctica del propietario).
- “Te contesto por correo” en solicitudes de datos.
