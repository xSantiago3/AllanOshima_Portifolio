# Constitution — princípios inegociáveis

Estes princípios guiam toda decisão neste projeto. Em caso de conflito, vencem
sobre conveniência de implementação.

1. **Bilíngue de verdade.** Todo texto visível vem dos dicionários (`messages/pt.json`,
   `messages/en.json`) ou de objetos `{ pt, en }` em `content/`. Nada hardcoded em uma língua só.

2. **Acessível e degradável.** O Modo Arcade é uma camada opcional por cima. O conteúdo
   (projetos, automações, skills, contato) existe e funciona como HTML semântico no Modo Jornada,
   que respeita `prefers-reduced-motion` e navegação por teclado. É a fonte para SEO.

3. **Seguro por padrão.** Zero segredos no cliente. CSP estrito + HSTS + headers de segurança no CDN.
   O formulário de contato valida no servidor, com honeypot, rate-limit e reCAPTCHA opcional.

4. **Performático.** Phaser e o mundo do arcade só carregam sob demanda (dynamic import ao clicar Play).
   Export estático na CDN. Meta: Lighthouse ≥ 90 em Performance/SEO/Best-Practices/Acessibilidade.

5. **Estética coerente.** Preto sumi + dourado metálico + tema japonês em todos os estados e telas.

6. **Conteúdo é fonte única.** Projetos/skills/perfil vivem em `content/` (tipado). Jornada e Arcade
   consomem os mesmos dados — nunca se duplica conteúdo.

7. **Confidencialidade.** Trabalho de cliente é anonimizado (sem nomes de cliente, sem repositórios
   privados linkados). Descreve-se capacidade e impacto.
