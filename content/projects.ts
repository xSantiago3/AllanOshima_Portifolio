import type { Project } from "./types";

/* ------------------------------------------------------------------ *
 * Zone 2 — Agents & automation (the specialty)
 * Client/enterprise work is anonymized; private repos are not linked.
 * ------------------------------------------------------------------ */
const agents: Project[] = [
  {
    id: "aiops-sentinel",
    kind: "agent",
    glyph: "哨",
    icon: "radar",
    accent: "vermillion",
    confidential: true,
    name: {
      pt: "Sentinela RCA — AIOps autônomo",
      en: "RCA Sentinel — Autonomous AIOps",
    },
    tagline: {
      pt: "Um agente que encontra a causa raiz e sugere a remediação sozinho.",
      en: "An agent that finds root cause and proposes remediation on its own.",
    },
    problem: {
      pt: "Em operações de missão crítica, um incidente dispara dezenas de alertas. O time perde tempo correlacionando observabilidade, tickets e documentação para achar a causa raiz — e cada minuto custa caro.",
      en: "In mission-critical operations, one incident fires dozens of alerts. Teams burn time correlating observability, tickets and docs to find root cause — and every minute is expensive.",
    },
    approach: {
      pt: "Um agente orquestrador (Dify self-hosted) que conecta a plataforma de observabilidade, o ITSM e a base de conhecimento corporativa. Ele recebe o incidente, investiga em múltiplas fontes e devolve um RCA estruturado com remediação sugerida.",
      en: "An orchestrator agent (self-hosted Dify) wired to the observability platform, the ITSM and the corporate knowledge base. It takes an incident, investigates across sources and returns a structured RCA with a suggested fix.",
    },
    steps: [
      {
        title: { pt: "Ingestão do alerta", en: "Alert ingestion" },
        desc: {
          pt: "Recebe o incidente do ITSM/observabilidade e normaliza o contexto.",
          en: "Receives the incident from ITSM/observability and normalizes the context.",
        },
      },
      {
        title: { pt: "Investigação multi-fonte", en: "Multi-source investigation" },
        desc: {
          pt: "Sub-workflows consultam métricas e traces, histórico de tickets e a base de conhecimento.",
          en: "Sub-workflows query metrics and traces, ticket history and the knowledge base.",
        },
      },
      {
        title: { pt: "Correlação & RCA", en: "Correlation & RCA" },
        desc: {
          pt: "O agente correlaciona os sinais e redige a causa raiz provável, com evidências.",
          en: "The agent correlates signals and writes the likely root cause, with evidence.",
        },
      },
      {
        title: { pt: "Remediação sugerida", en: "Suggested remediation" },
        desc: {
          pt: "Propõe próximos passos / runbook e registra de volta no ticket.",
          en: "Proposes next steps / runbook and writes back to the ticket.",
        },
      },
      {
        title: { pt: "Validação QA-100", en: "QA-100 validation" },
        desc: {
          pt: "Uma bateria de 100 perguntas de regressão garante respostas consistentes a cada release.",
          en: "A 100-question regression battery keeps answers consistent on every release.",
        },
      },
    ],
    impact: {
      pt: "Reduz o tempo de diagnóstico (MTTR) entregando causa raiz e próximos passos já correlacionados, e padroniza a qualidade das respostas com regressão automatizada.",
      en: "Cuts diagnosis time (MTTR) by delivering correlated root cause and next steps, and standardizes answer quality with automated regression.",
    },
    stack: [
      "Dify (self-hosted)",
      "LLM orchestration",
      "Observability API",
      "ITSM API",
      "RAG (knowledge base)",
      "Python",
      "Docker",
    ],
    links: [],
  },
  {
    id: "whatsapp-swarm",
    kind: "agent",
    glyph: "群",
    icon: "chat",
    accent: "jade",
    confidential: false,
    name: {
      pt: "Concierge Multi-Agente no WhatsApp",
      en: "WhatsApp Multi-Agent Concierge",
    },
    tagline: {
      pt: "Oito agentes coordenados que vendem, atendem e fecham pedidos no WhatsApp.",
      en: "Eight coordinated agents that sell, support and close orders on WhatsApp.",
    },
    problem: {
      pt: "Um e-commerce de têxteis precisava atender, vender e dar suporte 24/7 no WhatsApp — integrando catálogo, pagamento e logística — sem uma equipe humana sempre disponível.",
      en: "A textile e-commerce needed to serve, sell and support 24/7 on WhatsApp — integrating catalog, payment and logistics — without an always-on human team.",
    },
    approach: {
      pt: "Uma orquestração de 8 agentes especializados (Google ADK) por trás do WhatsApp Business. Cada agente cuida de uma etapa — descoberta, carrinho, pagamento, frete, pós-venda — coordenados por um roteador e com memória do cliente.",
      en: "An orchestration of 8 specialized agents (Google ADK) behind WhatsApp Business. Each agent owns a stage — discovery, cart, payment, shipping, post-sale — coordinated by a router with customer memory.",
    },
    steps: [
      {
        title: { pt: "Roteamento", en: "Routing" },
        desc: {
          pt: "Um agente coordenador interpreta a intenção e direciona ao especialista certo.",
          en: "A coordinator agent reads intent and routes to the right specialist.",
        },
      },
      {
        title: { pt: "Catálogo & vendas", en: "Catalog & sales" },
        desc: {
          pt: "Agentes consultam o catálogo (WooCommerce) e montam o carrinho.",
          en: "Agents query the catalog (WooCommerce) and assemble the cart.",
        },
      },
      {
        title: { pt: "Pagamento", en: "Payment" },
        desc: {
          pt: "Gera cobrança via Mercado Pago (PIX/cartão) e confirma o status.",
          en: "Creates a charge via Mercado Pago (PIX/card) and confirms status.",
        },
      },
      {
        title: { pt: "Logística", en: "Logistics" },
        desc: {
          pt: "Cota e gera etiqueta de frete com o Melhor Envio.",
          en: "Quotes and generates shipping labels with Melhor Envio.",
        },
      },
      {
        title: { pt: "Memória & admin", en: "Memory & admin" },
        desc: {
          pt: "Persiste CPF, histórico e perfil do cliente; endpoints de admin protegidos por OTP.",
          en: "Persists customer ID, history and profile; admin endpoints protected by OTP.",
        },
      },
    ],
    impact: {
      pt: "Atendimento e vendas automatizados ponta a ponta no canal preferido do cliente, com pagamento e frete resolvidos dentro da própria conversa.",
      en: "End-to-end automated sales and support in the customer's favorite channel, with payment and shipping solved inside the conversation.",
    },
    stack: [
      "Google ADK",
      "FastAPI",
      "WhatsApp Business API",
      "WooCommerce",
      "Mercado Pago",
      "Melhor Envio",
      "Python",
    ],
    links: [
      { type: "code", label: "GitHub", url: "https://github.com/xSantiago3/diotex-tecidos" },
    ],
  },
  {
    id: "marketplace-automator",
    kind: "agent",
    glyph: "商",
    icon: "cart",
    accent: "gold",
    confidential: false,
    name: {
      pt: "Automador de Marketplace",
      en: "Marketplace Automator",
    },
    tagline: {
      pt: "Uma CLI que administra centenas de anúncios do Mercado Livre via API.",
      en: "A CLI that manages hundreds of Mercado Livre listings via API.",
    },
    problem: {
      pt: "Gerir preço, estoque e variações de centenas de anúncios de marketplace na mão é lento e propenso a erro — e a API tem armadilhas (OAuth, limites, redirecionamentos).",
      en: "Managing price, stock and variants for hundreds of marketplace listings by hand is slow and error-prone — and the API has traps (OAuth, limits, redirects).",
    },
    approach: {
      pt: "Uma ferramenta de linha de comando em Python que autentica via OAuth e faz CRUD em massa: baixa tudo para CSV/JSON, atualiza preço/estoque, pausa/reativa, cria kits e exporta para Google Sheets — inclusive extraindo dados de concorrentes.",
      en: "A Python CLI that authenticates via OAuth and does bulk CRUD: downloads everything to CSV/JSON, updates price/stock, pauses/reactivates, builds kits and exports to Google Sheets — even scraping competitor data.",
    },
    steps: [
      {
        title: { pt: "OAuth & sync", en: "OAuth & sync" },
        desc: {
          pt: "Autentica (offline_access) e baixa todos os anúncios para CSV/JSON.",
          en: "Authenticates (offline_access) and downloads every listing to CSV/JSON.",
        },
      },
      {
        title: { pt: "CRUD em massa", en: "Bulk CRUD" },
        desc: {
          pt: "Cria, atualiza preço/estoque e pausa/reativa anúncios via API.",
          en: "Creates, updates price/stock and pauses/reactivates listings via API.",
        },
      },
      {
        title: { pt: "Criação de kits", en: "Kit creation" },
        desc: {
          pt: "Monta combos/kits em lote a partir de regras.",
          en: "Builds combos/kits in bulk from rules.",
        },
      },
      {
        title: { pt: "Export & inteligência", en: "Export & intelligence" },
        desc: {
          pt: "Exporta para Google Sheets e extrai produtos de concorrentes para comparação.",
          en: "Exports to Google Sheets and scrapes competitor products for comparison.",
        },
      },
    ],
    impact: {
      pt: "Operação de marketplace gerida em minutos em vez de horas, com dados sempre exportados e auditáveis.",
      en: "Marketplace operations managed in minutes instead of hours, with data always exported and auditable.",
    },
    stack: ["Python", "Mercado Livre API", "OAuth 2.0", "Google Sheets API", "Pandas"],
    links: [],
  },
  {
    id: "doc-router",
    kind: "agent",
    glyph: "書",
    icon: "doc",
    accent: "sakura",
    confidential: false,
    name: {
      pt: "Agente Roteador de Documentos (OCR)",
      en: "Document Router Agent (OCR)",
    },
    tagline: {
      pt: "Lê, classifica, renomeia e arquiva documentos no Drive sozinho.",
      en: "Reads, classifies, renames and files documents to Drive on its own.",
    },
    problem: {
      pt: "Pilhas de documentos (PDFs, imagens, notas) precisavam ser lidos, classificados e arquivados na pasta certa do Drive — trabalho manual, repetitivo e sujeito a erro.",
      en: "Stacks of documents (PDFs, images, invoices) had to be read, classified and filed in the right Drive folder — manual, repetitive, error-prone work.",
    },
    approach: {
      pt: "Um agente (Google ADK) que faz OCR com a Cloud Vision, usa um LLM para classificar o conteúdo, renomeia o arquivo conforme o que leu e faz upload para a pasta correta do Google Drive.",
      en: "An agent (Google ADK) that OCRs with Cloud Vision, uses an LLM to classify the content, renames the file from what it read and uploads it to the right Google Drive folder.",
    },
    steps: [
      {
        title: { pt: "Leitura (OCR)", en: "Reading (OCR)" },
        desc: {
          pt: "Cloud Vision extrai o texto de imagens e PDFs.",
          en: "Cloud Vision extracts text from images and PDFs.",
        },
      },
      {
        title: { pt: "Classificação", en: "Classification" },
        desc: {
          pt: "Um LLM decide o tipo do documento e a pasta de destino.",
          en: "An LLM decides the document type and target folder.",
        },
      },
      {
        title: { pt: "Renomeação", en: "Renaming" },
        desc: {
          pt: "O arquivo é renomeado a partir do conteúdo (data, tipo, identificador).",
          en: "The file is renamed from its content (date, type, identifier).",
        },
      },
      {
        title: { pt: "Arquivamento", en: "Filing" },
        desc: {
          pt: "Upload automático para a pasta certa no Google Drive.",
          en: "Automatic upload to the correct Google Drive folder.",
        },
      },
    ],
    impact: {
      pt: "Elimina a triagem manual: o que era pilha vira pasta organizada e nomeada de forma consistente.",
      en: "Eliminates manual triage: what was a pile becomes an organized, consistently named folder.",
    },
    stack: ["Google ADK", "Cloud Vision (OCR)", "Gemini", "Google Drive API", "Python"],
    links: [],
  },
  {
    id: "impact-api",
    kind: "agent",
    glyph: "福",
    icon: "heart",
    accent: "jade",
    confidential: false,
    name: {
      pt: "API de Impacto Social",
      en: "Social-Impact Report API",
    },
    tagline: {
      pt: "Transforma relatos livres em indicadores comparáveis — com multi-LLM.",
      en: "Turns free-text reports into comparable indicators — multi-LLM.",
    },
    problem: {
      pt: "Uma organização de impacto social precisava transformar relatos livres sobre as famílias atendidas em dados padronizados e comparáveis, com um indicador de evolução.",
      en: "A social-impact organization needed to turn free-text reports about assisted families into standardized, comparable data with a progress indicator.",
    },
    approach: {
      pt: "Uma API em Python com 3 endpoints: padroniza o relato e gera um score, resume a evolução de uma família num período e responde consultas gerais — com suporte a múltiplos provedores de LLM (OpenAI, Gemini, Claude) e fallback explícito.",
      en: "A Python API with 3 endpoints: standardizes a report and emits a score, summarizes a family's evolution over a period, and answers general queries — with multiple LLM providers (OpenAI, Gemini, Claude) and explicit fallback.",
    },
    steps: [
      {
        title: { pt: "Padronização", en: "Standardization" },
        desc: {
          pt: "Normaliza o relato livre e calcula um score comparável.",
          en: "Normalizes the free-text report and computes a comparable score.",
        },
      },
      {
        title: { pt: "Evolução", en: "Evolution" },
        desc: {
          pt: "Resume a trajetória de uma família em um período.",
          en: "Summarizes a family's trajectory over a period.",
        },
      },
      {
        title: { pt: "Consulta", en: "Querying" },
        desc: {
          pt: "Responde perguntas gerais sobre as famílias atendidas.",
          en: "Answers general questions about the assisted families.",
        },
      },
      {
        title: { pt: "Multi-LLM", en: "Multi-LLM" },
        desc: {
          pt: "Provider plugável (OpenAI/Gemini/Claude) com erro explícito quando indisponível.",
          en: "Pluggable provider (OpenAI/Gemini/Claude) with explicit errors when unavailable.",
        },
      },
    ],
    impact: {
      pt: "Dá visibilidade mensurável ao trabalho social — relatos viram indicadores que ajudam a priorizar quem mais precisa.",
      en: "Gives measurable visibility to social work — reports become indicators that help prioritize those who need it most.",
    },
    stack: ["Python", "FastAPI", "PostgreSQL", "OpenAI / Gemini / Claude", "RAG"],
    links: [],
  },
];

