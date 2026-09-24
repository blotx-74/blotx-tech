import { useState, type FC } from 'react';
import { ShieldCheck, ArrowUpRight, TrendingUp, Sparkles, CheckCircle2, Lock } from 'lucide-react';
import { useLanguage } from '../../LanguageContext';
import { playAppleClick } from '../../utils/soundEffects';

export const InteractiveBalataExperience: FC = () => {
  const [isLifted, setIsLifted] = useState<boolean>(true);
  const [activeVault, setActiveVault] = useState<'emergency' | 'gold' | 'travel'>('emergency');
  const { language, t } = useLanguage();

  const vaultsAr = {
    emergency: {
      name: 'خزنة طوارئ البيت والأسرة',
      amount: '60,000 ج.م',
      percent: '100% مؤمنة بالكامل',
      desc: 'حساب مخصص للأوقات غير المتوقعة، يضمن إن بيتك مستور دائماً بدون ما تحتاج لحد.',
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
      border: 'border-emerald-200 dark:border-emerald-800/50',
    },
    gold: {
      name: 'حصالة حفظ القيمة والذهب',
      amount: '55,000 ج.م',
      percent: 'محمية ضد التضخم',
      desc: 'تحويل فائضك الشهري الصغير إلى أصول حقيقية تحافظ على قيمتها مع مرور السنين.',
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/40',
      border: 'border-amber-200 dark:border-amber-800/50',
    },
    travel: {
      name: 'خزنة مناسبات وسفر العائلة',
      amount: '33,500 ج.م',
      percent: 'متبقي 6,500 ج.م للهدف',
      desc: 'ادخار ممتع بدون حرمان؛ استمتع بحياتك ومناسباتك وفلوسك جاهزة ومستنياك.',
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-950/40',
      border: 'border-blue-200 dark:border-blue-800/50',
    },
  };

  const vaultsEn = {
    emergency: {
      name: 'Home & Family Emergency Vault',
      amount: '60,000 EGP',
      percent: '100% Fully Fortified',
      desc: 'Dedicated reserve for unexpected life events, ensuring your family is always resilient without needing debt.',
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
      border: 'border-emerald-200 dark:border-emerald-800/50',
    },
    gold: {
      name: 'Gold Reserves & Inflation Hedge',
      amount: '55,000 EGP',
      percent: 'Inflation Protected',
      desc: 'Converts monthly surpluses into real wealth stores that preserve purchasing power across generations.',
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/40',
      border: 'border-amber-200 dark:border-amber-800/50',
    },
    travel: {
      name: 'Family Celebrations & Vacation Vault',
      amount: '33,500 EGP',
      percent: '6,500 EGP remaining to goal',
      desc: 'Disciplined savings without deprivation; enjoy life milestones with dedicated capital already waiting.',
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-950/40',
      border: 'border-blue-200 dark:border-blue-800/50',
    },
  };

  const vaults = language === 'en' ? vaultsEn : vaultsAr;

  return (
    <section id="taht-experience" className="py-24 bg-gradient-to-b from-[#f4f4f7] via-[#f0fdf4]/40 to-[#ffffff] dark:from-[#0c0d12] dark:via-[#091510] dark:to-[#07080a] border-t border-black/[0.04] dark:border-white/10 overflow-hidden font-cairo transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Cultural Wit */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/70 border border-emerald-300/60 dark:border-emerald-700/50 text-emerald-800 dark:text-emerald-300 text-xs font-bold shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{t.tahtExpBadge}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1d1d1f] dark:text-white tracking-tight leading-tight">
            {t.tahtExpTitle} <span className="text-[#059669] dark:text-emerald-400">{t.tahtExpTitleAccent}</span>
          </h2>

          <p className="text-base sm:text-xl text-[#6e6e73] dark:text-[#98989f] leading-relaxed">
            {t.tahtExpDesc}
          </p>
        </div>

        {/* The Interactive "Lift The Balata" Showcase Container */}
        <div className="apple-card p-6 sm:p-12 bg-white/90 dark:bg-[#11141c]/90 border border-emerald-100 dark:border-emerald-500/20 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/40 dark:bg-emerald-950/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Col (Interactive Balata Mechanism) */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center text-center">
              {/* Interactive Tile Stage */}
              <div className="relative w-full max-w-[300px] sm:max-w-[380px] h-[300px] sm:h-[360px] flex items-center justify-center rounded-3xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-100/60 dark:border-emerald-800/30 p-4 overflow-hidden shadow-inner">
                {/* Ambient Soft Glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-100/20 to-emerald-200/30 dark:via-emerald-950/20 dark:to-emerald-900/30 pointer-events-none" />

                {/* 1. The Real 3D Logo Character emerging from underneath */}
                <div
                  className={`relative z-10 flex items-center justify-center transition-all duration-700 ease-out cursor-pointer ${
                    isLifted
                      ? 'scale-100 opacity-100 translate-y-0 drop-shadow-2xl'
                      : 'scale-90 opacity-20 translate-y-6 blur-[1px]'
                  }`}
                  onClick={() => {
                    playAppleClick();
                    setIsLifted(!isLifted);
                  }}
                >
                  <img
                    src="/assets/logos/taht-elbalata-logo.png"
                    alt="كائن تحت البلاطة العبقري"
                    className="w-56 h-56 sm:w-72 sm:h-72 object-contain hover:scale-105 transition-transform"
                  />
                </div>

                {/* Floating Money Banknotes Animation Particles */}
                {isLifted && (
                  <>
                    <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-emerald-500 text-white font-mono text-xs font-bold shadow-lg animate-bounce">
                      + 148,500 EGP
                    </div>
                    <div className="absolute bottom-4 left-4 z-20 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40 text-xs font-bold shadow-md">
                      خزنة مشفرة 100%
                    </div>
                  </>
                )}

                {/* The Physical Stone Balata Slab (Covers mascot inside stage when closed, slides down when lifted) */}
                <div
                  onClick={() => {
                    playAppleClick();
                    setIsLifted(!isLifted);
                  }}
                  className={`absolute inset-3 sm:inset-4 rounded-2xl bg-gradient-to-br from-neutral-100 via-neutral-200 to-neutral-300 dark:from-neutral-800 dark:via-neutral-850 dark:to-neutral-900 border-2 border-neutral-300/80 dark:border-neutral-700 shadow-2xl z-20 flex flex-col items-center justify-center cursor-pointer transition-all duration-700 ease-out select-none ${
                    isLifted
                      ? 'translate-y-[115%] opacity-0 pointer-events-none'
                      : 'translate-y-0 opacity-100 hover:scale-[1.02]'
                  }`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-neutral-900 dark:bg-black text-white flex items-center justify-center shadow-lg mb-2">
                    <Lock className="w-6 h-6 text-emerald-400" />
                  </div>
                  <span className="text-sm font-black text-neutral-800 dark:text-neutral-100 tracking-tight">
                    {language === 'ar' ? '«البلاطة» محكمة الإغلاق' : '«The Balata» Fortified Lid'}
                  </span>
                  <span className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 font-semibold">
                    {language === 'ar' ? 'اضغط لرفع البلاطة وكشف الخزنة ✦' : 'Tap to lift the tile & reveal ✦'}
                  </span>
                </div>
              </div>

              {/* Interactive Balata Controller - In normal flow so it NEVER overlaps sibling content */}
              <div className="mt-5 w-full max-w-[340px]">
                <button
                  type="button"
                  onClick={() => {
                    playAppleClick();
                    setIsLifted(!isLifted);
                  }}
                  className="w-full p-3 rounded-2xl bg-white dark:bg-[#15171e] border border-black/10 dark:border-white/10 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-between gap-3 cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5 text-start min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                      بلاطة
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[#1d1d1f] dark:text-white truncate">
                        {isLifted
                          ? (language === 'ar' ? 'البلاطة مرفوعة • الخزنة مكشوفة' : 'Tile Lifted • Vault Revealed')
                          : (language === 'ar' ? 'البلاطة مقفولة • الخزنة مستورة' : 'Tile Lowered • Vault Concealed')}
                      </div>
                      <div className="text-[10px] text-[#86868b] dark:text-[#98989f] truncate">
                        {language === 'ar'
                          ? 'اضغط لتبديل حالة الخزنة والكائن'
                          : 'Tap to toggle vault status'}
                      </div>
                    </div>
                  </div>

                  <span className="px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                    {isLifted
                      ? (language === 'ar' ? 'إغلاق البلاطة' : 'Lower Tile')
                      : (language === 'ar' ? 'ارفع البلاطة ✦' : 'Lift Tile ✦')}
                  </span>
                </button>
              </div>

              {/* Status Note under the controller */}
              <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-[#6e6e73] dark:text-[#98989f]">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>
                  {language === 'ar'
                    ? 'جرّب رفع البلاطة لرؤية الكائن الذكي وحصانتك المالية'
                    : 'Click or lift the tile to reveal the smart mascot and financial vaults'}
                </span>
              </div>
            </div>

            {/* Right Col (The Vault Experience & Live Specs) */}
            <div className="lg:col-span-6 space-y-6 text-start">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                  APP HIGHLIGHT 01
                </span>
                <div className="w-8 h-[2px] bg-emerald-500" />
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-[#1d1d1f] dark:text-white tracking-tight">
                {language === 'ar'
                  ? 'إزاي «تحت البلاطة» بيغير علاقتك بالفلوس؟'
                  : 'How does «Taht El Balata» transform your relationship with money?'}
              </h3>

              <p className="text-base text-[#6e6e73] dark:text-[#98989f] leading-relaxed">
                {language === 'ar'
                  ? 'مش مجرد تطبيق بيسجل أرقام وخلاص؛ هو مستشارك المالي الأمين اللي بيقسم فلوسك لخزنات ذكية غير قابلة للكسر، وبيحميك من القرارات المتسرعة اللي بتضيع شقاك.'
                  : 'More than a basic ledger; it acts as your trusted financial advisor, allocating capital into disciplined, unbreakable vaults to guard against impulse spending.'}
              </p>

              {/* Interactive Vault Switcher */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold text-[#1d1d1f] dark:text-white">
                  {language === 'ar' ? 'اختر الخزنة الذكية لاستكشاف تفاصيلها:' : 'Select a smart vault to explore:'}
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveVault('emergency')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeVault === 'emergency'
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-neutral-100 dark:bg-[#171922] text-[#1d1d1f] dark:text-white hover:bg-neutral-200 dark:hover:bg-[#202330]'
                    }`}
                  >
                    {language === 'ar' ? 'خزنة الطوارئ' : 'Emergency Vault'}
                  </button>
                  <button
                    onClick={() => setActiveVault('gold')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeVault === 'gold'
                        ? 'bg-amber-600 text-white shadow-md'
                        : 'bg-neutral-100 dark:bg-[#171922] text-[#1d1d1f] dark:text-white hover:bg-neutral-200 dark:hover:bg-[#202330]'
                    }`}
                  >
                    {language === 'ar' ? 'حصالة الذهب' : 'Gold Reserves'}
                  </button>
                  <button
                    onClick={() => setActiveVault('travel')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeVault === 'travel'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-neutral-100 dark:bg-[#171922] text-[#1d1d1f] dark:text-white hover:bg-neutral-200 dark:hover:bg-[#202330]'
                    }`}
                  >
                    {language === 'ar' ? 'سفرية العائلة' : 'Family Travel'}
                  </button>
                </div>

                {/* Displaying Active Vault Card */}
                <div className={`p-5 rounded-2xl border ${vaults[activeVault].border} ${vaults[activeVault].bg} space-y-2 transition-all`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${vaults[activeVault].color}`}>
                      {vaults[activeVault].percent}
                    </span>
                    <h4 className="text-base font-bold text-[#1d1d1f] dark:text-white">{vaults[activeVault].name}</h4>
                  </div>
                  <div className="text-2xl font-black text-[#1d1d1f] dark:text-white tracking-tight">
                    {vaults[activeVault].amount}
                  </div>
                  <p className="text-xs text-[#52525b] dark:text-[#a1a1a6] leading-relaxed">
                    {vaults[activeVault].desc}
                  </p>
                </div>
              </div>

              {/* 3 Core Pillars of Taht El Balata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-black/[0.06] dark:border-white/10">
                <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-[#15171e] border border-black/[0.05] dark:border-white/10 text-start">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1d1d1f] dark:text-white mb-1">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>{language === 'ar' ? 'كشف التسريبات الخفية' : 'Leakage Detection'}</span>
                  </div>
                  <div className="text-[11px] text-[#6e6e73] dark:text-[#98989f]">
                    {language === 'ar'
                      ? 'يكتشف المصاريف الصغيرة اللي بتسرب آلاف الجنيهات شهرياً.'
                      : 'Detects micro-expenses that quietly drain substantial capital each month.'}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-[#15171e] border border-black/[0.05] dark:border-white/10 text-start">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1d1d1f] dark:text-white mb-1">
                    <Lock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>{language === 'ar' ? 'تشفير محلي بدون بنوك' : 'Offline Bank-Free Security'}</span>
                  </div>
                  <div className="text-[11px] text-[#6e6e73] dark:text-[#98989f]">
                    {language === 'ar'
                      ? 'كل قرش وبياناتك متسجلة على تليفونك أنت بس بدون أي تجسس.'
                      : 'Every coin and note is stored locally on your device with complete privacy.'}
                  </div>
                </div>
              </div>

              {/* Link to Symbiosis */}
              <div className="pt-2 flex items-center justify-between">
                <a
                  href="#synergy-matrix"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 hover:underline"
                >
                  <span>
                    {language === 'ar'
                      ? 'شاهد كيف يرتبط تلقائياً بـ «افتكر» لتنبيهك بالأقساط'
                      : 'See how it pairs with Eftekir for automated bill alerts'}
                  </span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'جاهز للاستخدام اليومي' : 'Ready for daily use'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
