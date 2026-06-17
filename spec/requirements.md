# Requirements — user stories + critérios de aceite (EARS)

## R1 — Jornada gamificada (principal)
**Como** visitante, **quero** percorrer os projetos como uma jornada japonesa **para** entender
a trajetória e as automações do Allan de forma memorável.
- WHEN a página carrega, THE SYSTEM SHALL exibir o Modo Jornada (sem exigir clique).
- WHEN o visitante rola a página, THE SYSTEM SHALL revelar as 4 zonas (Origem, Agentes, Projetos, Dojo)
  e atualizar a barra de jornada (XP) no HUD.
- WHEN o visitante abre uma estação de projeto, THE SYSTEM SHALL registrar a visita e atualizar conquistas.

## R2 — Modo Arcade (opcional)
**Como** visitante, **quero** controlar um personagem por um mundo **para** explorar de um jeito divertido.
- WHEN o visitante clica "Play/Arcade", THE SYSTEM SHALL carregar o jogo (Phaser) sob demanda.
- WHEN o personagem chega numa estação e o visitante interage, THE SYSTEM SHALL abrir o mesmo painel do projeto.
- WHEN o visitante sai do arcade, THE SYSTEM SHALL preservar progresso e conquistas (compartilhados com a Jornada).

## R3 — Bilíngue PT/EN
- WHEN o visitante troca o idioma, THE SYSTEM SHALL navegar entre `/pt` e `/en` e trocar todo o texto.
- THE SYSTEM SHALL expor `hreflang`, `lang` e `canonical` corretos por idioma.

## R4 — Automações explicadas (foco)
- WHEN o visitante abre uma automação, THE SYSTEM SHALL mostrar problema, abordagem, pipeline passo a passo,
  impacto e stack.
- WHERE o projeto é de cliente, THE SYSTEM SHALL anonimizar e não linkar repositório privado.

## R5 — Contato seguro
- WHEN o visitante envia o formulário, THE SYSTEM SHALL validar no servidor, aplicar honeypot + rate-limit
  e (se configurado) reCAPTCHA, então registrar/encaminhar a mensagem.
- IF o backend estiver indisponível, THE SYSTEM SHALL oferecer fallback por e-mail (mailto).

## R6 — Performance, segurança, acessibilidade
- THE SYSTEM SHALL ser exportado estático e servido por CDN com headers de segurança (CSP/HSTS/etc.).
- WHEN `prefers-reduced-motion` está ativo, THE SYSTEM SHALL reduzir animações sem perder conteúdo.
- THE SYSTEM SHALL ser navegável por teclado e atingir Lighthouse ≥ 90.

## R7 — Currículo
- THE SYSTEM SHALL oferecer download do CV em PT e EN no Dojo.
