import { type FC } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles, Layers, ShieldCheck, Gamepad2, Smartphone, Terminal } from 'lucide-react';
import { useLanguage } from '../../LanguageContext';
import { playAppleClick } from '../../utils/soundEffects';
import { handleSmoothScrollClick } from '../../utils/smoothScroll';

interface TechHeroProps {
  onOpenInquiry?: () => void;
}

export const TechHero: FC<TechHeroProps> = ({ onOpenInquiry }) => {
  const { t, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200/70">
      {/* Subtle modern tech grid background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(#1e293b 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Decorative ambient gradient glows */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-indigo-400/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs sm:text-sm font-bold shadow-xs mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>{t.techHeroBadge}</span>
          </motion.div>

          {/* Master Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.2] mb-6"
          >
            {t.techHeroTitle}{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 bg-clip-text text-transparent">
              {t.techHeroTitleHighlight}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-3xl mb-10"
          >
            {t.techHeroSubtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto"
          >
            <a
              href="#projects"
              onClick={(e) => {
                handleSmoothScrollClick(e, '#projects');
                playAppleClick();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-base font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-md shadow-slate-900/15 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>{t.techHeroCtaProjects}</span>
              <ArrowIcon className="w-4 h-4 text-slate-300" />
            </a>

            <button
              onClick={() => {
                playAppleClick();
                if (onOpenInquiry) {
                  onOpenInquiry();
                } else {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-base font-bold text-blue-700 bg-blue-50/90 hover:bg-blue-100/90 border border-blue-200/80 shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Terminal className="w-4 h-4 text-blue-600" />
              <span>{t.techHeroCtaContact}</span>
            </button>
          </motion.div>

          {/* Quick Pillar Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-semibold text-slate-500"
          >
            <div className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-lg border border-slate-200/80 shadow-xs">
              <Smartphone className="w-3.5 h-3.5 text-blue-600" />
              <span>تطبيقات Flutter</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-lg border border-slate-200/80 shadow-xs">
              <Gamepad2 className="w-3.5 h-3.5 text-purple-600" />
              <span>ألعاب 3D تفاعلية</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-lg border border-slate-200/80 shadow-xs">
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              <span>منصات ويب React</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-lg border border-slate-200/80 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>أوفلاين وتشفير محلي</span>
            </div>
          </motion.div>
        </div>

        {/* Metrics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-14 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
        >
          <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col items-center text-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-blue-600 tracking-tight">
              {t.techMetricProjectsVal}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
              {t.techMetricProjectsLabel}
            </span>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col items-center text-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-purple-600 tracking-tight">
              {t.techMetricUsersVal}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
              {t.techMetricUsersLabel}
            </span>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col items-center text-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 tracking-tight">
              {t.techMetricUptimeVal}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
              {t.techMetricUptimeLabel}
            </span>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col items-center text-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.techMetricCodeVal}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
              {t.techMetricCodeLabel}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
