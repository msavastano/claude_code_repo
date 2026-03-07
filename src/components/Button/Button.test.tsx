import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(<Button onClick={handleClick}>Click me</Button>)
    await user.click(screen.getByRole('button'))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(
      <Button onClick={handleClick} disabled>
        Click me
      </Button>,
    )
    await user.click(screen.getByRole('button'))

    expect(handleClick).not.toHaveBeenCalled()
  })

  it('shows loading text and disables button when loading', () => {
    render(<Button loading>Submit</Button>)

    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('Loading...')
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-busy', 'true')
  })

  it('applies variant classes', () => {
    const { rerender } = render(<Button variant="primary">Btn</Button>)
    expect(screen.getByRole('button').className).toContain('bg-blue-600')

    rerender(<Button variant="danger">Btn</Button>)
    expect(screen.getByRole('button').className).toContain('bg-red-600')

    rerender(<Button variant="secondary">Btn</Button>)
    expect(screen.getByRole('button').className).toContain('bg-gray-200')
  })

  it('applies size classes', () => {
    const { rerender } = render(<Button size="sm">Btn</Button>)
    expect(screen.getByRole('button').className).toContain('text-sm')

    rerender(<Button size="lg">Btn</Button>)
    expect(screen.getByRole('button').className).toContain('text-lg')
  })

  it('merges custom className', () => {
    render(<Button className="custom-class">Btn</Button>)
    expect(screen.getByRole('button').className).toContain('custom-class')
  })

  it('forwards additional HTML attributes', () => {
    render(
      <Button type="submit" data-testid="my-button">
        Submit
      </Button>,
    )
    const button = screen.getByTestId('my-button')
    expect(button).toHaveAttribute('type', 'submit')
  })
})
