# Allan Oshima — Portfólio gamificado

Portfólio de **Allan Oshima** (especialista em IA/ML), com tema japonês **preto & dourado**.
Uma **jornada gamificada** (padrão) por onde o visitante percorre as automações/agentes e os
produtos entregues — e um **Modo Arcade** opcional (personagem pixel-art num mundo Phaser).
Bilíngue **PT/EN**, export estático, hospedado na **GCP (Firebase Hosting)**.

## Stack
- Next.js 16 (App Router) + React 19 + TypeScript — `output: "export"` (estático)
- Tailwind CSS v4 · motion (Framer Motion) · Phaser 4 (arcade, carregado sob demanda)
- Firebase Hosting (CDN) + Cloud Functions gen2 (formulário de contato)

## Rodar localmente
```bash
npm install
npm run dev          # http://localhost:3000  (→ redireciona p/ /pt ou /en)
```

## Build estático
```bash
npm run build        # gera ./out (export estático)
```

## Estrutura
```
app/                 App Router: layout raiz, redirect de idioma, app/[locale]/{layout,page}
components/
  journey/           Modo Jornada (Hero, zonas, HUD, painel de projeto, skill tree, contato)
  arcade/            Modo Arcade (overlay + boot Phaser + WorldScene)
  ui/                Ícones, pétalas de sakura
  providers/         I18nProvider, HtmlLang
content/             Dados tipados: projects.ts (agentes + builds), profile.ts, types.ts
messages/            Dicionários de UI: pt.json, en.json
lib/                 i18n, progress (XP/conquistas), ui (modais), achievements, sfx, fonts
functions/           Cloud Function de contato (gen2)
spec/                Spec-driven: constitution, requirements, design, tasks
public/cv/           Currículos (PT/EN)
```

## Editar conteúdo
- **Projetos:** `content/projects.ts` (cada campo tem `{ pt, en }`). Repos privados ficam `confidential: true` e sem `links`.
- **Perfil/skills:** `content/profile.ts`. **Textos de UI:** `messages/pt.json` + `messages/en.json` (mesma forma).

## Deploy (GCP)
Pré-requisito: `firebase-tools` autenticado (login ou ADC do gcloud).
```bash
npm run build
npx firebase-tools deploy --only hosting --project <PROJECT_ID>
```
O formulário de contato usa a Cloud Function (`/api/contact`); enquanto ela não estiver no ar
(requer plano Blaze), o formulário cai graciosamente em `mailto:`. Headers de segurança e cache
estão em `firebase.json`. Veja `spec/tasks.md` (M8) para os passos de domínio próprio.

## Acessibilidade
O Modo Jornada é a fonte de conteúdo/SEO, é navegável por teclado e respeita `prefers-reduced-motion`.
O Arcade é uma camada opcional. Easter egg: o **Konami code** libera uma conquista secreta.
