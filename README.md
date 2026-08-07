# EJDCard

MicroSaaS multi-tenant de crédito em cartões para encontros (ver [#54](https://github.com/lucis/ejdcard/issues/54)).

## Stack

- **npm** workspaces (monorepo)
- `apps/web` — Vite + React + TypeScript + Material UI + DM Sans
- `apps/worker` — Cloudflare Workers
- `supabase/` — migrations e config do CLI

## Desenvolvimento

Requisito: Node.js 20+.

```bash
npm install
npm run dev          # web em http://localhost:5173
npm run dev:worker   # worker (Wrangler)
```

Outros scripts:

```bash
npm run build        # web + worker
npm run build:web
npm run build:worker
```

Supabase CLI (já com `supabase/config.toml` no repo):

```bash
supabase start       # quando for usar DB local (issue #56)
```

## Estrutura

```
apps/web      # frontend
apps/worker   # edge / resolução de tenant
supabase/     # schema e migrations
brand/        # assets de marca
model.json    # referência do domínio legado (não é schema ativo)
docs/         # specs e planos
```
