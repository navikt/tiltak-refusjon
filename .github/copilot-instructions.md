# Copilot instructions

Frontend monorepo for tiltak-refusjon: an employer app (`arbeidsgiver`, ID-porten) and a Nav case worker app (`saksbehandler`, Azure AD), with shared components in `komponenter`. Each app has its own Express server (`*/server`) that handles login and proxies `/api` to [tiltak-refusjon-api](https://github.com/navikt/tiltak-refusjon-api).

**Stack:** React 19, TypeScript, Vite, Aksel (`@navikt/ds-react`), Less, SWR + axios, react-hook-form + zod, Vitest, Storybook, Express 5, pnpm workspaces, Nais.

**Before committing**, run the same checks as CI:

```bash
pnpm run prettier && pnpm run lint
pnpm --filter tiltak-refusjon-komponenter run build
pnpm --filter tiltak-refusjon-saksbehandler run test-and-build
pnpm --filter tiltak-refusjon-arbeidsgiver run test-and-build
pnpm --dir saksbehandler/server run build
pnpm --dir arbeidsgiver/server run build
```

Read [`AGENTS.md`](../AGENTS.md) for setup, project structure, patterns, domain glossary and boundaries. It is the single source of truth.

## Reviews

See `copilot-review-instructions.md`