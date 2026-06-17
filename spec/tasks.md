# Tasks — por milestone (rastreável aos requisitos)

## M0 — Scaffold ✅
- [x] Next 16 + TS + Tailwind v4 + i18n routing + export estático (R3, R6)

## M1 — Design system ✅
- [x] Tokens preto/dourado, fontes japonesas (mincho/pixel), componentes base (R5 estética)

## M2 — Conteúdo ✅
- [x] `content/projects.ts` (5 agentes + 4 builds, anonimizados) + `profile.ts` (R4)
- [x] Dicionários PT/EN + SEO (hreflang/canonical/JSON metadata) (R3)
- [x] CVs em `public/cv` (R7)

## M3 — Modo Jornada (principal) ✅
- [x] Hero, ZoneHeader, Origin, AgentsZone, BuildsZone, Dojo, Footer (R1)
- [x] HUD (idioma, XP, som, conquistas, Play), painel de projeto, diagrama de automação (R1, R4)
- [x] Conquistas + toast + easter egg; reduced-motion (R6)

## M4 — Modo Arcade (opcional) ✅
- [x] `ArcadeOverlay` + `ArcadeGame` (Phaser dynamic import) + `WorldScene` (R2)
- [x] Personagem, input teclado + D-pad, estações reusando o painel; progresso compartilhado (R2)

## M5 — Assets ✅
- [x] Mundo/pétalas/personagem desenhados proceduralmente (sem dependência de pack externo) → ver CREDITS.md

## M6 — Contato ✅
- [x] Cloud Function gen2 (validação + honeypot + rate-limit + reCAPTCHA opcional + Firestore/Resend) (R5)
- [x] Fallback mailto no cliente (R5)

## M7 — Segurança & performance ✅
- [x] Headers CSP/HSTS/etc. em `firebase.json`; Phaser code-split; export estático (R6)

## M8 — Deploy ✅ (live)
- [x] `firebase.json` + GitHub Actions (build/deploy)
- [x] Projeto Firebase dedicado `allan-oshima-portfolio` criado + `firebase deploy --only hosting`
- [x] **No ar: https://allan-oshima-portfolio.web.app** (headers de segurança + cache imutável validados)
- [ ] (Opcional) Plano Blaze + deploy da função de contato (form usa mailto até lá)
- [ ] (Opcional) Domínio próprio
- [ ] (Opcional) CI auto-deploy: adicionar secret `FIREBASE_SERVICE_ACCOUNT` no GitHub (variable já configurada)
