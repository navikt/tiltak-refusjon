# Code review instructions

Review against the conventions in [`AGENTS.md`](../AGENTS.md). Comment on real problems: bugs, security, broken conventions. Skip style nits that Prettier and ESLint already catch.

## Security

- No secrets, tokens or personal data (fødselsnummer, names, addresses, Nav-ident) in code, test data, stories or logs. Test data must be fictitious. Fødselsnummer in tests or should be syntetic (add 80 or 40 to the first digit of the month).
- `console.log`/`console.error` must not print tokens, request headers or response bodies with personal data.
- Analytics (`sporing`) must strip personal data with `sladdFnrOgNavIdent`.
- Review changes to `*/server/src/auth/`, `*/server/src/proxy/`, `*/server/src/routes.ts` and `LokalLogin` extra carefully. Check that:
  - every `/api` request still gets an on-behalf-of token, and the incoming token is validated;
  - no new route bypasses the token check;
  - labs logic (`MILJO === 'dev-gcp-labs'`, fake-token cookies) cannot activate in dev or prod;
  - proxy targets come from configuration, not from user input.
- Flag CSP or `helmet` changes in `*/server/src/main.ts` that loosen the policy.
- Hiding UI based on `rolle`, `harKorreksjonTilgang` or the selected organisation is **not access control**. Flag any change that relies on it, or that seems to move an authorization check from the backend to the frontend.
- Flag Nais manifest changes to `accessPolicy`, ingress, `idporten`, `azure`, `tokenx` or secrets.

## Code conventions

- API calls go through `src/services/rest-service.ts`. Flag direct `axios`/`fetch` calls in components.
- If within scope, rewrite calls to SWR.
- After a write, the related SWR key must be revalidated with `mutate`.
- Forms use `react-hook-form` with `zod`.
- Changes to `komponenter/src/types` must match the backend's API contract.
- Refund views that show refunds with `kreverAktsomhet` must show `HemmeligAdresseVarsel`.

## Styling

- Use Aksel components and layout primitives (like `Box`, `VStack`, `HStack`) with `space-*` tokens before custom CSS.
- Custom styles go in Less. New styles prefer `*.module.less`. In files that already use `BEMHelper` with global `.less`, evaluate if it's correct to rewrite as module while doing the given task.
- Flag hardcoded colors and pixel spacing where an Aksel token exists.
- Flag Tailwind, styled-components or new inline `style` objects.

## Accessibility

- Aksel form fields need a `label`. Use `hideLabel` instead of an empty label when the label should be hidden.
- Headings must follow a logical level order.
- Follow WCAG requirements from UU-tilsynet.

## GitHub Actions

- `actions/*` (GitHub, immutable) and `nais/*` (Nav) are trusted and may use version tags.
- All other third-party actions must be pinned to a full commit SHA with a version comment, for example `uses: owner/action@<sha> # v4.1.0`.
- Third-party actions in use today: `pnpm/action-setup@v4` (in every workflow, currently not SHA-pinned). Flag new unpinned uses.
- Jobs must have explicit `permissions`.

## Over-editing

- Flag changes outside the scope of the PR: reformatting, renaming, refactoring or comments in unrelated code.
- Flag new abstractions, dependencies or files the task does not need.
- Flag duplicated logic "cleaned up" between `arbeidsgiver` and `saksbehandler` unless that was the goal of the PR.
