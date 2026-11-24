# tiltak-refusjon

Tiltak-refusjon bruker [pnpm workspaces](https://pnpm.io/workspaces).

Workspaces:

- [arbeidsgiver](./arbeidsgiver) — React-app for arbeidsgivere, port `3001`
- [saksbehandler](./saksbehandler) — React-app for saksbehandlere, port `3002`
- [komponenter](./komponenter) — Felles komponentbibliotek

### Felles komponenter

Felles komponenter som brukes i flere workspaces ligger i [komponenter](./komponenter). Disse komponentene kan importeres i de andre workspaces med `~/`-prefiks.

```ts
import { Button } from '~/komponenter';
```

For at din IDE skal kompilere komponentene må avhengigheter som blir brukt installeres i `komponenter`-workspacet samt de workspacene som skal bruke komponenten.

### Installer

Installer hele prosjektet og alle workspaces:

```bash
pnpm install
```

Installer en avhengighet på rot-nivå.
**NB!** Her skal bare installeres dev-dependencies som brukes på rot-nivå.

```bash
pnpm add <pakkenavn>
```

Installer en avhengighet på workspace-nivå:

```bash
pnpm add <pakkenavn> --filter <workspace-navn>

# Eksempel
pnpm add react --filter tiltak-refusjon-saksbehandler
```

Installer en avhengighet i alle workspaces:

```bash
pnpm -r add <pakkenavn>
```

### Kjøre arbeidsgiver

```bash
pnpm start:arbeidsgiver
```

### Kjøre saksbehandler

```bash
pnpm start:saksbehandler
```

### Tilgjengelige kommandoer

#### arbeidsgiver

| Kommando                                                     | Beskrivelse                              |
| ------------------------------------------------------------ | ---------------------------------------- |
| `pnpm --filter tiltak-refusjon-arbeidsgiver dev`             | Start Vite dev-server på port 3001       |
| `pnpm --filter tiltak-refusjon-arbeidsgiver build`           | Bygg applikasjonen (`tsc` + Vite)        |
| `pnpm --filter tiltak-refusjon-arbeidsgiver test`            | Kjør tester (Vitest + jsdom)             |
| `pnpm --filter tiltak-refusjon-arbeidsgiver preview`         | Forhåndsvis produksjonsbygg på port 3001 |
| `pnpm --filter tiltak-refusjon-arbeidsgiver storybook`       | Start Storybook på port 6006             |
| `pnpm --filter tiltak-refusjon-arbeidsgiver build-storybook` | Bygg Storybook                           |

#### saksbehandler

| Kommando                                                      | Beskrivelse                              |
| ------------------------------------------------------------- | ---------------------------------------- |
| `pnpm --filter tiltak-refusjon-saksbehandler dev`             | Start Vite dev-server på port 3002       |
| `pnpm --filter tiltak-refusjon-saksbehandler build`           | Bygg applikasjonen (`tsc` + Vite)        |
| `pnpm --filter tiltak-refusjon-saksbehandler test`            | Kjør tester (Vitest + jsdom)             |
| `pnpm --filter tiltak-refusjon-saksbehandler preview`         | Forhåndsvis produksjonsbygg på port 3002 |
| `pnpm --filter tiltak-refusjon-saksbehandler storybook`       | Start Storybook på port 6006             |
| `pnpm --filter tiltak-refusjon-saksbehandler build-storybook` | Bygg Storybook                           |

Du kan også bruke wildcard om du ikke vil skrive ut hele navnet `pnpm --filter "*arbeidsgiver" ...`

### Kjøre kommando i alle workspaces

```bash
pnpm -r run <kommando>

# Eksempel
pnpm -r run test
```

### Sjekke endringer

Kjør lint, formatering, tester og bygg:

```bash
pnpm run check
```

`check` kjører `lint`, `prettier`, `test` og `build`, og stopper ved første feil. `build` kjører `tsc` i alle pakkene, så typefeil blir også fanget. Endrer du `package.json`, installerer pnpm avhengighetene før scriptene kjører.

Vil du starte helt fra bunnen, for eksempel før en PR eller når noe virker rart lokalt:

```bash
pnpm run verify
```

`verify` kjører `clean` og `install:all` og deretter `check`. Den sletter `node_modules` og installerer alt på nytt, så den tar lengre tid.

Stegene kan også kjøres hver for seg:

| Kommando               | Beskrivelse                                                            |
| ---------------------- | ---------------------------------------------------------------------- |
| `pnpm run install:all` | Installer workspaces og begge `server`-mappene med `--frozen-lockfile` |
| `pnpm run typecheck`   | Kjør bare `tsc` i alle workspaces og begge `server`-mappene            |
| `pnpm run test`        | Kjør testene i `arbeidsgiver` og `saksbehandler`                       |
| `pnpm run build`       | Bygg alle workspaces og begge `server`-mappene                         |

### Rydde opp

Fjern `node_modules`, `dist` og `storybook-static` i alle pakkene:

```bash
pnpm clean
```

Dette sletter:

- `node_modules` i rot, alle workspaces og begge `server`-mappene
- `dist` i `arbeidsgiver`, `arbeidsgiver/server`, `saksbehandler` og `saksbehandler/server`
- `storybook-static` i `arbeidsgiver` og `saksbehandler`

Legger du til en ny pakke eller byggemappe, må den også legges til i `clean` i `package.json`.

Installer deretter på nytt med:

```bash
pnpm run install:all
```
