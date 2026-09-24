import { useState, type FC } from 'react';
import { ShieldCheck, Sparkles, TrendingUp, Calendar } from 'lucide-react';
import { useLanguage } from '../../LanguageContext';

export const SavingsCalculator: FC = () => {
  const [income, setIncome] = useState<number>(25000);
  const [savingsRate, setSavingsRate] = useState<number>(20);
  const { language, t } = useLanguage();

  const monthlySaved = Math.round((income * savingsRate) / 100);
  const yearlySaved = monthlySaved * 12;
  const emergencyMonths = Math.round(yearlySaved / (income * 0.7));

  const formatNum = (num: number) =>
    language === 'en' ? num.toLocaleString('en-US') : num.toLocaleString('ar-EG');

  return (
    <section id="calculator" className="py-24 bg-gradient-to-b from-[#fbfbfd] via-[#f0fdf4]/50 to-[#fbfbfd] dark:from-[#07080a] dark:via-[#091510] dark:to-[#07080a] border-t border-black/[0.04] dark:border-white/10 font-cairo transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-700/50 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{t.calcBadge}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#1d1d1f] dark:text-white tracking-tight">
            {t.calcTitle1} <span className="text-[#059669] dark:text-emerald-400">{t.calcTitle2}</span>
          </h2>

          <p className="text-base sm:text-lg text-[#6e6e73] dark:text-[#98989f]">
            {t.calcDesc}
          </p>
        </div>

        {/* The Interactive Calculator Card */}
        <div className="apple-card p-6 sm:p-12 bg-white/95 dark:bg-[#11141c]/90 border border-emerald-100 dark:border-emerald-500/20 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Controls Col */}
            <div className="lg:col-span-7 space-y-8 text-start">
              {/* Income Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-black text-emerald-700 dark:text-emerald-400 font-cairo">
                    {formatNum(income)} {t.currency}
                  </span>
                  <label className="text-sm font-bold text-[#1d1d1f] dark:text-white">
                    {t.incomeLabel}
                  </label>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="150000"
                  step="1000"
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value))}
                  className="w-full h-2.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#059669]"
                />
                <div className="flex justify-between text-[11px] text-[#86868b] dark:text-[#98989f] font-medium">
                  <span>{formatNum(150000)} {t.currency}</span>
                  <span>{formatNum(75000)} {t.currency}</span>
                  <span>{formatNum(5000)} {t.currency}</span>
                </div>
              </div>

              {/* Savings Rate Buttons */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#059669] dark:text-emerald-400">
                    {savingsRate}% {language === 'ar' ? 'من الدخل' : 'of income'}
                  </span>
                  <label className="text-sm font-bold text-[#1d1d1f] dark:text-white">
                    {t.savingsRateLabel}
                  </label>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[10, 20, 30, 40].map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => setSavingsRate(rate)}
                      className={`py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                        savingsRate === rate
                          ? 'bg-[#059669] text-white border-[#059669] shadow-md scale-105'
                          : 'bg-neutral-50 dark:bg-[#15171e] text-[#1d1d1f] dark:text-white border-black/[0.06] dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-[#1d2029]'
                      }`}
                    >
                      {rate}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Automatic Connection with Efteker */}
              <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-800/40 flex items-start gap-3">
                <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div className="text-start">
                  <div className="text-xs font-bold text-blue-900 dark:text-blue-200">
                    {language === 'ar' ? 'الربط الذكي مع تطبيق «افتكر»:' : 'Smart Integration with Eftekir:'}
                  </div>
                  <div className="text-[12px] text-blue-800 dark:text-blue-300 mt-0.5 leading-relaxed">
                    {language === 'ar' ? (
                      <>
                        تلقائياً، افتكر هيفكرك يوم 1 في الشهر بحجز مبلغ{' '}
                        <strong className="font-bold text-emerald-600 dark:text-emerald-400">{formatNum(monthlySaved)} {t.currency}</strong> أول ما
                        المرتب ينزل، قبل ما تصرفه في حاجات فرعية وتندم عليها.
                      </>
                    ) : (
                      <>
                        Automatically, Eftekir will remind you on the 1st of each month to set aside{' '}
                        <strong className="font-bold text-emerald-600 dark:text-emerald-400">{formatNum(monthlySaved)} {t.currency}</strong> as soon as income arrives, guarding your capital against impulsive leaks.
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Results Col (Visual Counter) */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-4 text-center p-6 sm:p-8 bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white rounded-3xl shadow-2xl">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center mx-auto text-emerald-400">
                <ShieldCheck className="w-6 h-6" />
              </div>

              <div>
                <span className="text-xs text-neutral-400 font-bold block mb-1">
                  {t.yearlySave}
                </span>
                <div className="text-3xl sm:text-5xl font-black text-emerald-400 tracking-tight">
                  {formatNum(yearlySaved)}{' '}
                  <span className="text-lg font-normal text-white">{t.currency}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800/80 space-y-3 text-xs text-neutral-300">
                <div className="flex items-center justify-between">
                  <span>{t.monthlySave}</span>
                  <span className="text-emerald-400 font-bold">
                    {formatNum(monthlySaved)} {t.currency}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span>{t.emergencyMonthsCovered}</span>
                  <span className="text-amber-400 font-bold">
                    {emergencyMonths} {t.monthsCount}
                  </span>
                </div>
              </div>

              <div className="pt-3">
                <a
                  href="#taht-experience"
                  className="apple-pill-btn w-full py-3 bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>{language === 'ar' ? 'ابدأ تأمين مدخراتك الآن' : 'Start Fortifying Your Savings'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
