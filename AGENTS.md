# AGENTS.md

Frontend monorepo for **tiltak-refusjon**: employers claim refunds (refusjon) for Nav labour-market measures (tiltak) such as wage subsidies (lønnstilskudd), mentor and summer jobs. Nav case workers follow up and correct the refunds.

The repo holds two separate apps that share a component library. Both are thin frontends. All business logic, persistence and authorization lives in the backend [navikt/tiltak-refusjon-api](https://github.com/navikt/tiltak-refusjon-api), which each app reaches through its own Express server.

| App             | Users                    | Login                               | Ingress (prod)                          |
| --------------- | ------------------------ | ----------------------------------- | --------------------------------------- |
| `arbeidsgiver`  | Employers (external)     | ID-porten (Level4) via Nais sidecar | `https://tiltak-refusjon.nav.no`        |
| `saksbehandler` | Nav employees (internal) | Azure AD via Nais sidecar           | `https://tiltak-refusjon.intern.nav.no` |

- `arbeidsgiver` uses the Nav decorator (`@navikt/nav-dekoratoren-moduler`) and `@navikt/bedriftsmeny`. Employers choose one or more organisations (bedrift). Altinn rights decide which organisations they can see.
- `saksbehandler` uses the internal decorator (`internarbeidsflate-decorator`) and `modiacontextholder`. The logged-in user has `rolle` (`BESLUTTER` or `ARBEIDSGIVER`, see `komponenter/src/types/brukerContextType.ts`) and `harKorreksjonTilgang`.

## Access control

- The Express servers (`*/server/src/routes.ts`) validate the login token with `@navikt/oasis` and exchange it for an on-behalf-of token before proxying `/api` to `tiltak-refusjon-api` (`*/server/src/proxy/api-proxy.ts`).
    - `arbeidsgiver`: TokenX, audience from `API_AUDIENCE`. `/refusjon` routes return 401 without a valid token.
    - `saksbehandler`: Azure AD, scope built from `API_CLIENT_ID`. Every route after `/isAlive` and `/isReady` redirects to `/login` without a valid token.
- **The backend enforces authorization**: which organisations an employer can see, and which actions a case worker may take.
- The frontend hides UI based on `harKorreksjonTilgang`, `rolle` and the selected organisation (for example `saksbehandler/src/refusjon/RefusjonSide/HandlingerMeny.tsx`). **This is not a security control.** Never rely on it, and never move an authorization check from the backend to the frontend.

## Setup & local development

Requires Node `>=24` and pnpm `>=11` (`packageManager` in `package.json`). npm and yarn are blocked by `preinstall`.

`@navikt/*` packages come from GitHub Packages (`.npmrc`). Authenticate with a GitHub token that has `read:packages`:

```bash
pnpm config set //npm.pkg.github.com/:_authToken <token>
```

Install. The two `server` folders are **not** part of the pnpm workspace (`pnpm-workspace.yaml`); they have their own `pnpm-lock.yaml` and must be installed separately:

```bash
pnpm install
pnpm install --dir arbeidsgiver/server
pnpm install --dir saksbehandler/server
```

Run locally:

```bash
pnpm start:arbeidsgiver   # Vite on http://localhost:3001
pnpm start:saksbehandler  # Vite on http://localhost:3002
```

- Local dev runs only Vite, not the Express server. Vite proxies `/api` to `http://localhost:8081`, so `tiltak-refusjon-api` must run locally on that port (see `*/vite.config.ts`).
- In development mode and on `-labs` hosts, the apps show a `LokalLogin` component that fetches a fake token from `tiltak-fakelogin.ekstern.dev.nav.no` and stores it in a cookie (`tokenx-token` for arbeidsgiver, `aad-token` for saksbehandler).
- **Labs mode:** when `MILJO=dev-gcp-labs`, the servers use `proxy/labs-proxy.ts` instead of the real auth flow. They forward the fake-token cookie to `tiltak-refusjon-api-labs`, and saksbehandler mocks `modiacontextholder`. Labs is a dev-only demo environment and has no real login.

Install dependencies with `--filter`, never at the root unless they are root dev tools:

```bash
pnpm add <package> --filter tiltak-refusjon-saksbehandler
```

Code in `komponenter` is imported via the `~/` alias. Dependencies it uses must be installed in `komponenter` and in each app that uses the component.

## Build & test commands

CI (`.github/workflows/bygg-branch.yml`) runs these on every branch except `main`. Run the same checks before committing:

```bash
pnpm run prettier
pnpm run lint
pnpm --filter tiltak-refusjon-komponenter run build
pnpm --filter tiltak-refusjon-saksbehandler run test-and-build
pnpm --filter tiltak-refusjon-arbeidsgiver run test-and-build
pnpm --dir saksbehandler/server run build
pnpm --dir arbeidsgiver/server run build
```

`test-and-build` runs `vitest --environment=jsdom --run`, then `tsc && vite build`. Use `pnpm run prettier:fix` and `pnpm run lint:fix` to fix formatting and lint errors. ESLint runs with `--max-warnings=0`.

The Husky pre-commit hook runs `prettier:fix`, `lint:fix` and `pretty-svg` (SVG optimisation in arbeidsgiver).

## Project structure

```text
arbeidsgiver/            Employer app (React + Vite)
  src/                   Pages, components, services/rest-service.ts, router/
  server/                Express server: ID-porten/TokenX, API proxy, Nav decorator, CSP
  .storybook/            Storybook config
saksbehandler/           Case worker app (React + Vite)
  src/                   Pages, featureToggles/, services/rest-service.ts, router/
  server/                Express server: Azure AD, API proxy, internal decorator proxy, CSP
  .storybook/
komponenter/src/         Shared components, types/ (API types), utils/, sporing/
.nais/arbeidsgiver/      nais.yml is a template; dev.yml, labs.yml, prod.yml hold per-environment values
.nais/saksbehandler/     Complete manifest per environment: nais-dev-gcp.yml, nais-dev-gcp-labs.yml, nais-prod-gcp.yml
.github/workflows/       Branch build, and build + deploy per app and per Storybook
```

- Arbeidsgiver's `nais.yml` is a Handlebars template (`{{appname}}`, `{{#if labs}}`). Change environment values in `dev.yml`/`labs.yml`/`prod.yml`, and structure in `nais.yml`.
- Saksbehandler has no template. A change that applies to all environments must be made in each `nais-*.yml` file.
- Both `*-storybook.yml` manifests deploy Storybook to dev only, in namespace `team-tiltak`.
- Pushing to `main` deploys to dev, labs and then prod when files under the app folder or `komponenter/` change.

## Testing

- Vitest with jsdom and `@testing-library/react`.
- Try to not overcomplicate tests, they should be there to validate correct logic, not to make future changes more difficult.
- Test files are named `*.test.ts` / `*.test.tsx` and placed next to the code (for example `saksbehandler/src/sporing/`).
- `app.spec.ts` in each app is a placeholder.
- Storybook stories in `src/stories/*.stories.tsx` show refund scenarios (minus amount, zero amount, 5G, correction) with static data. Update or add a story when you change these views.

## Patterns

Use the existing solution. Do not introduce a new variant.

- **UI components:** Aksel (`@navikt/ds-react`, `@navikt/aksel-icons`). New code uses Aksel layout primitives (`Box`, `VStack`, `HStack`) with `space-*` tokens, see `arbeidsgiver/src/refusjon/RefusjonSide/NyRefusjonside/`. Shared components go in `komponenter/src` and should be functional.
- **Styling:** Less. Prefer CSS modules (`*.module.less`) for new styles. Older code uses global `.less` files with `BEMHelper` from `~/utils/bem`; keep that style when editing those files. No Tailwind, no styled-components.
- **API calls:** only through `src/services/rest-service.ts` in each app. It uses an axios instance (`/api/arbeidsgiver` or `/api/saksbehandler`) that maps HTTP errors to typed errors (`~/types/errors`). Reads use SWR hooks (`useHent...`) with `suspense: true`. After a write, call `mutate(<key>)`. Arbeidsgiver writes send `If-Unmodified-Since: sistEndret` for optimistic locking.
- **State:** React context (`BrukerContext`, `FilterContext`, `FeatureToggleProvider`) and SWR. No global state library.
- **Forms:** `react-hook-form` with `zod` via `zodResolver`.
- **Routing:** `react-router` v7, `createBrowserRouter` in `src/router/Router.tsx`.
- **Feature toggles (saksbehandler only):** add the name to `Feature` in `src/featureToggles/features.ts` and read it with `useFeatureToggles()`. The backend serves the values from `/feature`.
- **Analytics:** `sporing` (Innblikk/Umami). Use `sladdFnrOgNavIdent` from `~/sporing/sladding` so no fødselsnummer or Nav-ident is sent.
- **Dates:** both `moment` and `date-fns` exist. Evaluate if rewriting to `date-fns` is within scope, otherwise use the one the surrounding code uses.
- **Types:** API types live in `komponenter/src/types` and mirror the backend's DTOs.

## Domain glossary

| Term                             | Meaning                                                              | Type / code                                          |
| -------------------------------- | -------------------------------------------------------------------- | ---------------------------------------------------- |
| Refusjon                         | A refund claim for one subsidy period                                | `Refusjon`, `RefusjonStatus`                         |
| Korreksjon                       | Correction of an already processed refund, made by a case worker     | `Korreksjon`, `KorreksjonStatus`, `Korreksjonsgrunn` |
| Tiltak / tiltakstype             | Labour-market measure                                                | `Tiltak` (`MENTOR`, `VTAO`, `SOMMERJOBB`, …)         |
| Tilskuddsgrunnlag                | Agreement data the refund is based on (rates, period, amount)        | `Tilskuddsgrunnlag`                                  |
| Tilskuddsperiode                 | The subsidy period a refund covers                                   | `tilskuddFom`, `tilskuddTom`                         |
| Inntektsgrunnlag / inntektslinje | Income reported via A-meldingen for the period                       | `Inntektsgrunnlag`, `Inntektslinje`                  |
| A-meldingen                      | Employers' monthly income report to the state                        | `AMeldingBanner`                                     |
| Beregning                        | Calculated refund amount                                             | `Beregning`                                          |
| Minusbeløp / nullbeløp           | Refund with negative or zero result                                  | `GODKJENT_MINUSBELØP`, `GODKJENT_NULLBELØP`          |
| 5G                               | Five times the national insurance base amount, the cap on the refund | `overFemGrunnbeløp`                                  |
| Frist                            | Deadline to submit the refund, can be extended                       | `fristForGodkjenning`, `forlengFrist`                |
| Bedrift / bedriftNr              | Employer organisation and its organisation number                    | `bedriftNr`, `Bedriftvalg`                           |
| KID                              | Payment reference set by the employer                                | `bedriftKid`                                         |
| Diskresjonskode / aktsomhet      | Protected address; the UI must show a warning                        | `Diskresjonskode`, `Aktsomhet`                       |
| Hendelse                         | Event in the refund's history log                                    | `Hendelse`, `HendelseType`                           |
| Beslutter                        | Nav role that approves                                               | `InnloggetRolle`                                     |

## Code style

- Prettier: 4 spaces, single quotes, semicolons, `printWidth` 120 (`.prettierrc`).
- TypeScript strict via `tsc` in the build. ESLint with `typescript-eslint` and `eslint-plugin-storybook`.
- Domain names and UI text are in Norwegian (`hentRefusjon`, `useInnloggetBruker`). Keep that. Norwegian letters (æ, ø, å) appear in identifiers and file names.
- Write `Nav` not `NAV`
- Relative paths should only import from current directory (./), if not use absolute imports (@/ or ~/).
- Sort imports by external dependencies, internal by absolute path, internal by relative path. With an empty line between each bulk.

### Minimal editing

- Change only what the task requires. Do not reformat, rename or refactor unrelated code.
- Do not add comments, types or error handling to code you did not otherwise change.
- Do not "tidy up" duplication between `arbeidsgiver` and `saksbehandler` unless asked.

## Git workflow

- Keep commits as small as possible.
- Never commit directly to `main`. A push to `main` deploys to production.
- Work on a branch and open a pull request. CI builds every branch except `main`.
- Commit messages: Conventional Commits in Norwegian, `type(scope): beskrivelse`, for example `fix(arbeidsgiver): Rette opp i visning av dato i refusjonsside`. Types: `feat`, `fix`, `chore`, `refactor`, `test`, `docs`.
- The commit message should include a short title, but should also have a body that explains more in details what has been changed and why it was changed. If the reason for the changes are unclear just from the context of the code, please ask for more information to make the message descriptive enough for future readers.

## Boundaries

### ✅ Always

- Run the same checks as CI (see Build & test commands) before committing.
- Use `pnpm` and install server dependencies inside the `server` folder.
- Go through `rest-service.ts` for API calls.
- Show the protected-address warning (`HemmeligAdresseVarsel`) where refunds with `kreverAktsomhet` are displayed.

### ⚠️ Ask first

- Changes to auth, proxy and server code that forms the trust boundary: `*/server/src/auth/`, `*/server/src/proxy/`, `*/server/src/routes.ts`, `LokalLogin`.
- CSP and security headers in `*/server/src/main.ts`.
- Nais manifests: ingress, `accessPolicy`, `idporten`/`azure`/`tokenx`, secrets.
- New dependencies, or major upgrades.
- API contracts and types that mirror `tiltak-refusjon-api` (`komponenter/src/types`, endpoints in `rest-service.ts`).
- Changes to GitHub Actions workflows.

### 🚫 Never

- Commit tokens, secrets or real personal data (fødselsnummer, names, addresses). Test data must be fictitious.
- Log tokens or personal data, or send them to analytics.
- Treat hidden UI elements as access control.
- Enable labs logic (`MILJO=dev-gcp-labs`, fake-token cookies) outside labs and local dev.
- Use npm or yarn, or commit `package-lock.json`.
