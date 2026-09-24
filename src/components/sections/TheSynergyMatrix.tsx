import { useState, type FC } from 'react';
import {
  Brain,
  ShieldCheck,
  Zap,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Radio,
  FileText,
  Coins,
} from 'lucide-react';
import { useLanguage } from '../../LanguageContext';
import { playAppleClick, playAirDropChime } from '../../utils/soundEffects';

export const TheSynergyMatrix: FC = () => {
  const [activeScenario, setActiveScenario] = useState<number>(0);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const { language, isRTL, t } = useLanguage();

  const scenariosAr = [
    {
      id: '01',
      title: 'قسط السيارة أو الشقة جه ميعاده',
      tag: 'إدارة الالتزامات الكبرى',
      color: 'blue',
      payload: 'أمر حجز قسط دوري: 4,500 ج.م',
      eftekerAction: 'افتكر يرصد تاريخ السداد قبل الموعد بـ 15 يوماً ويرسل تنبيهاً ذكياً هادئاً بدون إزعاج.',
      tahtAction: 'تحت البلاطة يحجز المبلغ تلقائياً من دخل الشهر ويضعه في «خزنة الأقساط» دون المساس بمصاريفك اليومية.',
      result: 'يوم السداد يجي تلاقي الفلوس جاهزة ومدفوعة بلمسة واحدة، وبدون أي ضغط أو زنقة مالية.',
    },
    {
      id: '02',
      title: 'شراء جهاز إلكتروني جديد بضمان 3 سنوات',
      tag: 'حفظ الفواتير والضمانات',
      color: 'indigo',
      payload: 'شهادة ضمان رقمية + مصروف: 12,000 ج.م',
      eftekerAction: 'افتكر يمسح الفاتورة بـ OCR محلي فوري، يستخرج مدة الضمان (3 سنوات)، ويحفظها كجواز رقمي.',
      tahtAction: 'تحت البلاطة يوثق المصروف تلقائياً، ويربط السلعة بـ «خزنة الصيانة الدورية» لاحتساب قيمتها.',
      result: 'فاتورتك موثقة وضمانك في جيبك للأبد، وميزانيتك متزنة ومستقرة بدون أي مفاجآت.',
    },
    {
      id: '03',
      title: 'تجهيزات ومصاريف العيد أو مناسبة عائلية',
      tag: 'التخطيط للأحداث الهامة',
      color: 'emerald',
      payload: 'خطة ادخار تراكمية غير محسوسة',
      eftekerAction: 'افتكر يثبت موعد المناسبة في جدولك الزمني قبلها بـ شهرين كاملين ويحدد الميزانية المقترحة.',
      tahtAction: 'تحت البلاطة يقسم ميزانية المناسبة على أسابيع متباعدة؛ يحوش مبلغاً بسيطاً وغير محسوس كل أسبوع.',
      result: 'يجي وقت العيد وتكون كل المصاريف متغطية ومحجوزة ومبسوط مع أسرتك بدون أي هم.',
    },
    {
      id: '04',
      title: 'إغراء شراء كماليات باهظة مفاجئة',
      tag: 'حماية القرارات المتسرعة',
      color: 'amber',
      payload: 'استعلام حماية أمان مالي (Runway Alert)',
      eftekerAction: 'افتكر يذكرك بلطف بهدفك المالي الأكبر (شراء شقة أو استثمار) اللي سجلته لنفسك مسبقاً.',
      tahtAction: 'تحت البلاطة يوضحلك لحظياً أثر هذا الشراء على نسبة أمانك المالي للأشهر الثلاثة القادمة.',
      result: 'تاخد قرارك بوعي كامل ورضا وراحة ضمير، بدون ندم أو هدر لمدخراتك وشقاك.',
    },
  ];

  const scenariosEn = [
    {
      id: '01',
      title: 'Car or Rent Installment Due',
      tag: 'Major Commitment Handling',
      color: 'blue',
      payload: 'Scheduled Allocation: 4,500 EGP',
      eftekerAction: 'Eftekir detects the due date 15 days ahead and issues a calm, context-aware notification.',
      tahtAction: 'Taht El Balata automatically reserves the installment in your "Obligations Vault" without disrupting daily spending.',
      result: 'Due date arrives with funds fully prepared and settled in one tap, completely stress-free.',
    },
    {
      id: '02',
      title: 'New Appliance & 3-Year Warranty',
      tag: 'Receipt & Warranty Vaulting',
      color: 'indigo',
      payload: 'Digital Warranty Passport + 12,000 EGP',
      eftekerAction: 'Eftekir extracts the receipt via local OCR, tags the 3-year warranty, and preserves it forever.',
      tahtAction: 'Taht El Balata logs the expense and links the item to your maintenance safety reserve.',
      result: 'Your warranty is secured in your pocket forever, and your budget stays completely disciplined.',
    },
    {
      id: '03',
      title: 'Holiday & Family Celebrations Budget',
      tag: 'Milestone Planning',
      color: 'emerald',
      payload: 'Unnoticeable Incremental Micro-Savings',
      eftekerAction: 'Eftekir maps the celebration into your timeline 2 months in advance.',
      tahtAction: 'Taht El Balata distributes the target budget into unnoticeable micro-savings weekly.',
      result: 'Celebration arrives with gifts and expenses fully funded without any financial strain.',
    },
    {
      id: '04',
      title: 'Impulsive High-Ticket Purchase',
      tag: 'Impulse Defense',
      color: 'amber',
      payload: 'Runway Impact Security Query',
      eftekerAction: 'Eftekir gently reminds you of your long-term wealth goal previously saved.',
      tahtAction: 'Taht El Balata visualizes how this purchase would affect your safety runway for the next 3 months.',
      result: 'You make the decision with conscious conviction and peace of mind, without buyer remorse.',
    },
  ];

  const scenarios = language === 'en' ? scenariosEn : scenariosAr;
  const currentScenario = scenarios[activeScenario];

  const handleTriggerSync = () => {
    playAirDropChime();
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2200);
  };

  const handleScenarioChange = (index: number) => {
    setActiveScenario(index);
    playAppleClick();
    handleTriggerSync();
  };

  return (
    <section
      id="synergy-matrix"
      className="py-24 bg-gradient-to-b from-[#fbfbfd] via-[#ffffff] to-[#f4f4f7] dark:from-[#07080a] dark:via-[#0c0d12] dark:to-[#07080a] border-t border-black/[0.04] dark:border-white/[0.04] font-cairo transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ======================================================== */}
        {/* 1. SECTION HEADLINE & EXECUTIVE BADGE */}
        {/* ======================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1d1d1f] dark:bg-white text-white dark:text-black text-xs font-bold shadow-md">
            <Zap className="w-3.5 h-3.5 text-amber-400 dark:text-amber-600" />
            <span>{t.matrixBadge}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1d1d1f] dark:text-[#f5f5f7] tracking-tight leading-tight">
            {t.matrixTitle}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0071e3] via-[#059669] to-[#0071e3]">
              {t.matrixTitleAccent}
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#6e6e73] dark:text-[#a1a1a6] leading-relaxed max-w-2xl mx-auto">
            {t.matrixDesc}
          </p>
        </div>

        {/* ======================================================== */}
        {/* 2. THE UNIFIED MASTER CONSOLE (THE LIVING NERVOUS SYSTEM) */}
        {/* ======================================================== */}
        <div className="apple-card p-6 sm:p-10 md:p-12 relative overflow-hidden bg-white/95 dark:bg-[#121217]/95 border border-black/[0.08] dark:border-white/[0.1] shadow-2xl backdrop-blur-2xl">
          {/* Ambient Diffused Specular Glows */}
          <div className="absolute top-1/4 right-10 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="absolute top-1/4 left-10 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

          {/* Master Telemetry Top Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-6 mb-8 border-b border-black/[0.06] dark:border-white/[0.08]">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
              <div className="text-start">
                <div className="text-xs font-mono font-bold text-[#1d1d1f] dark:text-white tracking-tight">
                  BLOTX SYNERGY ENGINE // PEER-TO-PEER AIRDROP
                </div>
                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  {language === 'ar' ? 'اتصال لاسلكي لحظي مشفر • 0% خوادم خارجية' : 'Encrypted P2P Wireless Stream • Zero External Servers'}
                </div>
              </div>
            </div>

            {/* Quick Trigger Button for AirDrop Pulse Simulation */}
            <button
              type="button"
              onClick={handleTriggerSync}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
                isSyncing
                  ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white scale-105 shadow-md'
                  : 'bg-black/[0.04] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] text-[#1d1d1f] dark:text-white border border-black/[0.06] dark:border-white/[0.08]'
              }`}
            >
              <Radio className={`w-3.5 h-3.5 ${isSyncing ? 'animate-pulse text-amber-300' : 'text-blue-500'}`} />
              <span>{language === 'ar' ? 'محاكاة نبضة المزامنة ✦' : 'Simulate AirDrop Pulse ✦'}</span>
            </button>
          </div>

          {/* ======================================================== */}
          {/* 3. DUAL-NODE LIVING CONDUIT (EFTEKER <-> BRIDGE <-> TAHT) */}
          {/* ======================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-11 gap-6 items-center">
            {/* WING A: «افتكر» (الوعي والصفاء الذهني) */}
            <div className="lg:col-span-5 p-6 rounded-3xl bg-gradient-to-br from-blue-50/80 via-white to-blue-50/30 dark:from-blue-950/30 dark:via-[#161822] dark:to-blue-950/20 border border-blue-200/80 dark:border-blue-800/60 shadow-sm relative group hover:border-blue-400 transition-all text-start">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/25 shrink-0 group-hover:scale-105 transition-transform">
                    <Brain className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 text-[10px] font-mono font-bold">
                      NODE 01 // MIND
                    </span>
                    <h3 className="text-lg font-black text-[#1d1d1f] dark:text-white">
                      {language === 'ar' ? '«افتكر» (Eftekir)' : 'Eftekir Engine'}
                    </h3>
                  </div>
                </div>

                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse shrink-0" />
              </div>

              <p className="text-xs text-[#6e6e73] dark:text-[#a1a1a6] leading-relaxed mb-4">
                {language === 'ar'
                  ? 'العقل الإدراكي الثاني: يلتقط الفواتير والضمانات بكاميرا هاتفك بـ OCR محلي، ويرتب أولوياتك وتواريخك بهدوء تام.'
                  : 'Cognitive Second Brain: Captures receipts and warranties via on-device OCR, organizing deadlines with pristine clarity.'}
              </p>

              {/* Dynamic Live Action in Current Scenario */}
              <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-[#12141c] border border-blue-200/60 dark:border-blue-900/60 shadow-xs">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-600 dark:text-blue-400 mb-1">
                  <FileText className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'إجراء افتكر في هذا الموقف:' : 'Eftekir Action:'}</span>
                </div>
                <div className="text-xs font-semibold text-[#1d1d1f] dark:text-neutral-200 leading-relaxed">
                  {currentScenario.eftekerAction}
                </div>
              </div>
            </div>

            {/* THE LIVING NEXUS (AIRDROP SYNAPSE BRIDGE) */}
            <div className="lg:col-span-1 flex flex-col items-center justify-center py-2 relative">
              {/* Desktop Horizontal Conduit */}
              <div className="hidden lg:flex flex-col items-center gap-2 relative w-full">
                {/* Hairline Energy Conduit */}
                <div className="w-full h-[2px] bg-gradient-to-r from-blue-500 via-emerald-500 to-emerald-600 relative overflow-hidden">
                  {/* Glowing Photon moving back and forth */}
                  <div
                    className={`absolute top-0 bottom-0 w-8 bg-white blur-[2px] shadow-[0_0_8px_#ffffff] ${
                      isSyncing ? 'animate-airdrop-pulse' : 'animate-ping'
                    }`}
                  />
                </div>

                {/* Central AirDrop Medallion */}
                <div
                  onClick={handleTriggerSync}
                  className="w-9 h-9 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center shadow-lg border-2 border-emerald-400/80 cursor-pointer hover:scale-110 active:scale-95 transition-all"
                  title={language === 'ar' ? 'اضغط لإرسال نبضة مزامنة' : 'Trigger Sync Pulse'}
                >
                  <Radio className={`w-4 h-4 ${isSyncing ? 'animate-spin-slow text-emerald-400 dark:text-emerald-600' : ''}`} />
                </div>

                <span className="text-[9px] font-mono font-bold text-[#86868b] uppercase tracking-wider whitespace-nowrap">
                  AIRDROP P2P
                </span>
              </div>

              {/* Mobile Vertical Conduit */}
              <div className="flex lg:hidden items-center justify-center gap-2 py-2">
                <div className="w-8 h-[2px] bg-blue-500" />
                <div
                  onClick={handleTriggerSync}
                  className="p-2 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center gap-1.5 shadow-md border border-emerald-400 cursor-pointer"
                >
                  <Radio className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" />
                  <span className="text-[10px] font-mono font-bold">AIRDROP SYNC</span>
                </div>
                <div className="w-8 h-[2px] bg-emerald-500" />
              </div>
            </div>

            {/* WING B: «تحت البلاطة» (الفعل والأمان المالي) */}
            <div className="lg:col-span-5 p-6 rounded-3xl bg-gradient-to-br from-emerald-50/80 via-white to-emerald-50/30 dark:from-emerald-950/30 dark:via-[#161822] dark:to-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/60 shadow-sm relative group hover:border-emerald-400 transition-all text-start">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/25 shrink-0 group-hover:scale-105 transition-transform">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 text-[10px] font-mono font-bold">
                      NODE 02 // FORTRESS
                    </span>
                    <h3 className="text-lg font-black text-[#1d1d1f] dark:text-white">
                      {language === 'ar' ? '«تحت البلاطة» (Taht El Balata)' : 'Taht El Balata'}
                    </h3>
                  </div>
                </div>

                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              </div>

              <p className="text-xs text-[#6e6e73] dark:text-[#a1a1a6] leading-relaxed mb-4">
                {language === 'ar'
                  ? 'الحصن المالي المبتكر: يقسم أموالك لخزنات ذكية غير قابلة للكسر، ويعزل ميزانياتك والتزاماتك بدون تعقيدات البنوك.'
                  : 'Financial Fortress: Segregates capital into unbreakable smart vaults, isolating liabilities and protecting your hard-earned wealth.'}
              </p>

              {/* Dynamic Live Action in Current Scenario */}
              <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-[#12141c] border border-emerald-200/60 dark:border-emerald-900/60 shadow-xs">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                  <Coins className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'إجراء تحت البلاطة المقابل:' : 'Taht El Balata Action:'}</span>
                </div>
                <div className="text-xs font-semibold text-[#1d1d1f] dark:text-neutral-200 leading-relaxed">
                  {currentScenario.tahtAction}
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Traveling AirDrop Payload Ribbon */}
          <div className="mt-8 p-3 rounded-2xl bg-neutral-100/90 dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1d1d1f] dark:text-neutral-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>{language === 'ar' ? 'البيانات المنقولة لحظياً عبر الأثير:' : 'Data Payload Beamed via AirDrop:'}</span>
            </div>
            <div className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200/60 dark:border-blue-800/60">
              {currentScenario.payload}
            </div>
          </div>

          {/* ======================================================== */}
          {/* 4. REAL-LIFE SCENARIO SELECTOR (CHOOSE A SITUATION) */}
          {/* ======================================================== */}
          <div className="mt-12 pt-8 border-t border-black/[0.06] dark:border-white/[0.08]">
            <div className="text-center max-w-2xl mx-auto mb-6 space-y-1.5">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest font-mono">
                {language === 'ar' ? 'محاكي مواقف الحياة الواقعية' : 'Real-Life Interaction Matrix'}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#1d1d1f] dark:text-white">
                {language === 'ar'
                  ? 'اختر موقفاً يومياً وشوف التنسيق التلقائي بعينك:'
                  : 'Select an everyday scenario to witness seamless synchronization:'}
              </h3>
            </div>

            {/* Scenario Buttons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {scenarios.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleScenarioChange(idx)}
                  className={`p-4 rounded-2xl text-start transition-all flex flex-col justify-between border cursor-pointer group ${
                    activeScenario === idx
                      ? 'bg-[#1d1d1f] dark:bg-white text-white dark:text-black border-transparent shadow-lg scale-[1.02]'
                      : 'bg-white/80 dark:bg-[#161822] text-[#1d1d1f] dark:text-[#f5f5f7] border-black/[0.06] dark:border-white/[0.08] hover:bg-neutral-50 dark:hover:bg-white/[0.05]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          activeScenario === idx
                            ? 'bg-white/20 dark:bg-black/10 text-white dark:text-black'
                            : 'bg-black/[0.05] dark:bg-white/[0.1] text-[#6e6e73] dark:text-neutral-400'
                        }`}
                      >
                        {s.tag}
                      </span>
                      <span className="font-mono text-xs opacity-60">#{s.id}</span>
                    </div>
                    <h4 className="font-bold text-xs sm:text-sm leading-snug">{s.title}</h4>
                  </div>

                  <div
                    className={`mt-4 text-[11px] font-semibold flex items-center gap-1 ${
                      activeScenario === idx ? 'text-amber-300 dark:text-amber-700' : 'text-[#86868b]'
                    }`}
                  >
                    <span>{language === 'ar' ? 'عرض المحاكاة' : 'View Flow'}</span>
                    {isRTL ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  </div>
                </button>
              ))}
            </div>

            {/* The Result Card: Daily Life Impact */}
            <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-blue-500/10 border border-amber-300/40 dark:border-amber-700/30 flex items-start gap-3.5 text-start">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold text-amber-900 dark:text-amber-300">
                  {language === 'ar' ? 'النتيجة العملية في يومك (راحة البال الحقيقية):' : 'Daily Life Outcome (Real Peace of Mind):'}
                </div>
                <p className="text-xs sm:text-sm font-semibold text-[#1d1d1f] dark:text-neutral-100 leading-relaxed">
                  {currentScenario.result}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
