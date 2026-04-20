/**
 * Fallback content for /sectores/[slug] template.
 *
 * Used when WordPress ACF fields are empty (which is currently the case
 * for all 19 sectors). The template falls back to this map keyed by slug.
 *
 * When WP dev populates ACF fields, the template automatically uses ACF
 * data instead of this fallback (fallback chain in dynamic-sector-client).
 */

export interface SectorProblem {
  titulo: string
  descripcion: string
  icono: string // lucide icon name (e.g., "Clock", "AlertTriangle")
}

export interface SectorSolution {
  titulo: string
  descripcion: string
  metrica: string // e.g., "+47% reservas", "-60% tiempo"
  icono: string
}

export interface SectorUseCase {
  titulo: string
  descripcion: string
  mockupSlug: string // maps to SolutionMockup slug
}

export interface SectorFaqItem {
  pregunta: string
  respuesta: string
}

export interface SectorFallback {
  heroImage: string // "/images/sectors/{slug}.jpg" or generic
  heroIcon: string // lucide icon name for hero badge
  problems: SectorProblem[]
  solutions: SectorSolution[]
  useCases: SectorUseCase[]
  integrations: string[] // partner slugs from /public/images/partners/
  faq: SectorFaqItem[]
}

// Shared default integrations — most sectors use AI + voice + CRM + calendar
const DEFAULT_INTEGRATIONS = [
  "openai",
  "anthropic",
  "twilio",
  "google-cloud",
  "salesforce",
  "openclaw",
]

// ─── GENERIC FALLBACK (used when slug not mapped) ──────────────────
export const genericFallback: SectorFallback = {
  heroImage: "/images/sectors/concesionarios.jpg", // neutral photo
  heroIcon: "Building2",
  problems: [
    {
      titulo: "Llamadas perdidas y respuestas tardías",
      descripcion:
        "Los clientes esperan respuesta inmediata. Cada llamada perdida es una oportunidad perdida.",
      icono: "Clock",
    },
    {
      titulo: "Equipo saturado con tareas repetitivas",
      descripcion:
        "Tu equipo dedica horas a responder preguntas frecuentes en lugar de cerrar ventas o atender casos complejos.",
      icono: "Users",
    },
    {
      titulo: "Imposibilidad de escalar sin contratar",
      descripcion:
        "Crecer significa más personal, más costes y más gestión. La IA permite escalar sin este peso.",
      icono: "TrendingUp",
    },
  ],
  solutions: [
    {
      titulo: "Atención 24/7 con voz humana",
      descripcion:
        "Agentes IA que atienden llamadas con voz indistinguible de una persona real, sin horarios.",
      metrica: "+89% disponibilidad",
      icono: "Phone",
    },
    {
      titulo: "Cualificación automática",
      descripcion:
        "Cada conversación captura datos, evalúa interés y enruta al equipo correcto sin intervención.",
      metrica: "+47% leads cualificados",
      icono: "Target",
    },
    {
      titulo: "Integración con tus sistemas",
      descripcion:
        "WhatsApp, CRM, calendario y email conectados. Los datos fluyen sin trabajo manual.",
      metrica: "-60% tiempo admin",
      icono: "Zap",
    },
    {
      titulo: "Escalada inteligente",
      descripcion:
        "La IA resuelve lo repetitivo; tu equipo se enfoca en lo estratégico cuando hace falta escalar.",
      metrica: "3x más capacidad",
      icono: "TrendingUp",
    },
  ],
  useCases: [
    {
      titulo: "Atención al cliente omnicanal",
      descripcion: "WhatsApp, teléfono, chat web y email en una sola bandeja gestionada por IA.",
      mockupSlug: "ia-omnicanal",
    },
    {
      titulo: "Agendamiento automático",
      descripcion: "Reservas y citas confirmadas por IA 24/7 integrando tu calendario.",
      mockupSlug: "agente-agendamientos-ia",
    },
    {
      titulo: "Cualificación de leads",
      descripcion: "Agente IA que captura, cualifica y entrega al equipo comercial.",
      mockupSlug: "lead-generation-ia",
    },
  ],
  integrations: DEFAULT_INTEGRATIONS,
  faq: [
    {
      pregunta: "¿En cuánto tiempo podemos estar operativos?",
      respuesta:
        "Implementamos en 2-6 semanas dependiendo de la complejidad. Nos encargamos de la configuración, integración con tus sistemas y entrenamiento del agente IA con tu información.",
    },
    {
      pregunta: "¿Necesito equipo técnico para mantener el servicio?",
      respuesta:
        "No. Es un servicio 100% gestionado. Nosotros configuramos, optimizamos y mantenemos todo. Tú solo recibes los resultados.",
    },
    {
      pregunta: "¿La IA reemplaza a mi equipo?",
      respuesta:
        "No. La IA se encarga de tareas repetitivas y llamadas fuera de horario. Tu equipo se enfoca en casos complejos y relaciones de mayor valor.",
    },
    {
      pregunta: "¿Y si el cliente detecta que es una IA?",
      respuesta:
        "Nuestra tecnología de voz humana HD es indistinguible de una persona real. En pruebas A/B, más del 95% de los usuarios no detecta diferencia.",
    },
    {
      pregunta: "¿Cumple con RGPD?",
      respuesta:
        "Sí. Infraestructura 100% en la UE, datos encriptados, sin envío a terceros. Cumplimos RGPD y podemos firmar DPAs.",
    },
  ],
}

