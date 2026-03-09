import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App', () => {
  it('renders the heading', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'This is a new project template',
    )
  })

  it('renders the counter at 0', () => {
    render(<App />)
    expect(screen.getByText('Count: 0')).toBeInTheDocument()
  })

  it('increments the counter', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: '+' }))
    expect(screen.getByText('Count: 1')).toBeInTheDocument()
  })

  it('decrements the counter but not below 0', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Decrement' }))
    expect(screen.getByText('Count: 0')).toBeInTheDocument() // min is 0
  })

  it('resets the counter', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: '+' }))
    await user.click(screen.getByRole('button', { name: '+' }))
    expect(screen.getByText('Count: 2')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Reset' }))
    expect(screen.getByText('Count: 0')).toBeInTheDocument()
  })

  it('greets the user when name is entered', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByLabelText('Your name:')
    await user.type(input, 'Alice')

    expect(screen.getByText('Hello, Alice!')).toBeInTheDocument()
  })

  it('does not show greeting when name is empty', () => {
    render(<App />)
    expect(screen.queryByText(/Hello,/)).not.toBeInTheDocument()
  })
})
