import { useState, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { playAppleClick } from '../../utils/soundEffects';

interface GalleryItem {
  id: string;
  app: 'taht' | 'afteker' | 'so7ab';
  appName: string;
  appBadge: string;
  title: string;
  subtitle: string;
  image: string;
  aspect: 'portrait' | 'landscape';
  storeLink?: string;
}

export const AppScreensGallery: FC = () => {
  const [filter, setFilter] = useState<'all' | 'taht' | 'afteker' | 'so7ab'>('all');
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    // Taht El Balata (Real Play Store Production Screens)
    {
      id: 'taht-1',
      app: 'taht',
      appName: 'تحت البلاطة',
      appBadge: 'الخزنة والسيولة',
      title: 'الخزنة المركزية ومتابعة السيولة النقدية',
      subtitle: 'توزيع رأس المال في قنوات أمان مشفرة ومستقلة 100% عن الإنترنت.',
      image: '/assets/apps/taht/screen_1.jpeg',
      aspect: 'portrait',
      storeLink: 'https://play.google.com/store/apps/details?id=com.blotxtech.taht_elbalata',
    },
    {
      id: 'taht-2',
      app: 'taht',
      appName: 'تحت البلاطة',
      appBadge: 'محفظة الذهب',
      title: 'حساب أوزان الذهب والعيارات',
      subtitle: 'حاسبة دقيقة لعيارات 24، 21، و18 وتحديث قيمة المدخرات الذهبية.',
      image: '/assets/apps/taht/screen_2.jpeg',
      aspect: 'portrait',
      storeLink: 'https://play.google.com/store/apps/details?id=com.blotxtech.taht_elbalata',
    },
    {
      id: 'taht-3',
      app: 'taht',
      appName: 'تحت البلاطة',
      appBadge: 'رادار الميزانية',
      title: 'رادار المصروفات الشهرية والميزانية',
      subtitle: 'تحليل سلوك الإنفاق وإيقاف الهدر المالي قبل التهام المدخرات.',
      image: '/assets/apps/taht/screen_3.jpeg',
      aspect: 'portrait',
      storeLink: 'https://play.google.com/store/apps/details?id=com.blotxtech.taht_elbalata',
    },
    {
      id: 'taht-5',
      app: 'taht',
      appName: 'تحت البلاطة',
      appBadge: 'التقارير البيانية',
      title: 'تقارير التدفق النقدي والتحليلات',
      subtitle: 'رسوم بيانية تفاعلية تلخص مسار أمانك المالي وتطور مدخراتك شهرياً.',
      image: '/assets/apps/taht/screen_5.jpeg',
      aspect: 'portrait',
      storeLink: 'https://play.google.com/store/apps/details?id=com.blotxtech.taht_elbalata',
    },
    {
      id: 'taht-6',
      app: 'taht',
      appName: 'تحت البلاطة',
      appBadge: 'تشفير محلي',
      title: 'أمان وتشفير محلي متكامل AES-256',
      subtitle: 'بياناتك ملكك وحدك مخزنة محلياً ومشفرة بدون أي سيرفرات أو تتبع.',
      image: '/assets/apps/taht/screen_6.jpeg',
      aspect: 'portrait',
      storeLink: 'https://play.google.com/store/apps/details?id=com.blotxtech.taht_elbalata',
    },
    {
      id: 'taht-7',
      app: 'taht',
      appName: 'تحت البلاطة',
      appBadge: 'دفاتر الالتزامات',
      title: 'إدارة الديون والالتزامات المحمية',
      subtitle: 'جدولة المستحقات المالية وتتبع السداد بمرونة بدون ضغط عصبي.',
      image: '/assets/apps/taht/screen_7.jpeg',
      aspect: 'portrait',
      storeLink: 'https://play.google.com/store/apps/details?id=com.blotxtech.taht_elbalata',
    },

    // Eftekir (Real Production Play Store Assets)
    {
      id: 'afteker-1',
      app: 'afteker',
      appName: 'افتكر',
      appBadge: 'خزنة الأفكار',
      title: 'خزنة الأفكار وتنظيم الذاكرة الهادئة',
      subtitle: 'ترتيب الأولويات الحياتية والالتزامات حسب السياق الذهني في ثوانٍ.',
      image: '/assets/apps/afteker/screen_1.png',
      aspect: 'portrait',
      storeLink: 'https://play.google.com/store/apps/details?id=com.blotxtech.eftekir',
    },
    {
      id: 'afteker-2',
      app: 'afteker',
      appName: 'افتكر',
      appBadge: 'ذكاء اصطناعي OCR',
      title: 'ماسح الفواتير بالذكاء الاصطناعي On-Device',
      subtitle: 'استخراج تلقائي لتواريخ الفواتير والضمانات مع معالجة محلية 100%.',
      image: '/assets/apps/afteker/screen_2.png',
      aspect: 'portrait',
      storeLink: 'https://play.google.com/store/apps/details?id=com.blotxtech.eftekir',
    },
    {
      id: 'afteker-3',
      app: 'afteker',
      appName: 'افتكر',
      appBadge: 'التنبيهات السياقية',
      title: 'التذكيرات الذكية والمجدولة',
      subtitle: 'نظام تنبيه هادئ واستباقي يذكرك في التوقيت واللحظة الحاسمة.',
      image: '/assets/apps/afteker/screen_3.png',
      aspect: 'portrait',
      storeLink: 'https://play.google.com/store/apps/details?id=com.blotxtech.eftekir',
    },
    {
      id: 'afteker-4',
      app: 'afteker',
      appName: 'افتكر',
      appBadge: 'كبسولات زمنية',
      title: 'الكبسولات الزمنية المحمية',
      subtitle: 'حفظ رسائل وملاحظات وتواريخ مهمة تُفتح فقط في موعد مستقبلي محدد.',
      image: '/assets/apps/afteker/screen_4.png',
      aspect: 'portrait',
      storeLink: 'https://play.google.com/store/apps/details?id=com.blotxtech.eftekir',
    },
    {
      id: 'afteker-6',
      app: 'afteker',
      appName: 'افتكر',
      appBadge: 'مساحات مشتركة',
      title: 'المساحات المشتركة المشفرة',
      subtitle: 'مشاركة التذكيرات وقوائم المهام مع العائلة أو زملاء العمل بأمان.',
      image: '/assets/apps/afteker/screen_6.png',
      aspect: 'portrait',
      storeLink: 'https://play.google.com/store/apps/details?id=com.blotxtech.eftekir',
    },

    // Shella Habad (Real Flutter Engine Party Game Assets)
    {
      id: 'so7ab-spin',
      app: 'so7ab',
      appName: 'شلة هبد 3D',
      appBadge: 'فيزياء تفاعلية',
      title: 'زجاجة اللعب ثلاثية الأبعاد بفيزياء حركية',
      subtitle: 'محاكاة دوران تفاعلية بلمس الشاشة لتحديد أدوار اللاعبين في التجمعات.',
      image: '/assets/games/so7ab/spin_bottle_3d.png',
      aspect: 'portrait',
    },
    {
      id: 'so7ab-imposter',
      app: 'so7ab',
      appName: 'شلة هبد 3D',
      appBadge: 'خداع وذكاء',
      title: 'نمط الجاسوس (The Imposter)',
      subtitle: 'الكل يعرف المكان السري ما عدا واحد؛ حوار ذكي وتصويت لكشف الدخيل.',
      image: '/assets/games/so7ab/imposter.png',
      aspect: 'portrait',
    },
    {
      id: 'so7ab-liar',
      app: 'so7ab',
      appName: 'شلة هبد 3D',
      appBadge: 'تحدي وتخمين',
      title: 'نمط كشف الكذاب (The Liar)',
      subtitle: 'تحدي سرعة البديهة والقدرة على كشف الإجابات المفبركة بين الأصدقاء.',
      image: '/assets/games/so7ab/liar.png',
      aspect: 'portrait',
    },
    {
      id: 'so7ab-challenges',
      app: 'so7ab',
      appName: 'شلة هبد 3D',
      appBadge: 'أحكام جريئة',
      title: 'نمط التحديات والأحكام الصريحة',
      subtitle: 'مئات التحديات الحركية والأحكام الكوميدية المصممة لأجواء الحفلات.',
      image: '/assets/games/so7ab/challenges.png',
      aspect: 'portrait',
    },
    {
      id: 'so7ab-confession',
      app: 'so7ab',
      appName: 'شلة هبد 3D',
      appBadge: 'كرسي الاعتراف',
      title: 'نمط كرسي الاعتراف والأسئلة العميقة',
      subtitle: 'أسئلة حوارية ونقاشية تفتح مساحات صريحة وممتعة بين الأصدقاء.',
      image: '/assets/games/so7ab/confession.png',
      aspect: 'portrait',
    },
  ];

  const filteredItems = filter === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.app === filter);

  const filterButtons = [
    { key: 'all', label: 'كافة المعروضات (All)' },
    { key: 'taht', label: 'تحت البلاطة' },
    { key: 'afteker', label: 'افتكر' },
    { key: 'so7ab', label: 'شلة هبد 3D' },
  ];

  const currentIndex = activeModalItem
    ? filteredItems.findIndex((it) => it.id === activeModalItem.id)
    : -1;

  const handleNext = () => {
    if (currentIndex < 0) return;
    playAppleClick();
    const nextIdx = (currentIndex + 1) % filteredItems.length;
    setActiveModalItem(filteredItems[nextIdx]);
  };

  const handlePrev = () => {
    if (currentIndex < 0) return;
    playAppleClick();
    const prevIdx = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setActiveModalItem(filteredItems[prevIdx]);
  };

  return (
    <section id="gallery" className="py-20 md:py-28 bg-white relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold mb-4 shadow-xs">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>معرض الشاشات والأعمال الحية • Live Product Gallery</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug mb-4">
            نظرة حقيقية على واجهات منتجاتنا
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl">
            كل شاشة هنا تعكس تطبيقاً حقيقياً تم بناؤه بأعلى معايير هندسة البرمجيات، تجربة مستخدم سلسة، وجمال بصري بدون أي مبالغة أو تصاميم وهمية.
          </p>

          {/* Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-50 border border-slate-200 rounded-2xl">
            {filterButtons.map((btn) => (
              <button
                key={btn.key}
                onClick={() => {
                  playAppleClick();
                  setFilter(btn.key as any);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  filter === btn.key
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, idx) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.04 }}
              className="group bg-slate-50/70 hover:bg-white rounded-3xl p-5 border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between"
            >
              {/* Image Frame Container */}
              <div
                onClick={() => {
                  playAppleClick();
                  setActiveModalItem(item);
                }}
                className="relative w-full h-[380px] sm:h-[420px] rounded-2xl bg-slate-950/5 overflow-hidden flex items-center justify-center p-3 mb-5 cursor-pointer border border-slate-200/70 group-hover:border-blue-400/40 transition-colors"
              >
                {/* Phone Mockup Frame Shadow & Outline */}
                <div className="relative h-full w-auto aspect-[9/19] rounded-[26px] overflow-hidden shadow-2xl border-4 border-slate-900/90 bg-slate-950 transition-transform duration-500 group-hover:scale-[1.03]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                  {/* Subtle Glass Reflection */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                </div>

                {/* Hover Maximize Overlay Indicator */}
                <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-opacity flex items-center justify-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-slate-900 text-xs font-bold shadow-lg">
                    <Maximize2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>تكبير الشاشة</span>
                  </span>
                </div>
              </div>

              {/* Card Meta & Details */}
              <div className="text-start">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200/60">
                    {item.appName}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500">
                    {item.appBadge}
                  </span>
                </div>

                <h3 className="font-extrabold text-slate-900 text-base mb-1.5 tracking-tight group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-4">
                  {item.subtitle}
                </p>

                {/* Card Action Link */}
                <div className="pt-3 border-t border-slate-200/70 flex items-center justify-between">
                  <button
                    onClick={() => {
                      playAppleClick();
                      setActiveModalItem(item);
                    }}
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    <span>معاينة مكبرة</span>
                    <Maximize2 className="w-3 h-3" />
                  </button>

                  {item.storeLink && (
                    <a
                      href={item.storeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                    >
                      <span>Google Play</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox / Zoom Modal */}
      <AnimatePresence>
        {activeModalItem && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-4xl bg-slate-900 text-white rounded-3xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col max-h-[92vh]"
            >
              {/* Modal Top Bar */}
              <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between gap-4 bg-slate-900/90">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                    {activeModalItem.appName}
                  </span>
                  <div>
                    <h3 className="font-extrabold text-white text-base sm:text-lg tracking-tight">
                      {activeModalItem.title}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {activeModalItem.appBadge} • {currentIndex + 1} من {filteredItems.length}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    playAppleClick();
                    setActiveModalItem(null);
                  }}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  aria-label="إغلاق العارض"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Image Stage */}
              <div className="relative flex-1 bg-black/70 p-4 sm:p-8 flex items-center justify-center overflow-hidden min-h-[420px] sm:min-h-[520px]">
                {/* Prev button */}
                <button
                  onClick={handlePrev}
                  className="absolute right-4 z-10 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer"
                  aria-label="الصورة السابقة"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* The Current Image */}
                <div className="relative max-h-[64vh] flex flex-col items-center justify-center gap-3">
                  <img
                    src={activeModalItem.image}
                    alt={activeModalItem.title}
                    className="max-h-[52vh] sm:max-h-[58vh] w-auto object-contain rounded-2xl shadow-2xl border border-slate-800"
                  />
                  <p className="text-xs sm:text-sm font-medium text-slate-300 text-center max-w-xl px-4">
                    {activeModalItem.subtitle}
                  </p>
                </div>

                {/* Next button */}
                <button
                  onClick={handleNext}
                  className="absolute left-4 z-10 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer"
                  aria-label="الصورة التالية"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-3.5 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>استخدم الأسهم للتنقل بين شاشات المعرض</span>
                {activeModalItem.storeLink && (
                  <a
                    href={activeModalItem.storeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>فتح في Google Play</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
