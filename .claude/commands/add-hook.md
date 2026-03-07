Create a new custom React hook. The argument $ARGUMENTS should be the hook name (e.g., useLocalStorage).

1. Create `src/hooks/$ARGUMENTS.ts`:
   - Properly typed with generics where appropriate
   - JSDoc comment with @example usage
   - Named export

2. Create `src/hooks/$ARGUMENTS.test.ts`:
   - Use `renderHook` from `@testing-library/react`
   - Test initial state
   - Test state updates via `act()`
   - Test edge cases and error conditions

3. Run `npm run validate` to ensure everything passes

Follow the existing code conventions in CLAUDE.md.
