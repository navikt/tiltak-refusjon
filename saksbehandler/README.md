# tiltak-refusjon-saksbehandler

React-applikasjon (Vite) for saksbehandlere i tiltak-refusjon. Kjører på port `3002` lokalt, med en Express-backend som håndterer autentisering og proxy (kjører på port `3000`). Inkluderer NAV internarbeidsflate-dekoratøren.

## Forutsetninger

Installer alle avhengigheter fra rot-mappen i repoet:

```bash
pnpm install
```

## Tilgjengelige kommandoer

| Kommando                                                      | Beskrivelse                              |
| ------------------------------------------------------------- | ---------------------------------------- |
| `pnpm --filter tiltak-refusjon-saksbehandler dev`             | Start Vite dev-server på port 3002       |
| `pnpm --filter tiltak-refusjon-saksbehandler build`           | Bygg applikasjonen (`tsc` + Vite)        |
| `pnpm --filter tiltak-refusjon-saksbehandler test`            | Kjør tester (Vitest + jsdom)             |
| `pnpm --filter tiltak-refusjon-saksbehandler preview`         | Forhåndsvis produksjonsbygg på port 3002 |
| `pnpm --filter tiltak-refusjon-saksbehandler storybook`       | Start Storybook på port 6006             |
| `pnpm --filter tiltak-refusjon-saksbehandler build-storybook` | Bygg Storybook                           |

## Lokal oppstart

```bash
pnpm --filter tiltak-refusjon-saksbehandler dev
```

Vite-dev-serveren proxyer:

- `/api`-kall til `http://localhost:8081` — sørg for at backend kjører på den porten
- `/internarbeidsflatedecorator` til NAV internarbeidsflate-dekoratøren (CDN)
- `/modiacontextholder/api/decorator` til backend for innlogget saksbehandler

## Teknologier

- **React 18** med TypeScript
- **Vite** som bundler og dev-server
- **Vitest** for testing
- **NAV Aksel** (`@navikt/ds-react`) som komponentbibliotek
- **React Hook Form** + **Zod** for skjemahåndtering og validering
- **Storybook** for komponentutvikling og dokumentasjon
- **Sentry** for feilsporing
- **Less** for styling

## Felles komponenter

Felles komponenter deles via `komponenter`-workspacet og importeres med `~/`-prefiks:

```ts
import { Button } from '~/komponenter';
```

## Docker

```bash
docker build -f Dockerfile .
```
