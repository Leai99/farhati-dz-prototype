import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import BackButton from '../../components/BackButton'
import Button from '../../components/Button'
import TextField from '../../components/TextField'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface FormErrors {
  fullName?: string
  email?: string
  password?: string
}

/** Customer App — Screen 3/15 (Section 5.A): Login / Sign Up. Route: "/login" */
export default function LoginSignUp() {
  const navigate = useNavigate()
  const { t } = useTranslation(['login', 'common'])
  const [isSignUp, setIsSignUp] = useState(false)

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})

  function switchMode() {
    setIsSignUp((v) => !v)
    setErrors({})
  }

  function validate(): FormErrors {
    const next: FormErrors = {}
    if (isSignUp && !fullName.trim()) {
      next.fullName = t('errors.fullNameRequired')
    }
    if (!email.trim()) {
      next.email = t('errors.emailRequired')
    } else if (!EMAIL_PATTERN.test(email.trim())) {
      next.email = t('errors.emailInvalid')
    }
    if (!password) {
      next.password = t('errors.passwordRequired')
    } else if (password.length < 6) {
      next.password = t('errors.passwordTooShort')
    }
    return next
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    // No real auth in this prototype — passing validation just advances the flow.
    navigate('/choose-account-type')
  }

  return (
    <main className="flex min-h-full flex-col bg-cream-base px-6 py-6">
      <BackButton />

      <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center gap-8">
        <div className="flex flex-col gap-2 text-start">
          <h1 className="font-arabic text-2xl font-bold text-primary-pink">
            {isSignUp ? t('signUpTitle') : t('signInTitle')}
          </h1>
          <p className="font-arabic text-sm text-charcoal-text/70">
            {isSignUp ? t('signUpSubtitle') : t('signInSubtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          {isSignUp && (
            <TextField
              id="fullName"
              label={t('fullNameLabel')}
              placeholder={t('fullNamePlaceholder')}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              error={errors.fullName}
            />
          )}
          <TextField
            id="email"
            type="email"
            label={t('emailLabel')}
            placeholder={t('emailPlaceholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />
          <TextField
            id="password"
            type="password"
            label={t('passwordLabel')}
            placeholder={t('passwordPlaceholder')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />

          <Button type="submit" className="mt-2">
            {isSignUp ? t('signUpCta') : t('signInCta')}
          </Button>
        </form>

        <button
          type="button"
          onClick={switchMode}
          className="font-arabic text-sm text-primary-pink underline-offset-4 hover:underline"
        >
          {isSignUp ? t('toggleToSignIn') : t('toggleToSignUp')}
        </button>

        {/* Prototype-only shortcut: the Admin App has no real auth gate at
            this stage, so this small, unobtrusive link is its only entry
            point rather than building a login/onboarding flow for it. */}
        <button
          type="button"
          onClick={() => navigate('/admin')}
          className="font-arabic text-xs text-charcoal-text/30 hover:text-charcoal-text/50"
        >
          {t('common:admin')}
        </button>
      </div>
    </main>
  )
}
