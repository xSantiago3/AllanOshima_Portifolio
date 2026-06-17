# CLAUDE.md — guia do projeto

Portfólio gamificado do Allan Oshima (IA/ML). Tema japonês preto & dourado, bilíngue PT/EN,
export estático Next.js na Firebase Hosting. Dois modos: **Jornada** (padrão, scroll) e **Arcade**
(opcional, Phaser sob demanda) — ambos consomem o mesmo conteúdo.

## Comandos
- `npm run dev` — dev server (raiz `/` redireciona para `/pt` ou `/en`)
- `npm run build` — export estático em `out/`
- `npm run lint`

## Princípios (ver `spec/constitution.md`)
- Bilíngue de verdade: todo texto vem de `messages/{pt,en}.json` ou de `{ pt, en }` em `content/`.
- Conteúdo é fonte única: `content/` alimenta Jornada e Arcade. Não duplicar texto.
- Trabalho de cliente é anonimizado (`confidential: true`, sem links de repo privado).
- Acessível/degradável: Jornada é o caminho de SEO/teclado; Arcade é camada por cima.
- Phaser só carrega no Arcade (dynamic import) — não importar Phaser fora de `components/arcade/*`.

## Onde mexer
- Projetos/automações → `content/projects.ts` · Perfil/skills → `content/profile.ts`
- Strings de UI → `messages/pt.json` + `messages/en.json` (manter as duas com a mesma forma)
- Estado (XP/conquistas) → `lib/progress.ts` · Modais → `lib/ui.ts` · Conquistas → `lib/achievements.ts`
- Segurança/headers/deploy → `firebase.json` · Contato → `functions/src/index.ts`
