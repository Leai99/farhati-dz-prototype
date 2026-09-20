/** Mock notification feed for /notifications. Static, client-side only. */

export type NotificationKind = 'booking' | 'message' | 'reminder' | 'system'

export interface AppNotification {
  id: string
  kind: NotificationKind
  title: string
  /** Pre-formatted relative time string — no real timestamps to compute from. */
  time: string
  read: boolean
}

export const notifications: AppNotification[] = [
  {
    id: 'n1',
    kind: 'booking',
    title: 'تم تأكيد حجزك مع "قاعة الأندلس للحفلات"',
    time: 'منذ ساعتين',
    read: false,
  },
  {
    id: 'n2',
    kind: 'message',
    title: 'رسالة جديدة من "استوديو لمسة للتصوير" بخصوص موعد الجلسة',
    time: 'منذ 5 ساعات',
    read: false,
  },
  {
    id: 'n3',
    kind: 'reminder',
    title: 'تذكير: موعد مناسبتك يقترب خلال 10 أيام',
    time: 'أمس',
    read: true,
  },
  {
    id: 'n4',
    kind: 'booking',
    title: 'تم استلام طلب الحجز الخاص بك، بانتظار رد مقدّم الخدمة',
    time: 'قبل يومين',
    read: true,
  },
  {
    id: 'n5',
    kind: 'message',
    title: 'رسالة جديدة من "النخبة لتنظيم الفعاليات"',
    time: 'قبل أسبوع',
    read: true,
  },
  {
    id: 'n6',
    kind: 'system',
    title: 'تحديث في سياسة الإلغاء والاسترجاع',
    time: 'قبل أسبوعين',
    read: true,
  },
]
