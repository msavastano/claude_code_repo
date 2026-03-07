# Language-Specific Standards

## Python

- Follow PEP 8 (4-space indents, 79-char line limit)
- Prefer f-strings over `.format()` or `%`
- Use type hints on function signatures
- Avoid mutable default arguments (`def f(x=[])` is a bug)
- Use `with` for file/resource handling, never bare `open()`

## JavaScript / TypeScript

- Prefer `const` > `let`, never `var`
- Use `===` not `==`
- Async/await over raw `.then()` chains
- TypeScript: no `any` unless explicitly justified
- Destructure objects at function boundaries for clarity

## Go

- Handle every error — no `_` discards without a comment
- Keep functions under ~40 lines
- Prefer table-driven tests
- Use `context.Context` as the first argument in long-running funcs

## SQL

- Never concatenate user input into queries — always parameterize
- Name indexes explicitly (`idx_users_email` not auto-named)
- SELECT only the columns you need, avoid `SELECT *` in production

## General (All Languages)

- No secrets or credentials in source files
- No commented-out code in PRs (use git history instead)
- Every exported/public function needs a docstring
- Tests must exist for any non-trivial logic
