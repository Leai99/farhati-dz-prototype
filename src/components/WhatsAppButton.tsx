import { m } from 'framer-motion'
import { pressable } from '../lib/motion'
import { whatsappLink } from '../lib/whatsapp'
import { MessageIcon } from './icons'

interface WhatsAppButtonProps {
  phone: string
  /** Pre-filled chat message (plain text — encoded here). */
  message: string
  label: string
  className?: string
}

/**
 * "Contact via WhatsApp" — a real link that opens WhatsApp (app or web) in a
 * new tab with a pre-filled message, so the prototype itself stays open.
 * Styled as the app's outline button; uses the generic chat-bubble icon
 * rather than WhatsApp's brand logo.
 */
export default function WhatsAppButton({ phone, message, label, className = '' }: WhatsAppButtonProps) {
  return (
    <m.a
      {...pressable}
      href={whatsappLink(phone, message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-center gap-2 rounded-full border border-primary-pink bg-transparent px-6 py-3 font-arabic text-sm font-semibold text-primary-pink transition-colors hover:bg-primary-pink/5 ${className}`}
    >
      <MessageIcon className="h-4 w-4" />
      {label}
    </m.a>
  )
}
