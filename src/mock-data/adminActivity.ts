/**
 * Mock platform activity feed for /admin/overview (preview) and
 * /admin/activity (full log, combined there with providerRequests.ts).
 * Deliberately excludes booking-request events — those come from
 * providerRequests.ts so there's one source of truth per event type.
 */

export type ActivityType = 'signup' | 'new_service'

export interface ActivityEvent {
  id: string
  type: ActivityType
  title: string
  /** Pre-formatted relative time string. */
  time: string
}

export const activityFeed: ActivityEvent[] = [
  { id: 'a1', type: 'signup', title: 'انضم مستخدم جديد: أمينة شريف', time: 'منذ ساعة' },
  {
    id: 'a2',
    type: 'new_service',
    title: 'استوديو لمسة للتصوير أضاف خدمة جديدة: تصوير فيديو للمناسبات',
    time: 'منذ 3 ساعات',
  },
  { id: 'a3', type: 'signup', title: 'انضم مقدّم خدمة جديد: صالون لمسات للتجميل', time: 'أمس' },
  {
    id: 'a4',
    type: 'new_service',
    title: 'النخبة لتنظيم الفعاليات أضاف خدمة جديدة: تنسيق وإدارة يوم المناسبة',
    time: 'قبل يومين',
  },
  { id: 'a5', type: 'signup', title: 'انضم مستخدم جديد: كريم بوداود', time: 'قبل 3 أيام' },
]
