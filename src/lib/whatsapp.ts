/**
 * WhatsApp click-to-chat links (https://wa.me/<digits>?text=<message>).
 *
 * The providers' numbers in mock-data are placeholders, and there is no
 * reserved "fictional" number range for Algeria — so a placeholder could
 * belong to a real person. For live demos, set VITE_DEMO_WHATSAPP_NUMBER
 * (e.g. in .env.local or the Vercel project env) to a number the team owns;
 * every contact button then opens a chat with that number instead.
 */
const DEMO_NUMBER: string | undefined = import.meta.env.VITE_DEMO_WHATSAPP_NUMBER

/** wa.me wants the full international number as digits only: no +, spaces or dashes. */
function toWaDigits(phone: string) {
  return phone.replace(/\D/g, '')
}

export function whatsappLink(phone: string, message: string) {
  const digits = toWaDigits(DEMO_NUMBER?.trim() || phone)
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}
