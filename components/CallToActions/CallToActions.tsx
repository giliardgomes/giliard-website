import styles from './CallToActions.module.css'

interface ButtonProps {
  label: string
  onClick?: () => void
  href?: string
  scrollTo?: string
}

interface Props {
  primary?: ButtonProps
  secondary?: ButtonProps
  tertiary?: ButtonProps
  link?: ButtonProps
  className?: string
}

function CTAButton({
  button,
  variant,
}: {
  button: ButtonProps
  variant: 'primary' | 'secondary' | 'tertiary' | 'link'
}) {
  const className = styles[variant]

  const handleClick = () => {
    if (button.scrollTo) {
      const el = document.getElementById(button.scrollTo)
      el?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    button.onClick?.()
  }

  if (button.href && !button.scrollTo) {
    return (
      <a href={button.href} className={className}>
        {button.label}
      </a>
    )
  }

  return (
    <button onClick={handleClick} className={className}>
      {button.label}
    </button>
  )
}

export default function CallToActions({ primary, secondary, tertiary, link, className }: Props) {
  return (
    <div className={`${styles.callToActions} ${className ?? ''}`}>
      {primary && <CTAButton button={primary} variant="primary" />}
      {secondary && <CTAButton button={secondary} variant="secondary" />}
      {tertiary && <CTAButton button={tertiary} variant="tertiary" />}
      {link && <CTAButton button={link} variant="link" />}
    </div>
  )
}