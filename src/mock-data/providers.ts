/** Mock provider records for /provider/:id (Service Provider Profile, public view). */

export interface Provider {
  id: string
  name: string
  categoryId: string
  rating: number
  bio: string
  /** Ids into services.ts — services this provider offers. */
  serviceIds: string[]
  /**
   * Mock WhatsApp number, E.164 (+213 = Algeria). Placeholder pattern
   * (+213 555 00 00 0X), not a real business line — see lib/whatsapp.ts for
   * the demo override that routes every contact button to one number.
   */
  phone: string
  /**
   * "موثّق" trust badge. 5 of 10: the two 4.9 multi-service providers (p2,
   * p8), the 4.8 invitations boutique (p6), the long-established venue (p1)
   * and the most-reviewed caterer (p4, 210 reviews). p10 (4.6) is left
   * unverified on purpose so the badge doesn't just mirror the rating.
   */
  verified: boolean
}

export const providers: Provider[] = [
  {
    id: 'p1',
    name: 'قاعة الأندلس للحفلات',
    categoryId: 'venues',
    rating: 4.7,
    bio: 'نستقبل مختلف أنواع المناسبات في قاعتنا المجهزة، بخبرة تمتد لأكثر من عشر سنوات في تنظيم الفعاليات بمختلف أحجامها.',
    serviceIds: ['s1'],
    phone: '+213555000001',
    verified: true,
  },
  {
    id: 'p2',
    name: 'استوديو لمسة للتصوير',
    categoryId: 'photography',
    rating: 4.9,
    bio: 'استوديو تصوير احترافي يوثّق مناسباتكم بالصورة والفيديو معًا، بفريق متخصص وأسلوب بصري أنيق يناسب مختلف الأذواق.',
    serviceIds: ['s2', 's12'],
    phone: '+213555000002',
    verified: true,
  },
  {
    id: 'p3',
    name: 'ديكورات الأمل',
    categoryId: 'decor',
    rating: 4.5,
    bio: 'فريق تصميم داخلي متخصص في تنسيق فضاءات المناسبات، من الإضاءة إلى التنسيقات الزهرية، بلمسات مخصصة لكل عميل.',
    serviceIds: ['s3'],
    phone: '+213555000003',
    verified: false,
  },
  {
    id: 'p4',
    name: 'مطعم الأصالة للتموين',
    categoryId: 'catering',
    rating: 4.6,
    bio: 'مطعم متخصص في تموين المناسبات بقوائم طعام متنوعة تجمع بين الأصالة الجزائرية واللمسة العصرية.',
    serviceIds: ['s4'],
    phone: '+213555000004',
    verified: true,
  },
  {
    id: 'p5',
    name: 'فرقة النغم للموسيقى',
    categoryId: 'music',
    rating: 4.3,
    bio: 'فرقة موسيقية بخبرة واسعة في إحياء مختلف أنواع المناسبات، بمعدات صوتية احترافية وأسلوب يناسب كل جمهور.',
    serviceIds: ['s5'],
    phone: '+213555000005',
    verified: false,
  },
  {
    id: 'p6',
    name: 'بوتيك الدعوات الراقية',
    categoryId: 'invitations',
    rating: 4.8,
    bio: 'ورشة تصميم متخصصة في الدعوات المطبوعة والرقمية، بتصاميم قابلة للتخصيص بالكامل تناسب طابع كل مناسبة.',
    serviceIds: ['s6'],
    phone: '+213555000006',
    verified: true,
  },
  {
    id: 'p7',
    name: 'صالون لمسات للتجميل',
    categoryId: 'beauty',
    rating: 4.4,
    bio: 'صالون تجميل متخصص في تحضير المناسبات، بفريق مدرّب على أحدث تقنيات المكياج وتصفيف الشعر.',
    serviceIds: ['s7'],
    phone: '+213555000007',
    verified: false,
  },
  {
    id: 'p8',
    name: 'النخبة لتنظيم الفعاليات',
    categoryId: 'planning',
    rating: 4.9,
    bio: 'شركة تنظيم فعاليات متكاملة تتولى كل تفاصيل مناسبتكم من التخطيط إلى التنفيذ، أو تدير يوم الحدث فقط إن فضّلتم التخطيط بأنفسكم.',
    serviceIds: ['s8', 's11'],
    phone: '+213555000008',
    verified: true,
  },
  {
    id: 'p9',
    name: 'قاعة النور للمؤتمرات',
    categoryId: 'venues',
    rating: 4.2,
    bio: 'قاعة مجهزة بأحدث الأنظمة التقنية، مخصصة للمؤتمرات والفعاليات المهنية بمختلف الأحجام.',
    serviceIds: ['s9'],
    phone: '+213555000009',
    verified: false,
  },
  {
    id: 'p10',
    name: 'استوديو الإطار الذهبي',
    categoryId: 'photography',
    rating: 4.6,
    bio: 'استوديو تصوير بأسلوب سينمائي، متخصص في إبراز أجمل تفاصيل المناسبات بجودة عالية.',
    serviceIds: ['s10'],
    phone: '+213555000010',
    verified: false,
  },
]
