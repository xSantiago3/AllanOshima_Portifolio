# Conectar um domínio próprio (quando quiser)

O site está no ar em **https://allan-oshima-portfolio.web.app**. Para usar um domínio próprio:

## 1. Registrar o domínio
- **`.com` / `.dev`** (recomendado, ~US$12/ano): registro via Google Cloud Domains, já na conta de billing do projeto:
  ```bash
  export GOOGLE_APPLICATION_CREDENTIALS="$HOME/.config/gcloud/application_default_credentials.json"
  gcloud domains registrations search-domains "allanoshima.com" --project=allan-oshima-portfolio   # confere disponibilidade/preço
  gcloud domains registrations register allanoshima.com --project=allan-oshima-portfolio            # registra (cobra na Principal2)
  ```
- **`.com.br`** (~R$40/ano): o Cloud Domains não registra `.com.br` — registre no **registro.br** e depois siga o passo 2.

## 2. Adicionar o domínio no Firebase Hosting
Console → projeto `allan-oshima-portfolio` → **Build → Hosting** → site → **Add custom domain**.
1. Informe o domínio (ex.: `allanoshima.com` e/ou `www.allanoshima.com`).
2. **Verificação:** adicione no DNS o registro **TXT** que o Firebase mostrar (host `@`).
3. **Apontamento:** adicione os **registros A** que o wizard exibir (apex `@` → IPs anycast do Firebase, normalmente `151.101.1.195` e `151.101.65.195` — use sempre os do seu console). Para `www`, use **CNAME → allan-oshima-portfolio.web.app**.
4. Remova registros A/AAAA/CNAME antigos conflitantes no mesmo host.
5. **SSL:** o Firebase provisiona o certificado Let's Encrypt automaticamente (Pending → Connected, de minutos a ~24h).

> Se registrou via Cloud Domains, os registros DNS ficam na zona do Cloud DNS criada junto — adicione os TXT/A/CNAME lá.

## 3. Conferir
```bash
dig +short allanoshima.com A
dig +short TXT allanoshima.com
```
Depois acesse `https://allanoshima.com` e confirme o cadeado.
