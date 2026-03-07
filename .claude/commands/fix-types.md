Run `npm run typecheck` and fix ALL TypeScript errors. For each error:

1. Read the full error including the error code (e.g., TS2345)
2. Understand WHY the type error occurs — don't just cast to `any`
3. Apply the correct type-safe fix:
   - Add proper type annotations
   - Use type narrowing/guards
   - Fix incorrect generic usage
   - Add missing interface properties
4. Re-run `npm run typecheck` to verify zero errors remain

Do NOT:
- Use `any` type to fix errors (use `unknown` + type guards instead)
- Add `@ts-ignore` or `@ts-expect-error` unless absolutely necessary
- Weaken tsconfig strictness settings
