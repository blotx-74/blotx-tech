export const FB_PROFILE = 'https://www.facebook.com/'; // TODO: حط لينك حسابك الشخصي

export interface Category {
  id: string;
  name: string;
  emoji: string;
}

export interface QuizQ {
  q: string;
  options: string[];
  answer: number;
}

export interface Episode {
  slug: string;
  title: string;
  hook: string;
  category: string;
  date: string; // YYYY-MM-DD
  minutes: number; // مدة الحلقة بالدقايق (<= 1.5)
  fbUrl: string; // لينك الفيديو على فيسبوك (احتياطي لو مفيش video)
  video?: { src: string; poster?: string; captions?: string }; // فيديو داخلي: ملف mp4 + بوستر + ترجمة vtt
  points: string[];
  quiz: QuizQ[];
  terms?: string[]; // slugs في القاموس
  demo?: 'api' | 'ai' | '2fa' | 'binary'; // تجربة تفاعلية جوه الحلقة
}

export interface Term {
  slug: string;
  word: string;
  meaning: string;
}

export const categories: Category[] = [
  { id: 'basics', name: 'أساسيات', emoji: '💡' },
  { id: 'internet', name: 'إنترنت وشبكات', emoji: '🌐' },
  { id: 'coding', name: 'برمجة', emoji: '</>' },
  { id: 'ai', name: 'ذكاء اصطناعي', emoji: '🤖' },
  { id: 'security', name: 'أمان رقمي', emoji: '🛡️' },
];

// ⚠️ حلقات تجريبية: استبدل fbUrl بلينكات حلقاتك الحقيقية من فيسبوك
export const episodes: Episode[] = [
  {
    slug: 'what-is-internet',
    title: 'يعني إيه إنترنت؟',
    hook: 'الإنترنت مش سحابة ولا سحر، دي كابلات تحت البحر!',
    category: 'internet',
    date: '2026-11-01',
    minutes: 1.2,
    fbUrl: 'https://www.facebook.com/watch/?v=0',
    points: [
      'الإنترنت شبكة ضخمة من الأجهزة المتوصلة ببعض.',
      'أغلب الداتا بتعدي في كابلات ألياف ضوئية تحت البحار.',
      'الراوتر بتاعك هو الباب اللي بيوصلك للشبكة دي.',
    ],
    quiz: [
      { q: 'أغلب الإنترنت بيعدي من خلال؟', options: ['أقمار صناعية', 'كابلات تحت البحر', 'موجات راديو'], answer: 1 },
      { q: 'الراوتر وظيفته؟', options: ['يخزن الملفات', 'يوصلك بالشبكة', 'يشحن الموبايل'], answer: 1 },
    ],
    terms: ['router', 'ip'],
    video: { src: '/fahmny/videos/demo.mp4', poster: '/fahmny/videos/demo-poster.jpg', captions: '/fahmny/videos/demo.vtt' },
    demo: 'binary',
  },
  {
    slug: 'what-is-api',
    title: 'يعني إيه API؟',
    hook: 'الجرسون اللي بين المطبخ وبينك، ده هو الـ API.',
    category: 'coding',
    date: '2026-11-02',
    minutes: 1.3,
    fbUrl: 'https://www.facebook.com/watch/?v=0',
    points: [
      'API هو وسيط بين برنامجين عشان يتكلموا مع بعض.',
      'إنت بتطلب، وهو بيوصّل الطلب ويرجعلك الرد.',
      'تطبيق الطقس مثلًا بيسأل API عن درجة الحرارة.',
    ],
    quiz: [
      { q: 'الـ API في مثال المطعم هو؟', options: ['الشيف', 'الجرسون', 'الفاتورة'], answer: 1 },
    ],
    terms: ['api'],
    demo: 'api',
  },
  {
    slug: 'how-ai-thinks',
    title: 'الذكاء الاصطناعي بيفكر إزاي؟',
    hook: 'هو مش بيفكر زيك، هو بيتوقع الكلمة اللي بعدها!',
    category: 'ai',
    date: '2026-11-03',
    minutes: 1.4,
    fbUrl: 'https://www.facebook.com/watch/?v=0',
    points: [
      'النموذج اتدرّب على كمية رهيبة من النصوص.',
      'بيتوقع أنسب كلمة تيجي بعد اللي اتكتب.',
      'ساعات بيغلط بثقة، فراجع المعلومات المهمة.',
    ],
    quiz: [
      { q: 'النموذج اللغوي بيشتغل بإنه؟', options: ['بيبحث في جوجل', 'بيتوقع الكلمة التالية', 'بيسأل إنسان'], answer: 1 },
    ],
    terms: ['ai'],
    demo: 'ai',
  },
  {
    slug: 'two-factor-auth',
    title: 'التحقق بخطوتين: درعك ضد الاختراق',
    hook: 'الباسورد لوحده مش كفاية. اعمل ده النهاردة.',
    category: 'security',
    date: '2026-11-04',
    minutes: 1.1,
    fbUrl: 'https://www.facebook.com/watch/?v=0',
    points: [
      'خطوة تانية بعد الباسورد، زي كود على موبايلك.',
      'لو الباسورد اتسرق، المخترق لسه مش قادر يدخل.',
      'استخدم تطبيق مصادقة بدل الرسائل لو تقدر.',
    ],
    quiz: [
      { q: 'التحقق بخطوتين بيحميك لو؟', options: ['الباسورد اتسرق', 'النت فصل', 'الموبايل فصل شحن'], answer: 0 },
    ],
    terms: ['2fa'],
    demo: '2fa',
  },
];

