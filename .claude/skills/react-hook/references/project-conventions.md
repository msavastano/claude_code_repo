# Project Conventions Reference

## Hook File Organization

- Hooks live in `src/hooks/{hookName}.ts`
- Tests co-located as `src/hooks/{hookName}.test.ts` (or `.test.tsx` if JSX needed)
- No barrel file needed for hooks (import directly)
- Path alias `@/` maps to `src/`

## TypeScript Rules

- Strict mode is ON
- `noUncheckedIndexedAccess` is enabled
- Use `type` imports: `import { type Foo } from './bar'`
- Use `interface` for Options and Return shapes
- Use generics for polymorphic hooks
- Never use `any` without a comment

## Formatting (Prettier)

- No semicolons
- Single quotes
- Trailing commas everywhere
- 100 char line width

## Testing (Vitest + React Testing Library)

- Globals available: `describe`, `it`, `expect`, `vi`
- Use `renderHook` and `act` from `@testing-library/react`
- For timer-based hooks: `vi.useFakeTimers()` / `vi.useRealTimers()`
- Coverage thresholds: 80% on branches/functions/lines/statements

## Existing Hook Example (useCounter)

The useCounter hook in `src/hooks/useCounter.ts` demonstrates:

- Options interface with optional fields and defaults
- Return interface with state and actions
- `useCallback` for all returned functions
- Internal `clamp` helper wrapped in `useCallback`
- Callback form of `setState` to avoid stale closures
- JSDoc with @example block
