/** Mock platform users for /admin/users. Client-side only. */

export type UserStatus = 'active' | 'suspended'

export interface AdminUser {
  id: string
  name: string
  email: string
  /** Display string — join date. */
  joinedAt: string
  status: UserStatus
}

export const adminUsers: AdminUser[] = [
  { id: 'u1', name: 'أمينة شريف', email: 'amina.cherif@example.com', joinedAt: '12 يناير 2026', status: 'active' },
  { id: 'u2', name: 'كريم بوداود', email: 'karim.boudaoud@example.com', joinedAt: '3 فبراير 2026', status: 'active' },
  { id: 'u3', name: 'ليلى حمدي', email: 'lila.hamdi@example.com', joinedAt: '20 فبراير 2026', status: 'active' },
  { id: 'u4', name: 'يوسف مرابط', email: 'youcef.mrabet@example.com', joinedAt: '5 مارس 2026', status: 'suspended' },
  { id: 'u5', name: 'سعاد بن علي', email: 'souad.benali@example.com', joinedAt: '18 مارس 2026', status: 'active' },
  { id: 'u6', name: 'ياسمين بوزيد', email: 'yasmine.bouzid@example.com', joinedAt: '2 أبريل 2026', status: 'active' },
  { id: 'u7', name: 'رياض شعباني', email: 'riad.chaabani@example.com', joinedAt: '15 أبريل 2026', status: 'active' },
  { id: 'u8', name: 'نور الهدى قاسمي', email: 'nourelhouda.kacimi@example.com', joinedAt: '30 أبريل 2026', status: 'active' },
  { id: 'u9', name: 'عبد الرحمن زروقي', email: 'abderrahmane.zerrouki@example.com', joinedAt: '10 مايو 2026', status: 'suspended' },
  { id: 'u10', name: 'خديجة مرزوقي', email: 'khadidja.merzougui@example.com', joinedAt: '22 مايو 2026', status: 'active' },
  { id: 'u11', name: 'إلياس بن يوسف', email: 'ilyes.benyoucef@example.com', joinedAt: '4 يونيو 2026', status: 'active' },
  { id: 'u12', name: 'حنان طالبي', email: 'hanane.talbi@example.com', joinedAt: '19 يونيو 2026', status: 'active' },
]
