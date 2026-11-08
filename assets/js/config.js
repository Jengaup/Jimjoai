/*
 * Configuración del sitio. Edita estos valores y la página los usa en todas partes.
 *
 * web3formsKey: clave gratuita de https://web3forms.com (escribe tu correo y te la envían).
 *               Las solicitudes del formulario llegan a ese correo. Esta clave es pública por diseño.
 * bookingUrl:   enlace de agenda (por ejemplo https://cal.com/tu-usuario/30min o Calendly).
 *               Si lo dejas vacío, los botones de "Agendar" llevan al formulario de contacto.
 * email:        correo de contacto visible. Déjalo vacío si prefieres que solo usen el formulario.
 * linkedinUrl:  perfil de LinkedIn. Déjalo vacío para ocultarlo.
 *
 * IMPORTANTE: este archivo es público. Cualquiera que visite el sitio puede leerlo.
 * Nunca pongas aquí claves privadas, contraseñas, tokens de API secretos ni datos
 * personales que no quieras publicar. La clave de Web3Forms es la única excepción,
 * porque Web3Forms la diseñó para usarse en el navegador. Para protegerla, en el panel
 * de Web3Forms limita los dominios permitidos a ai.josealbertopr.com (si tu plan lo ofrece)
 * y activa el filtro de spam.
 * bookingUrl y linkedinUrl solo se usan si empiezan con https://; el correo solo se
 * muestra si tiene un formato válido.
 */
window.JIMJO_CONFIG = {
  web3formsKey: "13247657-56cf-4c0e-92ed-ca3ce28afb3d",
  bookingUrl: "https://calendly.com/jimjoai/consultoria",
  email: "",
  linkedinUrl: ""
};
