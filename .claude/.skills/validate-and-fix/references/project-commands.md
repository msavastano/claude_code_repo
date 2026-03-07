# Project Commands Reference

## Validation Commands
| Command | Purpose |
|---------|---------|
| `npm run validate` | Full pipeline: typecheck + lint + test |
| `npm run typecheck` | TypeScript checking only (strict mode, no emit) |
| `npm run lint` | ESLint with zero warnings tolerance |
| `npm run lint:fix` | ESLint auto-fix |
| `npm run test` | Run all tests once |
| `npm run test:coverage` | Tests with coverage report |
| `npm run format` | Prettier format all files |
| `npm run format:check` | Prettier check (CI-friendly) |

## Coverage Thresholds
- Branches: 80%
- Functions: 80%
- Lines: 80%
- Statements: 80%

## ESLint Key Rules
- `@typescript-eslint/consistent-type-imports`: enforces `type` keyword on type-only imports
- `@typescript-eslint/no-explicit-any`: warns on `any` usage
- `@typescript-eslint/no-unused-vars`: errors on unused vars (except `_` prefixed)
- `no-console`: warns on console.log (console.warn/error allowed)
- `react-hooks/exhaustive-deps`: checks hook dependency arrays
- `react-refresh/only-export-components`: warns on non-component exports from component files

## Prettier Config
- No semicolons
- Single quotes
- Trailing commas everywhere
- 100 char line width

## Git Hooks (Husky + lint-staged)
Pre-commit runs:
- `*.{ts,tsx}`: eslint --fix + prettier --write
- `*.{json,md,css,html}`: prettier --write
