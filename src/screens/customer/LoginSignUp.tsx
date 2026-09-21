import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import BackButton from '../../components/BackButton'
import Button from '../../components/Button'
import TextField from '../../components/TextField'
import { EyeIcon, EyeOffIcon } from '../../components/icons'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Mock submit delay — long enough to register as "working", short enough not to drag. */
const SUBMIT_DELAY_MS = 750

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
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [resetSent, setResetSent] = useState(false)
  const submitTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(submitTimer.current), [])

  function switchMode() {
    setIsSignUp((v) => !v)
    setErrors({})
    setResetSent(false)
  }

  /** Mock "forgot password": no email is sent. Needs a valid email first,
   * since a real reset link would have to go somewhere. */
  function handleForgotPassword() {
    const trimmed = email.trim()
    if (!trimmed || !EMAIL_PATTERN.test(trimmed)) {
      setResetSent(false)
      setErrors((prev) => ({ ...prev, email: t('forgotPassword.emailNeeded') }))
      return
    }
    setErrors((prev) => ({ ...prev, email: undefined }))
    setResetSent(true)
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
    if (isSubmitting) return
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    // No real auth in this prototype — passing validation just advances the
    // flow, after a short mock "network" delay so it doesn't feel instant.
    setIsSubmitting(true)
    submitTimer.current = setTimeout(() => navigate('/choose-account-type'), SUBMIT_DELAY_MS)
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
            type={showPassword ? 'text' : 'password'}
            label={t('passwordLabel')}
            placeholder={t('passwordPlaceholder')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            endAdornment={
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? t('hidePassword') : t('showPassword')}
                aria-pressed={showPassword}
                aria-controls="password"
                className="flex h-9 w-9 items-center justify-center rounded-full text-charcoal-text/50 hover:text-primary-pink"
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            }
          />

          {!isSignUp && (
            <div className="-mt-2 flex flex-col items-start gap-2">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="font-arabic text-xs font-semibold text-primary-pink underline-offset-4 hover:underline"
              >
                {t('forgotPassword.link')}
              </button>
              {resetSent && (
                <p
                  role="status"
                  className="w-full rounded-xl border border-warm-gold/40 bg-warm-gold/10 px-4 py-3 text-start font-arabic text-xs leading-relaxed text-charcoal-text"
                >
                  {t('forgotPassword.sent')}
                </p>
              )}
            </div>
          )}

          <Button type="submit" className="mt-2" loading={isSubmitting}>
            {isSubmitting
              ? isSignUp
                ? t('signUpLoading')
                : t('signInLoading')
              : isSignUp
                ? t('signUpCta')
                : t('signInCta')}
          </Button>
        </form>

        <button
          type="button"
          disabled={isSubmitting}
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
