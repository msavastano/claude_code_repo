---
name: react-component
description: Scaffolds new React components with TypeScript types, co-located tests, and barrel exports following this project's conventions. Use when user says "create component", "add component", "new component", "scaffold component", or names a UI element to build (e.g., "make a Modal", "build a Card component"). Do NOT use for hooks, utilities, or non-component code.
---

# React Component Scaffolding

## Instructions

When the user asks to create a new React component, follow these steps exactly.

### Step 1: Determine Component Details

Ask the user (if not already specified):
- Component name (PascalCase, e.g., `Modal`, `Card`, `TextInput`)
- Whether it wraps a native HTML element (to extend its attributes)
- Key props beyond the native ones

### Step 2: Scaffold the Files

Run the scaffold script from the project root:

```bash
node .claude/.skills/react-component/scripts/scaffold-component.mjs <ComponentName> [htmlElement]
```

For example:
```bash
node .claude/.skills/react-component/scripts/scaffold-component.mjs Modal div
node .claude/.skills/react-component/scripts/scaffold-component.mjs Button button
```

This creates `{ComponentName}.tsx`, `{ComponentName}.test.tsx`, and `index.ts` with the correct boilerplate in `src/components/{ComponentName}/`. Then edit the generated files to add the component's actual JSX and props.

## Critical Rules

- Use `type` imports: `import { type Foo } from 'react'` (enforced by eslint)
- Use **named exports** only (no default exports for components)
- Extend native HTML element attributes when wrapping a native element
- Use `interface` for the props shape (not `type`)
- Include JSDoc comments on the component and each custom prop
- No semicolons, single quotes, trailing commas (Prettier config)
- Never use `any` type - use proper generics or `unknown` if needed

### Step 3: Implement the Component

Edit the generated `{ComponentName}.tsx` to add the real JSX, props, and logic. The scaffold gives you the correct structure — fill in the implementation.

**Testing rules (for the generated test file):**
- Use `userEvent.setup()` for interactions (NOT `fireEvent`)
- Use `screen` queries, prefer `getByRole` and `getByLabelText`
- Test behavior, not implementation details
- Vitest globals (`describe`, `it`, `expect`, `vi`) are available without import

### Step 4: Validate

Run `npm run validate` from the project root to confirm:
1. TypeScript compiles with no errors
2. ESLint passes with zero warnings
3. All tests pass

If validation fails, fix the issues before reporting success.

## Examples

### Example 1: Simple presentational component
User says: "Create a Card component"

Result: `src/components/Card/Card.tsx` with `CardProps` extending `HTMLAttributes<HTMLDivElement>`, co-located test file, and barrel export.

### Example 2: Interactive component
User says: "Build a TextInput component with a label and error message"

Result: `src/components/TextInput/TextInput.tsx` extending `InputHTMLAttributes<HTMLInputElement>` with `label` and `error` custom props, tests covering the label association and error display, and barrel export.

## Common Issues

### ESLint: consistent-type-imports
If you see this error, make sure all type-only imports use the `type` keyword:
```tsx
// Wrong
import { ReactNode } from 'react'
// Correct
import { type ReactNode } from 'react'
```

### Coverage threshold not met
The project enforces 80% coverage. Make sure tests cover the key branches (variants, loading state, disabled state, etc.).

For the full project conventions, consult `references/project-conventions.md`.
