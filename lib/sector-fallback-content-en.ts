/**
 * English locale overrides for the /sectores/[slug] fallback content.
 *
 * Structure mirrors `sector-fallback-content.ts` exactly — same keys,
 * same arrays, same order — just translated to EN. When a slug is
 * missing from this map, `getSectorFallback(slug, "en")` falls back
 * to the ES master content.
 *
 * Populated in PR #89 with:
 *   - genericFallbackEn (for the 12 sectors that spread it in the ES master)
 *   - 7 fully-curated sectors (clinicas, concesionarios, restaurantes,
 *     inmobiliarias, ecommerce, turismo-hoteleria, educacion)
 *   - 12 spread-from-generic variants matching the ES master pattern
 *     (servicios-tecnicos, logistica, retail, oficinas, centros-belleza,
 *     gimnasios, despachos-abogados, clubs-deportivos, saas-startups,
 *     crm-automation, lead-generation-pymes, home-staging-virtual)
 *
 * Local-market references (ES-specific tools like Doctoralia,
 * CoverManager/TheFork, Idealista/Fotocasa, ITV, Alexia/Educamos) are
 * replaced with UK/international equivalents. Partner slugs in
 * `integrations` and cross-sell `mockupSlug` keep the ES master value.
 */

import type { SectorFallback } from "./sector-fallback-content"

/* ─── GENERIC FALLBACK (EN) ─────────────────────────────────────── */

const genericFallbackEn: SectorFallback = {
  heroImage: "/images/sectors/concesionarios.jpg",
  heroIcon: "Building2",
  problems: [
    {
      titulo: "Missed calls and late replies",
      descripcion:
        "Customers expect an immediate response. Every missed call is an opportunity lost.",
      icono: "Clock",
    },
    {
      titulo: "Team buried in repetitive tasks",
      descripcion:
        "Your team spends hours answering the same questions instead of closing sales or handling complex cases.",
      icono: "Users",
    },
    {
      titulo: "Impossible to scale without hiring",
      descripcion:
        "Growth means more headcount, more cost and more management. AI lets you scale without that weight.",
      icono: "TrendingUp",
    },
  ],
  solutions: [
    {
      titulo: "24/7 human-voice support",
      descripcion:
        "AI agents who take calls with a voice indistinguishable from a real person — no office hours.",
      metrica: "+89% availability",
      icono: "Phone",
    },
    {
      titulo: "Automatic qualification",
      descripcion:
        "Every conversation captures data, scores interest and routes to the right team without human touch.",
      metrica: "+47% qualified leads",
      icono: "Target",
    },
    {
      titulo: "Integration with your systems",
      descripcion:
        "WhatsApp, CRM, calendar and email connected. Data flows without manual work.",
      metrica: "-60% admin time",
      icono: "Zap",
    },
    {
      titulo: "Smart escalation",
      descripcion:
        "AI resolves the repetitive; your team focuses on the strategic when escalation is actually needed.",
      metrica: "3x capacity",
      icono: "TrendingUp",
    },
  ],
  useCases: [
    {
      titulo: "Omnichannel customer support",
      descripcion: "WhatsApp, phone, web chat and email in a single inbox, run by AI.",
      mockupSlug: "ia-omnicanal",
    },
    {
      titulo: "Automated scheduling",
      descripcion: "Bookings and appointments confirmed by AI 24/7, integrated with your calendar.",
      mockupSlug: "agente-agendamientos-ia",
    },
    {
      titulo: "Lead qualification",
      descripcion: "AI agent that captures, qualifies and hands leads to the sales team.",
      mockupSlug: "lead-generation-ia",
    },
  ],
  integrations: ["openai", "anthropic", "twilio", "google-cloud", "salesforce", "openclaw"],
  faq: [
    {
      pregunta: "How quickly can we go live?",
      respuesta:
        "We deploy in 2–6 weeks depending on complexity. We handle configuration, integration with your systems and training the AI agent on your data.",
    },
    {
      pregunta: "Do I need a technical team to maintain the service?",
      respuesta:
        "No. It's a fully managed service. We configure, optimise and maintain everything — you just receive the results.",
    },
    {
      pregunta: "Does AI replace my team?",
      respuesta:
        "No. AI handles repetitive tasks and out-of-hours calls. Your team focuses on complex cases and higher-value relationships.",
    },
    {
      pregunta: "What if the customer realises it's an AI?",
      respuesta:
        "Our HD human-voice technology is indistinguishable from a real person. In A/B tests, over 95% of users don't spot the difference.",
    },
    {
      pregunta: "Is it GDPR-compliant?",
      respuesta:
        "Yes. 100% EU infrastructure, encrypted data, no third-party sharing. GDPR-compliant with DPAs available.",
    },
  ],
}

