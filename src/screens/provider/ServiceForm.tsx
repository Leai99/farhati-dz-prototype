import { useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../components/Button'
import ProviderSidebar from '../../components/ProviderSidebar'
import { useProviderData } from '../../context/ProviderDataContext'
import { CURRENT_PROVIDER_ID } from '../../mock-data/session'
import { categories } from '../../mock-data/services'
import { AnimatedMain } from '../../components/Motion'
import { m } from 'framer-motion'
import { pressable } from '../../lib/motion'

interface FormErrors {
  name?: string
  categoryId?: string
  priceFrom?: string
  priceTo?: string
}

const inputBase =
  'rounded-xl border bg-pure-white px-4 py-3 text-charcoal-text outline-none placeholder:text-charcoal-text/40'
const inputValid = 'border-muted-rose/40 focus:border-primary-pink'
const inputInvalid = 'border-muted-rose focus:border-muted-rose'

/**
 * Service Provider App — Screen 6/9 (Section 5.B): Add/Edit Service.
 * Routes: "/provider-app/services/new" and
 * "/provider-app/services/:serviceId/edit" — one form component for both
 * modes.
 *
 * Chose dedicated routes over a modal: a 4-field form with a select and a
 * multi-line description reads better as its own screen, and it keeps the
 * same dedicated-route navigation model used everywhere else in this
 * prototype rather than opening a new "which side does it slide from"
 * question the way a modal/sheet would.
 */
export default function ServiceForm() {
  const { serviceId } = useParams()
  const navigate = useNavigate()
  const { services, addService, updateService } = useProviderData()
  const isEditMode = Boolean(serviceId)
  const existing = isEditMode ? services.find((s) => s.id === serviceId) : undefined

  const [name, setName] = useState(existing?.name ?? '')
  const [categoryId, setCategoryId] = useState(existing?.categoryId ?? '')
  const [priceFrom, setPriceFrom] = useState(existing ? String(existing.priceFrom) : '')
  const [priceTo, setPriceTo] = useState(existing ? String(existing.priceTo) : '')
  const [description, setDescription] = useState(existing?.description ?? '')
  const [errors, setErrors] = useState<FormErrors>({})

  if (isEditMode && !existing) {
    return (
      <div className="flex min-h-screen bg-cream-base">
        <ProviderSidebar />
        <AnimatedMain className="flex flex-1 flex-col items-center justify-center gap-2 p-6 text-center">
          <p className="font-arabic text-lg font-semibold text-primary-pink">
            لم يتم العثور على هذه الخدمة
          </p>
        </AnimatedMain>
      </div>
    )
  }

  function validate(): FormErrors {
    const next: FormErrors = {}
    if (!name.trim()) {
      next.name = 'اسم الخدمة مطلوب'
    }
    if (!categoryId) {
      next.categoryId = 'اختيار الفئة مطلوب'
    }

    const from = Number(priceFrom)
    const to = Number(priceTo)

    if (!priceFrom.trim() || Number.isNaN(from) || from <= 0) {
      next.priceFrom = 'أدخل سعرًا صحيحًا أكبر من صفر'
    }
    if (!priceTo.trim() || Number.isNaN(to) || to <= 0) {
      next.priceTo = 'أدخل سعرًا صحيحًا أكبر من صفر'
    }
    if (!next.priceFrom && !next.priceTo && from > to) {
      next.priceTo = 'يجب أن يكون السعر الأقصى أكبر من أو يساوي السعر الأدنى'
    }

    return next
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const input = {
      name: name.trim(),
      categoryId,
      priceFrom: Number(priceFrom),
      priceTo: Number(priceTo),
      description: description.trim(),
    }
    if (isEditMode && existing) {
      updateService(existing.id, input)
    } else {
      addService(CURRENT_PROVIDER_ID, input)
    }
    navigate('/provider-app/services')
  }

  return (
    <div className="flex min-h-screen bg-cream-base">
      <ProviderSidebar />

      <AnimatedMain className="min-w-0 flex-1 px-4 py-6 sm:px-8">
        <h1 className="font-arabic text-2xl font-bold text-primary-pink">
          {isEditMode ? 'تعديل الخدمة' : 'إضافة خدمة جديدة'}
        </h1>

        <form onSubmit={handleSubmit} noValidate className="mt-6 flex max-w-md flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-right font-arabic">
            <span className="text-sm font-medium text-charcoal-text">اسم الخدمة</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثال: تصوير فوتوغرافي للمناسبات"
              aria-invalid={errors.name ? true : undefined}
              className={`${inputBase} ${errors.name ? inputInvalid : inputValid}`}
            />
            {errors.name && <span className="text-xs font-medium text-muted-rose">{errors.name}</span>}
          </label>

          <label className="flex flex-col gap-1.5 text-right font-arabic">
            <span className="text-sm font-medium text-charcoal-text">الفئة</span>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              aria-invalid={errors.categoryId ? true : undefined}
              className={`${inputBase} ${errors.categoryId ? inputInvalid : inputValid}`}
            >
              <option value="" disabled>
                اختر فئة
              </option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <span className="text-xs font-medium text-muted-rose">{errors.categoryId}</span>
            )}
          </label>

          <div className="flex gap-3">
            <label className="flex flex-1 flex-col gap-1.5 text-right font-arabic">
              <span className="text-sm font-medium text-charcoal-text">السعر من (دج)</span>
              <input
                type="number"
                min={0}
                value={priceFrom}
                onChange={(e) => setPriceFrom(e.target.value)}
                aria-invalid={errors.priceFrom ? true : undefined}
                className={`${inputBase} ${errors.priceFrom ? inputInvalid : inputValid}`}
              />
              {errors.priceFrom && (
                <span className="text-xs font-medium text-muted-rose">{errors.priceFrom}</span>
              )}
            </label>
            <label className="flex flex-1 flex-col gap-1.5 text-right font-arabic">
              <span className="text-sm font-medium text-charcoal-text">السعر إلى (دج)</span>
              <input
                type="number"
                min={0}
                value={priceTo}
                onChange={(e) => setPriceTo(e.target.value)}
                aria-invalid={errors.priceTo ? true : undefined}
                className={`${inputBase} ${errors.priceTo ? inputInvalid : inputValid}`}
              />
              {errors.priceTo && (
                <span className="text-xs font-medium text-muted-rose">{errors.priceTo}</span>
              )}
            </label>
          </div>

          <label className="flex flex-col gap-1.5 text-right font-arabic">
            <span className="text-sm font-medium text-charcoal-text">وصف مختصر</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="صف خدمتك بإيجاز لعملائك"
              required
              className="resize-none rounded-xl border border-muted-rose/40 bg-pure-white px-4 py-3 text-charcoal-text outline-none placeholder:text-charcoal-text/40 focus:border-primary-pink"
            />
          </label>

          <div className="mt-2 flex gap-3">
            <m.button
              {...pressable}
              type="button"
              onClick={() => navigate('/provider-app/services')}
              className="flex-1 rounded-full border border-primary-pink px-6 py-3 font-arabic text-sm font-semibold text-primary-pink"
            >
              إلغاء
            </m.button>
            <div className="flex-1">
              <Button type="submit">{isEditMode ? 'حفظ التعديلات' : 'إضافة الخدمة'}</Button>
            </div>
          </div>
        </form>
      </AnimatedMain>
    </div>
  )
}
