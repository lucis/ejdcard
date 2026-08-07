# EJDCard multi-tenant (MicroSaaS) — Design

**Issue pai:** [#54](https://github.com/lucis/ejdcard/issues/54)  
**Data:** 2026-08-07

## Decisões

| Tema | Escolha |
| --- | --- |
| Estratégia | Greenfield paralelo no mesmo repo (monorepo) |
| Dados legados | Sem import do Firestore; schema novo no Supabase |
| Código legado | Pode ser removido; inspirar-se no comportamento (máscara de reais, regras de saldo, fluxos) ao reescrever |
| Criação de tenant | Self-service no MVP |
| Billing | Freemium no MVP (~200 cartões); interface de pagamento + AbacatePay primeiro |
| URL do tenant | Subdomínio (`slug.dominio`) via Cloudflare Workers |
| Auth social no MVP | Google (Facebook fora de escopo) |
| Stack | TypeScript, React, Vite, Supabase, Cloudflare Workers |
| Package manager | **npm** (workspaces no monorepo); abandonar Yarn — sem reaproveitar `package.json` / `yarn.lock` legados |
| UI | **Material UI** (versão atual) para componentes |
| Tipografia | **DM Sans** (fonte padrão do tema) |

## Decomposição

Fatias verticais demonstráveis, não só camadas técnicas.

Ordem: `1 → 2 → 3 ∥ 4 → 5 → 6 → 7 → 8`

| # | Issue | Tema | Depende de |
| --- | --- | --- | --- |
| 1 | [#55](https://github.com/lucis/ejdcard/issues/55) | Scaffold monorepo + limpeza do legado | — |
| 2 | [#56](https://github.com/lucis/ejdcard/issues/56) | Schema multi-tenant (Supabase) | #55 |
| 3 | [#57](https://github.com/lucis/ejdcard/issues/57) | Auth + authz por tenant | #56 |
| 4 | [#58](https://github.com/lucis/ejdcard/issues/58) | Resolução de tenant por subdomínio (Workers) | #56 |
| 5 | [#59](https://github.com/lucis/ejdcard/issues/59) | Onboarding self-service | #57, #58 |
| 6 | [#60](https://github.com/lucis/ejdcard/issues/60) | Core operacional do cartão | #57 |
| 7 | [#61](https://github.com/lucis/ejdcard/issues/61) | Billing freemium (AbacatePay) | #59, #60 |
| 8 | [#62](https://github.com/lucis/ejdcard/issues/62) | Dashboard admin da plataforma | #59, #61 |

## Fora de escopo (esta leva)

- ETL / migração de dados do Firebase
- Login Facebook
- Segundo provedor de pagamento (Stripe etc.)
- App nativo
- Customizações profundas por tenant que quebrem o core

## Domínio de referência (legado)

Coleções mentais do `model.json`: `users`, `cards`, `logs` (+ `stats`).  
Roles atuais: `v` venda, `u` recarga, `c` cadastro, `r` consulta, `a` admin do encontro, `f` devolução/fechamento.  
Comportamentos a preservar na reescrita: formatação/máscara de reais, atualização de saldo com log `balanceBefore`/`balanceAfter`, fluxos de operação por role.
