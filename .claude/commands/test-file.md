Run tests for a specific file or pattern. The argument $ARGUMENTS should be a file path or pattern.

1. Run `npx vitest run $ARGUMENTS --reporter=verbose`
2. If tests fail, analyze the failures:
   - Is it a test bug or an implementation bug?
   - Show the expected vs actual values
   - Suggest the fix
3. If tests pass, show coverage for that file: `npx vitest run $ARGUMENTS --coverage`
4. Report any uncovered lines and suggest additional tests if coverage < 80%
