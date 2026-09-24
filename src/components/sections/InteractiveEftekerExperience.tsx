import { useState, useEffect, type FC } from 'react';
import { Brain, Sparkles, CheckCircle2, ArrowUpRight, BellRing, Heart, Smile } from 'lucide-react';
import { useLanguage } from '../../LanguageContext';

export const InteractiveEftekerExperience: FC = () => {
  const { language, t } = useLanguage();

  const defaultThoughtsAr = [
    'سداد قسط السيارة الشهري (محجوز في تحت البلاطة)',
    'تجديد اشتراك الإنترنت المنزلي',
  ];
  const defaultThoughtsEn = [
    'Monthly car installment (Reserved in Taht El Balata)',
    'Home fiber internet subscription renewal',
  ];

  const defaultBubblesAr = [
    'شراء هدية عيد ميلاد الوالدة 🎁',
    'فكرة اختراع جديد لمعمل Blotx 💡',
    'موعد فحص الأسنان الدوري 🦷',
  ];
  const defaultBubblesEn = [
    "Mom's birthday surprise gift 🎁",
    'New prototype concept for Blotx Lab 💡',
    'Routine dental health check 🦷',
  ];

  const [capturedThoughts, setCapturedThoughts] = useState<string[]>(
    language === 'en' ? defaultThoughtsEn : defaultThoughtsAr
  );

  const [availableBubbles, setAvailableBubbles] = useState<string[]>(
    language === 'en' ? defaultBubblesEn : defaultBubblesAr
  );

  useEffect(() => {
    setCapturedThoughts(language === 'en' ? defaultThoughtsEn : defaultThoughtsAr);
    setAvailableBubbles(language === 'en' ? defaultBubblesEn : defaultBubblesAr);
  }, [language]);

  const handleCapture = (thought: string) => {
    setCapturedThoughts([thought, ...capturedThoughts]);
    setAvailableBubbles(availableBubbles.filter((t) => t !== thought));
  };

  const clarityPercent = Math.min(
    100,
    Math.round((capturedThoughts.length / (capturedThoughts.length + availableBubbles.length)) * 100)
  );

  return (
    <section id="efteker-experience" className="py-24 bg-gradient-to-b from-[#ffffff] via-[#eff6ff]/30 to-[#f4f4f7] dark:from-[#050608] dark:via-[#08101e] dark:to-[#0a0c10] border-t border-black/[0.04] dark:border-white/10 overflow-hidden font-cairo transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-950/70 border border-blue-300/60 dark:border-blue-700/50 text-blue-800 dark:text-blue-300 text-xs font-bold shadow-xs">
            <Brain className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>{t.eftekerExpBadge}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1d1d1f] dark:text-white tracking-tight leading-tight">
            {t.eftekerExpTitle} <span className="text-[#2563eb] dark:text-blue-400">{t.eftekerExpTitleAccent}</span>
          </h2>

          <p className="text-base sm:text-xl text-[#6e6e73] dark:text-[#98989f] leading-relaxed">
            {t.eftekerExpDesc}
          </p>
        </div>

        {/* The Interactive Mind Decluttering Showcase */}
        <div className="apple-card p-6 sm:p-12 bg-white/90 dark:bg-[#11141c]/90 border border-blue-100 dark:border-blue-500/20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100/40 dark:bg-blue-950/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Col: Interactive Thought Capture Box */}
            <div className="lg:col-span-6 space-y-6 text-start order-2 lg:order-1">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                  APP HIGHLIGHT 02
                </span>
                <div className="w-8 h-[2px] bg-blue-500" />
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-[#1d1d1f] dark:text-white tracking-tight">
                {t.eftekerTryTitle}
              </h3>

              <p className="text-base text-[#6e6e73] dark:text-[#98989f] leading-relaxed">
                {language === 'ar'
                  ? 'اضغط على أي فكرة من اللي طايرين فوق دماغك وشوف إزاي بتتنظم فوراً في كبسولة «افتكر»، وشوف مؤشر الصفاء الذهني وهو بيزيد:'
                  : 'Click on any floating thought bubble to capture it inside Eftekir, and watch your Mental Clarity index rise:'}
              </p>

              {/* Floating Thoughts to capture */}
              {availableBubbles.length > 0 ? (
                <div className="space-y-2">
                  <div className="text-xs font-bold text-[#1d1d1f] dark:text-white flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>
                      {language === 'ar'
                        ? 'أفكار والتزامات مبعثرة (اضغط عليها لالتقاطها):'
                        : 'Unresolved thoughts (click to capture):'}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {availableBubbles.map((bubble, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleCapture(bubble)}
                        className="px-3.5 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-950/60 border border-amber-200/80 dark:border-amber-800/50 text-xs font-bold text-amber-900 dark:text-amber-300 shadow-xs hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>＋ {bubble}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <Smile className="w-4 h-4" />
                  <span>
                    {language === 'ar'
                      ? 'عظيم! كل أفكارك تم التقاطها والذهن في حالة صفاء 100%.'
                      : 'Brilliant! All thoughts captured; your mind has reached 100% clarity.'}
                  </span>
                </div>
              )}

              {/* Mental Clarity Progress Indicator */}
              <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-[#15171e] border border-black/[0.06] dark:border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold">
                  <div className="flex items-center gap-1.5 text-[#1d1d1f] dark:text-white">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>{t.eftekerClarityMeter}</span>
                  </div>
                  <span className="text-blue-600 dark:text-blue-400 font-mono text-sm">{clarityPercent}%</span>
                </div>
                <div className="w-full h-2.5 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${clarityPercent}%` }}
                  />
                </div>
                <div className="text-[11px] text-[#6e6e73] dark:text-[#98989f]">
                  {clarityPercent === 100
                    ? (language === 'ar'
                        ? 'أنت الآن في أعلى درجات التركيز، لا توجد أي التزامات معلقة.'
                        : 'Peak cognitive focus reached: zero pending cognitive clutter.')
                    : (language === 'ar'
                        ? 'التقط باقي الأفكار للوصول لصفاء ذهني تام.'
                        : 'Capture the remaining thoughts to reach complete serenity.')}
                </div>
              </div>

              {/* Captured items list */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-[#1d1d1f] dark:text-white">
                  {language === 'ar' ? 'المحفوظات داخل كبسولة «افتكر»:' : 'Secured inside Eftekir Vault:'}
                </div>
                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {capturedThoughts.map((c, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-white dark:bg-[#15171e] border border-blue-100 dark:border-white/10 shadow-xs flex items-center justify-between text-xs"
                    >
                      <span className="font-semibold text-[#1d1d1f] dark:text-white">{c}</span>
                      <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/50 dark:border-blue-800/40 shrink-0">
                        {language === 'ar' ? 'مأمنة ومجدولة ✓' : 'Protected ✓'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Link to Symbiosis */}
              <div className="pt-2 flex items-center justify-between">
                <a
                  href="#synergy-matrix"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline cursor-pointer"
                >
                  <span>
                    {language === 'ar'
                      ? 'شاهد كيف يرتبط تلقائياً بـ «تحت البلاطة» لحجز الميزانيات'
                      : 'See how it pairs with Taht El Balata to allocate budgets'}
                  </span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'تزامن هادئ ومريح' : 'Calm, effortless sync'}</span>
                </div>
              </div>
            </div>

            {/* Right Col: The Real Efteker App 3D Logo in Luxury Framing */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center text-center order-1 lg:order-2">
              <div className="relative group">
                {/* Soft Backing Glow */}
                <div className="absolute -inset-6 rounded-3xl bg-blue-400/20 blur-2xl group-hover:bg-blue-400/30 transition-colors" />

                {/* The Isolated Official Logo with pristine squircle */}
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl p-4 bg-white/80 dark:bg-[#15171e]/90 backdrop-blur-md border border-blue-100 dark:border-blue-500/30 shadow-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                  <img
                    src="/assets/logos/efteker-logo.png"
                    alt="لوجو افتكر الرسمي"
                    className="w-full h-full object-contain drop-shadow-xl"
                  />
                </div>

                {/* Dynamic Floating Badges */}
                <div className="absolute -top-3 -right-3 px-3.5 py-1.5 rounded-full bg-blue-600 text-white text-xs font-bold shadow-lg flex items-center gap-1.5 animate-pulse">
                  <BellRing className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'تنبيهات استباقية' : 'Proactive Prompts'}</span>
                </div>

                <div className="absolute -bottom-3 -left-3 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#1c1f2a] text-[#1d1d1f] dark:text-white border border-black/[0.08] dark:border-white/10 text-xs font-bold shadow-lg flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-red-500" />
                  <span>{language === 'ar' ? 'راحة بال تامة' : 'Total Peace of Mind'}</span>
                </div>
              </div>

              <div className="mt-8 text-xs text-[#6e6e73] dark:text-[#98989f] font-medium">
                {language === 'ar'
                  ? '«افتكر» • خزانة ذكرياتك، فواتيرك، ومواعيدك في مكان واحد فائق الهدوء'
                  : '«Eftekir» • Your vault for memories, receipts, and obligations in absolute peace'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
