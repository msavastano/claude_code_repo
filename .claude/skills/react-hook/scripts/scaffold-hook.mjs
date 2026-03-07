#!/usr/bin/env node
// Scaffolds a new custom React hook following this project's conventions.
// Usage:   node .claude/.skills/react-hook/scripts/scaffold-hook.mjs <hookName>
// Example: node .claude/.skills/react-hook/scripts/scaffold-hook.mjs useToggle
//          node .claude/.skills/react-hook/scripts/scaffold-hook.mjs useLocalStorage

import { writeFileSync, existsSync } from 'fs'
import { join } from 'path'

const [, , name] = process.argv

if (!name) {
  console.error('Usage: node scaffold-hook.mjs <hookName>')
  console.error('Example: node scaffold-hook.mjs useToggle')
  process.exit(1)
}

if (!name.startsWith('use') || !/^use[A-Z][A-Za-z0-9]*$/.test(name)) {
  console.error(`Hook name must start with "use" followed by PascalCase (e.g., "useToggle"). Got: "${name}"`)
  process.exit(1)
}

const hookPath = join('src', 'hooks', `${name}.ts`)
const testPath = join('src', 'hooks', `${name}.test.ts`)

if (existsSync(hookPath)) {
  console.error(`File already exists: ${hookPath}`)
  process.exit(1)
}

const PascalName = name.charAt(0).toUpperCase() + name.slice(1)

// --- Hook file ---
const hookFile = `import { useState, useCallback } from 'react'

export interface ${PascalName}Options {
  // Add options here
}

export interface ${PascalName}Return {
  // Add return fields here
}

/**
 * Brief description of what ${name} does.
 *
 * @example
 * \`\`\`tsx
 * const result = ${name}()
 * \`\`\`
 */
export function ${name}(_options: ${PascalName}Options = {}): ${PascalName}Return {
  // Implementation here
  throw new Error('${name} not implemented')
}
`

// --- Test file ---
const testFile = `import { renderHook, act } from '@testing-library/react'
import { ${name} } from './${name}'

describe('${name}', () => {
  it('returns the expected initial state', () => {
    const { result } = renderHook(() => ${name}())
    // Add assertions
    expect(result.current).toBeDefined()
  })
})
`

writeFileSync(hookPath, hookFile)
writeFileSync(testPath, testFile)

console.log(`Scaffolded ${name} hook:`)
console.log(`  ${hookPath}`)
console.log(`  ${testPath}`)
console.log('')
console.log('Next steps:')
console.log('  1. Define the Options and Return interfaces')
console.log('  2. Implement the hook body')
console.log('  3. Add tests for state transitions and edge cases')
console.log('  4. Run: npm run validate')
