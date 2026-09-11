import { useState, type FC } from 'react';
import { EcosystemSolidCards3D } from '../canvas/EcosystemSolidCards3D';
import { Sparkles, ArrowLeft, ArrowRight, ShieldCheck, Brain, Zap } from 'lucide-react';
import { useLanguage } from '../../LanguageContext';

export const TheSynergyMatrix: FC = () => {
  const [activeScenario, setActiveScenario] = useState<number>(0);
  const { language, isRTL, t } = useLanguage();

  const scenariosAr = [
    {
      id: '01',
      title: 'قسط السيارة أو الشقة جه ميعاده',
      tag: 'إدارة الالتزامات الكبرى',
      color: 'emerald',
      eftekerAction: 'افتكر يرصد تاريخ السداد قبل الموعد بـ 15 يوماً ويرسل تنبيه ذكي هادئ.',
      tahtAction: 'تحت البلاطة يحجز المبلغ تلقائياً من دخل الشهر ويضعه في «خزنة الأقساط» دون المساس بمصاريفك اليومية.',
      result: 'يوم السداد يجي تلاقي الفلوس جاهزة ومدفوعة بلمسة واحدة، وبدون أي ضغط أو زنقة مالية.',
    },
    {
      id: '02',
      title: 'تجهيزات ومصاريف العيد أو مناسبة عائلية',
      tag: 'التخطيط للأحداث الهامة',
      color: 'blue',
      eftekerAction: 'افتكر يسجل المناسبة السعيدة في جدولك الزمني قبلها بـ شهرين كاملين.',
      tahtAction: 'تحت البلاطة يقسم ميزانية المناسبة على أسابيع متباعدة؛ يحوش مبلغ بسيط وغير محسوس كل أسبوع.',
      result: 'يجي وقت العيد وتكون كل المصاريف متغطية ومحجوزة ومبسوط مع أسرتك بدون أي هم.',
    },
    {
      id: '03',
      title: 'قرار شراء جهاز باهظ أو كماليات بالصدفة',
      tag: 'حماية القرارات المتسرعة',
      color: 'amber',
      eftekerAction: 'افتكر يذكرك بلطف بهدفك المالي الأكبر (شراء شقة أو استثمار) اللي سجلته لنفسك مسبقاً.',
      tahtAction: 'تحت البلاطة يوضحلك أثر هذا الشراء على نسبة أمانك المالي للأشهر الثلاثة القادمة.',
      result: 'تاخد قرارك بوعي كامل ورضا وراحة ضمير، بدون ندم أو هدر لمدخراتك.',
    },
  ];

  const scenariosEn = [
    {
      id: '01',
      title: 'Car or Rent Installment Due',
      tag: 'Major Commitment Handling',
      color: 'emerald',
      eftekerAction: 'Eftekir detects the due date 15 days ahead and issues a calm, context-aware notification.',
      tahtAction: 'Taht El Balata automatically reserves the installment in your "Obligations Vault" without disrupting daily spending.',
      result: 'Due date arrives with funds fully prepared and settled in one tap, completely stress-free.',
    },
    {
      id: '02',
      title: 'Holiday & Family Celebrations Budget',
      tag: 'Milestone Planning',
      color: 'blue',
      eftekerAction: 'Eftekir maps the celebration into your timeline 2 months in advance.',
      tahtAction: 'Taht El Balata distributes the target budget into unnoticeable micro-savings weekly.',
      result: 'Celebration arrives with gifts and expenses fully funded without any financial strain.',
    },
    {
      id: '03',
      title: 'Impulsive High-Ticket Purchase Opportunity',
      tag: 'Impulse Defense',
      color: 'amber',
      eftekerAction: 'Eftekir gently reminds you of your long-term wealth goal previously saved.',
      tahtAction: 'Taht El Balata visualizes how this purchase would affect your safety runway for the next 3 months.',
      result: 'You make the decision with conscious conviction and peace of mind.',
    },
  ];

  const scenarios = language === 'en' ? scenariosEn : scenariosAr;

  return (
    <section id="synergy-matrix" className="py-24 bg-[#fbfbfd] border-t border-black/[0.04] font-cairo">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1d1d1f] text-white text-xs font-bold shadow-md">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.matrixBadge}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1d1d1f] tracking-tight leading-tight">
            {t.matrixTitle}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#059669] via-[#0071e3] to-[#059669]">
              {t.matrixTitleAccent}
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#6e6e73] leading-relaxed">
            {t.matrixDesc}
          </p>
        </div>

        {/* 3D Solid Cards Showcase */}
        <div className="mb-16">
          <EcosystemSolidCards3D />
        </div>

        {/* Interactive Life Scenario Simulator */}
        <div className="apple-card p-6 sm:p-10 bg-white border border-black/[0.08] shadow-xl">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <span className="text-xs font-bold text-[#0071e3] uppercase tracking-widest">
              {language === 'ar' ? 'محاكي مواقف الحياة الحقيقية' : 'Real-Life Scenarios Simulator'}
            </span>
            <h3 className="text-2xl font-bold text-[#1d1d1f]">
              {language === 'ar'
                ? 'اختر موقفاً يومياً وشوف كيف يتصرف الإيكوسيستم:'
                : 'Choose a daily scenario to see how the ecosystem coordinates:'}
            </h3>
          </div>

          {/* Scenario Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
            {scenarios.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setActiveScenario(idx)}
                className={`p-4 rounded-2xl text-start transition-all flex flex-col justify-between border cursor-pointer ${
                  activeScenario === idx
                    ? 'bg-[#1d1d1f] text-white border-black shadow-lg scale-[1.02]'
                    : 'bg-neutral-50 text-[#1d1d1f] border-black/[0.06] hover:bg-neutral-100'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        activeScenario === idx
                          ? 'bg-white/20 text-white'
                          : 'bg-black/[0.06] text-[#6e6e73]'
                      }`}
                    >
                      {s.tag}
                    </span>
                    <span className="font-mono text-xs opacity-60">#{s.id}</span>
                  </div>
                  <h4 className="font-bold text-sm leading-snug">{s.title}</h4>
                </div>
                <div
                  className={`mt-4 text-[11px] font-semibold flex items-center gap-1 ${
                    activeScenario === idx ? 'text-amber-300' : 'text-[#6e6e73]'
                  }`}
                >
                  <span>{language === 'ar' ? 'عرض المحاكاة' : 'View Simulation'}</span>
                  {isRTL ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </div>
              </button>
            ))}
          </div>

          {/* Detailed Step-by-Step Flow for the Active Scenario */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-neutral-50 via-white to-blue-50/30 border border-black/[0.06] space-y-6">
            <div className="flex items-center justify-between border-b border-black/[0.06] pb-4">
              <span className="text-xs font-bold text-[#86868b]">
                {language === 'ar' ? 'سيناريو المحاكاة النشط' : 'Active Scenario'}
              </span>
              <h4 className="text-lg font-bold text-[#1d1d1f]">
                {scenarios[activeScenario].title}
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-start">
              {/* Step 1: افتكر */}
              <div className="p-5 rounded-xl bg-blue-50/70 border border-blue-100/80 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-700">
                  <Brain className="w-4 h-4" />
                  <span>{language === 'ar' ? 'دور تطبيق «افتكر»' : 'Eftekir Role'}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#1e293b] leading-relaxed">
                  {scenarios[activeScenario].eftekerAction}
                </p>
              </div>

              {/* Step 2: تحت البلاطة */}
              <div className="p-5 rounded-xl bg-emerald-50/70 border border-emerald-100/80 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{language === 'ar' ? 'دور تطبيق «تحت البلاطة»' : 'Taht El Balata Role'}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#064e3b] leading-relaxed">
                  {scenarios[activeScenario].tahtAction}
                </p>
              </div>

              {/* Step 3: النتيجة لأسلوب حياتك */}
              <div className="p-5 rounded-xl bg-amber-50/70 border border-amber-100/80 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-800">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>{language === 'ar' ? 'النتيجة في يومك' : 'Daily Life Impact'}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#78350f] leading-relaxed font-semibold">
                  {scenarios[activeScenario].result}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
