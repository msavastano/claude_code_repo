Create a new React component with the following structure. The argument $ARGUMENTS should be the component name in PascalCase.

1. Create `src/components/$ARGUMENTS/$ARGUMENTS.tsx`:
   - Functional component with proper TypeScript props interface
   - Named export
   - JSDoc comment describing the component

2. Create `src/components/$ARGUMENTS/$ARGUMENTS.test.tsx`:
   - Import from the component file
   - Test rendering without crashing
   - Test all interactive behaviors
   - Test accessibility (roles, labels)
   - Use `userEvent` for interactions, `screen` for queries

3. Create `src/components/$ARGUMENTS/index.ts`:
   - Barrel export: `export { ComponentName } from './ComponentName'`
   - Also export the props type

4. Run `npm run validate` to ensure everything passes

Follow the existing code conventions in CLAUDE.md.
