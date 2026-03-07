import { type ReactNode, type ButtonHTMLAttributes } from 'react'

const DefaultIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon to render inside the button. Defaults to a star icon. */
  icon?: ReactNode
  /** Accessible label for the button (required for icon-only buttons) */
  'aria-label': string
}

/**
 * A button that displays an icon. Accepts any ReactNode as the icon,
 * with a star icon as the default.
 *
 * @example
 * ```tsx
 * <IconButton aria-label="Favourite" />
 * <IconButton aria-label="Close" icon={<MyCloseIcon />} />
 * ```
 */
export function IconButton({ icon = <DefaultIcon />, className = '', ...props }: IconButtonProps) {
  return (
    <button className={className} {...props}>
      {icon}
    </button>
  )
}
