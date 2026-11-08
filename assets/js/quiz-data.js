/*
 * Autoevaluación por tipo de negocio.
 * Cada señal tiene: t (texto), a (área) y r (lo que automatizaría primero).
 * Áreas: seguimiento, visibilidad, equipo, atencion, operacion.
 */
window.JIMJO_QUIZ = {
  areaToInterest: {
    seguimiento: 'automatizacion',
    operacion: 'automatizacion',
    visibilidad: 'tableros',
    equipo: 'capacitacion',
    atencion: 'asistentes'
  },
  es: {
    count: '{n} de {t} señales',
    recsTitle: 'Lo que automatizaría primero',
    prefillBiz: 'Tipo de negocio',
    prefillSignals: 'Me identifico con',
    bands: {
      none: { title: 'Marca las señales que reconoces', text: 'El resultado se actualiza mientras marcas.' },
      low: { title: 'Hay una oportunidad clara', text: 'Con un solo proceso automatizado ya se notaría la diferencia.' },
      mid: { title: 'Tu equipo está perdiendo horas cada semana', text: 'Un piloto pequeño puede devolverles tiempo en pocas semanas.' },
      high: { title: 'Es hora de automatizar', text: 'Tu operación depende demasiado del trabajo manual. Conversemos.' }
    },
    industries: [
      { key: 'restaurante', label: 'Restaurante', signals: [
        { t: 'Contestamos una y otra vez las mismas preguntas: horario, menú, reservaciones', a: 'atencion', r: 'Un asistente que conteste las preguntas frecuentes por WhatsApp, redes o la web' },
        { t: 'Las reservaciones y pedidos llegan por varios canales y a veces se nos escapan', a: 'operacion', r: 'Reservaciones y pedidos en un solo lugar' },
        { t: 'El inventario y los pedidos a suplidores se hacen a ojo o en papel', a: 'operacion', r: 'Alertas de inventario bajo y pedidos a suplidores' },
        { t: 'Los horarios de los empleados se cuadran a mano cada semana', a: 'operacion', r: 'Turnos de empleados con avisos automáticos' },
        { t: 'No sabemos bien qué platos dejan más ganancia ni cómo van las ventas por día', a: 'visibilidad', r: 'Un tablero de ventas, costos y platos más rentables' },
        { t: 'Casi nunca pedimos reseñas ni volvemos a contactar a los clientes', a: 'seguimiento', r: 'Mensajes automáticos para pedir reseñas y traer clientes de vuelta' }
      ] },
      { key: 'tienda', label: 'Tienda o e-commerce', signals: [
        { t: 'Los clientes preguntan por precios, disponibilidad o envíos y tardamos en contestar', a: 'atencion', r: 'Un asistente que conteste preguntas de productos y envíos' },
        { t: 'El inventario de la tienda y el de la web no cuadran', a: 'operacion', r: 'Inventario sincronizado entre la tienda, la web y las redes' },
        { t: 'Subir productos, fotos y descripciones nos toma horas', a: 'equipo', r: 'Descripciones de productos con IA y carga más rápida' },
        { t: 'Hay carritos abandonados o clientes que compran una vez y no vuelven', a: 'seguimiento', r: 'Correos automáticos de carrito abandonado y de recompra' },
        { t: 'Los clientes escriben para preguntar dónde está su pedido', a: 'atencion', r: 'Avisos automáticos con el número de rastreo' },
        { t: 'No tenemos claro qué se vende más ni cuándo reponer', a: 'visibilidad', r: 'Un tablero de ventas con alertas para reponer' }
      ] },
      { key: 'mercadeo', label: 'Agencia de mercadeo', signals: [
        { t: 'Preparar los reportes de cada cliente nos toma días cada mes', a: 'visibilidad', r: 'Reportes de clientes que se arman solos' },
        { t: 'Redactar borradores de contenido y copys consume demasiado tiempo', a: 'equipo', r: 'Un flujo de contenido con IA y revisión humana' },
        { t: 'Las aprobaciones de los clientes se pierden entre correos y chats', a: 'seguimiento', r: 'Aprobaciones con recordatorios automáticos' },
        { t: 'Los leads de las campañas llegan a varios sitios y nadie los atiende rápido', a: 'seguimiento', r: 'Leads centralizados con respuesta inmediata' },
        { t: 'No vemos en un solo lugar las horas y la rentabilidad de cada cuenta', a: 'visibilidad', r: 'Un tablero de horas y rentabilidad por cliente' },
        { t: 'Cada propuesta o brief empieza desde cero', a: 'equipo', r: 'Plantillas y propuestas preparadas con IA' }
      ] },
      { key: 'profesionales', label: 'Servicios profesionales', signals: [
        { t: 'Le pedimos los mismos documentos a los clientes varias veces', a: 'seguimiento', r: 'Solicitud y recordatorio automático de documentos' },
        { t: 'Sacamos datos de formularios, facturas o PDFs a mano', a: 'operacion', r: 'Extracción automática de datos de documentos' },
        { t: 'Coordinar una cita toma muchos mensajes de ida y vuelta', a: 'operacion', r: 'Agenda en línea con confirmaciones y recordatorios' },
        { t: 'Las renovaciones y fechas límite dependen de la memoria de alguien', a: 'seguimiento', r: 'Alertas automáticas de vencimientos y renovaciones' },
        { t: 'Las preguntas básicas de los clientes interrumpen el trabajo del día', a: 'atencion', r: 'Un asistente que conteste las preguntas frecuentes' },
        { t: 'No sabemos en qué etapa está cada caso o expediente', a: 'visibilidad', r: 'Un tablero con el estado de cada caso' }
      ] },
      { key: 'salud', label: 'Salud o clínica', signals: [
        { t: 'Muchos pacientes no llegan a sus citas', a: 'seguimiento', r: 'Recordatorios automáticos de citas por texto o correo' },
        { t: 'El teléfono no para con preguntas de horario, planes médicos y precios', a: 'atencion', r: 'Un asistente para las preguntas frecuentes' },
        { t: 'Los formularios de pacientes se llenan en papel y luego se transcriben', a: 'operacion', r: 'Formularios digitales que el paciente llena antes de la cita' },
        { t: 'Confirmar o reprogramar citas por teléfono consume horas', a: 'operacion', r: 'Confirmación y reprogramación de citas en línea' },
        { t: 'Las facturas o reclamaciones pendientes no se ven a tiempo', a: 'visibilidad', r: 'Un tablero de facturación y reclamaciones pendientes' },
        { t: 'Damos poco seguimiento a los pacientes después de la visita', a: 'seguimiento', r: 'Mensajes de seguimiento después de la visita' }
      ] },
      { key: 'distribucion', label: 'Distribución o manufactura', signals: [
        { t: 'Hacemos estimados y POs, pero no vemos el estado de cada orden', a: 'visibilidad', r: 'Un tablero de órdenes conectado a tu sistema contable' },
        { t: 'Los estimados se quedan esperando aprobación y hay que perseguir al cliente', a: 'seguimiento', r: 'Recordatorios automáticos para aprobar estimados' },
        { t: 'Los clientes preguntan por dónde viene su pedido', a: 'atencion', r: 'Números de rastreo automáticos y avisos al cliente' },
        { t: 'Los vendedores no tienen claro qué les toca cada día', a: 'seguimiento', r: 'Un correo diario con los pendientes de cada vendedor' },
        { t: 'Las entradas de mercancía y las entregas se llevan a mano', a: 'operacion', r: 'Un calendario automático de entradas y entregas' },
        { t: 'Pasamos la misma información de QuickBooks a hojas de cálculo', a: 'operacion', r: 'Sincronización automática con QuickBooks' }
      ] },
      { key: 'construccion', label: 'Construcción o servicios', signals: [
        { t: 'Los estimados se preparan a mano y tardan días', a: 'operacion', r: 'Estimados más rápidos con plantillas e IA' },
        { t: 'Los clientes preguntan cuándo llega el técnico o cómo va su proyecto', a: 'atencion', r: 'Avisos automáticos de citas y avance del proyecto' },
        { t: 'Coordinar cuadrillas y citas se hace con llamadas y chats', a: 'operacion', r: 'Un calendario de cuadrillas con avisos automáticos' },
        { t: 'Las fotos, notas y formularios del campo se pierden o llegan tarde', a: 'operacion', r: 'Formularios del campo que llegan directo a la oficina' },
        { t: 'Las facturas salen tarde o nadie le da seguimiento al cobro', a: 'seguimiento', r: 'Facturación y recordatorios de cobro automáticos' },
        { t: 'No vemos el estado ni la ganancia de cada proyecto', a: 'visibilidad', r: 'Un tablero de proyectos con costos y avance' }
      ] },
      { key: 'educacion', label: 'Educación o educación virtual', signals: [
        { t: 'Contestamos una y otra vez las mismas preguntas sobre matrícula, horarios y costos', a: 'atencion', r: 'Un asistente que conteste las preguntas de matrícula, horarios y costos' },
        { t: 'La matrícula y los documentos se manejan a mano o por correo', a: 'operacion', r: 'Matrícula en línea con recordatorios de documentos pendientes' },
        { t: 'Perdemos interesados que preguntan pero no terminan de matricularse', a: 'seguimiento', r: 'Seguimiento automático a interesados hasta completar la matrícula' },
        { t: 'Los recordatorios de pagos, clases y fechas de entrega se envían uno por uno', a: 'seguimiento', r: 'Recordatorios automáticos de pagos, clases y fechas de entrega' },
        { t: 'No vemos en un solo lugar la asistencia, el progreso ni quién está por abandonar un curso', a: 'visibilidad', r: 'Un tablero de asistencia y progreso con alertas tempranas' },
        { t: 'Preparar materiales, evaluaciones o contenido para cursos virtuales toma demasiado tiempo', a: 'equipo', r: 'Materiales y evaluaciones preparados con IA y revisados por el equipo docente' }
      ] },
      { key: 'general', label: 'Otro tipo de negocio', signals: [
        { t: 'Damos seguimiento a clientes a mano, uno por uno', a: 'seguimiento', r: 'Seguimiento automático a clientes con recordatorios' },
        { t: 'No sabemos qué órdenes o estimados siguen pendientes', a: 'visibilidad', r: 'Un tablero con todo lo pendiente en un solo lugar' },
        { t: 'Los clientes llaman para preguntar el estado de su pedido o servicio', a: 'atencion', r: 'Avisos automáticos de estado a tus clientes' },
        { t: 'Copiamos la misma información entre sistemas y hojas de cálculo', a: 'operacion', r: 'Conectar tus sistemas para no copiar datos a mano' },
        { t: 'El equipo usa IA poco o sin un método claro', a: 'equipo', r: 'Capacitación práctica en IA para tu equipo' },
        { t: 'Los vendedores pasan más tiempo dando seguimiento que buscando clientes', a: 'seguimiento', r: 'Automatizar el seguimiento de ventas' }
      ] }
    ]
  },
  en: {
    count: '{n} of {t} signs',
    recsTitle: 'What I would automate first',
    prefillBiz: 'Type of business',
    prefillSignals: 'Sounds like us',
    bands: {
      none: { title: 'Check the signs you recognize', text: 'The result updates as you check.' },
      low: { title: 'There’s a clear opportunity', text: 'Automating just one process would already make a difference.' },
      mid: { title: 'Your team is losing hours every week', text: 'A small pilot can give them that time back in a few weeks.' },
      high: { title: 'It’s time to automate', text: 'Your operation leans too hard on manual work. Let’s talk.' }
    },
    industries: [
      { key: 'restaurante', label: 'Restaurant', signals: [
        { t: 'We answer the same questions over and over: hours, menu, reservations', a: 'atencion', r: 'An assistant that answers FAQs on WhatsApp, social or your website' },
        { t: 'Reservations and orders come in through several channels and some slip through', a: 'operacion', r: 'Reservations and orders in one place' },
        { t: 'Inventory and supplier orders are done by eye or on paper', a: 'operacion', r: 'Low-stock alerts and supplier orders' },
        { t: 'Staff schedules are pieced together by hand every week', a: 'operacion', r: 'Staff shifts with automatic notices' },
        { t: 'We’re not sure which dishes make the most money or how daily sales are going', a: 'visibilidad', r: 'A dashboard of sales, costs and most profitable dishes' },
        { t: 'We rarely ask for reviews or reach back out to customers', a: 'seguimiento', r: 'Automatic messages that ask for reviews and bring customers back' }
      ] },
      { key: 'tienda', label: 'Retail or e-commerce', signals: [
        { t: 'Customers ask about prices, stock or shipping and we’re slow to reply', a: 'atencion', r: 'An assistant that answers product and shipping questions' },
        { t: 'Store inventory and website inventory don’t match', a: 'operacion', r: 'Inventory synced across store, website and social' },
        { t: 'Uploading products, photos and descriptions takes hours', a: 'equipo', r: 'AI-written product descriptions and faster uploads' },
        { t: 'Abandoned carts, or customers who buy once and never come back', a: 'seguimiento', r: 'Automatic abandoned-cart and repeat-purchase emails' },
        { t: 'Customers write in to ask where their order is', a: 'atencion', r: 'Automatic notices with the tracking number' },
        { t: 'We don’t really know what sells best or when to restock', a: 'visibilidad', r: 'A sales dashboard with restock alerts' }
      ] },
      { key: 'mercadeo', label: 'Marketing agency', signals: [
        { t: 'Putting together each client’s report takes days every month', a: 'visibilidad', r: 'Client reports that build themselves' },
        { t: 'Drafting content and copy eats up too much time', a: 'equipo', r: 'An AI content workflow with human review' },
        { t: 'Client approvals get lost between emails and chats', a: 'seguimiento', r: 'Approvals with automatic reminders' },
        { t: 'Campaign leads land in different places and nobody answers fast', a: 'seguimiento', r: 'Centralized leads with an instant reply' },
        { t: 'We can’t see hours and profitability per account in one place', a: 'visibilidad', r: 'A dashboard of hours and profitability per client' },
        { t: 'Every proposal or brief starts from scratch', a: 'equipo', r: 'Templates and proposals drafted with AI' }
      ] },
      { key: 'profesionales', label: 'Professional services', signals: [
        { t: 'We ask clients for the same documents several times', a: 'seguimiento', r: 'Automatic document requests and reminders' },
        { t: 'We pull data out of forms, invoices or PDFs by hand', a: 'operacion', r: 'Automatic data extraction from documents' },
        { t: 'Setting up one appointment takes a lot of back-and-forth', a: 'operacion', r: 'Online booking with confirmations and reminders' },
        { t: 'Renewals and deadlines depend on someone remembering them', a: 'seguimiento', r: 'Automatic alerts for deadlines and renewals' },
        { t: 'Basic client questions keep interrupting the workday', a: 'atencion', r: 'An assistant that answers the common questions' },
        { t: 'We don’t know what stage each case or file is in', a: 'visibilidad', r: 'A dashboard with the status of every case' }
      ] },
      { key: 'salud', label: 'Healthcare or clinic', signals: [
        { t: 'A lot of patients miss their appointments', a: 'seguimiento', r: 'Automatic appointment reminders by text or email' },
        { t: 'The phone never stops: hours, insurance and pricing questions', a: 'atencion', r: 'An assistant for the common questions' },
        { t: 'Patient forms are filled out on paper and typed in later', a: 'operacion', r: 'Digital forms patients fill out before the visit' },
        { t: 'Confirming or rescheduling appointments by phone takes hours', a: 'operacion', r: 'Online confirmation and rescheduling' },
        { t: 'Pending invoices or claims aren’t caught in time', a: 'visibilidad', r: 'A dashboard of pending billing and claims' },
        { t: 'There’s little follow-up with patients after the visit', a: 'seguimiento', r: 'Follow-up messages after each visit' }
      ] },
      { key: 'distribucion', label: 'Distribution or manufacturing', signals: [
        { t: 'We create estimates and POs but can’t see the status of each order', a: 'visibilidad', r: 'An order dashboard connected to your accounting system' },
        { t: 'Estimates sit waiting for approval and we have to chase the client', a: 'seguimiento', r: 'Automatic reminders to approve estimates' },
        { t: 'Customers ask where their shipment is', a: 'atencion', r: 'Automatic tracking numbers and customer notices' },
        { t: 'Salespeople aren’t sure what’s on their plate each day', a: 'seguimiento', r: 'A daily email with each salesperson’s pending tasks' },
        { t: 'Incoming stock and deliveries are tracked by hand', a: 'operacion', r: 'An automatic calendar of arrivals and deliveries' },
        { t: 'We copy the same QuickBooks data into spreadsheets', a: 'operacion', r: 'Automatic sync with QuickBooks' }
      ] },
      { key: 'construccion', label: 'Construction or field services', signals: [
        { t: 'Estimates are built by hand and take days', a: 'operacion', r: 'Faster estimates with templates and AI' },
        { t: 'Customers ask when the tech is coming or how their project is going', a: 'atencion', r: 'Automatic appointment and progress updates' },
        { t: 'Crews and appointments are coordinated by calls and chats', a: 'operacion', r: 'A crew calendar with automatic notices' },
        { t: 'Field photos, notes and forms get lost or arrive late', a: 'operacion', r: 'Field forms that go straight to the office' },
        { t: 'Invoices go out late or nobody follows up on payment', a: 'seguimiento', r: 'Automatic invoicing and payment reminders' },
        { t: 'We can’t see the status or profit of each project', a: 'visibilidad', r: 'A project dashboard with costs and progress' }
      ] },
      { key: 'educacion', label: 'Education or online learning', signals: [
        { t: 'We answer the same questions over and over about enrollment, schedules and tuition', a: 'atencion', r: 'An assistant that answers enrollment, schedule and tuition questions' },
        { t: 'Enrollment and paperwork are handled by hand or over email', a: 'operacion', r: 'Online enrollment with reminders for missing documents' },
        { t: 'We lose prospects who ask about a program but never finish enrolling', a: 'seguimiento', r: 'Automatic follow-up with prospects until they finish enrolling' },
        { t: 'Payment, class and deadline reminders are sent one by one', a: 'seguimiento', r: 'Automatic reminders for payments, classes and deadlines' },
        { t: 'We can’t see attendance, progress or who is about to drop a course in one place', a: 'visibilidad', r: 'An attendance and progress dashboard with early alerts' },
        { t: 'Preparing materials, assessments or content for online courses takes too long', a: 'equipo', r: 'Materials and assessments drafted with AI and reviewed by your teaching team' }
      ] },
      { key: 'general', label: 'Other business', signals: [
        { t: 'We follow up with clients by hand, one by one', a: 'seguimiento', r: 'Automatic client follow-up with reminders' },
        { t: 'We don’t know which orders or estimates are still pending', a: 'visibilidad', r: 'A dashboard with everything pending in one place' },
        { t: 'Clients call to ask about the status of their order or service', a: 'atencion', r: 'Automatic status updates for your clients' },
        { t: 'We copy the same information between systems and spreadsheets', a: 'operacion', r: 'Connecting your systems so nobody copies data by hand' },
        { t: 'The team barely uses AI, or uses it without a clear method', a: 'equipo', r: 'Hands-on AI training for your team' },
        { t: 'Salespeople spend more time following up than finding new clients', a: 'seguimiento', r: 'Automated sales follow-up' }
      ] }
    ]
  }
};
