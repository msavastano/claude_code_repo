---
name: validate-and-fix
description: Runs the full project validation pipeline (typecheck, lint, test, coverage) and automatically diagnoses and fixes any failures. Use when user says "validate", "check the project", "run checks", "fix lint errors", "fix type errors", "tests are failing", "CI is broken", "npm run validate fails", or asks to ensure code quality before committing. Also use after making code changes to verify everything still passes. Do NOT use for writing new features or components from scratch.
---

# Validate and Fix

## Instructions

Run the project's validation pipeline and fix any issues found. Follow this exact sequence.

### Step 1: Run Full Validation

Run `npm run validate` from the project root. This executes:
1. `npm run typecheck` - TypeScript strict mode checking
2. `npm run lint` - ESLint with zero warnings tolerance
3. `npm run test` - Vitest test suite

If everything passes, report success and stop.

### Step 2: If TypeScript Fails

Run `npm run typecheck` separately to isolate type errors.

**Common fixes:**
- Missing `type` keyword on type-only imports: change `import { Foo }` to `import { type Foo }`
- Implicit `any` on function parameters: add explicit type annotations
- Unchecked index access (project uses `noUncheckedIndexedAccess`): add nullish checks
- Missing return type: add explicit return type annotation
- Property does not exist: check interface definition, add missing field or fix typo

Fix each error, then re-run `npm run typecheck` to confirm.

### Step 3: If ESLint Fails

First try auto-fix: `npm run lint:fix`

If errors remain after auto-fix, run `npm run lint` to see remaining issues.

**Common fixes:**
- `consistent-type-imports`: add `type` keyword to type-only imports
- `no-explicit-any`: replace `any` with proper type or `unknown`
- `no-unused-vars`: remove unused variables or prefix with `_`
- `no-console`: remove console.log or use console.warn/console.error
- `react-hooks/exhaustive-deps`: add missing dependencies to useEffect/useCallback/useMemo
- `react-hooks/rules-of-hooks`: ensure hooks are only called at top level of components/hooks

Fix each error, then re-run `npm run lint` to confirm zero warnings.

### Step 4: If Tests Fail

Run `npm run test` to see which tests fail.

**Diagnosis approach:**
1. Read the test file and the component/hook it tests
2. Read the actual error message carefully - is it an assertion failure or a runtime error?
3. Determine if the test is wrong or the implementation is wrong
4. Fix the source of the problem

**Common fixes:**
- Missing text/role: check the component renders the expected element
- Async test issues: ensure `await` on `userEvent` calls
- `act()` warnings: wrap state updates in `act()`
- Snapshot mismatches: update snapshots if the change was intentional

Fix the issue, then re-run `npm run test` to confirm all tests pass.

### Step 5: Check Coverage (if requested)

Run `npm run test:coverage` to check coverage thresholds.

The project requires 80% on branches, functions, lines, and statements.

If coverage is below threshold:
1. Identify uncovered lines/branches from the coverage report
2. Add tests targeting those specific branches
3. Re-run coverage to confirm thresholds are met

### Step 6: Format Check

Run `npm run format:check` to verify formatting.

If it fails, run `npm run format` to auto-fix, then re-run the check.

### Step 7: Final Verification

After all fixes, run `npm run validate` one final time to confirm the entire pipeline passes.

Report the result to the user with a summary of what was fixed.

## Important

- ALWAYS fix the root cause, not the symptom
- If a type error is caused by a wrong implementation (not a wrong type), fix the implementation
- If a test fails because the behavior changed intentionally, update the test
- If a test fails because of a bug, fix the bug
- Run the full `npm run validate` at the end, even if individual steps passed
- Quality is more important than speed - do not skip validation steps
