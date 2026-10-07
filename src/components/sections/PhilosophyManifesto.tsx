import { type FC } from 'react';
import {
  HeartHandshake,
  Cpu,
  Compass,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { useLanguage } from '../../LanguageContext';

export const PhilosophyManifesto: FC = () => {
  const { language, t } = useLanguage();

  const pillarsAr = [
    {
      id: '01',
      title: 'حلول نابعة من حياتنا اليومية',
      subtitle: 'The Human Empathy',
      icon: HeartHandshake,
      color: 'emerald',
      quote: '«البرمجة مش كود بيتكتب في برج عاجي؛ هي إنك تشوف إيه اللي مسبب قلق للناس وتحله بكل بساطة وأمانة.»',
      body: 'الناس بتشتغل وتشقى، لكن الفلوس بتتسرب في مصاريف خفية، والمواعيد بتتزاحم في الدماغ. صممنا «تحت البلاطة» و«افتكر» علشان يكونوا سند حقيقي لراحة بالك.',
      badge: 'فلسفة المنشأ',
    },
    {
      id: '02',
      title: 'دقة هندسية وأمان محلي 100%',
      subtitle: 'Software Precision',
      icon: Cpu,
      color: 'blue',
      quote: '«بنعامل السوفتوير كأنه ساعة سويسرية ميكانيكية؛ كل بايت محسوب، وكل حاجة مشفرة على جهازك أنت وبس.»',
      body: 'بنرفض بيع بيانات المستخدمين أو استنزاف بطارياتهم. كل سطر برمجي معمول يشتغل أوفلاين بسرعة البرق وبدون أي خوادم خارجية تتجسس عليك.',
      badge: 'المعيار الهندسي',
    },
    {
      id: '03',
      title: 'تكنولوجيا هادية تخدمك في صمت',
      subtitle: 'Ambient Lifestyle',
      icon: Compass,
      color: 'amber',
      quote: '«التكنولوجيا الشاطرة مش اللي تسحبك للشاشة 24 ساعة؛ هي اللي تحميك في الخلفية وتخليك تعيش حياتك براحتك.»',
      body: '«تحت البلاطة» يحفظ قرشك و«افتكر» يصفّي ذهنك. مش محتاجين نت ولا تسجيل دخول، علشان توفر وقتك وطاقتك للحاجات الأهم في يومك.',
      badge: 'الهدف النهائي',
    },
  ];

  const pillarsEn = [
    {
      id: '01',
      title: 'Born from Real Everyday Life',
      subtitle: 'Human Empathy',
      icon: HeartHandshake,
      color: 'emerald',
      quote: '"Software is not written in an ivory tower; it begins by observing daily stress and solving it simply and honestly."',
      body: 'Money leaks silently into unbudgeted expenses, and minds are overloaded with deadlines. We built Taht El Balata and Eftekir to be dependable everyday allies.',
      badge: 'Genesis Philosophy',
    },
    {
      id: '02',
      title: 'Pure Precision & 100% Local Security',
      subtitle: 'Software Precision',
      icon: Cpu,
      color: 'blue',
      quote: '"We treat code like mechanical horology; every byte is calculated, and everything is encrypted on your device alone."',
      body: 'We reject data monetization and battery drain. Every feature executes offline with zero latency and zero external servers eavesdropping on your life.',
      badge: 'Engineering Standard',
    },
    {
      id: '03',
      title: 'Quiet Technology That Serves in Silence',
      subtitle: 'Ambient Lifestyle',
      icon: Compass,
      color: 'amber',
      quote: '"Great technology does not trap you on a screen; it shields you silently in the background so you can live fully."',
      body: 'Taht El Balata safeguards your savings and Eftekir cleanses cognitive clutter. No logins, no internet needed—saving your energy for what matters.',
      badge: 'Ultimate Goal',
    },
  ];

  const pillars = language === 'en' ? pillarsEn : pillarsAr;

  return (
    <section id="philosophy" className="py-20 bg-white border-t border-black/[0.04] font-cairo">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 text-[#1d1d1f] text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#0071e3]" />
            <span>{t.philosophyBadge}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#1d1d1f] tracking-tight leading-tight">
            {t.philosophyTitle}
          </h2>

          <p className="text-base sm:text-lg text-[#6e6e73] leading-relaxed max-w-2xl mx-auto">
            {t.philosophyDesc}
          </p>
        </div>

        {/* 3 Pillars Clean Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            const iconBg =
              pillar.color === 'emerald'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
                : pillar.color === 'blue'
                ? 'bg-blue-50 text-blue-700 border-blue-200/60'
                : 'bg-amber-50 text-amber-700 border-amber-200/60';

            return (
              <div
                key={pillar.id}
                className="apple-card p-6 sm:p-8 rounded-3xl bg-[#fbfbfd] hover:bg-white border border-black/[0.06] hover:border-black/[0.12] shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Top Bar: Badge & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-black/[0.04] text-[#6e6e73]">
                      {pillar.badge}
                    </span>
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold border ${iconBg} group-hover:scale-105 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="font-extrabold text-lg text-[#1d1d1f] leading-snug">
                      {pillar.title}
                    </h3>
                    <div className="text-xs font-mono font-medium text-[#86868b] mt-0.5">
                      {pillar.subtitle}
                    </div>
                  </div>

                  {/* Quote */}
                  <p className="text-xs sm:text-sm text-[#1d1d1f] font-semibold leading-relaxed bg-white p-3.5 rounded-2xl border border-black/[0.04] shadow-2xs">
                    {pillar.quote}
                  </p>

                  {/* Body description */}
                  <p className="text-xs sm:text-sm text-[#6e6e73] leading-relaxed">
                    {pillar.body}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-black/[0.04] flex items-center gap-2 text-xs font-bold text-emerald-700">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{language === 'ar' ? 'مبدأ أساسي في Blotx' : 'Core Blotx Principle'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
