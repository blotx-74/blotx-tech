import { useState, type FC } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Download, 
  ExternalLink, 
  Gamepad2, 
  WifiOff, 
  Star,
  CheckCircle2,
  Images
} from 'lucide-react';
import { useLanguage } from '../../LanguageContext';
import { playAppleClick } from '../../utils/soundEffects';
import { GameDetailsModal } from '../ui/GameDetailsModal';
import { AppScreensGalleryModal } from '../ui/AppScreensGalleryModal';

export const TechProjects: FC = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'apps' | 'games'>('all');
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);
  const [activeGallery, setActiveGallery] = useState<'taht' | 'afteker' | null>(null);

  const filters = [
    { key: 'all', label: 'كافة الأعمال' },
    { key: 'apps', label: 'تطبيقات الموبايل والويب' },
    { key: 'games', label: 'ألعاب تفاعلية' },
  ];

  const tahtScreens = [
    { url: '/assets/apps/taht/screen_1.jpeg', caption: 'الخزنة المالية الرئيسية ومتابعة السيولة النقدية' },
    { url: '/assets/apps/taht/screen_2.jpeg', caption: 'محفظة الذهب وحساب الأوزان والعيارات 24 و 21' },
    { url: '/assets/apps/taht/screen_3.jpeg', caption: 'إدارة المصروفات الشهرية ورادار الميزانية' },
    { url: '/assets/apps/taht/screen_4.jpeg', caption: 'تحديات التوفير الذكية وحصالة الأهداف' },
    { url: '/assets/apps/taht/screen_5.jpeg', caption: 'تقارير وتحليلات التدفق النقدي بالأرقام' },
    { url: '/assets/apps/taht/screen_6.jpeg', caption: 'أمان وتشفير محلي متكامل AES-256 بدون إنترنت' },
    { url: '/assets/apps/taht/screen_7.jpeg', caption: 'إدارة الديون والالتزامات والدفاتر المحمية' },
    { url: '/assets/apps/taht/screen_8.png', caption: 'التخصيص والخيارات المتقدمة للواجهة' },
  ];

  const aftekerScreens = [
    { url: '/assets/apps/afteker/screen_1.png', caption: 'خزنة الأفكار الرئيسية' },
    { url: '/assets/apps/afteker/screen_2.png', caption: 'ماسح الفواتير بالذكاء الاصطناعي On-Device OCR' },
    { url: '/assets/apps/afteker/screen_3.png', caption: 'التذكيرات الذكية والمهام' },
    { url: '/assets/apps/afteker/screen_4.png', caption: 'الكبسولات الزمنية المحمية' },
    { url: '/assets/apps/afteker/screen_5.png', caption: 'خريطة الذكريات والمناسبات الأولى' },
    { url: '/assets/apps/afteker/screen_6.png', caption: 'المساحات المشتركة المشفرة' },
  ];

  return (
    <section id="projects" className="py-20 md:py-28 bg-slate-50/70 relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>{t.projectsBadge}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug mb-4">
            {t.projectsTitle}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-medium">
            {t.projectsSubtitle}
          </p>

          {/* Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl shadow-xs">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => {
                  setFilter(f.key as any);
                  playAppleClick();
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  filter === f.key
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="space-y-10">
          {/* ROW 1: TOP BRANDS (تحت البلاطة & افتكر) SIDE BY SIDE */}
          {(filter === 'all' || filter === 'apps') && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* TOP BRAND 1: تحت البلاطة (TAHT EL BALATA) */}
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-3xl p-6 sm:p-9 border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between relative group"
              >
                <div>
                  {/* Top Bar with Actual Logo */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3.5">
                      <div className="w-14 h-14 rounded-2xl bg-white p-1 border border-slate-200/90 shadow-md shrink-0 overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                        <img
                          src="/assets/apps/taht/logo.png"
                          alt="لوجو تحت البلاطة"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                            {t.tahtBadge}
                          </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                          {t.tahtTitle}
                        </h3>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-slate-100 text-slate-600 border border-slate-200/60 shrink-0">
                      AES-256 OFFLINE
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal mb-6">
                    {t.tahtDesc}
                  </p>

                  {/* Clean Feature Badges (No messy screen dumping) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>محفظة ذهب وحساب عيارات محلي</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>تشفير AES-256 كامل على الجهاز</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>صفر إعلانات وصفر تتبع بيانات</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>نسخ احتياطي محلي مشفر بكلمة سر</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-5 border-t border-slate-100 flex flex-wrap items-center gap-3">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.blotxtech.taht_elbalata"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playAppleClick()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Google Play</span>
                  </a>

                  <button
                    onClick={() => {
                      playAppleClick();
                      setActiveGallery('taht');
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200/80 transition-colors cursor-pointer"
                  >
                    <Images className="w-4 h-4 text-slate-600" />
                    <span>معرض شاشات التطبيق</span>
                  </button>

                  <a
                    href="https://taht-el-balata.web.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playAppleClick()}
                    className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors ml-auto"
                  >
                    <span>نسخة الويب</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>

              {/* TOP BRAND 2: افتكر (AFTEKER) */}
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-white rounded-3xl p-6 sm:p-9 border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between relative group"
              >
                <div>
                  {/* Top Bar with Actual Logo */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3.5">
                      <div className="w-14 h-14 rounded-2xl bg-white p-1 border border-slate-200/90 shadow-md shrink-0 overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                        <img
                          src="/assets/apps/afteker/logo.jpg"
                          alt="لوجو افتكر"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-sky-50 text-sky-700 border border-sky-200/80">
                            {t.aftekerBadge}
                          </span>
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                            جديد Google Play
                          </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                          {t.aftekerTitle}
                        </h3>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-slate-100 text-slate-600 border border-slate-200/60 shrink-0">
                      ON-DEVICE OCR
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal mb-6">
                    {t.aftekerDesc}
                  </p>

                  {/* Clean Feature Badges (No messy screen dumping) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                      <span>فحص واستخراج الفواتير بالـ OCR الذكي</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                      <span>تذكيرات فورية للمواعيد والضمانات</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                      <span>كبسولات زمنية لتخليد المناسبات</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                      <span>مساحات مشاركة مشفرة مع الأصدقاء</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-5 border-t border-slate-100 flex flex-wrap items-center gap-3">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.blotxtech.eftekir"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playAppleClick()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-sky-600 hover:bg-sky-700 shadow-md shadow-sky-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Google Play</span>
                  </a>

                  <button
                    onClick={() => {
                      playAppleClick();
                      setActiveGallery('afteker');
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200/80 transition-colors cursor-pointer"
                  >
                    <Images className="w-4 h-4 text-slate-600" />
                    <span>معرض شاشات التطبيق</span>
                  </button>

                  <a
                    href="https://eftekir-app-f9116.web.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playAppleClick()}
                    className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors ml-auto"
                  >
                    <span>نسخة الويب</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            </div>
          )}

          {/* ROW 2: THIRD EXHIBIT — شلة هبد (SHELLA HABAD PARTY GAME) */}
          {(filter === 'all' || filter === 'games') && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="relative bg-gradient-to-br from-purple-950 via-indigo-950 to-slate-900 rounded-3xl overflow-hidden shadow-xl text-white border border-purple-500/20"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 lg:p-12 items-center">
                {/* Visual Side */}
                <div className="lg:col-span-6 relative">
                  <div className="relative rounded-2xl overflow-hidden bg-slate-950/50 border border-white/10 shadow-2xl group aspect-[16/10] flex items-center justify-center">
                    <img
                      src="/assets/games/so7ab/home_hero.png"
                      alt="شلة هبد Party Game"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                    
                    {/* Floating mascot badge */}
                    <div className="absolute bottom-4 right-4 left-4 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-white p-1 shadow-lg shrink-0 overflow-hidden flex items-center justify-center">
                          <img
                            src="/assets/games/so7ab/logo.png"
                            alt="شلة هبد Logo"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-white text-base">شلة هبد • Shella Habad</h4>
                          <span className="text-xs text-amber-300 font-semibold flex items-center gap-1">
                            <Star className="w-3 h-3 fill-amber-300" />
                            7 ألعاب بارتي داخل تطبيق واحد
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          playAppleClick();
                          setIsGameModalOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-md text-xs font-bold text-white transition-colors cursor-pointer shrink-0"
                      >
                        معاينة الألعاب
                      </button>
                    </div>
                  </div>

                  {/* Mode thumbnails strip */}
                  <div className="mt-4 grid grid-cols-4 gap-2">
                    <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black/20 aspect-video flex items-center justify-center p-1">
                      <img src="/assets/games/so7ab/imposter.png" alt="Imposter" className="max-h-full object-contain" />
                    </div>
                    <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black/20 aspect-video flex items-center justify-center p-1">
                      <img src="/assets/games/so7ab/liar.png" alt="Liar" className="max-h-full object-contain" />
                    </div>
                    <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black/20 aspect-video flex items-center justify-center p-1">
                      <img src="/assets/games/so7ab/spin_bottle_3d.png" alt="Spin Bottle" className="max-h-full object-contain" />
                    </div>
                    <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black/20 aspect-video flex items-center justify-center p-1">
                      <img src="/assets/games/so7ab/challenges.png" alt="Challenges" className="max-h-full object-contain" />
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="lg:col-span-6 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-400 text-slate-950 uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                        <Gamepad2 className="w-3.5 h-3.5" />
                        {t.shellaHabadBadge}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/15 text-purple-200 border border-white/15 flex items-center gap-1.5">
                        <WifiOff className="w-3 h-3 text-emerald-400" />
                        {t.shellaHabadOfflineTag}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 leading-tight">
                      {t.shellaHabadTitle}
                    </h3>

                    <p className="text-sm sm:text-base text-purple-100/90 leading-relaxed font-normal mb-6">
                      {t.shellaHabadDesc}
                    </p>

                    {/* Modes Badges */}
                    <div className="mb-8">
                      <span className="text-xs font-bold text-amber-300 block mb-3 uppercase tracking-wider">
                        {t.shellaHabadModesCount}:
                      </span>
                      <div className="flex flex-wrap gap-2 text-xs font-semibold">
                        <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/10">{t.shellaHabadMode1}</span>
                        <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/10">{t.shellaHabadMode2}</span>
                        <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/10">{t.shellaHabadMode3}</span>
                        <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/10">{t.shellaHabadMode4}</span>
                        <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/10">{t.shellaHabadMode5}</span>
                        <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/10">{t.shellaHabadMode6}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-6 border-t border-white/15 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => {
                        playAppleClick();
                        setIsGameModalOpen(true);
                      }}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 shadow-lg shadow-amber-400/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-slate-950" />
                      <span>{t.viewGameDetailsBtn}</span>
                    </button>

                    <span className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-white/10 text-white/90 border border-white/15">
                      <span>Google Play • قريباً</span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Shella Habad Modal */}
      <GameDetailsModal
        isOpen={isGameModalOpen}
        onClose={() => setIsGameModalOpen(false)}
      />

      {/* Taht El Balata Gallery Modal */}
      <AppScreensGalleryModal
        isOpen={activeGallery === 'taht'}
        onClose={() => setActiveGallery(null)}
        title="معرض شاشات تطبيق تحت البلاطة"
        appName="تحت البلاطة • Taht El Balata"
        logoUrl="/assets/apps/taht/logo.png"
        screens={tahtScreens}
      />

      {/* Afteker Gallery Modal */}
      <AppScreensGalleryModal
        isOpen={activeGallery === 'afteker'}
        onClose={() => setActiveGallery(null)}
        title="معرض شاشات تطبيق افتكر"
        appName="افتكر • Eftekir"
        logoUrl="/assets/apps/afteker/logo.jpg"
        screens={aftekerScreens}
      />
    </section>
  );
};
