import { type FC } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles, Terminal, Code2, Smartphone, Gamepad2, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../LanguageContext';
import { playAppleClick } from '../../utils/soundEffects';
import { handleSmoothScrollClick } from '../../utils/smoothScroll';
import { TechThreeCanvas } from '../canvas/TechThreeCanvas';

interface TechHeroProps {
  onOpenInquiry?: () => void;
}

export const TechHero: FC<TechHeroProps> = ({ onOpenInquiry }) => {
  const { t, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="relative pt-8 pb-20 md:pt-14 md:pb-28 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200/80 min-h-[88vh] flex flex-col justify-center">
      {/* 3D Three.js Ambient Geometry Background */}
      <TechThreeCanvas />

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(#1e293b 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Subtle Ambient Radial Lighting */}
      <div className="absolute top-1/4 -left-36 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-36 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Large Transparent Ambient Logo Watermark Behind Text */}
      <div 
        className="absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 lg:right-1/4 w-[420px] sm:w-[620px] lg:w-[720px] aspect-square pointer-events-none select-none opacity-[0.045] -z-0 overflow-hidden flex items-center justify-center"
        aria-hidden="true"
      >
        <img
          src="/assets/logos/blotx-tech-logo.png"
          alt=""
          className="w-full h-full object-contain filter grayscale"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text & Pitch Side (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-start">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs sm:text-sm font-bold shadow-xs mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>{t.techHeroBadge}</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.18] mb-6"
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
              className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl mb-8"
            >
              {t.techHeroSubtitle}
            </motion.p>

            {/* Action Buttons */}
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

            {/* Quick Tech Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-xs font-semibold text-slate-500"
            >
              <div className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-lg border border-slate-200/80 shadow-xs">
                <Smartphone className="w-3.5 h-3.5 text-blue-600" />
                <span>Flutter Native</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-lg border border-slate-200/80 shadow-xs">
                <Gamepad2 className="w-3.5 h-3.5 text-purple-600" />
                <span>3D Games & Three.js</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-lg border border-slate-200/80 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>AES-256 Offline Privacy</span>
              </div>
            </motion.div>
          </div>

          {/* Interactive Code & Software Studio Showcase Card (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="w-full max-w-md bg-slate-950 text-slate-200 rounded-3xl p-5 sm:p-6 border border-slate-800 shadow-2xl relative overflow-hidden group"
            >
              {/* Top IDE Window Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-slate-400 text-[11px]">BlotxEngine.dart</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>ACTIVE 120 FPS</span>
                </div>
              </div>

              {/* Code Editor Body */}
              <div className="py-4 font-mono text-xs sm:text-[13px] leading-relaxed space-y-1.5 text-start overflow-x-auto text-slate-300">
                <p className="text-slate-500 text-[11px]">// Blotx Software Architecture 2026</p>
                <p>
                  <span className="text-purple-400">class</span>{' '}
                  <span className="text-amber-300 font-bold">BlotxTechSolutions</span>{' '}
                  <span className="text-purple-400">extends</span>{' '}
                  <span className="text-blue-400">SoftwareStudio</span> {'{'}
                </p>
                <p className="pl-4">
                  <span className="text-blue-300">final</span> apps = [
                </p>
                <p className="pl-8 text-emerald-300">
                  'Taht El Balata', <span className="text-slate-500">// Google Play</span>
                </p>
                <p className="pl-8 text-emerald-300">
                  'Eftekir', <span className="text-slate-500">// Google Play & PWA</span>
                </p>
                <p className="pl-8 text-amber-300">
                  'Shella Habad 3D', <span className="text-slate-500">// Party Game</span>
                </p>
                <p className="pl-4">];</p>
                <p className="pl-4">
                  <span className="text-purple-400">bool</span> isEncrypted = <span className="text-rose-400">true</span>;
                </p>
                <p className="pl-4">
                  <span className="text-purple-400">bool</span> isOfflineFirst = <span className="text-rose-400">true</span>;
                </p>
                <p className="pl-4">
                  <span className="text-blue-300">Future</span>&lt;<span className="text-purple-400">void</span>&gt;{' '}
                  <span className="text-sky-300">buildFuture</span>() <span className="text-purple-400">async</span> {'{'}
                </p>
                <p className="pl-8 text-slate-400">
                  await <span className="text-sky-300">deployExceptionalCode</span>();
                </p>
                <p className="pl-4">{'}'}</p>
                <p>{'}'}</p>
              </div>

              {/* Terminal Output Footer */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>Build: Zero warnings</span>
                </span>
                <span className="text-slate-500">v2.4.0</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-14 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
        >
          <div className="bg-white/85 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col items-center text-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-blue-600 tracking-tight">
              {t.techMetricProjectsVal}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
              {t.techMetricProjectsLabel}
            </span>
          </div>

          <div className="bg-white/85 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col items-center text-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-purple-600 tracking-tight">
              {t.techMetricUsersVal}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
              {t.techMetricUsersLabel}
            </span>
          </div>

          <div className="bg-white/85 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col items-center text-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 tracking-tight">
              {t.techMetricUptimeVal}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
              {t.techMetricUptimeLabel}
            </span>
          </div>

          <div className="bg-white/85 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col items-center text-center">
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
