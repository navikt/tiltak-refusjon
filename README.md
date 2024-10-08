# tiltak-refusjon

Tiltak-refusjon bruker [npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces).

Workspaces:

- [arbeidsgiver](./arbeidsgiver)
- [saksbehandler](./saksbehandler)
- [komponenter](./komponenter)

### Hvordan funker komponenter?

Felles komponenter som brukes i flere workspaces ligger i [komponenter](./komponenter). Disse komponentene kan importeres i de andre workspaces med `~/`-prefiks.

```bash
import { Button } from '~/komponenter';
```

[komponenter](./komponenter) er også et eget workspaces.
For at din IDE kunne kompilere komponentene må avhengigheter som blir brukt også installeres i dette workspacet samt de workspacene som skal bruke komponenten.

### Installer

Installer hele prosjektet og alle workspaces:

```bash
npm install
```

Installere en avhengighet på rot-nivå.
**NB!** Her skal bare installeres dev-dependencies som brukes på rot-nivå.

```bash
npm install <pakkenavn>
```

Installere en avhengighet på workspace-nivå:

```bash
npm install <pakkenavn> -w <workspace-navn>

// Eksempel
npm install react -w saksbehandler
```

Installere en avhengighet i alle workspaces:

```bash
npm install <pakkenavn> -w

// Eksempel
npm install react -w
```

### Kjøre

Start:

```bash
npm start -w <workspace-navn>

// Eksempel
npm start -w arbeidsgiver
```

Kjøre kommando:

```bash
npm run <kommando> -w <workspace-navn>

// Eksempel
npm run build -w arbeidsgiver
```

Kjøre kommando i alle workspaces:

```bash
npm run <kommando> -w

// Eksempel
npm run test -w
```
