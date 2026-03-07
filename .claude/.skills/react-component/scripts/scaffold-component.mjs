#!/usr/bin/env node
// Scaffolds a new React component following this project's conventions.
// Usage:   node .claude/.skills/react-component/scripts/scaffold-component.mjs <ComponentName> [htmlElement]
// Example: node .claude/.skills/react-component/scripts/scaffold-component.mjs Modal div
//          node .claude/.skills/react-component/scripts/scaffold-component.mjs Button button

import { mkdirSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

const [, , name, element = 'div'] = process.argv

if (!name) {
  console.error('Usage: node scaffold-component.mjs <ComponentName> [htmlElement]')
  console.error('Example: node scaffold-component.mjs Modal div')
  process.exit(1)
}

if (!/^[A-Z][A-Za-z0-9]*$/.test(name)) {
  console.error(`Component name must be PascalCase (e.g., "Modal", "TextInput"). Got: "${name}"`)
  process.exit(1)
}

const dir = join('src', 'components', name)

if (existsSync(dir)) {
  console.error(`Directory already exists: ${dir}`)
  process.exit(1)
}

const ElType = element.charAt(0).toUpperCase() + element.slice(1)

// --- Component file ---
const componentFile = `import { type ReactNode, type ${ElType}HTMLAttributes } from 'react'

export interface ${name}Props extends ${ElType}HTMLAttributes<HTML${ElType}Element> {
  /** Content to render inside the ${name} */
  children: ReactNode
}

/**
 * Brief description of what ${name} does.
 *
 * @example
 * \`\`\`tsx
 * <${name}>content</${name}>
 * \`\`\`
 */
export function ${name}({ children, className = '', ...props }: ${name}Props) {
  return (
    <${element} className={className} {...props}>
      {children}
    </${element}>
  )
}
`

// --- Test file ---
const testFile = `import { render, screen } from '@testing-library/react'
import { ${name} } from './${name}'

describe('${name}', () => {
  it('renders children correctly', () => {
    render(<${name}>Test content</${name}>)
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })
})
`

// --- Barrel export ---
const indexFile = `export { ${name} } from './${name}'
export { type ${name}Props } from './${name}'
`

mkdirSync(dir, { recursive: true })
writeFileSync(join(dir, `${name}.tsx`), componentFile)
writeFileSync(join(dir, `${name}.test.tsx`), testFile)
writeFileSync(join(dir, 'index.ts'), indexFile)

console.log(`Scaffolded ${name} component:`)
console.log(`  ${join(dir, `${name}.tsx`)}`)
console.log(`  ${join(dir, `${name}.test.tsx`)}`)
console.log(`  ${join(dir, 'index.ts')}`)
console.log('')
console.log('Next steps:')
console.log('  1. Edit the component JSX and props')
console.log('  2. Add behavioral tests')
console.log('  3. Run: npm run validate')