export const glossary: Term[] = [
  { slug: 'api', word: 'API', meaning: 'وسيط بيخلي برنامجين يتكلموا مع بعض، زي الجرسون بين الزبون والمطبخ.' },
  { slug: 'router', word: 'Router', meaning: 'الجهاز اللي بيوصل أجهزة بيتك بالإنترنت وبيوزعه عليهم.' },
  { slug: 'ip', word: 'IP Address', meaning: 'عنوان كل جهاز على الشبكة، زي رقم بيتك بالظبط.' },
  { slug: 'ai', word: 'AI', meaning: 'برامج بتتعلم من البيانات وتعمل مهام محتاجة ذكاء، زي الفهم والكتابة.' },
  { slug: '2fa', word: '2FA', meaning: 'تحقق بخطوتين: باسورد + كود تاني عشان تدخل حسابك.' },
  { slug: 'cloud', word: 'Cloud', meaning: 'سيرفرات في مكان بعيد بتخزن ملفاتك وتشغّل برامج بدل جهازك.' },
  { slug: 'vpn', word: 'VPN', meaning: 'نفق مشفّر بيخبّي نشاطك على النت وبيغيّر مكانك الظاهري.' },
];

export interface LearnPath {
  id: string;
  title: string;
  desc: string;
  steps: string[]; // episode slugs بالترتيب
}

export const paths: LearnPath[] = [
  {
    id: 'start',
    title: 'ابدأ من الصفر 🚀',
    desc: 'مسار للمبتدئ اللي لسه مبتدي: افهم الإنترنت وحمّي نفسك.',
    steps: ['what-is-internet', 'two-factor-auth'],
  },
  {
    id: 'dev',
    title: 'عالم المبرمجين </>',
    desc: 'المصطلحات اللي هتسمعها كل يوم في الشغل والكورسات.',
    steps: ['what-is-api'],
  },
  {
    id: 'ai',
    title: 'الذكاء الاصطناعي 🤖',
    desc: 'افهم اللي بيحصل ورا ChatGPT وأخواته.',
    steps: ['how-ai-thinks'],
  },
];

// تقدّم المستخدم: محفوظ في localStorage على جهازه (مجاني، بدون حسابات)
const SEEN_KEY = 'fh_seen';
const DAYS_KEY = 'fh_days';
const read = (k: string): string[] => {
  try { return JSON.parse(localStorage.getItem(k) || '[]'); } catch { return []; }
};
const write = (k: string, v: string[]) => {
  try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* ignore */ }
};
const dayKey = (d: Date) => d.toISOString().slice(0, 10);

export const getSeen = (): string[] => read(SEEN_KEY);
export const markSeen = (slug: string) => {
  const seen = read(SEEN_KEY);
  if (!seen.includes(slug)) write(SEEN_KEY, [...seen, slug]);
  const days = read(DAYS_KEY);
  const today = dayKey(new Date());
  if (!days.includes(today)) write(DAYS_KEY, [...days, today].slice(-120));
};

export const levels = [
  { min: 0, name: 'مبتدئ', emoji: '🌱' },
  { min: 2, name: 'فضولي', emoji: '🔍' },
  { min: 4, name: 'مستكشف', emoji: '🧭' },
  { min: 8, name: 'محترف', emoji: '🚀' },
  { min: 15, name: 'خبير', emoji: '👑' },
];

export function getStats() {
  const seen = read(SEEN_KEY).length;
  const days = new Set(read(DAYS_KEY));
  // سلسلة الأيام المتتالية لحد النهارده (أو لحد امبارح لو لسه ما اتفرجش النهارده)
  let streak = 0;
  const d = new Date();
  if (!days.has(dayKey(d))) d.setDate(d.getDate() - 1);
  while (days.has(dayKey(d))) { streak++; d.setDate(d.getDate() - 1); }
  let li = 0;
  levels.forEach((l, i) => { if (seen >= l.min) li = i; });
  const next = levels[li + 1];
  return { seen, streak, level: levels[li], next, toNext: next ? next.min - seen : 0 };
}

// مصطلح اليوم: ثابت طول اليوم، بيتغيّر كل يوم
export const termOfTheDay = () => {
  const day = Math.floor(Date.now() / 86400000);
  return glossary[day % glossary.length];
};

export const getEpisode =(slug?: string) => episodes.find((e) => e.slug === slug);
export const getCategory = (id: string) => categories.find((c) => c.id === id);
export const sortedEpisodes = () => [...episodes].sort((a, b) => b.date.localeCompare(a.date));

export const fbEmbed = (url: string) =>
  `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=380`;

export const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' });
