import { useState, type FC } from 'react';
import { ShieldCheck, ArrowUpRight, TrendingUp, Sparkles, CheckCircle2, Lock } from 'lucide-react';
import { useLanguage } from '../../LanguageContext';

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
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
    },
    gold: {
      name: 'حصالة حفظ القيمة والذهب',
      amount: '55,000 ج.م',
      percent: 'محمية ضد التضخم',
      desc: 'تحويل فائضك الشهري الصغير إلى أصول حقيقية تحافظ على قيمتها مع مرور السنين.',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
    },
    travel: {
      name: 'خزنة مناسبات وسفر العائلة',
      amount: '33,500 ج.م',
      percent: 'متبقي 6,500 ج.م للهدف',
      desc: 'ادخار ممتع بدون حرمان؛ استمتع بحياتك ومناسباتك وفلوسك جاهزة ومستنياك.',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
    },
  };

  const vaultsEn = {
    emergency: {
      name: 'Home & Family Emergency Vault',
      amount: '60,000 EGP',
      percent: '100% Fully Fortified',
      desc: 'Dedicated reserve for unexpected life events, ensuring your family is always resilient without needing debt.',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
    },
    gold: {
      name: 'Gold Reserves & Inflation Hedge',
      amount: '55,000 EGP',
      percent: 'Inflation Protected',
      desc: 'Converts monthly surpluses into real wealth stores that preserve purchasing power across generations.',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
    },
    travel: {
      name: 'Family Celebrations & Vacation Vault',
      amount: '33,500 EGP',
      percent: '6,500 EGP remaining to goal',
      desc: 'Disciplined savings without deprivation; enjoy life milestones with dedicated capital already waiting.',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
    },
  };

  const vaults = language === 'en' ? vaultsEn : vaultsAr;

  return (
    <section id="taht-experience" className="py-24 bg-gradient-to-b from-[#f4f4f7] via-[#f0fdf4]/40 to-[#ffffff] border-t border-black/[0.04] overflow-hidden font-cairo">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Cultural Wit */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300/60 text-emerald-800 text-xs font-bold shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{t.tahtExpBadge}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1d1d1f] tracking-tight leading-tight">
            {t.tahtExpTitle} <span className="text-[#059669]">{t.tahtExpTitleAccent}</span>
          </h2>

          <p className="text-base sm:text-xl text-[#6e6e73] leading-relaxed">
            {t.tahtExpDesc}
          </p>
        </div>

        {/* The Interactive "Lift The Balata" Showcase Container */}
        <div className="apple-card p-6 sm:p-12 bg-white/90 border border-emerald-100 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Col (Interactive Balata Mechanism) */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center text-center">
              {/* Interactive Tile Stage */}
              <div className="relative w-full max-w-[380px] h-[380px] flex items-center justify-center">
                {/* 1. The Real 3D Logo Character emerging from underneath */}
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out ${
                    isLifted
                      ? 'scale-100 opacity-100 translate-y-0'
                      : 'scale-90 opacity-40 translate-y-8'
                  }`}
                >
                  <img
                    src="/assets/logos/taht-elbalata-logo.png"
                    alt="كائن تحت البلاطة العبقري"
                    className="w-72 h-72 sm:w-80 sm:h-80 object-contain drop-shadow-2xl hover:scale-105 transition-transform"
                  />
                </div>

                {/* Floating Money Banknotes Animation Particles */}
                {isLifted && (
                  <>
                    <div className="absolute -top-2 right-4 px-3 py-1 rounded-full bg-emerald-500 text-white font-mono text-xs font-bold shadow-lg animate-bounce">
                      + 148,500 EGP
                    </div>
                    <div className="absolute bottom-4 left-6 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold shadow-md">
                      خزنة مشفرة 100%
                    </div>
                  </>
                )}

                {/* The Lifting Stone Balata Plate Overlay */}
                <div
                  onClick={() => setIsLifted(!isLifted)}
                  className={`absolute inset-x-4 bottom-0 cursor-pointer rounded-2xl p-4 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 border-2 border-neutral-300 shadow-2xl transition-all duration-700 ease-out flex items-center justify-between group ${
                    isLifted
                      ? 'translate-y-24 opacity-80 rotate-2'
                      : 'translate-y-4 opacity-100 rotate-0'
                  }`}
                >
                  <div className="flex items-center gap-3 text-right">
                    <div className="w-10 h-10 rounded-xl bg-neutral-800 text-white flex items-center justify-center font-bold text-xs shadow-md">
                      بلاطة
                    </div>
                    <div>
                      <div className="text-xs font-bold text-neutral-800">
                        {isLifted ? 'البلاطة مرفوعة • الخزنة مكشوفة' : 'البلاطة مقفولة • اضغط لرفعها'}
                      </div>
                      <div className="text-[11px] text-neutral-500">
                        اضغط لتبديل حالة الخزنة ورؤية الكائن الذكي
                      </div>
                    </div>
                  </div>

                  <div className="px-3 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-sm group-hover:scale-105 transition-transform">
                    {isLifted
                      ? (language === 'ar' ? 'إغلاق البلاطة' : 'Lower Tile')
                      : (language === 'ar' ? 'ارفع البلاطة ✦' : 'Lift Tile ✦')}
                  </div>
                </div>
              </div>

              {/* Status Note under the tile */}
              <div className="mt-8 flex items-center gap-2 text-xs text-[#6e6e73]">
                <Sparkles className="w-4 h-4 text-emerald-600" />
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
                <span className="text-xs font-mono font-bold text-emerald-600 uppercase tracking-widest">
                  APP HIGHLIGHT 01
                </span>
                <div className="w-8 h-[2px] bg-emerald-500" />
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-[#1d1d1f] tracking-tight">
                {language === 'ar'
                  ? 'إزاي «تحت البلاطة» بيغير علاقتك بالفلوس؟'
                  : 'How does «Taht El Balata» transform your relationship with money?'}
              </h3>

              <p className="text-base text-[#6e6e73] leading-relaxed">
                {language === 'ar'
                  ? 'مش مجرد تطبيق بيسجل أرقام وخلاص؛ هو مستشارك المالي الأمين اللي بيقسم فلوسك لخزنات ذكية غير قابلة للكسر، وبيحميك من القرارات المتسرعة اللي بتضيع شقاك.'
                  : 'More than a basic ledger; it acts as your trusted financial advisor, allocating capital into disciplined, unbreakable vaults to guard against impulse spending.'}
              </p>

              {/* Interactive Vault Switcher */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold text-[#1d1d1f]">
                  {language === 'ar' ? 'اختر الخزنة الذكية لاستكشاف تفاصيلها:' : 'Select a smart vault to explore:'}
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveVault('emergency')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeVault === 'emergency'
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-neutral-100 text-[#1d1d1f] hover:bg-neutral-200'
                    }`}
                  >
                    {language === 'ar' ? 'خزنة الطوارئ' : 'Emergency Vault'}
                  </button>
                  <button
                    onClick={() => setActiveVault('gold')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeVault === 'gold'
                        ? 'bg-amber-600 text-white shadow-md'
                        : 'bg-neutral-100 text-[#1d1d1f] hover:bg-neutral-200'
                    }`}
                  >
                    {language === 'ar' ? 'حصالة الذهب' : 'Gold Reserves'}
                  </button>
                  <button
                    onClick={() => setActiveVault('travel')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeVault === 'travel'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-neutral-100 text-[#1d1d1f] hover:bg-neutral-200'
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
                    <h4 className="text-base font-bold text-[#1d1d1f]">{vaults[activeVault].name}</h4>
                  </div>
                  <div className="text-2xl font-black text-[#1d1d1f] tracking-tight">
                    {vaults[activeVault].amount}
                  </div>
                  <p className="text-xs text-[#52525b] leading-relaxed">
                    {vaults[activeVault].desc}
                  </p>
                </div>
              </div>

              {/* 3 Core Pillars of Taht El Balata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-black/[0.06]">
                <div className="p-3.5 rounded-xl bg-neutral-50 border border-black/[0.05] text-start">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1d1d1f] mb-1">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{language === 'ar' ? 'كشف التسريبات الخفية' : 'Leakage Detection'}</span>
                  </div>
                  <div className="text-[11px] text-[#6e6e73]">
                    {language === 'ar'
                      ? 'يكتشف المصاريف الصغيرة اللي بتسرب آلاف الجنيهات شهرياً.'
                      : 'Detects micro-expenses that quietly drain substantial capital each month.'}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-50 border border-black/[0.05] text-start">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1d1d1f] mb-1">
                    <Lock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{language === 'ar' ? 'تشفير محلي بدون بنوك' : 'Offline Bank-Free Security'}</span>
                  </div>
                  <div className="text-[11px] text-[#6e6e73]">
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
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
                >
                  <span>
                    {language === 'ar'
                      ? 'شاهد كيف يرتبط تلقائياً بـ «افتكر» لتنبيهك بالأقساط'
                      : 'See how it pairs with Eftekir for automated bill alerts'}
                  </span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold">
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
