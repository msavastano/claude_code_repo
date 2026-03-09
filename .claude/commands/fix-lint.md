# Run `npm run lint` and fix ALL reported issues. For each issue

1. Read the error message and file location
2. Open the file and understand the context
3. Apply the correct fix (don't just suppress with eslint-disable)
4. If auto-fixable, run `npm run lint:fix` first, then manually fix remaining issues
5. Re-run `npm run lint` to verify zero warnings/errors remain

Do NOT:

- Add `eslint-disable` comments unless the rule is genuinely wrong for that case
- Change eslint config to weaken rules
- Skip files or ignore warnings
