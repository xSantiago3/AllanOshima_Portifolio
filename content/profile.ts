import type { Profile, SkillGroup } from "./types";

export const profile: Profile = {
  name: "Allan Oshima",
  glyph: "大島",
  title: {
    pt: "Analista Sênior de IA/ML — Computational Science",
    en: "Senior AI/ML Computational Science Analyst",
  },
  location: { pt: "São Paulo, Brasil", en: "São Paulo, Brazil" },
  email: "santiago-allan@hotmail.com",
  github: "https://github.com/xSantiago3",
  whatsapp: "https://wa.me/5511982732814",
  career: [
    {
      company: "Accenture",
      role: {
        pt: "Analista Sênior de IA/ML (Computational Science)",
        en: "AI/ML Computational Science Sr Analyst",
      },
      period: "2023 — ",
      current: true,
      summary: {
        pt: "Desenvolvo e evoluo soluções com GenAI e automação inteligente: agentes de IA, fluxos conversacionais e chatbots para atendimento, vendas e suporte. Atuo também em observabilidade e AIOps em ambientes de missão crítica, com resposta inteligente a incidentes e automação de remediação.",
        en: "I build and evolve GenAI and intelligent-automation solutions: AI agents, conversational flows and chatbots for service, sales and support. I also work in observability and AIOps for mission-critical environments, with intelligent incident response and remediation automation.",
      },
    },
    {
      company: "Tenbu",
      role: {
        pt: "Analista de Sistemas Sênior",
        en: "Senior Systems Analyst",
      },
      period: "2021 — 2023",
      summary: {
        pt: "Sustentação e suporte de ambientes analíticos, garantindo disponibilidade e performance de ferramentas de visualização e análise de dados; diagnóstico de problemas e melhoria contínua.",
        en: "Sustaining and supporting analytical environments — availability and performance of data-visualization and analytics tools; problem diagnosis and continuous improvement.",
      },
    },
    {
      company: "Keyrus",
      role: {
        pt: "Analista de Suporte Júnior / Estágio",
        en: "Junior Support Analyst / Internship",
      },
      period: "2020 — 2021",
      summary: {
        pt: "Início da carreira implementando e mantendo ferramentas e servidores analíticos. Desenvolvimento de soluções em T-SQL e criação/manutenção de processos de ETL — uma base sólida em dados e integração de sistemas.",
        en: "Career start implementing and maintaining analytical tools and servers. Built T-SQL solutions and created/maintained ETL processes — a solid foundation in data and systems integration.",
      },
    },
  ],
  certifications: [
    "Artificial Intelligence and Machine Learning",
    "Reinvention with Agentic AI",
    "Generative AI APIs for Practical Applications",
    "ChatGPT Prompt Engineering — Examples & Use Cases",
    "Salesforce Academy — Agentforce",
  ],
};

export const skillGroups: SkillGroup[] = [
  {
    key: "groupGenai",
    glyph: "知",
    accent: "gold",
    skills: [
      { name: "GenAI", level: "expert" },
      { name: "AI Agents", level: "expert" },
      { name: "Chatbot Development", level: "expert" },
      { name: "Workflow Automation", level: "advanced" },
    ],
  },
  {
    key: "groupAiops",
    glyph: "守",
    accent: "vermillion",
    skills: [
      { name: "AIOps", level: "specialist" },
      { name: "Observability", level: "specialist" },
      { name: "Incident Response", level: "intermediate" },
    ],
  },
  {
    key: "groupEng",
    glyph: "技",
    accent: "jade",
    skills: [
      { name: "Python", level: "specialist" },
      { name: "SQL", level: "specialist" },
      { name: "Linux", level: "specialist" },
      { name: "Data Visualization", level: "advanced" },
      { name: "ETL", level: "intermediate" },
    ],
  },
  {
    key: "groupCraft",
    glyph: "道",
    accent: "sakura",
    skills: [
      { name: "Functional Analysis", level: "specialist" },
      { name: "Scrum / Agile", level: "advanced" },
      { name: "Communication", level: "advanced" },
      { name: "Ownership & Delivery", level: "expert" },
    ],
  },
];

export const levelValue: Record<string, number> = {
  expert: 100,
  specialist: 85,
  advanced: 70,
  intermediate: 50,
};
