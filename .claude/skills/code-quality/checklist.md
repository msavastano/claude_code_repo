# Pre-Merge Audit Checklist

Use this when doing a full review before a PR is merged.

## Security

- [ ] No hardcoded secrets, tokens, or passwords
- [ ] All user inputs are validated and sanitized
- [ ] No SQL/command/template injection vectors
- [ ] Auth checks present on all protected routes/functions
- [ ] Dependencies are not known-vulnerable versions

## Correctness

- [ ] Edge cases handled (null, empty, zero, negative)
- [ ] Error paths return meaningful messages
- [ ] No off-by-one errors in loops or slices
- [ ] Concurrent code has no obvious race conditions

## Tests

- [ ] New logic has corresponding tests
- [ ] Tests cover at least one happy path and one failure path
- [ ] Tests are isolated (no hidden shared state)
- [ ] CI would catch a regression if this code broke

## Documentation

- [ ] Public API changes reflected in docs/README
- [ ] Complex logic has inline comments explaining _why_, not _what_
- [ ] CHANGELOG updated if this is a user-facing change

## Performance

- [ ] No N+1 query patterns
- [ ] No unbounded loops over large datasets
- [ ] Caching used where appropriate and invalidated correctly

## Final

- [ ] Code is no larger than it needs to be (no dead code)
- [ ] PR description explains the _why_ behind the change
