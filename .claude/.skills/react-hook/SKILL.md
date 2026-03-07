---
name: react-hook
description: Creates custom React hooks with TypeScript interfaces, comprehensive tests, and JSDoc documentation following this project's conventions. Use when user says "create a hook", "add a hook", "new hook", "custom hook", "useXxx", or describes stateful/reusable logic to extract (e.g., "make a useLocalStorage hook", "I need a debounce hook"). Do NOT use for components, utilities, or non-hook code.
---

# React Hook Scaffolding

## Instructions

When the user asks to create a custom React hook, follow these steps exactly.

### Step 1: Determine Hook Details

Ask the user (if not already specified):
- Hook name (must start with `use`, camelCase, e.g., `useLocalStorage`, `useDebounce`)
- What state or behavior the hook manages
- Any configuration options it should accept

### Step 2: Scaffold the Files

Run the scaffold script from the project root:

```bash
node .claude/.skills/react-hook/scripts/scaffold-hook.mjs <hookName>
```

For example:
```bash
node .claude/.skills/react-hook/scripts/scaffold-hook.mjs useToggle
node .claude/.skills/react-hook/scripts/scaffold-hook.mjs useLocalStorage
```

This creates `src/hooks/{hookName}.ts` and `src/hooks/{hookName}.test.ts` with the correct boilerplate. Then edit the generated files to define the interfaces and implement the hook.

## Critical Rules

- Hook name MUST start with `use` (React convention)
- Use `type` imports: `import { type Foo } from 'react'`
- Define separate `interface` for Options (input) and Return (output)
- Use `interface` for object shapes (not `type`)
- Wrap callbacks in `useCallback` for referential stability
- Use function overloads or generics when the hook is polymorphic
- Include JSDoc on the hook function and each interface field
- No semicolons, single quotes, trailing commas (Prettier config)
- Never use `any` - use generics or `unknown` if needed
- Handle edge cases: undefined initial values, empty arrays, etc.

### Step 3: Implement the Hook

Edit the generated `{hookName}.ts` to define the `Options` and `Return` interfaces and implement the hook body.

**Testing rules (for the generated test file):**
- Use `renderHook` from `@testing-library/react` for hook testing
- Wrap state updates in `act()`
- Vitest globals (`describe`, `it`, `expect`, `vi`) are available without import
- Test default options, custom options, edge cases, and error conditions
- For hooks that use timers, use `vi.useFakeTimers()` and `vi.advanceTimersByTime()`
- Use `.test.tsx` instead of `.test.ts` if the hook renders JSX

### Step 4: Validate

Run `npm run validate` from the project root to confirm:
1. TypeScript compiles with no errors
2. ESLint passes with zero warnings
3. All tests pass

If validation fails, fix the issues before reporting success.

## Examples

### Example 1: State management hook
User says: "Create a useToggle hook"

Result: `src/hooks/useToggle.ts` with `UseToggleOptions` (initialValue), `UseToggleReturn` (value, toggle, setTrue, setFalse), and tests for all state transitions.

### Example 2: Side-effect hook
User says: "Build a useDebounce hook"

Result: `src/hooks/useDebounce.ts` with generic type parameter, delay option, cleanup on unmount, and tests using fake timers.

### Example 3: DOM interaction hook
User says: "Make a useClickOutside hook"

Result: `src/hooks/useClickOutside.ts` accepting a ref and callback, using `useEffect` for event listener management, tests using `userEvent` with a rendered component.

## Common Issues

### renderHook import
Import `renderHook` from `@testing-library/react` (NOT from a separate package):
```ts
import { renderHook, act } from '@testing-library/react'
```

### Stale closure in callbacks
Always use the callback form of setState or include dependencies in useCallback:
```ts
// Correct
const increment = useCallback(() => {
  setCount((prev) => prev + step)
}, [step])
```

### Missing cleanup
For hooks that add event listeners or timers, always return a cleanup function from `useEffect`.

For the full project conventions, consult `references/project-conventions.md`.
