import styles from './CallToActions.module.css'

interface ButtonProps {
  label: string
  onClick?: () => void
  href?: string
}

interface Props {
  primary?: ButtonProps
  secondary?: ButtonProps
  tertiary?: ButtonProps
}

function CTAButton({
  button,
  variant,
}: {
  button: ButtonProps
  variant: 'primary' | 'secondary' | 'tertiary'
}) {
  const className = styles[variant]

  if (button.href) {
    return (
      <a href={button.href} className={className}>
        {button.label}
      </a>
    )
  }

  return (
    <button onClick={button.onClick} className={className}>
      {button.label}
    </button>
  )
}

export default function CallToActions({ primary, secondary, tertiary }: Props) {
  return (
    <div className={styles.callToActions}>
      {primary && <CTAButton button={primary} variant="primary" />}
      {secondary && <CTAButton button={secondary} variant="secondary" />}
      {tertiary && <CTAButton button={tertiary} variant="tertiary" />}
    </div>
  )
}