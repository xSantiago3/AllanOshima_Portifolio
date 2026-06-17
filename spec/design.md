# Design — arquitetura, game design e modelo de conteúdo

## Stack
- **Next.js 16** (App Router) + **React 19** + **TypeScript strict**, `output: "export"` (estático).
- **Tailwind CSS v4** com tokens de design em `app/globals.css` (`@theme`).
- **motion** (Framer Motion) para animações; **Phaser 4** para o arcade (carregado por `dynamic import`).
- **Firebase Hosting** (CDN) + **Cloud Functions gen2** (contato).

## i18n
- Rotas `app/[locale]/` com `generateStaticParams` → `/pt` e `/en`. Raiz `/` detecta idioma e redireciona.
- Strings de UI em `messages/{pt,en}.json` (tipadas via `lib/i18n.ts`). Conteúdo em `content/` usa `{ pt, en }`.
- `components/providers/I18nProvider.tsx` injeta `locale` + `dict`; `HtmlLang` ajusta `<html lang>`.

## Game design — 4 zonas (compartilhadas pelos dois modos)
| Zona | Conteúdo |
|---|---|
| Origem | About + trajetória + formação + idiomas |
| Agentes | 5 automações/agentes (foco) — cada uma com pipeline animado |
| Projetos | 4 produtos/sites entregues |
| Dojo | Skill tree, certificações, CV (PT/EN), contato |

- **Jornada (padrão):** seções com `Reveal` (scroll-reveal), `JourneyBackground` (parallax), `Sakura` (pétalas em canvas).
- **Arcade (opcional):** `components/arcade/ArcadeOverlay` → `ArcadeGame` (boot Phaser) → `WorldScene`
  (mundo lateral procedural em preto/dourado; personagem; estações = torii; interação abre o painel).
- **Estado compartilhado:** `lib/progress.ts` (XP/visitas/conquistas em `localStorage`, via `useSyncExternalStore`);
  `lib/ui.ts` (modal de projeto, arcade, painel de conquistas). Conquistas em `lib/achievements.ts`.
- **Easter egg:** Konami code (`components/journey/Secret.tsx`) → tempestade de sakura + badge.

## Modelo de conteúdo (`content/`)
- `types.ts` — `Project` (problem/approach/steps/impact/stack/links/confidential/accent), `SkillGroup`, `Profile`.
- `projects.ts` — 5 agentes + 4 builds (anonimizados; só links públicos/ao vivo).
- `profile.ts` — trajetória, certificações, skill groups com níveis.

## Segurança & performance
- Headers (CSP/HSTS/etc.) em `firebase.json`. Phaser em chunk separado (só no arcade).
- Função de contato: validação + honeypot + rate-limit + reCAPTCHA opcional + Firestore/Resend.

## Deploy
- `next build` → `out/` → `firebase deploy --only hosting`. Função exige plano Blaze (form cai em mailto até lá).
- CI/CD: GitHub Actions (build em PR, deploy de Hosting em `main`).
