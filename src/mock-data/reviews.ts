/**
 * Mock customer reviews, keyed by serviceId (services.ts).
 *
 * These are the "latest reviews" shown on Service Details — a sample, not
 * the full history: services.ts keeps `reviewCount` as the total (87, 132…)
 * and `rating` as the overall average. Each sample is written so its own
 * average sits close to that service's rating (within ~0.2).
 *
 * Review text is user-generated content, so it stays in the language it
 * was written in (Arabic) rather than being localized like UI copy. Only
 * the relative time is rendered per locale, from `daysAgo`.
 */

export interface Review {
  id: string
  serviceId: string
  reviewerName: string
  /** 1–5 */
  rating: number
  comment: string
  /** 0 = today. Rendered as a relative time ("منذ 3 أيام"). */
  daysAgo: number
  /** Added by the current user this session — shown as "just now". */
  isNew?: boolean
}

type SeedReview = Omit<Review, 'id' | 'serviceId' | 'isNew'>

const seed: Record<string, SeedReview[]> = {
  // s1 — venue, rating 4.7 → sample avg 4.67
  s1: [
    { reviewerName: 'سارة بن يوسف', rating: 5, comment: 'القاعة واسعة ونظيفة، والفريق كان متعاونًا من أول اتصال حتى نهاية الحفل.', daysAgo: 5 },
    { reviewerName: 'محمد الأمين قاسمي', rating: 5, comment: 'التنظيم ممتاز وموقف السيارات سهّل الأمور على الضيوف كثيرًا.', daysAgo: 14 },
    { reviewerName: 'نسرين عمراني', rating: 4, comment: 'تجربة جميلة عمومًا، فقط التكييف احتاج بعض الضبط في البداية.', daysAgo: 40 },
  ],
  // s2 — photography, rating 4.9 → sample avg 5.0
  s2: [
    { reviewerName: 'ياسمين حداد', rating: 5, comment: 'صور طبيعية وجميلة جدًا، ووصلتنا قبل الموعد المتفق عليه.', daysAgo: 3 },
    { reviewerName: 'كريم بلعيد', rating: 5, comment: 'فريق محترف وهادئ، لم نشعر بوجودهم لكنهم التقطوا كل اللحظات المهمة.', daysAgo: 12 },
    { reviewerName: 'أمال زروقي', rating: 5, comment: 'أسلوبهم أنيق والتعامل راقٍ، أنصح بهم بشدة.', daysAgo: 60 },
  ],
  // s3 — decor, rating 4.5 → sample avg 4.5
  s3: [
    { reviewerName: 'هدى مسعودي', rating: 5, comment: 'الإضاءة والتنسيقات الزهرية غيّرت شكل القاعة تمامًا، والنتيجة فاقت توقعاتنا.', daysAgo: 6 },
    { reviewerName: 'رضا بوزيد', rating: 4, comment: 'عمل متقن وأسعار معقولة، لكن التركيب تأخر قليلًا عن الموعد.', daysAgo: 20 },
    { reviewerName: 'ليندة شريفي', rating: 5, comment: 'استمعوا لأفكارنا وأضافوا لمسات ذكية تناسب ميزانيتنا.', daysAgo: 35 },
    { reviewerName: 'سمير لعرابي', rating: 4, comment: 'ديكور جميل، وكنت أتمنى خيارات ألوان أكثر.', daysAgo: 90 },
  ],
  // s4 — catering, rating 4.6 → sample avg 4.67
  s4: [
    { reviewerName: 'فاطمة الزهراء بن علي', rating: 5, comment: 'الأطباق التقليدية كانت لذيذة جدًا، والضيوف سألونا عن اسم المطعم.', daysAgo: 2 },
    { reviewerName: 'عبد الرحمن سعدي', rating: 5, comment: 'كميات كافية وتقديم منظم، وفريق الخدمة كان لطيفًا مع الجميع.', daysAgo: 18 },
    { reviewerName: 'مريم تواتي', rating: 4, comment: 'طعام ممتاز، وتأخر التقديم قليلًا بسبب كثرة الضيوف.', daysAgo: 45 },
  ],
  // s5 — music, rating 4.3 → sample avg 4.33
  s5: [
    { reviewerName: 'إسماعيل حمادي', rating: 5, comment: 'أجواء رائعة طوال السهرة، والفرقة تفاعلت مع الحضور بشكل جميل.', daysAgo: 8 },
    { reviewerName: 'وفاء بن شيخ', rating: 4, comment: 'أداء جيد ومعدات صوت قوية، وكنا نفضّل قائمة أغانٍ أكثر تنوعًا.', daysAgo: 25 },
    { reviewerName: 'يونس مزيان', rating: 4, comment: 'التزموا بالوقت وكانوا مرنين مع طلباتنا.', daysAgo: 70 },
  ],
  // s6 — invitations, rating 4.8 → sample avg 4.75
  s6: [
    { reviewerName: 'رانيا خليفي', rating: 5, comment: 'تصميم أنيق كما تخيلناه تمامًا، والتسليم كان سريعًا.', daysAgo: 4 },
    { reviewerName: 'نبيل عيساوي', rating: 5, comment: 'النسخة الرقمية سهّلت علينا إرسال الدعوات لكل الضيوف.', daysAgo: 16 },
    { reviewerName: 'صبرينة بوعلام', rating: 5, comment: 'اهتمام بالتفاصيل وجودة طباعة ممتازة.', daysAgo: 30 },
    { reviewerName: 'طارق منصوري', rating: 4, comment: 'عمل جميل، واحتجنا تعديلًا بسيطًا على الخط.', daysAgo: 75 },
  ],
  // s7 — beauty, rating 4.4 → sample avg 4.33
  s7: [
    { reviewerName: 'إيمان رحماني', rating: 5, comment: 'جلسة التجربة المسبقة طمأنتني كثيرًا، والنتيجة يوم المناسبة كانت رائعة.', daysAgo: 7 },
    { reviewerName: 'خديجة بن عمر', rating: 4, comment: 'مكياج ثابت طوال اليوم، والانتظار كان أطول قليلًا من المتوقع.', daysAgo: 22 },
    { reviewerName: 'سلمى دراجي', rating: 4, comment: 'فريق لطيف ومحترف، والمكان نظيف ومريح.', daysAgo: 50 },
  ],
  // s8 — planning, rating 4.9 → sample avg 5.0
  s8: [
    { reviewerName: 'أنيس بلقاسم', rating: 5, comment: 'تولّوا كل التفاصيل وتركونا نستمتع بالمناسبة دون أي قلق.', daysAgo: 9 },
    { reviewerName: 'نادية سليماني', rating: 5, comment: 'تنسيق ممتاز مع كل مقدّمي الخدمات والتزام تام بالجدول الزمني.', daysAgo: 28 },
    { reviewerName: 'فريد حمدي', rating: 5, comment: 'من أفضل القرارات التي اتخذناها، فريق منظم ومتعاون جدًا.', daysAgo: 65 },
  ],
  // s9 — conference venue, rating 4.2 → sample avg 4.25
  s9: [
    { reviewerName: 'حسان بوشامة', rating: 4, comment: 'قاعة مجهزة جيدًا للعروض، والصوت كان واضحًا في كل المقاعد.', daysAgo: 10 },
    { reviewerName: 'سميرة قادري', rating: 5, comment: 'مناسبة جدًا لملتقانا المهني، وخدمة الضيافة كانت منظمة.', daysAgo: 24 },
    { reviewerName: 'مراد عثماني', rating: 4, comment: 'المكان عملي، لكن مواقف السيارات محدودة في أوقات الذروة.', daysAgo: 55 },
    { reviewerName: 'أسماء بن دحمان', rating: 4, comment: 'فريق تقني متعاون، والحجز كان سهلًا.', daysAgo: 100 },
  ],
  // s10 — photography, rating 4.6 → sample avg 4.67
  s10: [
    { reviewerName: 'زينب مقدم', rating: 5, comment: 'الأسلوب السينمائي أعطى الصور طابعًا مميزًا، والألبوم جاء بجودة عالية.', daysAgo: 5 },
    { reviewerName: 'بلال شابي', rating: 4, comment: 'صور جميلة جدًا، لكن التسليم استغرق وقتًا أطول قليلًا.', daysAgo: 30 },
    { reviewerName: 'حنان بوسعيد', rating: 5, comment: 'مصوّر صبور ويعرف كيف يلتقط اللحظات العفوية.', daysAgo: 80 },
  ],
  // s11 — day-of coordination, rating 4.8 → sample avg 4.67
  s11: [
    { reviewerName: 'عماد زيتوني', rating: 5, comment: 'خطّطنا لكل شيء بأنفسنا، وهم نفّذوه يوم المناسبة بسلاسة تامة.', daysAgo: 11 },
    { reviewerName: 'كوثر لونيس', rating: 5, comment: 'كانوا حلقة الوصل مع كل مقدّمي الخدمات، ووفّروا علينا الكثير من التوتر.', daysAgo: 33 },
    { reviewerName: 'جمال فرحات', rating: 4, comment: 'خدمة جيدة جدًا، والتواصل قبل اليوم كان يحتاج وضوحًا أكثر.', daysAgo: 85 },
  ],
  // s12 — event video, rating 4.8 → sample avg 4.67
  s12: [
    { reviewerName: 'نور الهدى بركاني', rating: 5, comment: 'الفيلم القصير كان مؤثرًا ومونتاجه احترافي.', daysAgo: 6 },
    { reviewerName: 'سفيان تومي', rating: 4, comment: 'تغطية كاملة وجودة ممتازة، وانتظرنا النسخة النهائية أسبوعين تقريبًا.', daysAgo: 21 },
    { reviewerName: 'آية بن زيان', rating: 5, comment: 'طلبنا النسخة المطوّلة أيضًا وكانت تستحق.', daysAgo: 48 },
  ],
}

export const reviewsByService: Record<string, Review[]> = Object.fromEntries(
  Object.entries(seed).map(([serviceId, list]) => [
    serviceId,
    list.map((r, i) => ({ ...r, id: `${serviceId}-r${i + 1}`, serviceId })),
  ]),
)
