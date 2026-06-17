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

## M6 — Contato ✅ (live)
- [x] Cloud Function gen2 **no ar** em `southamerica-east1` (R5)
- [x] Endurecida pós-revisão de segurança: CORS restrito à origem, Content-Type/16KB, sanitização de
  control-chars, reCAPTCHA fail-closed, **rate-limit durável no Firestore** (IP hasheado, buckets com TTL),
  PII minimizada (sem IP cru) (R5)
- [x] Regras Firestore **deny-all** (`firestore.rules`) — coleção `leads`/`ratelimits` só via Admin SDK
- [x] Leads gravados no **Firestore** (e-mail via Resend fica plugável; free tier do usuário esgotado)
- [x] Testado end-to-end: 405/415/400/200/429 corretos; fallback mailto no cliente (R5)

## M7 — Segurança & performance ✅
- [x] Headers CSP/HSTS/etc. em `firebase.json`; Phaser code-split; export estático (R6)

## M8 — Deploy ✅ (live)
- [x] `firebase.json` + GitHub Actions (build/deploy)
- [x] Projeto Firebase dedicado `allan-oshima-portfolio` criado + `firebase deploy --only hosting`
- [x] **No ar: https://allan-oshima-portfolio.web.app** (headers de segurança + cache imutável validados)
- [x] (Opcional) Plano **Blaze** (conta Principal2) + função de contato no ar + **alerta de orçamento** R$30/mês
- [x] (Opcional) **CI auto-deploy keyless** via Workload Identity Federation (sem chave) — validado num push real
- [ ] (Opcional) **Domínio próprio** — adiado pelo usuário ("decidir depois"); passo a passo em `docs/CUSTOM_DOMAIN.md`
