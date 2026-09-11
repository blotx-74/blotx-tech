import { useState, type FC } from 'react';
import {
  HeartHandshake,
  Cpu,
  Compass,
  Sparkles,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { playAppleClick } from '../../utils/soundEffects';
import { useLanguage } from '../../LanguageContext';

export const PhilosophyManifesto: FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [selectedChallenge, setSelectedChallenge] = useState<number>(0);
  const { language, isRTL, t } = useLanguage();

  const pillarsAr = [
    {
      id: '01',
      title: 'رصد ما ينقص الناس بعين إنسانية حقيقية',
      subtitle: 'The Human Empathy Engine',
      icon: HeartHandshake,
      color: 'emerald',
      quote: '«البرمجة مش كود بيتكتب في برج عاجي؛ البرمجة هي إنك تنزل وسط الناس وتشوف إيه اللي كاسر خاطرهم أو مسبب لهم قلق، وتحله لهم بكل هدوء وأمانة.»',
      body: 'تأسست Blotx Tech بعد ملاحظة أزمة حقيقية في تفاصيل الحياة اليومية: الناس بتشتغل وتشقى، لكن الفلوس بتتسرب في مصاريف خفية، والعقول مجهدة بآلاف الالتزامات والمواعيد اللي بتتحول لضغط نفسي مزمن. صممنا «تحت البلاطة» و«افتكر» ليكونا درع أمان حقيقي وسند لكل بيت.',
      badge: 'فلسفة المنشأ',
    },
    {
      id: '02',
      title: 'دقة صناعية وتكتيكس هندسية صارمة',
      subtitle: 'Industrial Software Precision',
      icon: Cpu,
      color: 'blue',
      quote: '«بنعامل السوفتوير كأنه قطعة هاردوير دقيقة أو ساعة سويسرية ميكانيكية؛ كل ترس محسوب بالمللي، وكل بايت مشفر لحمايتك.»',
      body: 'في Blotx Tech نرفض الاعتماد على خوارزميات الذكاء الاصطناعي التجارية الرخيصة التي تبيع بيانات المستخدمين أو تستهلك بطارياتهم. كل سطر برمجي في Blotx Stack مبني ليعمل محلياً على جهازك بسرعة البرق (Zero Latency) وبأعلى معايير التشفير العسكري المستقل.',
      badge: 'المعيار الهندسي',
    },
    {
      id: '03',
      title: 'أسلوب حياة متكامل لا يفرض نفسه',
      subtitle: 'The Ambient Lifestyle',
      icon: Compass,
      color: 'amber',
      quote: '«التكنولوجيا العظيمة مش هي اللي تشد عينك للشاشة 24 ساعة؛ هي اللي تحميك في الخلفية وتخليك تعيش حياتك الحقيقية براحة بال.»',
      body: 'Blotx Tech ليست مجرد تطبيقات منعزلة، بل منظومة أسلوب حياة هادئة (Ambient Ecosystem). «تحت البلاطة» يحمي قرشك و«افتكر» يصفي ذهنك، ويتحدثان معاً في صمت ليوفروا عليك آلاف القرارات المتعبة يومياً.',
      badge: 'الهدف النهائي',
    },
  ];

  const pillarsEn = [
    {
      id: '01',
      title: 'Perceiving Human Need Through Empathy',
      subtitle: 'The Human Empathy Engine',
      icon: HeartHandshake,
      color: 'emerald',
      quote: '"Great engineering is not built from an ivory tower; it begins by standing beside real people, observing what causes them distress, and solving it with dignity."',
      body: 'Blotx Tech was born from observing genuine challenges in daily living: people work diligently, yet money slips away in obscure expenses, while human attention is weighed down by unending obligations. We built Taht El Balata and Eftekir to be a dependable fortress and calm second brain.',
      badge: 'Genesis Philosophy',
    },
    {
      id: '02',
      title: 'Industrial Precision & Pure Engineering',
      subtitle: 'Industrial Software Precision',
      icon: Cpu,
      color: 'blue',
      quote: '"We treat software like mechanical horology; every gear calculated to perfection, and every byte securely encrypted on-device."',
      body: 'At Blotx Tech, we reject intrusive surveillance models that monetize user privacy. Every line in the Blotx Stack is engineered to execute offline on your device with lightning speed, zero latency, and uncompromising local security.',
      badge: 'Engineering Standard',
    },
    {
      id: '03',
      title: 'An Ambient Lifestyle That Serves in Silence',
      subtitle: 'The Ambient Lifestyle',
      icon: Compass,
      color: 'amber',
      quote: '"Remarkable technology doesn’t trap your eyes on a screen; it shields you silently in the background so you can live fully."',
      body: 'Blotx Tech is not just standalone apps, but a unified ambient ecosystem. Taht El Balata secures your finances while Eftekir cleanses cognitive clutter, quietly coordinating to liberate your daily mental energy.',
      badge: 'Ultimate Purpose',
    },
  ];

  const challengesAr = [
    {
      problem: 'زنقة آخر الشهر والفلوس اللي بتتسرب بدون ما تحس',
      impact: 'قلق دائم وضياع خطط المستقبل والمدخرات.',
      solution: 'خزنات عزل الأموال الذكية في «تحت البلاطة» تكشف التسريبات وتحجز قرشك الأبيض قبل ما يتصرف.',
      app: 'تحت البلاطة',
      appColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
    {
      problem: 'تزاحم المواعيد والأقساط والأفكار في الدماغ والنسيان المتكرر',
      impact: 'إجهاد ذهني، غرامات تأخير، وإحساس بالفوضى.',
      solution: 'كبسولة «افتكر» تلتقط الفكرة في ثانية وترتب جدولك بذكاء هادئ يصفّي ذهنك 100%.',
      app: 'افتكر',
      appColor: 'text-blue-700 bg-blue-50 border-blue-200',
    },
    {
      problem: 'التشتت بين عشرات التطبيقات المعقدة التي لا تتفاهم',
      impact: 'إهدار الوقت وتكرار إدخال البيانات دون فائدة.',
      solution: 'نواة «Blotx Stack» تربط التطبيقين معاً؛ ميعاد القسط في افتكر يُحجز ماله تلقائياً في البلاطة.',
      app: 'Blotx Stack',
      appColor: 'text-neutral-900 bg-neutral-100 border-neutral-300',
    },
    {
      problem: 'الخوف من تسريب البيانات المالية والشخصية لشركات الإعلانات',
      impact: 'فقدان الثقة والخصوصية والإزعاج المستمر.',
      solution: 'معمارية تشفير محلي صارمة 100% داخل هاتفك؛ لا خوادم تتجسس عليك ولا إعلانات.',
      app: 'أمان Blotx',
      appColor: 'text-purple-700 bg-purple-50 border-purple-200',
    },
  ];

  const challengesEn = [
    {
      problem: 'Month-end financial squeeze and undetected micro-leaks',
      impact: 'Constant anxiety and derailed savings targets.',
      solution: 'Compartmentalized smart vaults in Taht El Balata quarantine funds before they leak into trivial spending.',
      app: 'Taht El Balata',
      appColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
    {
      problem: 'Overwhelmed mental memory and recurring forgetfulness',
      impact: 'Cognitive burnout, late penalties, and everyday chaos.',
      solution: 'Eftekir capture capsules record thoughts in a second, restoring 100% mental clarity.',
      app: 'Eftekir',
      appColor: 'text-blue-700 bg-blue-50 border-blue-200',
    },
    {
      problem: 'Tool fragmentation across dozens of isolated apps',
      impact: 'Wasted time and redundant manual data entry.',
      solution: 'Blotx Stack kernel unifies both apps: an installment logged in Eftekir is immediately backed in Taht El Balata.',
      app: 'Blotx Stack',
      appColor: 'text-neutral-900 bg-neutral-100 border-neutral-300',
    },
    {
      problem: 'Surveillance anxiety and personal data extraction',
      impact: 'Loss of privacy and intrusive targeted advertising.',
      solution: 'Rigorous 100% on-device cryptography: zero ads, zero telemetry, zero surveillance.',
      app: 'Blotx Security',
      appColor: 'text-purple-700 bg-purple-50 border-purple-200',
    },
  ];

  const pillars = language === 'en' ? pillarsEn : pillarsAr;
  const challenges = language === 'en' ? challengesEn : challengesAr;

  return (
    <section id="philosophy" className="py-24 bg-white border-t border-black/[0.04] font-cairo">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100 text-[#1d1d1f] text-xs font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#0071e3]" />
            <span>{t.philosophyBadge}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1d1d1f] tracking-tight leading-tight">
            {t.philosophyTitle}
          </h2>

          <p className="text-base sm:text-lg text-[#6e6e73] leading-relaxed">
            {t.philosophyDesc}
          </p>
        </div>

        {/* 3 Pillars Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isSelected = activeTab === idx;

            return (
              <button
                key={pillar.id}
                type="button"
                onClick={() => {
                  playAppleClick();
                  setActiveTab(idx);
                }}
                className={`p-6 rounded-3xl text-right transition-all border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#1d1d1f] text-white border-black shadow-xl scale-[1.02]'
                    : 'bg-neutral-50 text-[#1d1d1f] border-black/[0.06] hover:bg-neutral-100'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-[11px] font-bold px-3 py-1 rounded-full ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-black/[0.06] text-[#6e6e73]'
                      }`}
                    >
                      {pillar.badge}
                    </span>
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold ${
                        isSelected ? 'bg-white/10 text-white' : 'bg-white text-[#1d1d1f] shadow-xs'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-black text-lg leading-snug mb-1">{pillar.title}</h3>
                  <div
                    className={`text-xs font-medium font-mono ${
                      isSelected ? 'text-amber-300' : 'text-[#86868b]'
                    }`}
                  >
                    {pillar.subtitle}
                  </div>
                </div>

                <div
                  className={`mt-6 text-xs font-bold flex items-center gap-1.5 ${
                    isSelected ? 'text-white' : 'text-[#0071e3]'
                  }`}
                >
                  <span>{language === 'ar' ? 'استكشف المبدأ' : 'Explore Principle'}</span>
                  {isRTL ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Selected Pillar Card */}
        <div className="apple-card p-8 sm:p-12 bg-gradient-to-br from-neutral-50 via-white to-neutral-50 border border-black/[0.08] shadow-2xl mb-16 text-start space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/[0.06] pb-6">
            <span className="text-xs font-mono font-bold text-[#86868b]">
              MANIFESTO PILLAR #{pillars[activeTab].id}
            </span>
            <h4 className="text-2xl sm:text-3xl font-black text-[#1d1d1f]">
              {pillars[activeTab].title}
            </h4>
          </div>

          <blockquote className="p-6 rounded-2xl bg-white border border-black/[0.06] text-base sm:text-lg text-[#1d1d1f] font-semibold leading-relaxed shadow-xs">
            {pillars[activeTab].quote}
          </blockquote>

          <p className="text-sm sm:text-base text-[#52525b] leading-relaxed">
            {pillars[activeTab].body}
          </p>
        </div>

        {/* Interactive "Human Need vs Blotx Solution" Matrix */}
        <div className="apple-card p-8 sm:p-12 bg-white border border-black/[0.08] shadow-xl text-start space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#0071e3] uppercase tracking-widest">
              {language === 'ar' ? 'المعادلة الواقعية • The Real-World Bridge' : 'The Real-World Bridge'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#1d1d1f]">
              {language === 'ar'
                ? 'ماذا ينقصك في الحياة؟ وكيف نصنعه لك؟'
                : 'What is missing in daily life? And how do we build it?'}
            </h3>
            <p className="text-xs sm:text-sm text-[#6e6e73]">
              {language === 'ar'
                ? 'اختر أحد التحديات اليومية الشائعة لتكتشف فلسفة علاج Blotx Tech لها:'
                : 'Select a common daily challenge to explore how Blotx Tech addresses it:'}
            </p>
          </div>

          {/* Challenge Selector */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {challenges.map((c, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  playAppleClick();
                  setSelectedChallenge(i);
                }}
                className={`p-4 rounded-2xl text-start transition-all border flex flex-col justify-between cursor-pointer ${
                  selectedChallenge === i
                    ? 'bg-[#1d1d1f] text-white border-black shadow-lg scale-105'
                    : 'bg-neutral-50 text-[#1d1d1f] border-black/[0.06] hover:bg-neutral-100'
                }`}
              >
                <div className="text-xs font-bold leading-snug mb-3">{c.problem}</div>
                <div
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block w-fit ${
                    selectedChallenge === i ? 'bg-white/20 text-white' : 'bg-black/[0.05] text-[#6e6e73]'
                  }`}
                >
                  {language === 'ar' ? `الحل عبر: ${c.app}` : `Solved by: ${c.app}`}
                </div>
              </button>
            ))}
          </div>

          {/* Solution Highlight Box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-neutral-50 via-white to-blue-50/20 border border-black/[0.06] grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-3">
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full border ${challenges[selectedChallenge].appColor}`}
                >
                  {language === 'ar' ? `محرك المعالجة: ${challenges[selectedChallenge].app}` : `Engine: ${challenges[selectedChallenge].app}`}
                </span>
                <span className="text-xs text-[#86868b]">
                  {language === 'ar' ? 'استجابة Blotx الهندسية' : 'Blotx Architectural Response'}
                </span>
              </div>
              <h4 className="text-xl font-bold text-[#1d1d1f]">
                {challenges[selectedChallenge].problem}
              </h4>
              <p className="text-sm text-[#52525b] leading-relaxed">
                {challenges[selectedChallenge].solution}
              </p>
            </div>

            <div className="md:col-span-4 p-5 rounded-2xl bg-white border border-black/[0.06] shadow-xs space-y-2 text-start">
              <div className="text-xs font-bold text-red-600">
                {language === 'ar' ? 'الأثر السلبي المعتاد:' : 'Common Pain Point:'}
              </div>
              <p className="text-xs text-[#6e6e73] leading-relaxed">
                {challenges[selectedChallenge].impact}
              </p>
              <div className="pt-2 border-t border-black/[0.06] text-xs font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'تم حلها بالكامل في الإيكوسيستم' : 'Fully resolved in ecosystem'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
