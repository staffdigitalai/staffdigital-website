/**
 * Portuguese (pt-PT) locale overrides for the /sectores/[slug]
 * fallback content.
 *
 * Structure mirrors `sector-fallback-content.ts` exactly — same keys,
 * same arrays, same order — just translated to PT. When a slug is
 * missing from this map, `getSectorFallback(slug, "pt")` falls back
 * to the ES master content.
 *
 * Populated in PR #90 with:
 *   - genericFallbackPt (for the 12 sectors that spread it in the ES master)
 *   - 7 fully-curated sectors (clinicas, concesionarios, restaurantes,
 *     inmobiliarias, ecommerce, turismo-hoteleria, educacion)
 *   - 12 spread-from-generic variants matching the ES master pattern
 *
 * European Portuguese (pt-PT) — not Brazilian. Formal B2B register
 * ("o seu", "está"), PT-PT vocabulary (telemóvel, utilizador,
 * ficheiro, equipa, ecrã), and Portuguese-market references:
 *   - IPO (Inspeção Periódica Obrigatória) instead of ITV
 *   - idealista.pt, Imovirtual, Casa Sapo instead of Rightmove/Zoopla
 *   - Autoridade Tributária (AT) instead of Hacienda/HMRC
 *   - Glovo, Uber Eats and Bolt Food (delivery in PT)
 *   - INOVAR, Tribu and GescolaR (school management in PT)
 *
 * Partner slugs in `integrations` and cross-sell `mockupSlug` keep the
 * ES master value.
 */

import type { SectorFallback } from "./sector-fallback-content"

/* ─── GENERIC FALLBACK (PT) ────────────────────────────────────── */

const genericFallbackPt: SectorFallback = {
  heroImage: "/images/sectors/concesionarios.jpg",
  heroIcon: "Building2",
  problems: [
    {
      titulo: "Chamadas perdidas e respostas tardias",
      descripcion:
        "Os clientes esperam resposta imediata. Cada chamada perdida é uma oportunidade perdida.",
      icono: "Clock",
    },
    {
      titulo: "Equipa afogada em tarefas repetitivas",
      descripcion:
        "A sua equipa passa horas a responder às mesmas perguntas em vez de fechar vendas ou tratar casos complexos.",
      icono: "Users",
    },
    {
      titulo: "Impossível escalar sem contratar",
      descripcion:
        "Crescer significa mais pessoal, mais custos e mais gestão. A IA permite escalar sem esse peso.",
      icono: "TrendingUp",
    },
  ],
  solutions: [
    {
      titulo: "Atendimento 24/7 com voz humana",
      descripcion:
        "Agentes IA que atendem chamadas com voz indistinguível de uma pessoa real, sem horários.",
      metrica: "+89% disponibilidade",
      icono: "Phone",
    },
    {
      titulo: "Qualificação automática",
      descripcion:
        "Cada conversa capta dados, avalia interesse e encaminha à equipa certa sem intervenção.",
      metrica: "+47% leads qualificados",
      icono: "Target",
    },
    {
      titulo: "Integração com os seus sistemas",
      descripcion:
        "WhatsApp, CRM, calendário e email ligados. Os dados fluem sem trabalho manual.",
      metrica: "-60% tempo de admin",
      icono: "Zap",
    },
    {
      titulo: "Escalada inteligente",
      descripcion:
        "A IA resolve o repetitivo; a sua equipa foca-se no estratégico quando há mesmo que escalar.",
      metrica: "3x mais capacidade",
      icono: "TrendingUp",
    },
  ],
  useCases: [
    {
      titulo: "Atendimento ao cliente omnicanal",
      descripcion: "WhatsApp, telefone, chat web e email numa só caixa, geridos por IA.",
      mockupSlug: "ia-omnicanal",
    },
    {
      titulo: "Agendamento automático",
      descripcion: "Reservas e marcações confirmadas por IA 24/7 integrando o seu calendário.",
      mockupSlug: "agente-agendamientos-ia",
    },
    {
      titulo: "Qualificação de leads",
      descripcion: "Agente IA que capta, qualifica e entrega à equipa comercial.",
      mockupSlug: "lead-generation-ia",
    },
  ],
  integrations: ["openai", "anthropic", "twilio", "google-cloud", "salesforce", "openclaw"],
  faq: [
    {
      pregunta: "Em quanto tempo podemos estar operacionais?",
      respuesta:
        "Implementamos em 2–6 semanas consoante a complexidade. Tratamos da configuração, integração com os seus sistemas e treino do agente IA com a sua informação.",
    },
    {
      pregunta: "Preciso de equipa técnica para manter o serviço?",
      respuesta:
        "Não. É um serviço 100% gerido. Configuramos, otimizamos e mantemos tudo. Recebe apenas os resultados.",
    },
    {
      pregunta: "A IA substitui a minha equipa?",
      respuesta:
        "Não. A IA trata de tarefas repetitivas e chamadas fora de horas. A sua equipa foca-se em casos complexos e relações de maior valor.",
    },
    {
      pregunta: "E se o cliente perceber que é uma IA?",
      respuesta:
        "A nossa tecnologia de voz humana HD é indistinguível de uma pessoa real. Em testes A/B, mais de 95% dos utilizadores não deteta a diferença.",
    },
    {
      pregunta: "Cumpre o RGPD?",
      respuesta:
        "Sim. Infraestrutura 100% na UE, dados encriptados, sem partilha com terceiros. Cumprimos o RGPD e podemos assinar DPAs.",
    },
  ],
}

