# Repository Guidelines

## Project Structure & Module Organization
- Core browser-extension code lives in `src/`, split into `src/content/` (DOM injection logic), `src/background/` (lifecycle and messaging), and `src/ui/` (popup/options interfaces).
- Shared utilities go in `src/lib/`; avoid duplicating helpers inside feature folders.
- Extension metadata stays in `extension/manifest.json`; icons, screenshots, and internationalized strings belong in `assets/`.
- Mirror the `src/` layout under `tests/` so specs sit next to the features they cover.

## Build, Test, and Development Commands
- `npm install` syncs dependencies; rerun after any `package.json` change.
- `npm run dev` bundles the extension in watch mode and serves quick reloads while reloading the unpacked build.
- `npm run build` outputs a production-ready bundle in `dist/` for Chrome/Edge/Firefox loading.
- `npm run lint` enforces the shared ESLint + Prettier ruleset; fix violations before pushing.
- `npm run test` runs the Jest suite; use `npm run test -- --watch` during active work.

## Coding Style & Naming Conventions
- Use TypeScript with 2-space indentation, single quotes, trailing commas, and semicolons; Prettier auto-formats on save.
- Keep filenames kebab-case (e.g., `show-password-button.ts`); React/TSX components follow PascalCase.
- Prefix environment variables with `EXT_` inside `.env.local` to avoid leaking into builds.

## Injection Strategy & UX Safeguards
- Inject the eye icon only when the target password field lacks an existing show/hide control. Heuristics: sibling button with eye icon classes, `data-toggle="password"`, or native toggles already present.
- Before injecting, scan for buttons within the same form group whose text, `aria-label`, or icon class matches `show`, `toggle`, `eye`, or `visibility` patterns.
- Register a `MutationObserver` on `document.body` to handle dynamically added-password inputs and re-run the presence check.
- Tag injected elements with `data-ext="show-passwd"` to prevent duplicate insertion and aid debugging.
- Detach listeners and observers on extension unload to avoid memory leaks.

## Testing Guidelines
- Unit specs in `tests/unit/` should stub DOM APIs to cover detection heuristics and confirm the icon is skipped when native toggles exist.
- Integration specs in `tests/e2e/` must validate: (1) injection on plain password fields and (2) non-injection on pages that already expose a toggle.
- Document any intentional coverage gaps in PR descriptions when heuristics rely on manual QA.

## Commit & Pull Request Guidelines
- Follow Conventional Commits (e.g., `feat: add detection heuristic`) so automated release tooling can categorize changes.
- PRs must include a summary, linked issue, testing evidence (`npm run test`, manual browser checks), and screenshots/gifs for UI updates.
- Rebase before requesting review; flag breaking UX changes explicitly in the PR body and commit footer.

## Security & Configuration Tips
- Never log raw passwords or masked values; ensure console statements strip sensitive data.
- Justify each permission in `manifest.json` within the PR; avoid broad host permissions when a specific match pattern suffices.
- Keep `.env.local` gitignored; share sample keys through `.env.example` for new contributors.
