import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { IconButton } from './IconButton'

describe('IconButton', () => {
  it('renders with the default star icon', () => {
    render(<IconButton aria-label="Favourite" />)
    const button = screen.getByRole('button', { name: 'Favourite' })
    expect(button).toBeInTheDocument()
    expect(button.querySelector('svg')).toBeInTheDocument()
  })

  it('renders a custom icon when provided', () => {
    render(<IconButton aria-label="Close" icon={<span data-testid="custom-icon" />} />)
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<IconButton aria-label="Favourite" onClick={handleClick} />)
    await user.click(screen.getByRole('button', { name: 'Favourite' }))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is set', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<IconButton aria-label="Favourite" disabled onClick={handleClick} />)
    const button = screen.getByRole('button', { name: 'Favourite' })
    expect(button).toBeDisabled()
    await user.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('applies a custom className', () => {
    render(<IconButton aria-label="Favourite" className="my-class" />)
    expect(screen.getByRole('button', { name: 'Favourite' })).toHaveClass('my-class')
  })
})