/* ─── SECTOR-SPECIFIC CONTENT (EN) ─────────────────────────────── */

export const sectorFallbacksEn: Record<string, SectorFallback> = {
  clinicas: {
    heroImage: "/images/sectors/clinicas.jpg",
    heroIcon: "Stethoscope",
    problems: [
      {
        titulo: "Missed patient calls",
        descripcion:
          "Every out-of-hours call missed is a consultation lost. Patients call the next clinic on their list.",
        icono: "PhoneOff",
      },
      {
        titulo: "Reception drowning in appointment admin",
        descripcion:
          "Confirmations, cancellations, reschedules — the team spends hours on the phone instead of attending to patients in the waiting room.",
        icono: "Users",
      },
      {
        titulo: "Unconfirmed patients and no-shows",
        descripcion:
          "20–30% of appointments go unconfirmed. Every empty slot is lost clinical time and zero billing.",
        icono: "CalendarX",
      },
    ],
    solutions: [
      {
        titulo: "24/7 phone support",
        descripcion:
          "Human-voice AI agent takes calls, triages urgency and books appointments out-of-hours and weekends.",
        metrica: "+40% bookings",
        icono: "Phone",
      },
      {
        titulo: "Automatic WhatsApp reminders",
        descripcion:
          "Reminders sent 24h and 2h beforehand with one-click confirmation. Automatic rescheduling.",
        metrica: "-65% no-shows",
        icono: "MessageSquare",
      },
      {
        titulo: "Integration with practice-management software",
        descripcion:
          "We connect to your platform (SimplePractice, Semble, HealthEngine, Cliniko) for calendar and records without manual entry.",
        metrica: "No duplicate data entry",
        icono: "Link2",
      },
      {
        titulo: "Intelligent symptom triage",
        descripcion:
          "The AI captures symptoms, scores urgency and routes to the right practitioner. Complies with clinical protocols.",
        metrica: "+3x efficiency",
        icono: "Brain",
      },
    ],
    useCases: [
      {
        titulo: "Automatic phone scheduling",
        descripcion:
          "Patient calls, AI agent asks for the reason, checks availability and confirms the appointment — all by voice.",
        mockupSlug: "atencion-telefonica-ia",
      },
      {
        titulo: "Reminders and confirmations",
        descripcion:
          "Automatic WhatsApp 24h before. Patient confirms or reschedules with one click.",
        mockupSlug: "agente-agendamientos-ia",
      },
      {
        titulo: "First visit and triage",
        descripcion:
          "Captures reason for visit, history and symptoms before the in-person consultation.",
        mockupSlug: "agente-soporte-ia",
      },
    ],
    integrations: ["openai", "twilio", "google-cloud", "salesforce", "openclaw", "anthropic"],
    faq: [
      {
        pregunta: "Can AI handle sensitive medical data?",
        respuesta:
          "Yes. We comply with GDPR and UK/EU health-data regulations. Data encrypted in transit and at rest, not shared with third parties, hosted on EU servers.",
      },
      {
        pregunta: "Does it integrate with my practice-management software?",
        respuesta:
          "Yes. Native integrations with SimplePractice, Semble, Cliniko, HealthEngine and others. For less common software, we build a custom integration.",
      },
      {
        pregunta: "Can it handle urgencies?",
        respuesta:
          "The AI triages against protocols we define with you. In urgent cases, it escalates immediately to your team or redirects to emergency services.",
      },
      {
        pregunta: "How much does it cut no-show rates?",
        respuesta:
          "Customers have reported 45–70% reductions in no-shows. The key is automated WhatsApp reminders with one-click confirmation.",
      },
      {
        pregunta: "Do I need to replace my current phone system?",
        respuesta:
          "No. We integrate the AI agent with your existing system (Avaya, 3CX, VoIP). It can handle overflow calls or all of them — your call.",
      },
    ],
  },

  concesionarios: {
    heroImage: "/images/sectors/concesionarios.jpg",
    heroIcon: "Car",
    problems: [
      {
        titulo: "Portal leads that never get contacted",
        descripcion:
          "Every minute without response drops the sale probability by 10%. And sales reps can't work 24/7.",
        icono: "Clock",
      },
      {
        titulo: "Test-drive booking is a high-friction funnel",
        descripcion:
          "Calls, messages, confirmations for every test drive. Buyers give up before they set foot in the showroom.",
        icono: "CalendarX",
      },
      {
        titulo: "Neglected aftersales — customers go to another workshop",
        descripcion:
          "Without proactive follow-up (MOT, service, tyres), customers lose their connection with the brand.",
        icono: "TrendingDown",
      },
    ],
    solutions: [
      {
        titulo: "AI lead qualification in seconds",
        descripcion:
          "Automated call or WhatsApp to the lead in under 1 minute after the form is submitted. Qualifies and books the test drive.",
        metrica: "+3x effective contacts",
        icono: "Zap",
      },
      {
        titulo: "Test drives booked by AI",
        descripcion:
          "AI agent closes a slot with the customer, sends location and reminder. No human touch required.",
        metrica: "+60% show-up rate",
        icono: "Calendar",
      },
      {
        titulo: "Automated aftersales",
        descripcion:
          "MOT, service and maintenance reminders via WhatsApp. Cross-sell of additional service happens automatically.",
        metrica: "+30% aftersales revenue",
        icono: "Wrench",
      },
      {
        titulo: "Integration with your CRM",
        descripcion:
          "We connect to automotive CRMs (Keyloop, Pinewood, Autoline). Data flows without manual work.",
        metrica: "CRM always up to date",
        icono: "Link2",
      },
    ],
    useCases: [
      {
        titulo: "Portal lead qualified in 60s",
        descripcion:
          "Customer submits form on your site → AI agent calls in under 1 minute → qualifies interest → books test drive.",
        mockupSlug: "lead-generation-ia",
      },
      {
        titulo: "24/7 sales WhatsApp",
        descripcion:
          "Stock, price and finance questions answered instantly on WhatsApp. Hands off to a rep once the lead qualifies.",
        mockupSlug: "whatsapp-ia-empresas",
      },
      {
        titulo: "Aftersales reminders",
        descripcion:
          "MOT, service, tyre change. Automated campaigns that generate recurring revenue.",
        mockupSlug: "agente-agendamientos-ia",
      },
    ],
    integrations: ["openai", "twilio", "salesforce", "openclaw", "anthropic", "google-cloud"],
    faq: [
      {
        pregunta: "Does it integrate with my automotive CRM?",
        respuesta:
          "Yes. We have integrations with Keyloop, Pinewood, Autoline and other automotive-specific CRMs. For proprietary systems we build a custom integration.",
      },
      {
        pregunta: "Can it qualify budget and finance?",
        respuesta:
          "Yes. The AI can ask about deposit available, part-exchange, preferred term and pre-qualify finance before handing off to the sales team.",
      },
      {
        pregunta: "Does it work for premium brands (Mercedes, BMW, Audi)?",
        respuesta:
          "Yes. We tailor tone and script per brand. From mainstream to premium, we tune the experience.",
      },
      {
        pregunta: "How quickly does it go live?",
        respuesta:
          "For a typical dealership, 3–4 weeks from kick-off to production. Includes CRM integration, agent training on your vehicle range, and WhatsApp Business setup.",
      },
      {
        pregunta: "Can it manage multiple sites?",
        respuesta:
          "Yes. We configure the agent to route leads to the correct dealership by geography, brand or stock availability.",
      },
    ],
  },

  restaurantes: {
    heroImage: "/images/sectors/restaurantes.jpg",
    heroIcon: "UtensilsCrossed",
    problems: [
      {
        titulo: "Missed calls during peak hours",
        descripcion:
          "During service the phone rings and nobody answers. Every missed call is a lost booking or order.",
        icono: "PhoneOff",
      },
      {
        titulo: "Manual bookings and waitlist chaos",
        descripcion:
          "Paper diary, phone confirmations, last-minute cancellations. Empty tables while there's a queue at the door.",
        icono: "CalendarX",
      },
      {
        titulo: "Takeaway and delivery mayhem",
        descripcion:
          "WhatsApp, Deliveroo, Uber Eats, phone... different channels without coordination. Errors and kitchen backlog.",
        icono: "AlertTriangle",
      },
    ],
    solutions: [
      {
        titulo: "24/7 automatic bookings",
        descripcion:
          "AI agent handles calls and WhatsApp. Manages availability, confirms and records allergens.",
        metrica: "+47% confirmed bookings",
        icono: "Phone",
      },
      {
        titulo: "Automated takeaway handling",
        descripcion:
          "Order capture by voice or WhatsApp, direct print to kitchen, confirmation of pickup time.",
        metrica: "-50% order errors",
        icono: "MessageSquare",
      },
      {
        titulo: "Integration with OpenTable and SevenRooms",
        descripcion:
          "Real-time sync with your booking software. No double-handling, no overbooking.",
        metrica: "0 overbookings",
        icono: "Link2",
      },
      {
        titulo: "Automated loyalty and campaigns",
        descripcion:
          "Birthday messages, time-limited promos and event invites. All automated over WhatsApp.",
        metrica: "+3x customer returns",
        icono: "Heart",
      },
    ],
    useCases: [
      {
        titulo: "24/7 phone bookings",
        descripcion:
          "Customer calls out-of-hours, AI agent checks availability and confirms the booking. Updates your OpenTable.",
        mockupSlug: "atencion-telefonica-ia",
      },
      {
        titulo: "Takeaway orders via WhatsApp",
        descripcion:
          "Menu, order, payment and pickup time — all over chat. Direct print to kitchen.",
        mockupSlug: "whatsapp-ia-empresas",
      },
      {
        titulo: "Confirmations and reminders",
        descripcion:
          "Automatic reminder 2h before. Customer confirms or cancels. If cancelled, the table goes to the waitlist.",
        mockupSlug: "agente-agendamientos-ia",
      },
    ],
    integrations: ["openai", "twilio", "openclaw", "anthropic", "google-cloud", "salesforce"],
    faq: [
      {
        pregunta: "Does it integrate with OpenTable or SevenRooms?",
        respuesta:
          "Yes. Native integration with OpenTable, SevenRooms, ResDiary and Tock. The AI agent manages bookings directly in your existing software.",
      },
      {
        pregunta: "Can it handle allergens and preferences?",
        respuesta:
          "Yes. The agent asks about allergens, party size, special needs (high chairs, step-free access) and logs everything in the booking.",
      },
      {
        pregunta: "How does it cope with demand peaks (Valentine's, New Year)?",
        respuesta:
          "The AI scales without limits. On peak days it can take hundreds of simultaneous calls without queues or waiting.",
      },
      {
        pregunta: "What if I run multiple restaurants?",
        respuesta:
          "We configure one agent per location or a centralised one with zone-based routing. Each site keeps its own identity and separated data.",
      },
      {
        pregunta: "Can I see the conversations?",
        respuesta:
          "Yes. Real-time dashboard with every conversation, booking made, cancellation and performance metrics.",
      },
    ],
  },

  inmobiliarias: {
    heroImage: "/images/sectors/inmobiliarias.jpg",
    heroIcon: "Home",
    problems: [
      {
        titulo: "Portal leads that go cold in minutes",
        descripcion:
          "Rightmove, Zoopla, OnTheMarket: the first agent to make contact wins. Without an immediate response, the lead is gone.",
        icono: "Clock",
      },
      {
        titulo: "Viewings are constant friction",
        descripcion:
          "Coordinating the agent's diary, the property's availability and the buyer's schedule. Many give up before the viewing.",
        icono: "CalendarX",
      },
      {
        titulo: "Inconsistent post-viewing follow-up",
        descripcion:
          "After a viewing the agent is with another client. Follow-up arrives late or never, and the interest fades.",
        icono: "TrendingDown",
      },
    ],
    solutions: [
      {
        titulo: "Sub-1-minute response to portal leads",
        descripcion:
          "Rightmove/Zoopla webhook → immediate AI call. Qualifies budget, area and urgency before the competition.",
        metrica: "+5x contact rate",
        icono: "Zap",
      },
      {
        titulo: "Automatic viewing scheduling",
        descripcion:
          "AI agent checks the rep's diary, proposes 2–3 options to the buyer and confirms the viewing. Sends location and link.",
        metrica: "+60% confirmed viewings",
        icono: "Calendar",
      },
      {
        titulo: "Automated post-viewing follow-up",
        descripcion:
          "48h after the viewing, AI agent asks for impressions, resolves doubts and books a second viewing or offers alternatives.",
        metrica: "+35% conversion",
        icono: "MessageSquare",
      },
      {
        titulo: "Virtual Home Staging included",
        descripcion:
          "AI transforms empty-room photos into furnished spaces. Listings stand out and sell 30% faster.",
        metrica: "+30% faster",
        icono: "Sparkles",
      },
    ],
    useCases: [
      {
        titulo: "Rightmove lead qualified in seconds",
        descripcion:
          "Buyer leaves details on a listing → AI calls in <1min → qualifies budget, area and timing → books a viewing.",
        mockupSlug: "lead-generation-ia",
      },
      {
        titulo: "Friction-free viewings",
        descripcion:
          "AI agent coordinates agent and buyer diaries, sends reminder and location. No phone calls.",
        mockupSlug: "agente-agendamientos-ia",
      },
      {
        titulo: "Smart post-viewing follow-up",
        descripcion:
          "After the viewing, AI asks about interest, objections and alternatives. Adjusts strategy with the agent.",
        mockupSlug: "agente-ventas-ia",
      },
    ],
    integrations: ["openai", "twilio", "salesforce", "openclaw", "anthropic", "google-cloud"],
    faq: [
      {
        pregunta: "Does it integrate with Rightmove, Zoopla and OnTheMarket?",
        respuesta:
          "Yes. We receive leads via webhook or email and trigger the AI call in <1 minute. This multiplies the effective contact rate by 5.",
      },
      {
        pregunta: "Can AI handle offers and negotiation?",
        respuesta:
          "AI pre-qualifies offers (budget, timing, payment method) but negotiation stays with the human agent. It's a process that needs a personal touch.",
      },
      {
        pregunta: "Does it work for lettings as well as sales?",
        respuesta:
          "Yes. We adjust the qualifying questions: lettings (deposit, guarantor, term) and sales (deposit, mortgage, timing).",
      },
      {
        pregunta: "Which estate-agency CRMs does it support?",
        respuesta:
          "We integrate with Reapit, Alto, Jupix, Street.co.uk and others. Lead data lands directly in your CRM with every interaction logged.",
      },
      {
        pregunta: "Can I offer Virtual Home Staging to my clients?",
        respuesta:
          "Yes. It's a product you can offer as a value-add. Professional photos transformed by AI into furnished, listing-ready spaces.",
      },
    ],
  },

  ecommerce: {
    heroImage: "/images/sectors/ecommerce.jpg",
    heroIcon: "ShoppingBag",
    problems: [
      {
        titulo: "Abandoned carts that never come back",
        descripcion: "70% of carts are abandoned. Automated emails recover 2–5%.",
        icono: "TrendingDown",
      },
      {
        titulo: "Pre-purchase questions going unanswered",
        descripcion:
          "Sizes, stock, shipping, returns. Every unanswered question is a lost sale. Human chat isn't 24/7.",
        icono: "HelpCircle",
      },
      {
        titulo: "Post-sales and returns eat support",
        descripcion:
          "Tracking, exchanges, returns. The support team spends hours on repetitive enquiries.",
        icono: "Users",
      },
    ],
    solutions: [
      {
        titulo: "Cart recovery over WhatsApp",
        descripcion:
          "We detect abandoned carts and send a personalised WhatsApp with product, discount and recovery link.",
        metrica: "+22% recovery",
        icono: "ShoppingCart",
      },
      {
        titulo: "Intelligent purchase assistant",
        descripcion:
          "Web chat and WhatsApp with AI that recommends products, compares and resolves questions. Plugged into your catalogue.",
        metrica: "+18% conversion",
        icono: "MessageSquare",
      },
      {
        titulo: "Automated post-sales support",
        descripcion:
          "Order tracking, exchanges, returns and FAQs — resolved 24/7 without a human agent.",
        metrica: "-70% support tickets",
        icono: "Package",
      },
      {
        titulo: "Integration with Shopify, WooCommerce, Magento",
        descripcion:
          "Real-time sync of catalogue, stock and orders. AI always has up-to-date information.",
        metrica: "Stock always live",
        icono: "Link2",
      },
    ],
    useCases: [
      {
        titulo: "Abandoned-cart recovery",
        descripcion:
          "Customer abandons cart → 30min later, personalised WhatsApp with a discount → 22% recover and buy.",
        mockupSlug: "whatsapp-ia-empresas",
      },
      {
        titulo: "24/7 purchase assistant",
        descripcion:
          "Customer asks 'Size 40 in red?' → AI checks stock → recommends alternatives → closes the sale.",
        mockupSlug: "agente-chat-productos-ia",
      },
      {
        titulo: "Automated post-sales",
        descripcion:
          "Tracking, size changes, returns — all resolved by AI integrated with your shipping system.",
        mockupSlug: "agente-soporte-ia",
      },
    ],
    integrations: ["openai", "twilio", "openclaw", "salesforce", "anthropic", "google-cloud"],
    faq: [
      {
        pregunta: "Does it integrate with Shopify/WooCommerce/Magento?",
        respuesta:
          "Yes, via native apps or API. We sync catalogue, stock, orders and customers in real time. For custom platforms we build a specific integration.",
      },
      {
        pregunta: "Can it recommend products like a sales rep?",
        respuesta:
          "Yes. The AI understands sizes, colours and preferences and can cross-sell (complements) and up-sell (premium versions) per customer profile.",
      },
      {
        pregunta: "How does it handle disputes and returns?",
        respuesta:
          "The AI processes standard returns automatically (generate label, swap order). Complex cases escalate to the human team with full context.",
      },
      {
        pregunta: "Can it run mass WhatsApp campaigns?",
        respuesta:
          "Yes. You can build segmented campaigns (dormant customers, recent buyers, VIPs) with personalised messages. WhatsApp Business Policy-compliant.",
      },
      {
        pregunta: "Which languages does it support?",
        respuesta:
          "The AI detects the customer's language and responds automatically. Supports EN, ES, PT, FR, DE, IT and 30+ more.",
      },
    ],
  },

  "turismo-hoteleria": {
    heroImage: "/images/sectors/turismo.jpg",
    heroIcon: "Hotel",
    problems: [
      {
        titulo: "Bookings lost to language",
        descripcion:
          "Foreign guests call or message in English, French, German. Without multilingual 24/7 reception, bookings walk.",
        icono: "Globe",
      },
      {
        titulo: "Reception overwhelmed at check-in/out",
        descripcion:
          "Repetitive questions (wifi, parking, breakfast) while you're trying to serve the guest in front of you. Friction and bad reviews.",
        icono: "Users",
      },
      {
        titulo: "Manual upselling doesn't scale",
        descripcion:
          "Offering late check-out, spa, excursions... requires proactive contact. Without the time, money is left on the table.",
        icono: "TrendingDown",
      },
    ],
    solutions: [
      {
        titulo: "Multilingual bookings 24/7",
        descripcion:
          "AI agent handles EN, ES, FR, DE, IT, PT. Checks availability, pricing and closes the booking directly in your PMS.",
        metrica: "+40% direct bookings",
        icono: "Phone",
      },
      {
        titulo: "Virtual concierge over WhatsApp",
        descripcion:
          "Guests ask about wifi, hours, transfers, spa. AI responds instantly 24/7 without tying up reception.",
        metrica: "-80% front-desk enquiries",
        icono: "MessageSquare",
      },
      {
        titulo: "Personalised automated upselling",
        descripcion:
          "Day before check-in, proactive WhatsApp offers early check-in, premium breakfast, spa. Based on guest profile.",
        metrica: "+25% extra revenue",
        icono: "TrendingUp",
      },
      {
        titulo: "Integration with Cloudbeds, SiteMinder and Mews",
        descripcion:
          "Sync with your PMS / Channel Manager. Bookings and changes reflect in real time.",
        metrica: "0 overbookings",
        icono: "Link2",
      },
    ],
    useCases: [
      {
        titulo: "Booking in English at 3am",
        descripcion:
          "Guest calls from Germany at 3am → AI handles it in German → checks availability → closes booking in your PMS.",
        mockupSlug: "atencion-telefonica-ia",
      },
      {
        titulo: "24/7 WhatsApp concierge",
        descripcion:
          "Guest asks about wifi, airport transfer, spa hours → AI responds instantly in their language.",
        mockupSlug: "whatsapp-ia-empresas",
      },
      {
        titulo: "Pre-check-in upselling",
        descripcion:
          "24h before check-in, personalised WhatsApp offers upgrade, late check-out and extras.",
        mockupSlug: "agente-ventas-ia",
      },
    ],
    integrations: ["openai", "twilio", "openclaw", "google-cloud", "anthropic", "salesforce"],
    faq: [
      {
        pregunta: "Which languages does it support?",
        respuesta:
          "EN, ES, FR, DE, IT, PT as primary languages. Supports 30+ more. The AI detects the guest's language automatically.",
      },
      {
        pregunta: "Does it integrate with my PMS (Cloudbeds, SiteMinder, Mews)?",
        respuesta:
          "Yes. Native integrations with the most popular PMS and Channel Managers. Real-time sync of availability and rates.",
      },
      {
        pregunta: "Can it upsell without being pushy?",
        respuesta:
          "Yes. We configure rules: only offer upgrades when available, only propose services relevant to the profile (family, business, luxury).",
      },
      {
        pregunta: "How does it handle in-stay complaints and issues?",
        respuesta:
          "The AI takes the complaint, prioritises by severity and escalates to the right team (housekeeping, maintenance, reception) — with automated follow-up.",
      },
      {
        pregunta: "Does it work for small hotels and large chains?",
        respuesta:
          "Yes. From 10-room B&Bs to chains with 50+ hotels. We configure per property or centrally with routing.",
      },
    ],
  },

  educacion: {
    heroImage: "/images/sectors/educacion.jpg",
    heroIcon: "GraduationCap",
    problems: [
      {
        titulo: "Parent enquiries during teaching hours",
        descripcion:
          "Questions about enrolment, timetables, activities — during lesson time. The admin team is swamped.",
        icono: "Users",
      },
      {
        titulo: "High-friction enrolment",
        descripcion:
          "Families call, ask for information, then get no follow-up. Many give up before completing enrolment.",
        icono: "FileText",
      },
      {
        titulo: "Fragmented communication with families",
        descripcion:
          "Circulars by email, reminders by WhatsApp, news on the website. Without a single channel, messages get lost.",
        icono: "AlertTriangle",
      },
    ],
    solutions: [
      {
        titulo: "24/7 information and enrolment",
        descripcion:
          "Families ask about deadlines, places, year groups, fees — AI responds instantly over WhatsApp or web chat.",
        metrica: "+40% enrolments",
        icono: "MessageSquare",
      },
      {
        titulo: "Family-lead follow-up",
        descripcion:
          "After the first enquiry, automated follow-up with information, school visit and enrolment.",
        metrica: "+55% close rate",
        icono: "Target",
      },
      {
        titulo: "Proactive family communication",
        descripcion:
          "Reminders for parent evenings, fees, extracurricular activities. All over WhatsApp, with confirmation.",
        metrica: "-60% admin calls",
        icono: "Phone",
      },
      {
        titulo: "Integration with education software",
        descripcion:
          "Connects to Arbor, Bromcom, iSAMS and others. Syncs enrolment, timetables and fees.",
        metrica: "No manual entry",
        icono: "Link2",
      },
    ],
    useCases: [
      {
        titulo: "24/7 enrolment information",
        descripcion:
          "Parents ask about deadlines, fees, year group → AI responds with tailored information and books a school visit.",
        mockupSlug: "whatsapp-ia-empresas",
      },
      {
        titulo: "Follow-up with interested families",
        descripcion:
          "After the first visit, AI follows up: questions, enrolment, documentation — nobody forgotten.",
        mockupSlug: "agente-ventas-ia",
      },
      {
        titulo: "Automated family communication",
        descripcion:
          "Reminders for parent evenings, fees, events. With read receipts and AI-handled replies.",
        mockupSlug: "agente-agendamientos-ia",
      },
    ],
    integrations: ["openai", "twilio", "google-cloud", "anthropic", "openclaw", "salesforce"],
    faq: [
      {
        pregunta: "Does it integrate with education software (Arbor, Bromcom, iSAMS)?",
        respuesta:
          "Yes. Native integrations with the main systems (Arbor, Bromcom, iSAMS, SIMS). For others we build a custom integration.",
      },
      {
        pregunta: "Does it comply with child-data protection regulations?",
        respuesta:
          "Yes. GDPR and UK/EU child-data regulations. EU servers, encryption, no third-party data sharing.",
      },
      {
        pregunta: "Can it handle multiple languages for international schools?",
        respuesta:
          "Yes. The AI responds in EN, ES, FR, DE, ZH and 30+ languages automatically based on the parent's language.",
      },
      {
        pregunta: "Does it work for language schools, not just schools?",
        respuesta:
          "Yes. We tailor the flow: language schools, driving schools, music/sports academies, professional training. All benefit.",
      },
      {
        pregunta: "How much does it cut admin calls?",
        respuesta:
          "Customers report 50–70% reductions in repetitive calls. The admin team focuses on quality work, not basic enquiry triage.",
      },
    ],
  },

  // ─── Remaining sectors use genericFallbackEn variations ──
  "servicios-tecnicos": {
    ...genericFallbackEn,
    heroImage: "/images/sectors/servicios-locales.jpg",
    heroIcon: "Wrench",
  },
  logistica: {
    ...genericFallbackEn,
    heroIcon: "Warehouse",
  },
  retail: {
    ...genericFallbackEn,
    heroIcon: "ShoppingBag",
  },
  oficinas: {
    ...genericFallbackEn,
    heroIcon: "Briefcase",
  },
  "centros-belleza": {
    ...genericFallbackEn,
    heroIcon: "Scissors",
  },
  gimnasios: {
    ...genericFallbackEn,
    heroIcon: "Dumbbell",
  },
  "despachos-abogados": {
    ...genericFallbackEn,
    heroImage: "/images/sectors/despachos-abogados.jpg",
    heroIcon: "Scale",
  },
  "clubs-deportivos": {
    ...genericFallbackEn,
    heroImage: "/images/sectors/clubs-deportivos.jpg",
    heroIcon: "Trophy",
  },
  "saas-startups": {
    ...genericFallbackEn,
    heroIcon: "Rocket",
  },
  "crm-automation": {
    ...genericFallbackEn,
    heroIcon: "Database",
  },
  "lead-generation-pymes": {
    ...genericFallbackEn,
    heroIcon: "Target",
  },
  "home-staging-virtual": {
    ...genericFallbackEn,
    heroIcon: "Home",
  },
}