// ─── SECTOR-SPECIFIC CONTENT ────────────────────────────────────────
export const sectorFallbacks: Record<string, SectorFallback> = {
  clinicas: {
    heroImage: "/images/sectors/clinicas.jpg",
    heroIcon: "Stethoscope",
    problems: [
      {
        titulo: "Llamadas perdidas de pacientes",
        descripcion:
          "Cada llamada perdida fuera de horario es una consulta menos. Los pacientes llaman a otra clínica.",
        icono: "PhoneOff",
      },
      {
        titulo: "Recepción saturada con gestión de citas",
        descripcion:
          "Confirmaciones, cancelaciones, reprogramaciones — el equipo pasa horas al teléfono en vez de atender pacientes en sala.",
        icono: "Users",
      },
      {
        titulo: "Pacientes no confirmados y absentismo",
        descripcion:
          "Un 20-30% de citas no se confirman. Cada hueco vacío es tiempo médico perdido y facturación cero.",
        icono: "CalendarX",
      },
    ],
    solutions: [
      {
        titulo: "Atención telefónica 24/7",
        descripcion:
          "Agente IA con voz humana atiende, clasifica urgencias y agenda citas fuera de horario y fines de semana.",
        metrica: "+40% citas agendadas",
        icono: "Phone",
      },
      {
        titulo: "Recordatorios automáticos por WhatsApp",
        descripcion:
          "Envío de recordatorios 24h y 2h antes con confirmación en un click. Reprogramación automática.",
        metrica: "-65% absentismo",
        icono: "MessageSquare",
      },
      {
        titulo: "Integración con Doctoralia y software clínico",
        descripcion:
          "Conectamos con tu software (Doctoralia, Clinicsoft, OrtoTrack) para agenda y historial sin entrada manual.",
        metrica: "Sin duplicación",
        icono: "Link2",
      },
      {
        titulo: "Triaje inteligente de síntomas",
        descripcion:
          "La IA recoge síntomas, clasifica urgencia y enruta al profesional correcto. Cumple protocolos médicos.",
        metrica: "+3x eficiencia",
        icono: "Brain",
      },
    ],
    useCases: [
      {
        titulo: "Agenda telefónica automática",
        descripcion:
          "Paciente llama, agente IA pregunta motivo, verifica disponibilidad y confirma cita — todo por voz.",
        mockupSlug: "atencion-telefonica-ia",
      },
      {
        titulo: "Recordatorios y confirmaciones",
        descripcion:
          "WhatsApp automático 24h antes. Paciente confirma o reprograma con un click.",
        mockupSlug: "agente-agendamientos-ia",
      },
      {
        titulo: "Primera consulta y triaje",
        descripcion:
          "Recogida de motivo de consulta, historial y síntomas antes de la visita presencial.",
        mockupSlug: "agente-soporte-ia",
      },
    ],
    integrations: ["openai", "twilio", "google-cloud", "salesforce", "openclaw", "anthropic"],
    faq: [
      {
        pregunta: "¿La IA puede gestionar información médica sensible?",
        respuesta:
          "Sí, cumplimos RGPD y normativa sanitaria europea. Los datos se cifran en tránsito y en reposo. No se comparten con terceros y se alojan en servidores UE.",
      },
      {
        pregunta: "¿Se integra con mi software clínico actual?",
        respuesta:
          "Sí. Integraciones nativas con Doctoralia, Clinicsoft, Ortotrack, Dentalink y otros. Para software menos común, creamos integración personalizada.",
      },
      {
        pregunta: "¿Puede gestionar urgencias?",
        respuesta:
          "La IA hace triaje según protocolos que definimos contigo. En casos urgentes, escala inmediatamente a tu equipo o redirige a servicios de emergencia.",
      },
      {
        pregunta: "¿Cuánto reduce el absentismo de citas?",
        respuesta:
          "Clientes han reportado reducciones del 45-70% en ausencias. La clave son los recordatorios automáticos por WhatsApp con confirmación en un click.",
      },
      {
        pregunta: "¿Necesito cambiar mi centralita actual?",
        respuesta:
          "No. Integramos nuestro agente IA con tu centralita existente (Avaya, 3CX, VoIP). Puede atender llamadas desbordadas o todas, según prefieras.",
      },
    ],
  },

  concesionarios: {
    heroImage: "/images/sectors/concesionarios.jpg",
    heroIcon: "Car",
    problems: [
      {
        titulo: "Leads de anuncios que nunca se contactan",
        descripcion:
          "Cada minuto sin respuesta reduce la probabilidad de venta un 10%. Y los comerciales no pueden estar 24/7.",
        icono: "Clock",
      },
      {
        titulo: "Agendar test drives es un embudo con fricción",
        descripcion:
          "Llamadas, mensajes y confirmaciones para cada test drive. Los compradores desisten antes de venir.",
        icono: "CalendarX",
      },
      {
        titulo: "Posventa descuidada, clientes se van a otro taller",
        descripcion:
          "Sin seguimiento proactivo (ITV, revisiones, neumáticos), los clientes pierden relación con la marca.",
        icono: "TrendingDown",
      },
    ],
    solutions: [
      {
        titulo: "Cualificación IA de leads en segundos",
        descripcion:
          "Llamada automática o WhatsApp al lead en <1min tras rellenar el formulario. Cualifica y agenda test drive.",
        metrica: "+3x contactos efectivos",
        icono: "Zap",
      },
      {
        titulo: "Test drives agendados por IA",
        descripcion:
          "Agente IA cierra horario con el cliente, envía ubicación y recordatorio. Sin intervención humana.",
        metrica: "+60% asistencia",
        icono: "Calendar",
      },
      {
        titulo: "Posventa automatizada",
        descripcion:
          "Recordatorios de ITV, revisiones y mantenimiento por WhatsApp. Venta de servicio adicional automática.",
        metrica: "+30% ingresos posventa",
        icono: "Wrench",
      },
      {
        titulo: "Integración con tu CRM",
        descripcion:
          "Conectamos con CRM automoción (Quiter, DMS Cloud, Nacex). Los datos fluyen sin trabajo manual.",
        metrica: "CRM siempre actualizado",
        icono: "Link2",
      },
    ],
    useCases: [
      {
        titulo: "Lead de anuncio cualificado en 60s",
        descripcion:
          "Cliente rellena formulario en tu web → agente IA llama en menos de 1 minuto → cualifica interés → agenda test drive.",
        mockupSlug: "lead-generation-ia",
      },
      {
        titulo: "WhatsApp comercial 24/7",
        descripcion:
          "Consultas sobre stock, precios y financiación atendidas al instante por WhatsApp. Derivación a vendedor si cualifica.",
        mockupSlug: "whatsapp-ia-empresas",
      },
      {
        titulo: "Recordatorios posventa",
        descripcion:
          "ITV, revisiones, cambio de neumáticos. Campaña automática que genera ingresos recurrentes.",
        mockupSlug: "agente-agendamientos-ia",
      },
    ],
    integrations: ["openai", "twilio", "salesforce", "openclaw", "anthropic", "google-cloud"],
    faq: [
      {
        pregunta: "¿Se integra con mi CRM de automoción?",
        respuesta:
          "Sí. Tenemos integraciones con Quiter, DMS Cloud, Dealernet y otros CRM específicos de automoción. Para sistemas propios hacemos integración custom.",
      },
      {
        pregunta: "¿Puede cualificar presupuestos y financiación?",
        respuesta:
          "Sí. La IA puede hacer preguntas sobre entrada disponible, coche a renuevo, plazo deseado y pre-cualificar financiación antes de pasar al equipo comercial.",
      },
      {
        pregunta: "¿Funciona para marcas premium (Mercedes, BMW, Audi)?",
        respuesta:
          "Sí. Personalizamos el tono de voz y el guión para cada marca. Desde gamas generalistas a premium, ajustamos la experiencia.",
      },
      {
        pregunta: "¿Cuánto tarda en estar operativo?",
        respuesta:
          "Para un concesionario tipo, 3-4 semanas desde kick-off hasta producción. Incluye integración con tu CRM, entrenamiento del agente con tus vehículos, y configuración de WhatsApp Business.",
      },
      {
        pregunta: "¿Puede gestionar varios puntos de venta?",
        respuesta:
          "Sí. Configuramos el agente para enrutar leads al punto de venta correspondiente según geografía, marca o disponibilidad de stock.",
      },
    ],
  },

  restaurantes: {
    heroImage: "/images/sectors/restaurantes.jpg",
    heroIcon: "UtensilsCrossed",
    problems: [
      {
        titulo: "Llamadas perdidas en horas punta",
        descripcion:
          "Durante el servicio, el teléfono suena y nadie atiende. Cada llamada perdida es una reserva o pedido perdido.",
        icono: "PhoneOff",
      },
      {
        titulo: "Gestión manual de reservas y listas de espera",
        descripcion:
          "Agenda en papel, confirmaciones por teléfono, cancelaciones de última hora. Mesas vacías mientras hay gente esperando.",
        icono: "CalendarX",
      },
      {
        titulo: "Pedidos takeaway y delivery caóticos",
        descripcion:
          "WhatsApp, Glovo, Uber Eats, teléfono... distintos canales sin coordinación. Errores y retrasos en cocina.",
        icono: "AlertTriangle",
      },
    ],
    solutions: [
      {
        titulo: "Reservas automáticas 24/7",
        descripcion:
          "Agente IA atiende llamadas y WhatsApp. Gestiona disponibilidad, confirma y registra alérgenos.",
        metrica: "+47% reservas confirmadas",
        icono: "Phone",
      },
      {
        titulo: "Gestión automática de takeaway",
        descripcion:
          "Toma de pedidos por voz o WhatsApp, impresión directa en cocina, confirmación de hora al cliente.",
        metrica: "-50% errores en pedidos",
        icono: "MessageSquare",
      },
      {
        titulo: "Integración con CoverManager y TheFork",
        descripcion:
          "Sincronización en tiempo real con tu software de reservas. Sin doble gestión ni overbooking.",
        metrica: "0 overbookings",
        icono: "Link2",
      },
      {
        titulo: "Fidelización y campañas automáticas",
        descripcion:
          "Mensajes de cumpleaños, promociones puntuales y invitaciones a eventos. Todo automatizado por WhatsApp.",
        metrica: "+3x retorno clientes",
        icono: "Heart",
      },
    ],
    useCases: [
      {
        titulo: "Reservas por teléfono 24/7",
        descripcion:
          "Cliente llama fuera de horario, agente IA verifica disponibilidad y confirma reserva. Actualiza tu CoverManager.",
        mockupSlug: "atencion-telefonica-ia",
      },
      {
        titulo: "Pedidos takeaway por WhatsApp",
        descripcion:
          "Menú, pedido, método de pago y hora de recogida — todo por chat. Impresión directa en cocina.",
        mockupSlug: "whatsapp-ia-empresas",
      },
      {
        titulo: "Confirmaciones y recordatorios",
        descripcion:
          "Recordatorio automático 2h antes. Cliente confirma o cancela. Si cancela, libera mesa a lista de espera.",
        mockupSlug: "agente-agendamientos-ia",
      },
    ],
    integrations: ["openai", "twilio", "openclaw", "anthropic", "google-cloud", "salesforce"],
    faq: [
      {
        pregunta: "¿Se integra con CoverManager o TheFork?",
        respuesta:
          "Sí. Integración nativa con CoverManager, TheFork, OpenTable y Restoo. El agente IA gestiona reservas directamente en tu software habitual.",
      },
      {
        pregunta: "¿Puede gestionar alérgenos y preferencias?",
        respuesta:
          "Sí. El agente pregunta por alérgenos, número de comensales, necesidades especiales (sillas bebé, accesibilidad) y registra todo en la reserva.",
      },
      {
        pregunta: "¿Cómo gestiona picos de demanda (San Valentín, fin de año)?",
        respuesta:
          "La IA escala sin límites. En días punta, puede atender centenares de llamadas simultáneas sin colas ni esperas.",
      },
      {
        pregunta: "¿Y si tengo varios restaurantes?",
        respuesta:
          "Configuramos un agente por local o uno centralizado con enrutamiento por zona. Cada local mantiene su identidad y datos separados.",
      },
      {
        pregunta: "¿Puedo ver las conversaciones?",
        respuesta:
          "Sí. Dashboard en tiempo real con todas las conversaciones, reservas creadas, cancelaciones y métricas de rendimiento.",
      },
    ],
  },

  inmobiliarias: {
    heroImage: "/images/sectors/inmobiliarias.jpg",
    heroIcon: "Home",
    problems: [
      {
        titulo: "Leads de portales que se enfrían en minutos",
        descripcion:
          "Idealista, Fotocasa, habitaclia: el primer agente en contactar gana. Sin respuesta inmediata, el lead se pierde.",
        icono: "Clock",
      },
      {
        titulo: "Agendar visitas es fricción constante",
        descripcion:
          "Coordinar agenda del agente, disponibilidad del inmueble y del comprador. Muchos desisten antes de la visita.",
        icono: "CalendarX",
      },
      {
        titulo: "Seguimiento post-visita inconsistente",
        descripcion:
          "Tras la visita, el agente está con otro cliente. El seguimiento llega tarde o no llega, y se pierde el interés.",
        icono: "TrendingDown",
      },
    ],
    solutions: [
      {
        titulo: "Respuesta en <1 min a leads de portales",
        descripcion:
          "Webhook de Idealista/Fotocasa → llamada IA inmediata. Cualifica presupuesto, zona y urgencia antes que la competencia.",
        metrica: "+5x tasa de contacto",
        icono: "Zap",
      },
      {
        titulo: "Agendamiento de visitas automático",
        descripcion:
          "Agente IA consulta agenda del comercial, propone 2-3 opciones al cliente y confirma visita. Envía ubicación y link.",
        metrica: "+60% visitas confirmadas",
        icono: "Calendar",
      },
      {
        titulo: "Seguimiento post-visita automatizado",
        descripcion:
          "48h después de la visita, agente IA pregunta impresiones, resuelve dudas y agenda segunda visita o ofrece alternativas.",
        metrica: "+35% conversión",
        icono: "MessageSquare",
      },
      {
        titulo: "Home Staging Virtual incluido",
        descripcion:
          "Transformación de fotos vacías en espacios decorados con IA. Los anuncios destacan y se venden 30% más rápido.",
        metrica: "+30% más rápido",
        icono: "Sparkles",
      },
    ],
    useCases: [
      {
        titulo: "Lead de Idealista cualificado en segundos",
        descripcion:
          "Cliente deja datos en un anuncio → IA llama en <1min → cualifica budget, zona y timing → agenda visita.",
        mockupSlug: "lead-generation-ia",
      },
      {
        titulo: "Agenda de visitas sin fricción",
        descripcion:
          "Agente IA coordina agenda del comercial y cliente, envía recordatorio y ubicación. Sin llamadas.",
        mockupSlug: "agente-agendamientos-ia",
      },
      {
        titulo: "Follow-up post-visita inteligente",
        descripcion:
          "Tras la visita, IA pregunta por interés, objeciones y alternativas. Ajusta estrategia con el comercial.",
        mockupSlug: "agente-ventas-ia",
      },
    ],
    integrations: ["openai", "twilio", "salesforce", "openclaw", "anthropic", "google-cloud"],
    faq: [
      {
        pregunta: "¿Se integra con Idealista, Fotocasa y habitaclia?",
        respuesta:
          "Sí. Recibimos los leads vía webhook o email y activamos la llamada IA en <1 minuto. Esto multiplica por 5 la tasa de contacto efectivo.",
      },
      {
        pregunta: "¿La IA puede gestionar ofertas y negociación?",
        respuesta:
          "La IA hace precualificación de ofertas (budget, timing, forma de pago) pero derivamos la negociación al comercial humano. Es un proceso que requiere toque personal.",
      },
      {
        pregunta: "¿Funciona para alquiler o solo venta?",
        respuesta:
          "Funciona para ambos. Ajustamos las preguntas de cualificación: en alquiler (fianza, aval, duración) y venta (entrada, financiación, timing).",
      },
      {
        pregunta: "¿Qué CRMs inmobiliarios soporta?",
        respuesta:
          "Integramos con Inmoweb, Witei, Witei CRM, Netliva, Inmomake y otros. Los datos del lead entran directamente en tu CRM con todas las interacciones.",
      },
      {
        pregunta: "¿Puedo ofrecer Home Staging Virtual a mis clientes?",
        respuesta:
          "Sí. Es un complemento que puedes ofrecer como servicio añadido. Fotos profesionales transformadas por IA en espacios decorados, listos para anuncio.",
      },
    ],
  },

  ecommerce: {
    heroImage: "/images/sectors/ecommerce.jpg",
    heroIcon: "ShoppingBag",
    problems: [
      {
        titulo: "Carritos abandonados que no se recuperan",
        descripcion: "70% de los carritos se abandonan. Los emails automáticos tienen un 2-5% de recuperación.",
        icono: "TrendingDown",
      },
      {
        titulo: "Dudas de pre-venta sin respuesta",
        descripcion:
          "Talles, stock, envíos, devoluciones. Cada duda sin responder es una venta menos. El chat humano no está 24/7.",
        icono: "HelpCircle",
      },
      {
        titulo: "Post-venta y devoluciones consumen soporte",
        descripcion:
          "Tracking, cambios, devoluciones. El equipo de soporte gasta horas en consultas repetitivas.",
        icono: "Users",
      },
    ],
    solutions: [
      {
        titulo: "Recuperación de carritos por WhatsApp",
        descripcion:
          "Detectamos carritos abandonados y enviamos WhatsApp personalizado con producto, descuento y link de recuperación.",
        metrica: "+22% recuperación",
        icono: "ShoppingCart",
      },
      {
        titulo: "Asistente de compra inteligente",
        descripcion:
          "Chat web y WhatsApp con IA que recomienda productos, compara y resuelve dudas. Integrado con tu catálogo.",
        metrica: "+18% conversión",
        icono: "MessageSquare",
      },
      {
        titulo: "Soporte post-venta automatizado",
        descripcion:
          "Tracking de pedido, cambios, devoluciones y preguntas frecuentes — resueltas 24/7 sin agente humano.",
        metrica: "-70% tickets soporte",
        icono: "Package",
      },
      {
        titulo: "Integración con Shopify, WooCommerce, Prestashop",
        descripcion:
          "Sincronización en tiempo real de catálogo, stock y pedidos. La IA siempre tiene información actualizada.",
        metrica: "Stock siempre al día",
        icono: "Link2",
      },
    ],
    useCases: [
      {
        titulo: "Recuperación de carrito abandonado",
        descripcion:
          "Cliente abandona carrito → 30min después, WhatsApp personalizado con descuento → 22% recuperan y compran.",
        mockupSlug: "whatsapp-ia-empresas",
      },
      {
        titulo: "Asistente de compra 24/7",
        descripcion:
          "Cliente pregunta '¿Talla 40 en rojo?' → IA verifica stock → recomienda alternativas → cierra venta.",
        mockupSlug: "agente-chat-productos-ia",
      },
      {
        titulo: "Post-venta automatizada",
        descripcion:
          "Tracking, cambios de talla, devoluciones — todo resuelto por IA integrada con tu sistema de envíos.",
        mockupSlug: "agente-soporte-ia",
      },
    ],
    integrations: ["openai", "twilio", "openclaw", "salesforce", "anthropic", "google-cloud"],
    faq: [
      {
        pregunta: "¿Se integra con Shopify/WooCommerce/Prestashop?",
        respuesta:
          "Sí, con apps nativas o vía API. Sincronizamos catálogo, stock, pedidos y clientes en tiempo real. Para plataformas custom hacemos integración específica.",
      },
      {
        pregunta: "¿Puede recomendar productos como un vendedor?",
        respuesta:
          "Sí. La IA entiende talles, colores, preferencias y puede cross-sell (complementos) y up-sell (versiones superiores) según perfil del cliente.",
      },
      {
        pregunta: "¿Cómo gestiona disputas y devoluciones?",
        respuesta:
          "La IA procesa devoluciones estándar automáticamente (generar etiqueta, cambiar pedido). Casos complejos se escalan al equipo humano con todo el contexto.",
      },
      {
        pregunta: "¿Puede hacer campañas de WhatsApp masivas?",
        respuesta:
          "Sí. Puedes crear campañas segmentadas (clientes inactivos, compradores recientes, VIPs) con mensajes personalizados. Cumplimos WhatsApp Business Policy.",
      },
      {
        pregunta: "¿Qué idiomas soporta?",
        respuesta:
          "La IA detecta el idioma del cliente y responde automáticamente. Soporta ES, EN, PT, FR, DE, IT y más de 30 idiomas.",
      },
    ],
  },

  "turismo-hoteleria": {
    heroImage: "/images/sectors/turismo.jpg",
    heroIcon: "Hotel",
    problems: [
      {
        titulo: "Reservas perdidas por idioma",
        descripcion:
          "Huéspedes extranjeros llaman o escriben en inglés, francés, alemán. Sin recepción multi-idioma 24/7, se pierden reservas.",
        icono: "Globe",
      },
      {
        titulo: "Recepción saturada en check-in y check-out",
        descripcion:
          "Consultas repetitivas (wifi, parking, desayuno) mientras intentas atender al cliente en mostrador. Fricción y malas reseñas.",
        icono: "Users",
      },
      {
        titulo: "Upselling manual no escala",
        descripcion:
          "Ofrecer late check-out, spa, excursiones... requiere contacto proactivo. Sin tiempo, se deja dinero sobre la mesa.",
        icono: "TrendingDown",
      },
    ],
    solutions: [
      {
        titulo: "Reservas multi-idioma 24/7",
        descripcion:
          "Agente IA atiende en ES, EN, FR, DE, IT, PT. Verifica disponibilidad, precio y cierra reserva directamente con tu PMS.",
        metrica: "+40% reservas directas",
        icono: "Phone",
      },
      {
        titulo: "Conserjería virtual por WhatsApp",
        descripcion:
          "Huéspedes preguntan wifi, horarios, transfer, spa. IA responde al instante 24/7 sin ocupar recepción.",
        metrica: "-80% consultas en mostrador",
        icono: "MessageSquare",
      },
      {
        titulo: "Upselling automático personalizado",
        descripcion:
          "Día antes del check-in, WhatsApp proactivo ofrece early check-in, desayuno premium, spa. Según perfil del huésped.",
        metrica: "+25% revenue extra",
        icono: "TrendingUp",
      },
      {
        titulo: "Integración con Cloudbeds, SiteMinder y Mews",
        descripcion:
          "Sincronización con tu PMS / Channel Manager. Las reservas y cambios se reflejan en tiempo real.",
        metrica: "0 overbookings",
        icono: "Link2",
      },
    ],
    useCases: [
      {
        titulo: "Reserva en inglés a las 3am",
        descripcion:
          "Huésped llama desde Alemania a las 3am → IA atiende en alemán → verifica disponibilidad → cierra reserva en tu PMS.",
        mockupSlug: "atencion-telefonica-ia",
      },
      {
        titulo: "Conserjería WhatsApp 24/7",
        descripcion:
          "Huésped pregunta por wifi, transfer aeropuerto, horarios spa → IA responde al instante en su idioma.",
        mockupSlug: "whatsapp-ia-empresas",
      },
      {
        titulo: "Upselling pre-check-in",
        descripcion:
          "24h antes del check-in, WhatsApp personalizado ofrece upgrade, late check-out y servicios extras.",
        mockupSlug: "agente-ventas-ia",
      },
    ],
    integrations: ["openai", "twilio", "openclaw", "google-cloud", "anthropic", "salesforce"],
    faq: [
      {
        pregunta: "¿Qué idiomas soporta?",
        respuesta:
          "ES, EN, FR, DE, IT, PT como idiomas principales. Soporta 30+ idiomas adicionales. La IA detecta el idioma del huésped automáticamente.",
      },
      {
        pregunta: "¿Se integra con mi PMS (Cloudbeds, SiteMinder, Mews)?",
        respuesta:
          "Sí. Integraciones nativas con los PMS y Channel Managers más populares. Sincronización en tiempo real de disponibilidad y tarifas.",
      },
      {
        pregunta: "¿Puede hacer upsell sin ser intrusivo?",
        respuesta:
          "Sí. Configuramos reglas: solo ofrece upgrades si hay disponibilidad, solo propone servicios relevantes al perfil (familias, business, luxury).",
      },
      {
        pregunta: "¿Cómo gestiona quejas y problemas en estancia?",
        respuesta:
          "La IA recoge la queja, prioriza según gravedad y escala al equipo correcto (housekeeping, mantenimiento, recepción). Con seguimiento automático.",
      },
      {
        pregunta: "¿Funciona para hoteles pequeños y grandes cadenas?",
        respuesta:
          "Sí. Desde B&Bs con 10 habitaciones hasta cadenas con 50+ hoteles. Configuramos por propiedad o centralizado con enrutamiento.",
      },
    ],
  },

  educacion: {
    heroImage: "/images/sectors/educacion.jpg",
    heroIcon: "GraduationCap",
    problems: [
      {
        titulo: "Consultas de padres en horario lectivo",
        descripcion:
          "Preguntas sobre matrícula, horarios, actividades — durante clase. El equipo administrativo está saturado.",
        icono: "Users",
      },
      {
        titulo: "Matrículas con mucha fricción",
        descripcion:
          "Familias llaman, piden información, luego no reciben seguimiento. Muchos desisten antes de completar la matrícula.",
        icono: "FileText",
      },
      {
        titulo: "Comunicación fragmentada con familias",
        descripcion:
          "Circulares por email, recordatorios por WhatsApp, noticias en la web. Sin canal único, los mensajes se pierden.",
        icono: "AlertTriangle",
      },
    ],
    solutions: [
      {
        titulo: "Información y matrícula 24/7",
        descripcion:
          "Familias preguntan por plazos, plazas, niveles, precio — IA responde al instante por WhatsApp o chat web.",
        metrica: "+40% matrículas",
        icono: "MessageSquare",
      },
      {
        titulo: "Seguimiento de leads familiares",
        descripcion:
          "Tras la primera consulta, seguimiento automático con información, visita al centro y matriculación.",
        metrica: "+55% tasa de cierre",
        icono: "Target",
      },
      {
        titulo: "Comunicación proactiva con familias",
        descripcion:
          "Recordatorios de reuniones, pagos, actividades extraescolares. Todo por WhatsApp, con confirmación.",
        metrica: "-60% llamadas administrativas",
        icono: "Phone",
      },
      {
        titulo: "Integración con software educativo",
        descripcion:
          "Conexión con Alexia, Educamos, Clickedu y otros. Sincronización de matrículas, horarios y pagos.",
        metrica: "Sin entrada manual",
        icono: "Link2",
      },
    ],
    useCases: [
      {
        titulo: "Información de matrícula 24/7",
        descripcion:
          "Padres preguntan por plazos, precios, nivel → IA responde con información personalizada y agenda visita.",
        mockupSlug: "whatsapp-ia-empresas",
      },
      {
        titulo: "Seguimiento a familias interesadas",
        descripcion:
          "Tras primera visita, IA hace seguimiento: dudas, matriculación, documentación — sin olvidar a nadie.",
        mockupSlug: "agente-ventas-ia",
      },
      {
        titulo: "Comunicación automática con familias",
        descripcion:
          "Recordatorios de reuniones, pagos, eventos. Con confirmación de lectura y respuesta gestionada por IA.",
        mockupSlug: "agente-agendamientos-ia",
      },
    ],
    integrations: ["openai", "twilio", "google-cloud", "anthropic", "openclaw", "salesforce"],
    faq: [
      {
        pregunta: "¿Se integra con software educativo (Alexia, Educamos)?",
        respuesta:
          "Sí. Integraciones nativas con los principales sistemas (Alexia, Educamos, Clickedu, Aula). Para otros hacemos integración personalizada.",
      },
      {
        pregunta: "¿Cumple con normativa de protección de menores?",
        respuesta:
          "Sí. RGPD y normativa específica de datos de menores. Servidores UE, cifrado, sin compartir datos con terceros.",
      },
      {
        pregunta: "¿Puede gestionar varios idiomas para colegios internacionales?",
        respuesta:
          "Sí. La IA responde en ES, EN, CAT, EUS, GAL y más de 30 idiomas automáticamente según el idioma del padre/madre.",
      },
      {
        pregunta: "¿Funciona para academias de idiomas, no solo colegios?",
        respuesta:
          "Sí. Ajustamos el flujo: academias de idiomas, autoescuelas, academias de música/deporte, formación profesional. Todas se benefician.",
      },
      {
        pregunta: "¿Cuánto reduce las llamadas administrativas?",
        respuesta:
          "Clientes reportan reducciones del 50-70% en llamadas repetitivas. El equipo administrativo se enfoca en gestión de calidad, no en atender consultas básicas.",
      },
    ],
  },

  // ─── Remaining sectors use genericFallback variations ──
  // These sectors have ACF support ready but fall back to generic
  // until user provides specific content to curate.
  "servicios-tecnicos": {
    ...genericFallback,
    heroImage: "/images/sectors/servicios-locales.jpg",
    heroIcon: "Wrench",
  },
  logistica: {
    ...genericFallback,
    heroIcon: "Warehouse",
  },
  retail: {
    ...genericFallback,
    heroIcon: "ShoppingBag",
  },
  oficinas: {
    ...genericFallback,
    heroIcon: "Briefcase",
  },
  "centros-belleza": {
    ...genericFallback,
    heroIcon: "Scissors",
  },
  gimnasios: {
    ...genericFallback,
    heroIcon: "Dumbbell",
  },
  "despachos-abogados": {
    ...genericFallback,
    heroImage: "/images/sectors/despachos-abogados.jpg",
    heroIcon: "Scale",
  },
  "clubs-deportivos": {
    ...genericFallback,
    heroImage: "/images/sectors/clubs-deportivos.jpg",
    heroIcon: "Trophy",
  },
  "saas-startups": {
    ...genericFallback,
    heroIcon: "Rocket",
  },
  "crm-automation": {
    ...genericFallback,
    heroIcon: "Database",
  },
  "lead-generation-pymes": {
    ...genericFallback,
    heroIcon: "Target",
  },
  "home-staging-virtual": {
    ...genericFallback,
    heroIcon: "Home",
  },
}

// Locale-override maps. The override files only type-import from here
// (erased at compile time), so there's no runtime circular import.
import { sectorFallbacksEn } from "./sector-fallback-content-en"
import { sectorFallbacksPt } from "./sector-fallback-content-pt"

/**
 * Get fallback content for a sector slug + locale.
 *
 * Lookup order (locale override → ES master → generic):
 *   1. `locale === "en"` → `sectorFallbacksEn[slug]` if present
 *   2. `locale === "pt"` → `sectorFallbacksPt[slug]` if present
 *   3. `sectorFallbacks[slug]` (ES master — mapped sector content)
 *   4. `genericFallback` (catch-all when slug is unknown)
 *
 * Until PR #89 / #90 populate the EN and PT override maps, every locale
 * falls back to ES content — same behaviour as before this refactor.
 */
export function getSectorFallback(
  slug: string,
  locale: string = "es",
): SectorFallback {
  if (locale === "en") {
    const override = sectorFallbacksEn[slug]
    if (override) return override
  } else if (locale === "pt") {
    const override = sectorFallbacksPt[slug]
    if (override) return override
  }
  return sectorFallbacks[slug] ?? genericFallback
}
