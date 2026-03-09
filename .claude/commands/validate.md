# Run the full validation pipeline and report results

1. `npm run typecheck` — TypeScript type checking
2. `npm run lint` — ESLint with zero warnings
3. `npm run test` — All tests passing
4. `npm run format:check` — Prettier formatting

For each step, report:

- ✅ PASS or ❌ FAIL
- If FAIL: show the errors and suggest fixes

If everything passes, confirm the codebase is clean and ready to commit.
