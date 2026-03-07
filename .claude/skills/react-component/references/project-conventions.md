# Project Conventions Reference

## File Organization

- Components live in `src/components/{ComponentName}/`
- Each component folder has: `{ComponentName}.tsx`, `{ComponentName}.test.tsx`, `index.ts`
- Hooks live in `src/hooks/`
- Utilities live in `src/utils/`
- Path alias `@/` maps to `src/`

## TypeScript Rules

- Strict mode is ON
- `noUncheckedIndexedAccess` is enabled - always handle possible `undefined` from index access
- Use `type` imports: `import { type Foo } from './bar'`
- Prefer `interface` for object shapes, `type` for unions/intersections
- Never use `any` without a comment explaining why

## Formatting (Prettier)

- No semicolons
- Single quotes
- Trailing commas everywhere
- 100 char line width

## Testing (Vitest + React Testing Library)

- Globals are available: `describe`, `it`, `expect`, `vi` (no imports needed)
- Use `@testing-library/user-event` for interactions, NOT `fireEvent`
- Use `screen` queries - prefer `getByRole`, `getByLabelText`
- Test behavior, not implementation details
- Coverage thresholds: 80% on branches/functions/lines/statements

## React Patterns

- Functional components only
- Named exports for components
- Extend native HTML attributes when wrapping native elements
- JSDoc on components and custom props

## Existing Component Example (Button)

The Button component in `src/components/Button/Button.tsx` demonstrates:

- Extending `ButtonHTMLAttributes`
- Variant and size props with string literal unions
- Loading state with aria-busy
- Class string composition
- Full test suite covering rendering, clicks, disabled state, loading, variants, sizes, className merging, and attribute forwarding
