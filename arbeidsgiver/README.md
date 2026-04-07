# tiltak-refusjon-arbeidsgiver

React-applikasjon (Vite) for arbeidsgivere i tiltak-refusjon. Kjører på port `3001` lokalt, med en Express-backend som håndterer autentisering, proxy og NAV-dekoratøren (kjører på port `3000`).

## Forutsetninger

Installer alle avhengigheter fra rot-mappen i repoet:

```bash
pnpm install
```

## Tilgjengelige kommandoer

| Kommando                                                     | Beskrivelse                              |
| ------------------------------------------------------------ | ---------------------------------------- |
| `pnpm --filter tiltak-refusjon-arbeidsgiver dev`             | Start Vite dev-server på port 3001       |
| `pnpm --filter tiltak-refusjon-arbeidsgiver build`           | Bygg applikasjonen (`tsc` + Vite)        |
| `pnpm --filter tiltak-refusjon-arbeidsgiver test`            | Kjør tester én gang (Vitest + jsdom)     |
| `pnpm --filter tiltak-refusjon-arbeidsgiver preview`         | Forhåndsvis produksjonsbygg på port 3001 |
| `pnpm --filter tiltak-refusjon-arbeidsgiver storybook`       | Start Storybook på port 6006             |
| `pnpm --filter tiltak-refusjon-arbeidsgiver build-storybook` | Bygg Storybook                           |

## Lokal oppstart

```bash
pnpm --filter tiltak-refusjon-arbeidsgiver dev
```

Vite-dev-serveren proxyer `/api`-kall til `http://localhost:8081`. Sørg for at backend kjører på den porten.

## Teknologier

- **React 18** med TypeScript
- **Vite** som bundler og dev-server
- **Vitest** for testing
- **NAV Aksel** (`@navikt/ds-react`) som komponentbibliotek
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
