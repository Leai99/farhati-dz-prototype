/**
 * Mock service listings for /explore, /categories, /service/:id and
 * /provider/:id. Client-side only — no backend, no real images. Deliberately
 * spread across 8 categories so the dataset doesn't skew toward weddings
 * even though "قاعات أفراح ومناسبات" is one legitimate category among
 * several. Two providers offer a second service each (see providers.ts) so
 * the Provider Profile "other services" list has something to show.
 */

export interface ServiceCategory {
  id: string
  label: string
}

export const categories: ServiceCategory[] = [
  { id: 'venues', label: 'قاعات أفراح ومناسبات' },
  { id: 'photography', label: 'تصوير فوتوغرافي' },
  { id: 'decor', label: 'ديكور وتنسيق' },
  { id: 'catering', label: 'تموين وضيافة' },
  { id: 'music', label: 'موسيقى وترفيه' },
  { id: 'invitations', label: 'دعوات وهدايا' },
  { id: 'beauty', label: 'تجميل وأناقة' },
  { id: 'planning', label: 'تنظيم فعاليات' },
]

/** Visual "tone" for the initials avatar — cycles through existing tokens only. */
export type ServiceTone = 'wine' | 'gold' | 'rose'

export interface Service {
  id: string
  name: string
  categoryId: string
  /** Links to providers.ts — whose profile "عرض ملف مقدّم الخدمة" opens. */
  providerId: string
  /** DZD */
  priceFrom: number
  /** DZD */
  priceTo: number
  rating: number
  reviewCount: number
  location: string
  tone: ServiceTone
  description: string
}

