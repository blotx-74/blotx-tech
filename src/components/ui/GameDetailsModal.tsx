import { type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Gamepad2, WifiOff, Sparkles, Trophy, EyeOff, HelpCircle, Flame, Heart, RotateCw } from 'lucide-react';
import { playAppleClick } from '../../utils/soundEffects';
import { useLanguage } from '../../LanguageContext';

interface GameDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GameDetailsModal: FC<GameDetailsModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  const gameModes = [
    {
      id: 'imposter',
      title: 'مين الجاسوس؟ (Imposter)',
      icon: EyeOff,
      color: 'from-amber-500 to-orange-600',
      badge: 'ذكاء وخداع',
      img: '/assets/games/so7ab/imposter.png',
      desc: 'الكل عارف الكلمة السرية ما عدا واحد بس هو الجاسوس! أسئلة ذكية ونظرات شك وتصويت حاسم لكشف الجاسوس قبل ما يهرب أو يخمن المكان.',
    },
    {
      id: 'liar',
      title: 'مين الكداب؟ (The Liar)',
      icon: HelpCircle,
      color: 'from-rose-500 to-red-600',
      badge: 'تحقيق وهبد',
      img: '/assets/games/so7ab/liar.png',
      desc: 'سؤال غريب ومعلومات أغرب! واحد بيقول الحقيقة والباقي بيهبدوا ويكدبوا بثقة عمياء.. هل هتقدر تكشف مين الصادق ومين اللي بيشتغلكم؟',
    },
    {
      id: 'challenges',
      title: 'حكم وتحديات (Challenges)',
      icon: Flame,
      color: 'from-red-500 to-rose-600',
      badge: 'جرأة وأكشن',
      img: '/assets/games/so7ab/challenges.png',
      desc: 'تحديات حماسية وأحكام مضحكة ومحرجة! نفّذ التحدي واثبت جرأتك وسط الشلة أو اتقبل الحكم والعقاب.',
    },
    {
      id: 'most_likely',
      title: 'أكتر واحد (Most Likely)',
      icon: Trophy,
      color: 'from-blue-500 to-indigo-600',
      badge: 'فكرة وفضايح',
      img: '/assets/games/so7ab/most_likely.png',
      desc: 'مين أكتر واحد ممكن يسافر فجأة؟ مين ينسى أصحابه في مصلحة؟ الكل بيشاور في نفس اللحظة والضحك بيولع.',
    },
    {
      id: 'confession',
      title: 'اعترافات صريحة (Confessions)',
      icon: Heart,
      color: 'from-pink-500 to-rose-600',
      badge: 'صراحة وعمق',
      img: '/assets/games/so7ab/confession.png',
      desc: 'أسئلة شخصية غير متوقعة وتفاصيل مكنتش تعرفها عن أقرب الناس ليك. فرصة للتقارب وكشف المستخبي بكل صراحة.',
    },
    {
      id: 'spin_bottle',
      title: 'لفة الإزازة 3D (Spin Bottle)',
      icon: RotateCw,
      color: 'from-emerald-500 to-teal-600',
      badge: 'فيزياء 3D تفاعلية',
      img: '/assets/games/so7ab/spin_bottle_3d.png',
      desc: 'زجاجة ثلاثية الأبعاد بفيزياء دوران واقعية تماماً ومؤثرات صوتية مرحة، تختار عشوائياً بين اللاعبين للأحكام والتحديات.',
    },
    {
      id: 'trivia',
      title: 'أسئلة وهبد عام (Trivia & Quick Choice)',
      icon: Sparkles,
      color: 'from-purple-500 to-indigo-600',
      badge: 'معلومات عامة',
      img: '/assets/games/so7ab/trivia.png',
      desc: 'بنك أسئلة ثقافية وترفيهية وفنية بأسلوب خفيف ومصري، تنافس سرعة بديهة بين الفرق والأصدقاء.',
    },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="relative px-6 py-6 sm:px-8 sm:py-8 bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 text-white flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 p-1 backdrop-blur-md border border-white/20 shrink-0 shadow-lg flex items-center justify-center overflow-hidden">
                <img
                  src="/assets/games/so7ab/logo.png"
                  alt="شلة هبد Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-slate-950">
                    لعبة بارتي كارتونية 3D
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-white/20 text-white flex items-center gap-1">
                    <WifiOff className="w-3 h-3" />
                    أوفلاين 100%
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  شلة هبد • Shella Habad
                </h3>
                <p className="text-sm text-purple-100 font-medium mt-1">
                  7 ألعاب تفاعلية داخل تطبيق واحد للجلسات ولمات الصحاب والعائلات
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                playAppleClick();
                onClose();
              }}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
            {/* Banner Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 aspect-video sm:aspect-auto sm:h-52 flex items-center justify-center">
                <img
                  src="/assets/games/so7ab/welcome_banner.png"
                  alt="شلة هبد Welcome Banner"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
                    <Gamepad2 className="w-4 h-4 text-purple-600" />
                    المواصفات التقنية
                  </h4>
                  <ul className="text-xs text-slate-600 space-y-2 font-medium">
                    <li>• الإطار البرمجي: <strong>Flutter & Dart</strong></li>
                    <li>• إدارة الحالة: <strong>Riverpod 2.6</strong></li>
                    <li>• التخزين والأمان: <strong>Shared Preferences محلي</strong></li>
                    <li>• التوافق: <strong>Android 8.0 فما فوق</strong></li>
                    <li>• الأداء: <strong>100% أوفلاين بدون استهلاك نت</strong></li>
                  </ul>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200">
                  <a
                    href="/downloads/Shella_Habad_v1.0.apk"
                    download="Shella_Habad_v1.0.apk"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md shadow-purple-500/20 transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>تحميل APK التجريبي (67 MB)</span>
                  </a>
                </div>
              </div>
            </div>

            {/* All Game Modes Grid */}
            <div>
              <h4 className="text-lg font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                أنماط اللعب المتضمنة (Game Modes)
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {gameModes.map((mode) => {
                  const ModeIcon = mode.icon;
                  return (
                    <div
                      key={mode.id}
                      className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow flex gap-4"
                    >
                      <div className="w-16 h-16 rounded-xl bg-slate-100 border border-slate-200 shrink-0 overflow-hidden flex items-center justify-center">
                        <img
                          src={mode.img}
                          alt={mode.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h5 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                            <ModeIcon className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                            <span>{mode.title}</span>
                          </h5>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200/60">
                            {mode.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 font-normal leading-relaxed">
                          {mode.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 px-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-slate-500 font-medium">
              تم تطوير اللعبة بالكامل داخل استوديو Blotx Tech Solutions
            </span>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href="/downloads/Shella_Habad_v1.0.apk"
                download="Shella_Habad_v1.0.apk"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>تحميل ملف APK</span>
              </a>
              <button
                onClick={() => {
                  playAppleClick();
                  onClose();
                }}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
              >
                {t.gameModalClose}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
