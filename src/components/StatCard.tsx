import type { ReactNode } from 'react'

type StatCardTone = 'wine' | 'gold' | 'rose'

interface StatCardProps {
  label: string
  value: string
  icon?: ReactNode
  /** Color of the icon's circular chip background — cycles through the
   * existing token palette so a row of stat cards reads as a set. */
  tone?: StatCardTone
}

const chipClasses: Record<StatCardTone, string> = {
  wine: 'bg-wine-primary/10 text-wine-primary',
  gold: 'bg-warm-gold/20 text-warm-gold',
  rose: 'bg-muted-rose/20 text-muted-rose',
}

/** Small KPI tile — shared by the Provider Dashboard and Admin Overview. */
export default function StatCard({ label, value, icon, tone = 'wine' }: StatCardProps) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-3xl bg-pure-white px-2 py-5 text-center shadow-sm sm:px-3">
      {icon && (
        <span className={`flex h-9 w-9 items-center justify-center rounded-full ${chipClasses[tone]}`}>
          {icon}
        </span>
      )}
      <span className="font-arabic text-xl font-bold text-wine-primary">{value}</span>
      <span className="font-arabic text-[11px] text-charcoal-text/60">{label}</span>
    </div>
  )
}
