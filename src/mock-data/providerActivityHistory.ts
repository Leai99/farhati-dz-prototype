/**
 * 30-day request history for the signed-in provider (p2 — استوديو لمسة
 * للتصوير), used by the Provider Dashboard activity chart.
 *
 * Two parts:
 * - `CURRENT_REQUEST_DAYS_AGO`: places the live requests from
 *   providerRequests.ts (r1–r4) on the timeline, matching their relative
 *   `requestedAt` strings (منذ ساعة / منذ 4 ساعات → today, أمس → 1,
 *   قبل 3 أيام → 3). Their status still comes from ProviderDataContext, so
 *   accepting/declining on the Requests screen updates the chart live.
 * - `historicalRequests`: older, already-resolved requests (accepted or
 *   declined — nothing that far back is still pending), generated with a
 *   fixed seed so the chart is identical on every load. Volume rises gently
 *   toward the present so there's a visible upward trend.
 *
 * Dates are stored as "days ago" and resolved against the viewer's today,
 * so the timeline never goes stale during a demo.
 */
import type { RequestStatus } from './providerRequests'

export const HISTORY_PROVIDER_ID = 'p2'
export const HISTORY_DAYS = 30

export interface HistoricalRequest {
  id: string
  serviceId: string
  /** 0 = today, 29 = the oldest day in the 30-day window. */
  daysAgo: number
  status: Exclude<RequestStatus, 'pending'>
}

/** Timeline position of the live requests in providerRequests.ts (p2 only). */
export const CURRENT_REQUEST_DAYS_AGO: Record<string, number> = {
  r1: 0,
  r2: 0,
  r3: 1,
  r4: 3,
}

/** Small deterministic PRNG (mulberry32) — same data on every load. */
function seeded(seed: number) {
  let a = seed
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function generateHistory(): HistoricalRequest[] {
  const rand = seeded(2026)
  const out: HistoricalRequest[] = []
  // Today (0) holds only the live, still-pending requests (r1, r2).
  for (let daysAgo = HISTORY_DAYS - 1; daysAgo >= 1; daysAgo--) {
    // ~0.6 requests/day a month ago rising to ~2.2/day this week.
    const expected = 0.6 + 1.6 * (1 - daysAgo / (HISTORY_DAYS - 1))
    const count = Math.floor(expected + rand() * 1.4)
    for (let i = 0; i < count; i++) {
      out.push({
        id: `h${daysAgo}-${i}`,
        // s2 (photo studio) is the provider's main service; s12 (video) is newer.
        serviceId: rand() < 0.7 ? 's2' : 's12',
        daysAgo,
        status: rand() < 0.7 ? 'accepted' : 'declined',
      })
    }
  }
  return out
}

export const historicalRequests: HistoricalRequest[] = generateHistory()
