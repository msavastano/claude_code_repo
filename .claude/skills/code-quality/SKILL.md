---
name: code-quality
description: Use when reviewing code for correctness, readability, security, performance, or style issues. Triggers on "review this", "check my code", "audit", "lint", "code quality".
---

# Code Quality Skill

This skill gives Claude the standards and checklist to perform thorough,
consistent code reviews across any language.

## Review Dimensions

Evaluate code across these five dimensions (in order of priority):

1. **Correctness** — Does it do what it's supposed to do?
2. **Security** — Any injection risks, exposed secrets, unsafe inputs?
3. **Performance** — Obvious bottlenecks, unnecessary loops, N+1 queries?
4. **Readability** — Clear naming, single responsibility, appropriate comments?
5. **Style** — Consistent with the surrounding codebase conventions?

## Review Format

Always structure output as:

```
## Code Review: <filename or description>

### Summary
One sentence verdict (e.g. "Looks solid with two issues to address.")

### Issues
| Severity | Line | Issue | Suggestion |
|----------|------|-------|------------|
| 🔴 Critical | 12 | SQL string concatenation (injection risk) | Use parameterized queries |
| 🟡 Warning  | 34 | Magic number `86400` | Extract to constant `SECONDS_PER_DAY` |
| 🟢 Nit      | 56 | Inconsistent spacing | Minor style fix |

### Positives
- List what's done well (always include at least one)

### Recommended Changes
Ordered list of what to fix, most critical first.
```

## Severity Definitions

- 🔴 **Critical** — Must fix before merge (security holes, broken logic, data loss risk)
- 🟡 **Warning** — Should fix (performance, maintainability, likely bugs)
- 🟢 **Nit** — Optional (style, minor readability)

## Supporting Files

Load `standards.md` when you need language-specific rules.
Load `checklist.md` when performing a full pre-merge audit.
