import content from './content.json';

// المحتوى (حلقات / قاموس / مسارات) في content.json، بيتعدّل من لوحة التحكم /fahmny/admin
const c = content as Content;
export const episodes: Episode[] = c.episodes;
export const glossary: Term[] = c.glossary;
export const paths: LearnPath[] = c.paths;

export const FB_PROFILE = 'https://www.facebook.com/ziad.mo7amed.36';

export interface Category {
  id: string;
  name: string;
  emoji: string;
}

export interface QuizQ {
  q: string;
  options: string[];
  answer: number;
  why?: string; // شرح سطر واحد ليه دي الإجابة الصح
}

// محتوى الدرس الكامل (اختياري): مقال + تحدي + أسئلة شائعة + نص الحلقة
export interface LessonSection {
  h: string;
  deeper?: boolean; // «تفاصيل أكتر» مش موجودة في الفيديو
  p: string[];
  steps?: string[];
  code?: string;
  after?: string[];
}

export interface Lesson {
  number: number;
  titleEn: string;
  seoTitle: string;
  metaDescription: string;
  durationIso: string; // مثلًا PT1M44S
  intro: string;
  chapters: { t: number; label: string }[]; // t بالثواني
  article: LessonSection[];
  trueFalse: { s: string; answer: boolean; why: string }[];
  discuss: { q: string; hint: string }[];
  challenge: { steps: string[]; bonus: string };
  faq: { q: string; a: string }[];
  transcript: string[];
}

export interface Episode {
  slug: string;
  title: string;
  hook: string;
  category: string;
  date: string; // YYYY-MM-DD
  minutes: number; // مدة الحلقة بالدقايق (حوالي 2)
  fbUrl: string; // لينك الفيديو على فيسبوك (احتياطي لو مفيش video)
  video?: { src: string; poster?: string; captions?: string }; // فيديو داخلي: ملف mp4 + بوستر + ترجمة vtt
  points: string[];
  quiz: QuizQ[];
  terms?: string[]; // slugs في القاموس
  demo?: 'api' | 'ai' | '2fa' | 'binary'; // تجربة تفاعلية جوه الحلقة
  lesson?: Lesson; // صفحة درس كاملة (مقال، تحدي، FAQ...)
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

export interface Content {
  episodes: Episode[];
  glossary: Term[];
  paths: LearnPath[];
}

export interface LearnPath {
  id: string;
  title: string;
  desc: string;
  steps: string[]; // episode slugs بالترتيب
}

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