export const services: Service[] = [
  {
    id: 's1',
    name: 'قاعة الأندلس للحفلات',
    categoryId: 'venues',
    providerId: 'p1',
    priceFrom: 80000,
    priceTo: 250000,
    rating: 4.7,
    reviewCount: 132,
    location: 'الجزائر العاصمة',
    tone: 'wine',
    description:
      'قاعة فسيحة بتصميم عصري تتسع لمختلف أحجام المناسبات، مع خدمة استقبال احترافية وموقف سيارات واسع. فريقنا يرافقكم من التخطيط الأولي إلى يوم المناسبة لضمان تجربة سلسة دون أي تفاصيل مهملة.',
  },
  {
    id: 's2',
    name: 'استوديو لمسة للتصوير',
    categoryId: 'photography',
    providerId: 'p2',
    priceFrom: 15000,
    priceTo: 60000,
    rating: 4.9,
    reviewCount: 87,
    location: 'وهران',
    tone: 'gold',
    description:
      'نلتقط لحظاتكم بأسلوب توثيقي أنيق يجمع بين الطبيعية والاحترافية. نعمل بمعدات حديثة وفريق متمرس لتوثيق مناسبتكم من زوايا متعددة، مع تسليم الصور المُعالجة خلال أسبوعين.',
  },
  {
    id: 's3',
    name: 'ديكورات الأمل',
    categoryId: 'decor',
    providerId: 'p3',
    priceFrom: 10000,
    priceTo: 45000,
    rating: 4.5,
    reviewCount: 64,
    location: 'قسنطينة',
    tone: 'rose',
    description:
      'نصمم ونُنفذ ديكورات مخصصة تعكس طابع مناسبتكم، من الإضاءة إلى الزهور والتنسيقات الجانبية. نتعامل مع مختلف المساحات ونقترح حلولاً تناسب الميزانية والمساحة المتاحة.',
  },
  {
    id: 's4',
    name: 'مطعم الأصالة للتموين',
    categoryId: 'catering',
    providerId: 'p4',
    priceFrom: 25000,
    priceTo: 90000,
    rating: 4.6,
    reviewCount: 210,
    location: 'الجزائر العاصمة',
    tone: 'wine',
    description:
      'قوائم طعام متنوعة تجمع بين المأكولات الجزائرية التقليدية واللمسات العصرية، مع إمكانية التخصيص حسب عدد الضيوف والذوق. فريق التقديم لدينا يتكفل بكل التفاصيل من الإعداد إلى الخدمة.',
  },
  {
    id: 's5',
    name: 'فرقة النغم للموسيقى',
    categoryId: 'music',
    providerId: 'p5',
    priceFrom: 20000,
    priceTo: 70000,
    rating: 4.3,
    reviewCount: 41,
    location: 'عنابة',
    tone: 'gold',
    description:
      'فرقة موسيقية متعددة الأساليب تناسب مختلف أنواع المناسبات، من الأجواء الهادئة إلى السهرات الحيوية. نوفر أيضًا معدات صوتية احترافية تُلائم مساحة القاعة.',
  },
  {
    id: 's6',
    name: 'بوتيك الدعوات الراقية',
    categoryId: 'invitations',
    providerId: 'p6',
    priceFrom: 3000,
    priceTo: 12000,
    rating: 4.8,
    reviewCount: 58,
    location: 'وهران',
    tone: 'rose',
    description:
      'تصاميم دعوات مطبوعة ورقمية بلمسات أنيقة قابلة للتخصيص بالكامل، مع إمكانية إضافة هدايا تذكارية مرافقة للدعوة. تسليم سريع يناسب جميع الجداول الزمنية.',
  },
  {
    id: 's7',
    name: 'صالون لمسات للتجميل',
    categoryId: 'beauty',
    providerId: 'p7',
    priceFrom: 5000,
    priceTo: 20000,
    rating: 4.4,
    reviewCount: 96,
    location: 'البليدة',
    tone: 'wine',
    description:
      'خدمات تجميل وعناية شاملة تشمل المكياج وتصفيف الشعر بأيدي فريق مدرّب على أحدث التقنيات. نوفر أيضًا جلسات تجربة مسبقة قبل يوم المناسبة.',
  },
  {
    id: 's8',
    name: 'النخبة لتنظيم الفعاليات',
    categoryId: 'planning',
    providerId: 'p8',
    priceFrom: 30000,
    priceTo: 150000,
    rating: 4.9,
    reviewCount: 73,
    location: 'الجزائر العاصمة',
    tone: 'gold',
    description:
      'نتولى تنظيم مناسبتكم من الألف إلى الياء، من اختيار المكان والتنسيق مع مقدّمي الخدمات إلى إدارة الجدول الزمني ليوم الحدث. فريقنا موجود معكم في كل خطوة لضمان راحة بالكم.',
  },
  {
    id: 's9',
    name: 'قاعة النور للمؤتمرات',
    categoryId: 'venues',
    providerId: 'p9',
    priceFrom: 60000,
    priceTo: 180000,
    rating: 4.2,
    reviewCount: 29,
    location: 'سطيف',
    tone: 'rose',
    description:
      'قاعة مجهزة بأحدث أنظمة الصوت والعرض، مناسبة للمؤتمرات والفعاليات المهنية بمختلف الأحجام. نوفر أيضًا خدمة ضيافة وترتيب الجلوس حسب الطلب.',
  },
  {
    id: 's10',
    name: 'استوديو الإطار الذهبي',
    categoryId: 'photography',
    providerId: 'p10',
    priceFrom: 18000,
    priceTo: 55000,
    rating: 4.6,
    reviewCount: 52,
    location: 'قسنطينة',
    tone: 'wine',
    description:
      'نقدّم جلسات تصوير احترافية بأسلوب سينمائي يبرز أجمل تفاصيل مناسبتكم. نوفر أيضًا خدمة الطباعة والألبومات المخصصة بعد التسليم.',
  },
  {
    id: 's11',
    name: 'تنسيق وإدارة يوم المناسبة',
    categoryId: 'planning',
    providerId: 'p8',
    priceFrom: 15000,
    priceTo: 45000,
    rating: 4.8,
    reviewCount: 37,
    location: 'الجزائر العاصمة',
    tone: 'rose',
    description:
      'خدمة إدارة اليوم فقط لمن خطط لمناسبته بنفسه ويحتاج فريقًا محترفًا لتنفيذها بسلاسة. نتابع مع جميع مقدّمي الخدمات ونُدير الجدول الزمني حتى ختام الحدث.',
  },
  {
    id: 's12',
    name: 'تصوير فيديو للمناسبات',
    categoryId: 'photography',
    providerId: 'p2',
    priceFrom: 22000,
    priceTo: 65000,
    rating: 4.8,
    reviewCount: 33,
    location: 'وهران',
    tone: 'wine',
    description:
      'تغطية فيديو كاملة لمناسبتكم مع مونتاج احترافي يجمع أبرز اللحظات في فيلم قصير. نوفر أيضًا نسخة مطولة غير مقصوصة عند الطلب.',
  },
]
