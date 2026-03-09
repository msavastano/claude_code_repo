# Review the current changes (staged and unstaged) for code quality

1. Run `git diff` and `git diff --cached` to see all changes
2. For each changed file, check:
   - **Types**: Are types correct and specific (no `any`)?
   - **Tests**: Do changed components/hooks/utils have updated tests?
   - **Naming**: Are names clear, consistent with project conventions?
   - **Performance**: Any unnecessary re-renders, missing memoization for expensive ops?
   - **Accessibility**: Do new UI elements have proper ARIA attributes?
   - **Error handling**: Are errors handled gracefully?
3. Run `npm run validate` to confirm everything passes
4. Provide a summary with actionable feedback