/* ─── SECTOR-SPECIFIC CONTENT (PT) ─────────────────────────────── */

export const sectorFallbacksPt: Record<string, SectorFallback> = {
  clinicas: {
    heroImage: "/images/sectors/clinicas.jpg",
    heroIcon: "Stethoscope",
    problems: [
      {
        titulo: "Chamadas perdidas de pacientes",
        descripcion:
          "Cada chamada perdida fora de horas é uma consulta a menos. Os pacientes ligam à clínica seguinte.",
        icono: "PhoneOff",
      },
      {
        titulo: "Receção afogada em gestão de marcações",
        descripcion:
          "Confirmações, cancelamentos, remarcações — a equipa passa horas ao telefone em vez de atender pacientes na sala.",
        icono: "Users",
      },
      {
        titulo: "Pacientes não confirmados e faltas",
        descripcion:
          "20–30% das marcações não são confirmadas. Cada slot vazio é tempo clínico perdido e faturação zero.",
        icono: "CalendarX",
      },
    ],
    solutions: [
      {
        titulo: "Atendimento telefónico 24/7",
        descripcion:
          "Agente IA com voz humana atende, triagem de urgências e marca consultas fora de horas e ao fim de semana.",
        metrica: "+40% consultas agendadas",
        icono: "Phone",
      },
      {
        titulo: "Lembretes automáticos por WhatsApp",
        descripcion:
          "Envio de lembretes 24h e 2h antes com confirmação num clique. Remarcação automática.",
        metrica: "-65% faltas",
        icono: "MessageSquare",
      },
      {
        titulo: "Integração com software clínico",
        descripcion:
          "Ligamo-nos ao seu software (Medicine One, HiDoctor, Doctoralia, MedicareOne) para agenda e histórico sem entrada manual.",
        metrica: "Sem duplicação",
        icono: "Link2",
      },
      {
        titulo: "Triagem inteligente de sintomas",
        descripcion:
          "A IA recolhe sintomas, classifica a urgência e encaminha ao profissional certo. Cumpre protocolos clínicos.",
        metrica: "+3x eficiência",
        icono: "Brain",
      },
    ],
    useCases: [
      {
        titulo: "Agenda telefónica automática",
        descripcion:
          "Paciente liga, agente IA pergunta o motivo, verifica disponibilidade e confirma a consulta — tudo por voz.",
        mockupSlug: "atencion-telefonica-ia",
      },
      {
        titulo: "Lembretes e confirmações",
        descripcion:
          "WhatsApp automático 24h antes. Paciente confirma ou remarca num clique.",
        mockupSlug: "agente-agendamientos-ia",
      },
      {
        titulo: "Primeira consulta e triagem",
        descripcion:
          "Recolha de motivo da consulta, historial e sintomas antes da visita presencial.",
        mockupSlug: "agente-soporte-ia",
      },
    ],
    integrations: ["openai", "twilio", "google-cloud", "salesforce", "openclaw", "anthropic"],
    faq: [
      {
        pregunta: "A IA pode gerir informação médica sensível?",
        respuesta:
          "Sim, cumprimos o RGPD e a legislação sanitária portuguesa/europeia. Os dados são encriptados em trânsito e em repouso. Não são partilhados com terceiros e ficam em servidores UE.",
      },
      {
        pregunta: "Integra-se com o meu software clínico atual?",
        respuesta:
          "Sim. Integrações nativas com Medicine One, HiDoctor, Doctoralia, MedicareOne e outros. Para software menos comum, criamos integração personalizada.",
      },
      {
        pregunta: "Pode gerir urgências?",
        respuesta:
          "A IA faz triagem segundo protocolos que definimos consigo. Em casos urgentes, escala imediatamente para a sua equipa ou redireciona para o INEM.",
      },
      {
        pregunta: "Quanto reduz a taxa de faltas?",
        respuesta:
          "Clientes reportaram reduções de 45–70% em faltas. A chave são os lembretes automáticos por WhatsApp com confirmação num clique.",
      },
      {
        pregunta: "Preciso de mudar a minha central telefónica atual?",
        respuesta:
          "Não. Integramos o agente IA com a sua central existente (Avaya, 3CX, VoIP). Pode atender chamadas em excesso ou todas, consoante preferir.",
      },
    ],
  },

  concesionarios: {
    heroImage: "/images/sectors/concesionarios.jpg",
    heroIcon: "Car",
    problems: [
      {
        titulo: "Leads de anúncios que nunca são contactados",
        descripcion:
          "Cada minuto sem resposta reduz a probabilidade de venda em 10%. E os comerciais não podem estar disponíveis 24/7.",
        icono: "Clock",
      },
      {
        titulo: "Marcar test drives é um funil com fricção",
        descripcion:
          "Chamadas, mensagens e confirmações para cada test drive. Os compradores desistem antes de chegarem ao stand.",
        icono: "CalendarX",
      },
      {
        titulo: "Pós-venda descuidada, clientes vão a outra oficina",
        descripcion:
          "Sem seguimento proativo (IPO, revisões, pneus), os clientes perdem a ligação à marca.",
        icono: "TrendingDown",
      },
    ],
    solutions: [
      {
        titulo: "Qualificação IA de leads em segundos",
        descripcion:
          "Chamada automática ou WhatsApp ao lead em <1min depois de preencher o formulário. Qualifica e marca test drive.",
        metrica: "+3x contactos efetivos",
        icono: "Zap",
      },
      {
        titulo: "Test drives marcados por IA",
        descripcion:
          "Agente IA fecha horário com o cliente, envia localização e lembrete. Sem intervenção humana.",
        metrica: "+60% taxa de presença",
        icono: "Calendar",
      },
      {
        titulo: "Pós-venda automatizada",
        descripcion:
          "Lembretes de IPO, revisões e manutenção por WhatsApp. Venda de serviço adicional automática.",
        metrica: "+30% receita pós-venda",
        icono: "Wrench",
      },
      {
        titulo: "Integração com o seu CRM",
        descripcion:
          "Ligamos ao CRM automóvel (Quiter, DMS Cloud, Cesvi). Os dados fluem sem trabalho manual.",
        metrica: "CRM sempre atualizado",
        icono: "Link2",
      },
    ],
    useCases: [
      {
        titulo: "Lead de anúncio qualificado em 60s",
        descripcion:
          "Cliente preenche formulário no seu site → agente IA liga em menos de 1 minuto → qualifica interesse → marca test drive.",
        mockupSlug: "lead-generation-ia",
      },
      {
        titulo: "WhatsApp comercial 24/7",
        descripcion:
          "Consultas sobre stock, preços e financiamento atendidas ao instante por WhatsApp. Passagem a vendedor se qualificar.",
        mockupSlug: "whatsapp-ia-empresas",
      },
      {
        titulo: "Lembretes de pós-venda",
        descripcion:
          "IPO, revisões, troca de pneus. Campanha automática que gera receitas recorrentes.",
        mockupSlug: "agente-agendamientos-ia",
      },
    ],
    integrations: ["openai", "twilio", "salesforce", "openclaw", "anthropic", "google-cloud"],
    faq: [
      {
        pregunta: "Integra-se com o meu CRM de automóvel?",
        respuesta:
          "Sim. Temos integrações com Quiter, DMS Cloud, Cesvi e outros CRMs específicos de automóvel. Para sistemas próprios fazemos integração à medida.",
      },
      {
        pregunta: "Consegue qualificar orçamentos e financiamento?",
        respuesta:
          "Sim. A IA pode fazer perguntas sobre entrada disponível, retoma, prazo pretendido e pré-qualificar financiamento antes de passar à equipa comercial.",
      },
      {
        pregunta: "Funciona para marcas premium (Mercedes, BMW, Audi)?",
        respuesta:
          "Sim. Personalizamos o tom de voz e o guião para cada marca. De gamas generalistas a premium, ajustamos a experiência.",
      },
      {
        pregunta: "Quanto tempo demora a entrar em produção?",
        respuesta:
          "Para um concessionário tipo, 3–4 semanas desde kick-off até produção. Inclui integração com o seu CRM, treino do agente com a sua gama, e configuração do WhatsApp Business.",
      },
      {
        pregunta: "Consegue gerir vários pontos de venda?",
        respuesta:
          "Sim. Configuramos o agente para encaminhar leads ao ponto de venda correspondente segundo geografia, marca ou disponibilidade de stock.",
      },
    ],
  },

  restaurantes: {
    heroImage: "/images/sectors/restaurantes.jpg",
    heroIcon: "UtensilsCrossed",
    problems: [
      {
        titulo: "Chamadas perdidas em horas de ponta",
        descripcion:
          "Durante o serviço, o telefone toca e ninguém atende. Cada chamada perdida é uma reserva ou encomenda perdida.",
        icono: "PhoneOff",
      },
      {
        titulo: "Gestão manual de reservas e listas de espera",
        descripcion:
          "Agenda em papel, confirmações por telefone, cancelamentos de última hora. Mesas vazias enquanto há gente à espera.",
        icono: "CalendarX",
      },
      {
        titulo: "Pedidos takeaway e delivery caóticos",
        descripcion:
          "WhatsApp, Glovo, Uber Eats, Bolt Food, telefone... canais diferentes sem coordenação. Erros e atrasos na cozinha.",
        icono: "AlertTriangle",
      },
    ],
    solutions: [
      {
        titulo: "Reservas automáticas 24/7",
        descripcion:
          "Agente IA atende chamadas e WhatsApp. Gere disponibilidade, confirma e regista alergénios.",
        metrica: "+47% reservas confirmadas",
        icono: "Phone",
      },
      {
        titulo: "Gestão automática de takeaway",
        descripcion:
          "Recolha de pedidos por voz ou WhatsApp, impressão direta na cozinha, confirmação de hora ao cliente.",
        metrica: "-50% erros em pedidos",
        icono: "MessageSquare",
      },
      {
        titulo: "Integração com TheFork e ZeroOrder",
        descripcion:
          "Sincronização em tempo real com o seu software de reservas. Sem dupla gestão nem overbooking.",
        metrica: "0 overbookings",
        icono: "Link2",
      },
      {
        titulo: "Fidelização e campanhas automáticas",
        descripcion:
          "Mensagens de aniversário, promoções pontuais e convites para eventos. Tudo automatizado por WhatsApp.",
        metrica: "+3x regresso de clientes",
        icono: "Heart",
      },
    ],
    useCases: [
      {
        titulo: "Reservas por telefone 24/7",
        descripcion:
          "Cliente liga fora de horas, agente IA verifica disponibilidade e confirma a reserva. Atualiza o seu TheFork.",
        mockupSlug: "atencion-telefonica-ia",
      },
      {
        titulo: "Pedidos takeaway por WhatsApp",
        descripcion:
          "Menu, pedido, método de pagamento e hora de levantamento — tudo por chat. Impressão direta na cozinha.",
        mockupSlug: "whatsapp-ia-empresas",
      },
      {
        titulo: "Confirmações e lembretes",
        descripcion:
          "Lembrete automático 2h antes. Cliente confirma ou cancela. Se cancela, liberta a mesa para a lista de espera.",
        mockupSlug: "agente-agendamientos-ia",
      },
    ],
    integrations: ["openai", "twilio", "openclaw", "anthropic", "google-cloud", "salesforce"],
    faq: [
      {
        pregunta: "Integra-se com o TheFork ou ZeroOrder?",
        respuesta:
          "Sim. Integração nativa com TheFork, ZeroOrder, OpenTable e SevenRooms. O agente IA gere reservas diretamente no seu software habitual.",
      },
      {
        pregunta: "Consegue gerir alergénios e preferências?",
        respuesta:
          "Sim. O agente pergunta alergénios, número de pessoas, necessidades especiais (cadeira de bebé, acessibilidade) e regista tudo na reserva.",
      },
      {
        pregunta: "Como gere picos de procura (Dia dos Namorados, Passagem de Ano)?",
        respuesta:
          "A IA escala sem limites. Em dias de ponta, pode atender centenas de chamadas em simultâneo sem filas nem esperas.",
      },
      {
        pregunta: "E se tenho vários restaurantes?",
        respuesta:
          "Configuramos um agente por espaço ou um centralizado com encaminhamento por zona. Cada restaurante mantém a sua identidade e dados separados.",
      },
      {
        pregunta: "Posso ver as conversas?",
        respuesta:
          "Sim. Dashboard em tempo real com todas as conversas, reservas criadas, cancelamentos e métricas de desempenho.",
      },
    ],
  },

  inmobiliarias: {
    heroImage: "/images/sectors/inmobiliarias.jpg",
    heroIcon: "Home",
    problems: [
      {
        titulo: "Leads de portais que arrefecem em minutos",
        descripcion:
          "idealista.pt, Imovirtual, Casa Sapo: o primeiro agente a contactar ganha. Sem resposta imediata, o lead perde-se.",
        icono: "Clock",
      },
      {
        titulo: "Marcar visitas é fricção constante",
        descripcion:
          "Coordenar agenda do agente, disponibilidade do imóvel e do comprador. Muitos desistem antes da visita.",
        icono: "CalendarX",
      },
      {
        titulo: "Seguimento pós-visita inconsistente",
        descripcion:
          "Depois da visita, o agente está com outro cliente. O seguimento chega tarde ou não chega, e o interesse perde-se.",
        icono: "TrendingDown",
      },
    ],
    solutions: [
      {
        titulo: "Resposta em <1 min a leads de portais",
        descripcion:
          "Webhook do idealista.pt / Imovirtual → chamada IA imediata. Qualifica orçamento, zona e urgência antes da concorrência.",
        metrica: "+5x taxa de contacto",
        icono: "Zap",
      },
      {
        titulo: "Marcação de visitas automática",
        descripcion:
          "Agente IA consulta agenda do comercial, propõe 2–3 opções ao cliente e confirma visita. Envia localização e link.",
        metrica: "+60% visitas confirmadas",
        icono: "Calendar",
      },
      {
        titulo: "Seguimento pós-visita automatizado",
        descripcion:
          "48h depois da visita, agente IA pergunta impressões, resolve dúvidas e marca segunda visita ou oferece alternativas.",
        metrica: "+35% conversão",
        icono: "MessageSquare",
      },
      {
        titulo: "Home Staging Virtual incluído",
        descripcion:
          "Transformação de fotos vazias em espaços decorados com IA. Os anúncios destacam-se e vendem 30% mais rápido.",
        metrica: "+30% mais rápido",
        icono: "Sparkles",
      },
    ],
    useCases: [
      {
        titulo: "Lead de idealista.pt qualificado em segundos",
        descripcion:
          "Cliente deixa dados num anúncio → IA liga em <1min → qualifica budget, zona e timing → marca visita.",
        mockupSlug: "lead-generation-ia",
      },
      {
        titulo: "Agenda de visitas sem fricção",
        descripcion:
          "Agente IA coordena agenda do comercial e cliente, envia lembrete e localização. Sem chamadas.",
        mockupSlug: "agente-agendamientos-ia",
      },
      {
        titulo: "Follow-up pós-visita inteligente",
        descripcion:
          "Depois da visita, IA pergunta por interesse, objeções e alternativas. Ajusta estratégia com o comercial.",
        mockupSlug: "agente-ventas-ia",
      },
    ],
    integrations: ["openai", "twilio", "salesforce", "openclaw", "anthropic", "google-cloud"],
    faq: [
      {
        pregunta: "Integra-se com idealista.pt, Imovirtual e Casa Sapo?",
        respuesta:
          "Sim. Recebemos os leads via webhook ou email e ativamos a chamada IA em <1 minuto. Isto multiplica por 5 a taxa de contacto efetivo.",
      },
      {
        pregunta: "A IA pode gerir propostas e negociação?",
        respuesta:
          "A IA faz pré-qualificação de propostas (budget, timing, forma de pagamento) mas a negociação fica com o comercial humano. É um processo que requer toque pessoal.",
      },
      {
        pregunta: "Funciona para arrendamento ou só venda?",
        respuesta:
          "Funciona para ambos. Ajustamos as perguntas de qualificação: arrendamento (caução, fiador, duração) e venda (entrada, crédito habitação, timing).",
      },
      {
        pregunta: "Que CRMs imobiliários suporta?",
        respuesta:
          "Integramos com eGO Real Estate, imobnet, Datacasa, Worken e outros. Os dados do lead entram diretamente no seu CRM com todas as interações.",
      },
      {
        pregunta: "Posso oferecer Home Staging Virtual aos meus clientes?",
        respuesta:
          "Sim. É um complemento que pode oferecer como serviço adicional. Fotos profissionais transformadas por IA em espaços decorados, prontas para anúncio.",
      },
    ],
  },

  ecommerce: {
    heroImage: "/images/sectors/ecommerce.jpg",
    heroIcon: "ShoppingBag",
    problems: [
      {
        titulo: "Carrinhos abandonados que não voltam",
        descripcion: "70% dos carrinhos são abandonados. Os emails automáticos recuperam 2–5%.",
        icono: "TrendingDown",
      },
      {
        titulo: "Dúvidas de pré-venda sem resposta",
        descripcion:
          "Tamanhos, stock, envios, devoluções. Cada dúvida sem resposta é uma venda a menos. O chat humano não está 24/7.",
        icono: "HelpCircle",
      },
      {
        titulo: "Pós-venda e devoluções consomem suporte",
        descripcion:
          "Tracking, trocas, devoluções. A equipa de suporte gasta horas em consultas repetitivas.",
        icono: "Users",
      },
    ],
    solutions: [
      {
        titulo: "Recuperação de carrinhos por WhatsApp",
        descripcion:
          "Detetamos carrinhos abandonados e enviamos WhatsApp personalizado com produto, desconto e link de recuperação.",
        metrica: "+22% recuperação",
        icono: "ShoppingCart",
      },
      {
        titulo: "Assistente de compra inteligente",
        descripcion:
          "Chat web e WhatsApp com IA que recomenda produtos, compara e resolve dúvidas. Integrado com o seu catálogo.",
        metrica: "+18% conversão",
        icono: "MessageSquare",
      },
      {
        titulo: "Suporte pós-venda automatizado",
        descripcion:
          "Tracking de encomenda, trocas, devoluções e perguntas frequentes — resolvidas 24/7 sem agente humano.",
        metrica: "-70% tickets de suporte",
        icono: "Package",
      },
      {
        titulo: "Integração com Shopify, WooCommerce, Magento",
        descripcion:
          "Sincronização em tempo real de catálogo, stock e encomendas. A IA tem sempre informação atualizada.",
        metrica: "Stock sempre em dia",
        icono: "Link2",
      },
    ],
    useCases: [
      {
        titulo: "Recuperação de carrinho abandonado",
        descripcion:
          "Cliente abandona carrinho → 30min depois, WhatsApp personalizado com desconto → 22% recuperam e compram.",
        mockupSlug: "whatsapp-ia-empresas",
      },
      {
        titulo: "Assistente de compra 24/7",
        descripcion:
          "Cliente pergunta 'Tamanho 40 em vermelho?' → IA verifica stock → recomenda alternativas → fecha venda.",
        mockupSlug: "agente-chat-productos-ia",
      },
      {
        titulo: "Pós-venda automatizada",
        descripcion:
          "Tracking, trocas de tamanho, devoluções — tudo resolvido por IA integrada com o seu sistema de envios.",
        mockupSlug: "agente-soporte-ia",
      },
    ],
    integrations: ["openai", "twilio", "openclaw", "salesforce", "anthropic", "google-cloud"],
    faq: [
      {
        pregunta: "Integra-se com Shopify/WooCommerce/Magento?",
        respuesta:
          "Sim, com apps nativas ou via API. Sincronizamos catálogo, stock, encomendas e clientes em tempo real. Para plataformas custom fazemos integração específica.",
      },
      {
        pregunta: "Pode recomendar produtos como um vendedor?",
        respuesta:
          "Sim. A IA entende tamanhos, cores, preferências e pode fazer cross-sell (complementos) e up-sell (versões superiores) segundo o perfil do cliente.",
      },
      {
        pregunta: "Como gere disputas e devoluções?",
        respuesta:
          "A IA processa devoluções standard automaticamente (gerar etiqueta, trocar encomenda). Casos complexos são escalados para a equipa humana com todo o contexto.",
      },
      {
        pregunta: "Pode fazer campanhas de WhatsApp em massa?",
        respuesta:
          "Sim. Pode criar campanhas segmentadas (clientes inativos, compradores recentes, VIPs) com mensagens personalizadas. Cumprimos a WhatsApp Business Policy.",
      },
      {
        pregunta: "Que idiomas suporta?",
        respuesta:
          "A IA deteta o idioma do cliente e responde automaticamente. Suporta PT, EN, ES, FR, DE, IT e mais de 30 idiomas.",
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
          "Hóspedes estrangeiros ligam ou escrevem em inglês, francês, alemão. Sem receção multilingue 24/7, perdem-se reservas.",
        icono: "Globe",
      },
      {
        titulo: "Receção afogada no check-in e check-out",
        descripcion:
          "Consultas repetitivas (wifi, parking, pequeno-almoço) enquanto tenta atender o cliente ao balcão. Fricção e más críticas.",
        icono: "Users",
      },
      {
        titulo: "Upselling manual não escala",
        descripcion:
          "Oferecer late check-out, spa, excursões... requer contacto proativo. Sem tempo, deixa-se dinheiro em cima da mesa.",
        icono: "TrendingDown",
      },
    ],
    solutions: [
      {
        titulo: "Reservas multilingues 24/7",
        descripcion:
          "Agente IA atende em PT, EN, FR, DE, IT, ES. Verifica disponibilidade, preço e fecha reserva diretamente no seu PMS.",
        metrica: "+40% reservas diretas",
        icono: "Phone",
      },
      {
        titulo: "Conciergerie virtual por WhatsApp",
        descripcion:
          "Hóspedes perguntam sobre wifi, horários, transfer, spa. IA responde ao instante 24/7 sem ocupar a receção.",
        metrica: "-80% consultas ao balcão",
        icono: "MessageSquare",
      },
      {
        titulo: "Upselling automático personalizado",
        descripcion:
          "Dia antes do check-in, WhatsApp proativo oferece early check-in, pequeno-almoço premium, spa. Segundo o perfil do hóspede.",
        metrica: "+25% receita extra",
        icono: "TrendingUp",
      },
      {
        titulo: "Integração com Cloudbeds, SiteMinder e Mews",
        descripcion:
          "Sincronização com o seu PMS / Channel Manager. As reservas e alterações refletem em tempo real.",
        metrica: "0 overbookings",
        icono: "Link2",
      },
    ],
    useCases: [
      {
        titulo: "Reserva em inglês às 3h da manhã",
        descripcion:
          "Hóspede liga da Alemanha às 3h → IA atende em alemão → verifica disponibilidade → fecha reserva no seu PMS.",
        mockupSlug: "atencion-telefonica-ia",
      },
      {
        titulo: "Conciergerie WhatsApp 24/7",
        descripcion:
          "Hóspede pergunta por wifi, transfer aeroporto, horários spa → IA responde ao instante no seu idioma.",
        mockupSlug: "whatsapp-ia-empresas",
      },
      {
        titulo: "Upselling pre-check-in",
        descripcion:
          "24h antes do check-in, WhatsApp personalizado oferece upgrade, late check-out e serviços extra.",
        mockupSlug: "agente-ventas-ia",
      },
    ],
    integrations: ["openai", "twilio", "openclaw", "google-cloud", "anthropic", "salesforce"],
    faq: [
      {
        pregunta: "Que idiomas suporta?",
        respuesta:
          "PT, EN, FR, DE, IT, ES como idiomas principais. Suporta 30+ idiomas adicionais. A IA deteta o idioma do hóspede automaticamente.",
      },
      {
        pregunta: "Integra-se com o meu PMS (Cloudbeds, SiteMinder, Mews)?",
        respuesta:
          "Sim. Integrações nativas com os PMS e Channel Managers mais populares. Sincronização em tempo real de disponibilidade e tarifas.",
      },
      {
        pregunta: "Consegue fazer upsell sem ser intrusivo?",
        respuesta:
          "Sim. Configuramos regras: só oferece upgrades se houver disponibilidade, só propõe serviços relevantes ao perfil (famílias, business, luxury).",
      },
      {
        pregunta: "Como gere reclamações e problemas durante a estadia?",
        respuesta:
          "A IA recolhe a reclamação, prioriza segundo gravidade e escala à equipa certa (housekeeping, manutenção, receção). Com seguimento automático.",
      },
      {
        pregunta: "Funciona para hotéis pequenos e grandes cadeias?",
        respuesta:
          "Sim. Desde guest houses com 10 quartos a cadeias com 50+ hotéis. Configuramos por propriedade ou centralizado com encaminhamento.",
      },
    ],
  },

  educacion: {
    heroImage: "/images/sectors/educacion.jpg",
    heroIcon: "GraduationCap",
    problems: [
      {
        titulo: "Consultas de encarregados em horário letivo",
        descripcion:
          "Perguntas sobre matrícula, horários, atividades — durante a aula. A equipa administrativa está afogada.",
        icono: "Users",
      },
      {
        titulo: "Matrículas com muita fricção",
        descripcion:
          "Famílias ligam, pedem informação, depois não recebem seguimento. Muitas desistem antes de completar a matrícula.",
        icono: "FileText",
      },
      {
        titulo: "Comunicação fragmentada com famílias",
        descripcion:
          "Circulares por email, lembretes por WhatsApp, notícias no site. Sem canal único, as mensagens perdem-se.",
        icono: "AlertTriangle",
      },
    ],
    solutions: [
      {
        titulo: "Informação e matrícula 24/7",
        descripcion:
          "Famílias perguntam por prazos, vagas, níveis, preço — IA responde ao instante por WhatsApp ou chat web.",
        metrica: "+40% matrículas",
        icono: "MessageSquare",
      },
      {
        titulo: "Seguimento de leads familiares",
        descripcion:
          "Após a primeira consulta, seguimento automático com informação, visita ao centro e matrícula.",
        metrica: "+55% taxa de fecho",
        icono: "Target",
      },
      {
        titulo: "Comunicação proativa com famílias",
        descripcion:
          "Lembretes de reuniões, pagamentos, atividades extracurriculares. Tudo por WhatsApp, com confirmação.",
        metrica: "-60% chamadas administrativas",
        icono: "Phone",
      },
      {
        titulo: "Integração com software educativo",
        descripcion:
          "Ligação ao INOVAR, Tribu Plus, GescolaR e outros. Sincronização de matrículas, horários e pagamentos.",
        metrica: "Sem entrada manual",
        icono: "Link2",
      },
    ],
    useCases: [
      {
        titulo: "Informação de matrícula 24/7",
        descripcion:
          "Encarregados perguntam por prazos, preços, nível → IA responde com informação personalizada e marca visita.",
        mockupSlug: "whatsapp-ia-empresas",
      },
      {
        titulo: "Seguimento a famílias interessadas",
        descripcion:
          "Após primeira visita, IA faz seguimento: dúvidas, matrícula, documentação — sem esquecer ninguém.",
        mockupSlug: "agente-ventas-ia",
      },
      {
        titulo: "Comunicação automática com famílias",
        descripcion:
          "Lembretes de reuniões, pagamentos, eventos. Com confirmação de leitura e resposta gerida por IA.",
        mockupSlug: "agente-agendamientos-ia",
      },
    ],
    integrations: ["openai", "twilio", "google-cloud", "anthropic", "openclaw", "salesforce"],
    faq: [
      {
        pregunta: "Integra-se com software educativo (INOVAR, Tribu Plus, GescolaR)?",
        respuesta:
          "Sim. Integrações nativas com os principais sistemas (INOVAR, Tribu Plus, GescolaR, JPM). Para outros fazemos integração personalizada.",
      },
      {
        pregunta: "Cumpre a legislação de proteção de menores?",
        respuesta:
          "Sim. RGPD e legislação específica de dados de menores. Servidores UE, encriptação, sem partilha de dados com terceiros.",
      },
      {
        pregunta: "Consegue gerir vários idiomas para escolas internacionais?",
        respuesta:
          "Sim. A IA responde em PT, EN, FR, DE e mais de 30 idiomas automaticamente consoante o idioma do encarregado.",
      },
      {
        pregunta: "Funciona para centros de línguas, não só escolas?",
        respuesta:
          "Sim. Ajustamos o fluxo: escolas de línguas, escolas de condução, academias de música/desporto, formação profissional. Todas beneficiam.",
      },
      {
        pregunta: "Quanto reduz as chamadas administrativas?",
        respuesta:
          "Clientes reportam reduções de 50–70% em chamadas repetitivas. A equipa administrativa foca-se em gestão de qualidade, não em atender consultas básicas.",
      },
    ],
  },

  // ─── Remaining sectors use genericFallbackPt variations ──
  "servicios-tecnicos": {
    ...genericFallbackPt,
    heroImage: "/images/sectors/servicios-locales.jpg",
    heroIcon: "Wrench",
  },
  logistica: {
    ...genericFallbackPt,
    heroIcon: "Warehouse",
  },
  retail: {
    ...genericFallbackPt,
    heroIcon: "ShoppingBag",
  },
  oficinas: {
    ...genericFallbackPt,
    heroIcon: "Briefcase",
  },
  "centros-belleza": {
    ...genericFallbackPt,
    heroIcon: "Scissors",
  },
  gimnasios: {
    ...genericFallbackPt,
    heroIcon: "Dumbbell",
  },
  "despachos-abogados": {
    ...genericFallbackPt,
    heroImage: "/images/sectors/despachos-abogados.jpg",
    heroIcon: "Scale",
  },
  "clubs-deportivos": {
    ...genericFallbackPt,
    heroImage: "/images/sectors/clubs-deportivos.jpg",
    heroIcon: "Trophy",
  },
  "saas-startups": {
    ...genericFallbackPt,
    heroIcon: "Rocket",
  },
  "crm-automation": {
    ...genericFallbackPt,
    heroIcon: "Database",
  },
  "lead-generation-pymes": {
    ...genericFallbackPt,
    heroIcon: "Target",
  },
  "home-staging-virtual": {
    ...genericFallbackPt,
    heroIcon: "Home",
  },
}
