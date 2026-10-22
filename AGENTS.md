# AGENTS.md

## Project guidelines

This project was initially generated with `@raulmoracode/create`.

Treat the current repository state as the source of truth. Do not assume that the original scaffold configuration, dependencies, scripts, or architecture are still unchanged.

Before making changes, inspect the existing codebase and its configuration.

## Skills

How to work on this repository — inspect the codebase, choose the smallest change, validate it and report the result — lives in the shared @raulmoracode skills catalog:

https://raulmoracode.github.io/raulmoracode-skills/

`.opencode/opencode.json` loads that catalog for this project.

Start non-trivial work with the `raulmoracode-mode` skill and follow the specialists it points to:

- `git-pr` — branch, commit and pull request workflow.
- `git-branch` / `safe-git` — create branches and run Git without destructive commands.
- `test-before-finishing` / `verify-before-claiming` / `no-made-up-results` — validate with real commands before claiming anything.
- `security-first` — secrets, credentials and dependency safety.
- `release-engineering` — versions, changelogs and tags.
- `clear-final-report` — what changed, which files, which validation ran, what is still open.

If the catalog is unavailable, these rules still hold:

- Use pnpm only, never npm or yarn.
- Pin exact dependency versions: no `^`, no `~`, no `latest`.
- Never run `git push --force`, `git push -f`, `git reset --hard` or `git clean -fd`.
- Follow Conventional Commits.
- Never claim a command was run, or that something works, when it was not verified.
- Never delete or overwrite the user's content.

## Dependencies and configuration

Always inspect the current `package.json` before using or adding a dependency.

Do not assume that a dependency is installed because it may have been included in the original scaffold.

Use pnpm exclusively and pin exact versions: no `^`, no `~`, no `latest`.

Treat the following files as sources of truth for the current project configuration:

- `package.json`
- `pnpm-lock.yaml`
- `tsconfig.json`
- `raulmoracode.json`
- `biome.json`
- `components.json`
- `.nvmrc`
- framework-specific configuration files

`raulmoracode.json` is the CLI manifest (framework, tech selection and managed-file hashes); treat it as the source of truth for upgrades.

## Project structure

```text
├── index.html               # HTML entry (head tags injected at build time)
├── .github/workflows/       # GitHub Actions workflows
├── .github/dependabot.yml   # Dependabot (weekly, exact versions, 7-day cooldown)
├── .opencode/opencode.json  # OpenCode skills catalog
├── src/
│   ├── main.tsx     # entry point
│   ├── App.tsx      # root component
│   ├── index.css    # Tailwind entry point
│   ├── App.css      # root styles
│   ├── components/  # shadcn components land here
│   ├── hooks/       # registry hooks land here
│   ├── lib/
│   │   └── utils.ts  # cn()
│   ├── config/
│   │   └── site.ts  # site identity
│   └── test/        # smoke test
├── components.json          # shadcn config (includes the @raulmoracode registry)
├── .husky/                  # Git hooks
├── commitlint.config.ts     # commit message validation
├── biome.json               # formatter + linter config
├── vitest.config.ts         # test config
├── .vscode/                 # VS Code settings + extensions
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # scripts and dependencies (exact versions)
├── pnpm-workspace.yaml      # minimumReleaseAge policy + excludes
├── raulmoracode.json        # CLI manifest (framework, selection, hashes)
├── LICENSE                  # project license
├── CHANGELOG.md             # project changelog
└── AGENTS.md                # guidelines for AI coding agents
```

## Project tooling

This project uses pnpm exclusively. Never use npm or yarn.

`raulmoracode.json` records the CLI version, framework, tech selection and managed-file hashes.

Available scripts (see `package.json` for the full list):

- `pnpm dev` — start the development server.
- `pnpm build` — create a production build.
- `pnpm typecheck` — run the TypeScript type checker.
- `pnpm check` — run the formatter and linter check.
- `pnpm format` — apply formatting.
- `pnpm lint` — run the linter.
- `pnpm test` — run the test suite in watch mode (use `CI=true pnpm test` for single run).

## Components and UI

UI components come from shadcn. Add new components with:

```bash
pnpm dlx shadcn@4.21.0 add @raulmoracode/<component>
```

Browse the catalogue at https://registry.raulmoracode.com.

Do not hand-write component files under the shadcn UI directory. Registry items write to `@components/*`, `@lib/*` and `@hooks/*`, declared in `components.json` and in the `tsconfig.json` paths.

## Validation

```bash
pnpm check
pnpm typecheck
pnpm test
pnpm build
```

## Git hooks and commits

Husky manages the Git hooks.

`pre-commit` runs:

```bash
pnpm check
pnpm test
```

`commit-msg` runs Commitlint.

Commits must follow Conventional Commits.

Format: `<type>: <description>`

Valid types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `style`, `perf`, `ci`.

Valid commit examples:

```text
feat: add user profile
fix: handle invalid input
refactor: extract API client
test: add query client tests
docs: update project guide
chore: update dependencies
style: fix indentation in layout component
perf: optimize image loading in gallery
ci: add GitHub Actions workflow
```

Rules:

- Use the imperative mood ("add" not "added").
- Do not capitalize the first letter.
- Do not end with a period.
- Keep the subject line under 72 characters.
- Use a body (separated by a blank line) for longer explanations.

## Site identity

`src/config/site.ts` is the single source of truth for the site title, description, favicon and social preview.

Edit that file instead of `index.html` or `src/app/layout.tsx` when changing them.

On Vite the `siteHead()` plugin in `vite.config.ts` injects those values into `index.html`; on Next.js the `metadata` export in `src/app/layout.tsx` does. Both are always wired, whichever techs were selected.
