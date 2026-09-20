/**
 * Mock booking requests for the Service Provider dashboard/requests list.
 * Client-side only. Customer names are invented (no customers.ts exists
 * yet); service/provider ids reference the real records in services.ts.
 */

export type RequestStatus = 'pending' | 'accepted' | 'declined'

export interface ProviderRequest {
  id: string
  providerId: string
  serviceId: string
  customerName: string
  /** Display string — the requested event date. */
  eventDate: string
  status: RequestStatus
  /** Pre-formatted relative time string. */
  requestedAt: string
}

export const providerRequests: ProviderRequest[] = [
  {
    id: 'r1',
    providerId: 'p2',
    serviceId: 's2',
    customerName: 'أمينة شريف',
    eventDate: '18 أكتوبر 2026',
    status: 'pending',
    requestedAt: 'منذ ساعة',
  },
  {
    id: 'r2',
    providerId: 'p2',
    serviceId: 's12',
    customerName: 'كريم بوداود',
    eventDate: '2 نوفمبر 2026',
    status: 'pending',
    requestedAt: 'منذ 4 ساعات',
  },
  {
    id: 'r3',
    providerId: 'p2',
    serviceId: 's2',
    customerName: 'ليلى حمدي',
    eventDate: '25 سبتمبر 2026',
    status: 'accepted',
    requestedAt: 'أمس',
  },
  {
    id: 'r4',
    providerId: 'p2',
    serviceId: 's2',
    customerName: 'يوسف مرابط',
    eventDate: '10 سبتمبر 2026',
    status: 'declined',
    requestedAt: 'قبل 3 أيام',
  },
  {
    id: 'r5',
    providerId: 'p1',
    serviceId: 's1',
    customerName: 'سعاد بن علي',
    eventDate: '30 سبتمبر 2026',
    status: 'pending',
    requestedAt: 'قبل يومين',
  },
]
