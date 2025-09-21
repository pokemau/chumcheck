AGENTS — repo quick reference (frontend & backend)

Frontend commands:
- Install: `cd frontend && pnpm install`
- Dev: `cd frontend && pnpm dev`
- Build: `cd frontend && pnpm build`
- Format & lint: `cd frontend && pnpm format` then `cd frontend && pnpm lint`

Backend commands:
- Install: `cd backend && pnpm install`
- Dev/build: `cd backend && pnpm dev` / `cd backend && pnpm build`
- Lint: `cd backend && pnpm lint`
- Tests: `cd backend && pnpm test` (watch: `pnpm test:watch`, cov: `pnpm test:cov`)
- Single test file: `cd backend && pnpm test -- src/path/to/file.spec.ts --runInBand`
- Single test by name: `cd backend && pnpm test -- -t "pattern" --runInBand`

Style & conventions:
- Formatting: Prettier (frontend `.prettierrc`: singleQuote, printWidth 80, tabWidth 2, Svelte + Tailwind plugins). Run `pnpm format`.
- Imports: external packages first, then `$lib`/`$env` aliases, then relatives; prefer SvelteKit aliases over deep relative paths.
- Types & naming: PascalCase for types/components, camelCase for variables/functions, prefer `interface` for object shapes and explicit return types for public functions.
- Error handling: use `try/catch` for async, log `console.error`, rethrow typed errors in services, display user-friendly messages in UI.

Cursor/Copilot:
- No `.cursor` rules or `.github/copilot-instructions.md` found in this repo.
