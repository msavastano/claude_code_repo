# CLAUDE.md — Project Intelligence for Claude Code

## Project Overview

This is a **Vite + React + TypeScript** single-page application. It uses modern tooling with strict type safety, comprehensive testing, and automated quality gates.

## Tech Stack

- **Runtime**: React 19 with TypeScript (strict mode)
- **Build**: Vite 7 (ESM-first, lightning fast HMR)
- **Testing**: Vitest + React Testing Library + @testing-library/user-event
- **Linting**: ESLint 9 (flat config) + typescript-eslint + react-hooks + react-refresh
- **Formatting**: Prettier (no semicolons, single quotes, trailing commas)
- **Coverage**: v8 via @vitest/coverage-v8 (80% threshold on branches/functions/lines/statements)
- **Git Hooks**: Husky + lint-staged (pre-commit: lint + format staged files)

## Key Commands

```bash
npm run dev            # Start dev server (Vite HMR)
npm run build          # TypeScript check + Vite production build
npm run typecheck      # TypeScript type checking only (no emit)
npm run lint           # ESLint with zero warnings tolerance
npm run lint:fix       # ESLint auto-fix
npm run format         # Prettier format all files
npm run format:check   # Prettier check (CI-friendly)
npm run test           # Run all tests once
npm run test:watch     # Run tests in watch mode
npm run test:ui        # Open Vitest UI
npm run test:coverage  # Run tests with coverage report
npm run validate       # Full validation: typecheck + lint + test
```

## Project Structure

```
src/
├── components/        # Reusable UI components
│   └── Button/
│       ├── Button.tsx
│       ├── Button.test.tsx
│       └── index.ts
├── hooks/             # Custom React hooks
│   └── useCounter.ts
├── utils/             # Pure utility functions
│   ├── math.ts
│   └── math.test.ts
├── test/              # Test setup and utilities
│   └── setup.ts       # Vitest + jest-dom setup
├── App.tsx            # Root application component
├── App.test.tsx       # Root component tests
└── main.tsx           # Application entry point
```

## Code Conventions

### TypeScript
- **Strict mode is ON** — never use `any` unless absolutely necessary (and add a comment explaining why)
- Use `type` imports: `import { type Foo } from './bar'` (enforced by eslint)
- Prefer interfaces for object shapes, types for unions/intersections
- Use `noUncheckedIndexedAccess` — always handle possible `undefined` from index access
- Path alias `@/` maps to `src/`

### React
- **Functional components only** — no class components
- Use named exports for components, default export only for the main component per file
- Co-locate tests with their components: `Button.tsx` → `Button.test.tsx`
- Barrel exports via `index.ts` files for cleaner imports

### Testing
- Every component must have a corresponding `.test.tsx` file
- Use `@testing-library/user-event` for user interactions (not `fireEvent`)
- Test behavior, not implementation details
- Use `screen` queries from Testing Library (prefer `getByRole`, `getByLabelText`)
- Coverage thresholds are enforced at 80% — do not lower them

### Formatting
- No semicolons
- Single quotes
- Trailing commas everywhere
- 100 char line width
- Run `npm run format` if prettier complains

## Architecture Decisions

- **No state management library yet** — use React's built-in `useState`/`useReducer`/`useContext` until the app grows enough to warrant one
- **No CSS framework yet** — using CSS modules or plain CSS; add Tailwind/styled-components when needed
- **No routing yet** — add `react-router` when multi-page navigation is needed
- **Path aliases** — `@/` maps to `src/` for cleaner imports

## Common Gotchas

1. **Vitest globals** — `describe`, `it`, `expect` are globally available (configured in vitest setup), no need to import them
2. **ESM-only** — this project uses `"type": "module"`. Use `.js` extension for any non-TypeScript config files
3. **Prettier + ESLint** — Prettier handles formatting, ESLint handles logic. Don't add ESLint formatting rules
4. **Coverage in CI** — coverage report is generated as lcov for CI integration

## When Adding New Features

1. Create the component/hook/utility with proper TypeScript types
2. Write tests FIRST or alongside the implementation
3. Export through barrel files (`index.ts`)
4. Run `npm run validate` before considering work done
5. Ensure no `any` types leaked in
