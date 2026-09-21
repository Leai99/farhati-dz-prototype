import type { ReactNode } from 'react'
import type { EventType } from '../lib/events'

function Icon({ children, className }: { children: ReactNode; className: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

// Neutral, non-literal line icons — deliberately avoid banned imagery from
// Section 2 (no bride/dress, no graduation cap, no birthday cake).
const paths: Record<EventType, ReactNode> = {
  wedding: (
    <>
      <circle cx="9" cy="14" r="4" />
      <circle cx="15" cy="14" r="4" />
    </>
  ),
  birthday: (
    <>
      <rect x="4" y="10" width="16" height="10" rx="1" />
      <path d="M4 14h16" />
      <path d="M12 10V6" />
      <path d="M12 6c-1.4 0-2.5-.9-2.5-2A1.5 1.5 0 0 1 12 2.5c0 1.7 2.5 1.8 2.5 3.5" />
    </>
  ),
  graduation: (
    <>
      <rect x="5" y="3.5" width="14" height="12" rx="1.5" />
      <path d="M8 7.5h8" />
      <path d="M8 10.5h5" />
      <circle cx="12" cy="18.5" r="2" />
      <path d="M10.3 20.2 9.5 23l2.5-1.3L14.5 23l-.8-2.8" />
    </>
  ),
  corporate: (
    <>
      <rect x="3.5" y="8" width="17" height="11" rx="1.5" />
      <path d="M8.5 8V6a1.5 1.5 0 0 1 1.5-1.5h4A1.5 1.5 0 0 1 15.5 6v2" />
      <path d="M3.5 13h17" />
    </>
  ),
  other: (
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.5 2.5M15.2 15.2l2.5 2.5M17.7 6.3l-2.5 2.5M8.8 15.2l-2.5 2.5" />
  ),
}

/** Event-type icon, shared by Select Event Type, the event form and My Events. */
export default function EventTypeIcon({ type, className = 'h-6 w-6' }: { type: EventType; className?: string }) {
  return <Icon className={className}>{paths[type]}</Icon>
}