/* ------------------------------------------------------------------ *
 * Zone 3 — Builds & products (shipped sites)
 * ------------------------------------------------------------------ */
const builds: Project[] = [
  {
    id: "threerec",
    kind: "build",
    glyph: "写",
    icon: "camera",
    accent: "sakura",
    confidential: false,
    name: {
      pt: "THREEREC — Portfólio de Fotografia",
      en: "THREEREC — Photography Portfolio",
    },
    tagline: {
      pt: "Galeria com curtidas, comentários e painel admin — no ar.",
      en: "Gallery with likes, comments and an admin panel — live.",
    },
    problem: {
      pt: "Fotógrafos queriam um portfólio rápido e bonito com interação (curtidas/comentários) sem depender de redes sociais — e fácil de administrar.",
      en: "Photographers wanted a fast, beautiful portfolio with interaction (likes/comments) without depending on social media — and easy to manage.",
    },
    approach: {
      pt: "Site Next.js 16 inteiramente sobre Firebase (Auth, Firestore, Storage, App Hosting). Galerias por categoria com lightbox, curtidas sem login e logadas, comentários moderados, feed do Instagram e painel /admin.",
      en: "A Next.js 16 site fully on Firebase (Auth, Firestore, Storage, App Hosting). Category galleries with lightbox, anonymous and signed-in likes, moderated comments, an Instagram feed and an /admin panel.",
    },
    steps: [
      {
        title: { pt: "Galerias & lightbox", en: "Galleries & lightbox" },
        desc: {
          pt: "Categorias com URL compartilhável por foto.",
          en: "Categories with a shareable URL per photo.",
        },
      },
      {
        title: { pt: "Curtidas anti-fraude", en: "Anti-fraud likes" },
        desc: {
          pt: "Contador mantido por Cloud Function + security rules.",
          en: "Counter kept by a Cloud Function + security rules.",
        },
      },
      {
        title: { pt: "Painel admin", en: "Admin panel" },
        desc: {
          pt: "Upload com resize automático (WebP 400/1080/1920), drag & drop e moderação.",
          en: "Upload with auto-resize (WebP 400/1080/1920), drag & drop and moderation.",
        },
      },
      {
        title: { pt: "Integração", en: "Integration" },
        desc: {
          pt: "Feed do Instagram (Graph API) com fallback gracioso.",
          en: "Instagram feed (Graph API) with graceful fallback.",
        },
      },
    ],
    impact: {
      pt: "Portfólio ao vivo, rápido e seguro — originais em alta nunca são servidos ao público.",
      en: "A live, fast and secure portfolio — high-res originals are never served to the public.",
    },
    stack: ["Next.js 16", "Firebase", "Cloud Functions", "App Hosting", "TypeScript"],
    links: [{ type: "live", label: "threerec.com.br", url: "https://threerec.com.br" }],
  },
  {
    id: "brsmartflow",
    kind: "build",
    glyph: "流",
    icon: "bot",
    accent: "gold",
    confidential: false,
    name: {
      pt: "BRSmartFlow — Institucional + Chatbot",
      en: "BRSmartFlow — Institutional + Chatbot",
    },
    tagline: {
      pt: "Site bilíngue com chatbot de IA (Claude via Vertex AI) e anti-abuso.",
      en: "Bilingual site with an AI chatbot (Claude via Vertex AI) and abuse limits.",
    },
    problem: {
      pt: "Uma empresa precisava de presença institucional moderna e bilíngue, com um assistente de IA para qualificar leads — barata de operar e segura contra abuso.",
      en: "A company needed a modern, bilingual institutional presence with an AI assistant to qualify leads — cheap to run and safe against abuse.",
    },
    approach: {
      pt: "Frontend Next.js exportado estático no Firebase Hosting (CDN) + Cloud Functions gen2 (escala a zero). O chat usa Claude via Vertex AI com streaming; o formulário grava no Firestore e dispara e-mail; tudo com App Check/reCAPTCHA.",
      en: "A static-exported Next.js frontend on Firebase Hosting (CDN) + Cloud Functions gen2 (scale-to-zero). Chat uses Claude via Vertex AI with streaming; the form writes to Firestore and sends email; all behind App Check/reCAPTCHA.",
    },
    steps: [
      {
        title: { pt: "Frontend estático", en: "Static frontend" },
        desc: {
          pt: "Next.js export em CDN — rápido e barato.",
          en: "Next.js export on a CDN — fast and cheap.",
        },
      },
      {
        title: { pt: "Chat com IA", en: "AI chat" },
        desc: {
          pt: "/api/chat → Vertex AI (Claude Haiku 4.5) com streaming.",
          en: "/api/chat → Vertex AI (Claude Haiku 4.5) with streaming.",
        },
      },
      {
        title: { pt: "Leads", en: "Leads" },
        desc: {
          pt: "/api/contact grava no Firestore e envia e-mail (Resend).",
          en: "/api/contact writes to Firestore and sends email (Resend).",
        },
      },
      {
        title: { pt: "Segurança", en: "Security" },
        desc: {
          pt: "App Check/reCAPTCHA + limites por sessão, IP e dia.",
          en: "App Check/reCAPTCHA + per-session, per-IP and daily limits.",
        },
      },
    ],
    impact: {
      pt: "Presença institucional bilíngue com assistente de IA, rodando praticamente a custo zero quando ociosa.",
      en: "A bilingual institutional presence with an AI assistant, running at near-zero cost when idle.",
    },
    stack: [
      "Next.js",
      "Vertex AI (Claude)",
      "Firebase Hosting",
      "Cloud Functions gen2",
      "Firestore",
      "Resend",
    ],
    links: [],
  },
  {
    id: "diotex-loja",
    kind: "build",
    glyph: "布",
    icon: "store",
    accent: "jade",
    confidential: false,
    name: {
      pt: "Diotex Tecidos — Loja Completa",
      en: "Diotex Tecidos — Full E-commerce",
    },
    tagline: {
      pt: "E-commerce do zero: vitrine, checkout transparente, frete e admin.",
      en: "E-commerce from scratch: storefront, transparent checkout, shipping and admin.",
    },
    problem: {
      pt: "Substituir uma loja WooCommerce/HostGator por uma plataforma própria — mais rápida e barata — com pagamento e frete integrados e venda por metro de tecido.",
      en: "Replace a WooCommerce/HostGator store with an owned platform — faster and cheaper — with integrated payment, shipping and per-meter fabric sales.",
    },
    approach: {
      pt: "App único Next.js 16 (vitrine + checkout + admin + API), Postgres via Prisma, pagamentos Mercado Pago (Checkout Transparente/Bricks) e frete Melhor Envio, deploy no Cloud Run. Valores sempre em centavos inteiros.",
      en: "A single Next.js 16 app (storefront + checkout + admin + API), Postgres via Prisma, Mercado Pago (transparent checkout/Bricks) and Melhor Envio shipping, deployed on Cloud Run. Money is always integer cents.",
    },
    steps: [
      {
        title: { pt: "Vitrine & catálogo", en: "Storefront & catalog" },
        desc: {
          pt: "Produtos vendidos por metro, com variações.",
          en: "Products sold per meter, with variants.",
        },
      },
      {
        title: { pt: "Checkout transparente", en: "Transparent checkout" },
        desc: {
          pt: "PIX/cartão/boleto via Mercado Pago Bricks, dentro do site.",
          en: "PIX/card/boleto via Mercado Pago Bricks, inside the site.",
        },
      },
      {
        title: { pt: "Frete", en: "Shipping" },
        desc: {
          pt: "Cotação por CEP e etiquetas com Melhor Envio.",
          en: "Quote-by-ZIP and labels with Melhor Envio.",
        },
      },
      {
        title: { pt: "Admin & deploy", en: "Admin & deploy" },
        desc: {
          pt: "Painel protegido (Auth.js) e deploy no Cloud Run.",
          en: "Protected panel (Auth.js) and deploy on Cloud Run.",
        },
      },
    ],
    impact: {
      pt: "Loja própria mais rápida e barata que a anterior, com checkout e frete sob controle total.",
      en: "An owned store that's faster and cheaper than before, with full control of checkout and shipping.",
    },
    stack: [
      "Next.js 16",
      "Prisma + PostgreSQL",
      "Mercado Pago",
      "Melhor Envio",
      "Auth.js",
      "Cloud Run",
    ],
    links: [],
  },
  {
    id: "erp-brsmartflow",
    kind: "build",
    glyph: "経",
    icon: "grid",
    accent: "gold",
    confidential: false,
    name: {
      pt: "ERP BRSmartFlow — SaaS Multicanal",
      en: "BRSmartFlow ERP — Multi-channel SaaS",
    },
    tagline: {
      pt: "ERP multi-tenant que publica um produto em todos os canais com o preço certo.",
      en: "Multi-tenant ERP that lists a product to every channel at the right price.",
    },
    problem: {
      pt: "Quem vende em Mercado Livre, Shopee e loja própria precisa cadastrar o mesmo produto várias vezes e calcular a taxa/preço de cada canal na mão — caro e propenso a erro.",
      en: "Sellers on Mercado Livre, Shopee and their own store re-list the same product many times and compute each channel's fee/price by hand — costly and error-prone.",
    },
    approach: {
      pt: "Um ERP SaaS multi-tenant (monorepo TypeScript) que cadastra o produto uma vez e distribui para todos os canais já com a taxa/preço correto, via um motor de preço (gross-up) e adapters por canal. Estoque, pedidos e relatórios unificados.",
      en: "A multi-tenant SaaS ERP (TypeScript monorepo) that registers a product once and distributes it to every channel already at the right fee/price, via a pricing engine (gross-up) and per-channel adapters. Unified stock, orders and reports.",
    },
    steps: [
      {
        title: { pt: "Cadastro único", en: "Single registration" },
        desc: {
          pt: "Publica o produto e distribui para ML, Shopee e loja própria.",
          en: "Publishes the product and distributes it to ML, Shopee and the own store.",
        },
      },
      {
        title: { pt: "Motor de preço", en: "Pricing engine" },
        desc: {
          pt: "Gross-up calcula o preço por canal com a taxa correta; kits (BOM).",
          en: "Gross-up computes per-channel price with the correct fee; kits (BOM).",
        },
      },
      {
        title: { pt: "Integrações", en: "Integrations" },
        desc: {
          pt: "Adapters com OAuth, idempotência e retry por canal.",
          en: "Adapters with OAuth, idempotency and retry per channel.",
        },
      },
      {
        title: { pt: "Infra enxuta", en: "Lean infra" },
        desc: {
          pt: "Cloud Run (scale-to-zero) + Postgres serverless + Cloud Tasks.",
          en: "Cloud Run (scale-to-zero) + serverless Postgres + Cloud Tasks.",
        },
      },
    ],
    impact: {
      pt: "Menos retrabalho e erro de precificação ao vender em múltiplos marketplaces a partir de uma fonte única.",
      en: "Less rework and pricing error when selling across marketplaces from a single source of truth.",
    },
    stack: ["NestJS", "Next.js", "Prisma + Postgres", "Cloud Run", "Cloud Tasks", "Turborepo"],
    links: [],
  },
];

export const projects: Project[] = [...agents, ...builds];
export const agentProjects = agents;
export const buildProjects = builds;

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
