import { useState, type FC } from 'react';
import { audioHaptics } from '../../utils/audioHaptics';
import { HeartHandshake, Network, Sliders, CheckCircle2, ChevronLeft } from 'lucide-react';

export const PhilosophySection: FC = () => {
  const [activePillar, setActivePillar] = useState<number>(0);

  const pillars = [
    {
      id: '01',
      title: 'سد النواقص الحقيقية للإنسان',
      subtitle: 'Human-First Problem Solving',
      icon: HeartHandshake,
      quote: '"ما بنعملش أبلكيشن لمجرد الوجود؛ بنعمله عشان نشوف الناس ناقصها إيه في حياتهم ونقدمهولهم."',
      description:
        'الإنسان في حياته اليومية بيواجه ضغوط مستمرة: خوف على أمانه المالي، أو تشتت ونسيان للأولويات الحقيقية. Blotx Tech اتولدت علشان تسد هذه الفجوات بحلول عميقة تخلي الحياة أبسط، أهدأ، وأكثر سيطرة.',
      metrics: [
        { label: 'الهدف الرئيسي', value: 'إزالة التشتت والقلق اليومي' },
        { label: 'المنهجية', value: 'ملاحظة سلوكية دقيقة قبل أي كود' },
      ],
    },
    {
      id: '02',
      title: 'إيكوسيستم يربط أدوات حياتك',
      subtitle: 'Seamless Cross-App Intelligence',
      icon: Network,
      quote: '"فكرة الإيكوسيستم مش مجرد كلمة تسويقية؛ دي شبكة عصبية بتربط احتياجاتك ببعضها."',
      description:
        'لما تطبيق "تحت البلاطة" يتصل مع تطبيق "افتكر"، الفلوس والمهام مش بيكونوا حاجتين منفصلين. افتكر بيفكرك بمصروفك والتزاماتك قبل ما تقع في زنقة، وتحت البلاطة بيحميك من القرارات المتسرعة في يومك.',
      metrics: [
        { label: 'التكامل البيني', value: 'مزامنة فورية مشفرة محلياً' },
        { label: 'تجربة المستخدم', value: 'حساب واحد متصل بكل أدواتك' },
      ],
    },
    {
      id: '03',
      title: 'هاردوير صناعي دقيق وتكتيكات كبيرة',
      subtitle: 'Precision Industrial Craftsmanship',
      icon: Sliders,
      quote: '"حاجة معمولة بتكتيكس صناعية دقيقة جداً عشان تضمن إنتاج عظيم يليق بأسلوب حياتك."',
      description:
        'البرمجيات عندنا بتتعامل معاملة القطع الهندسية الفاخرة. كل زرار، كل انتقال، وكل ميزة معمول حسابها بالمللي ثانية، لضمان إن الأداة تعيش معاك سنين طويلة بدون أعطال أو ثقل.',
      metrics: [
        { label: 'معيار الجودة', value: 'حرفية ميكانيكية فائقة' },
        { label: 'الاستدامة', value: 'أدوات تدوم كأسلوب حياة حقيقي' },
      ],
    },
  ];

  return (
    <section id="philosophy" className="py-20 border-t border-[#1a1e27] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#222834] pb-6">
          <div>
            <div className="tactical-tag text-[#ff5500] mb-1">SECTION // 02</div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              فلسفة Blotx Tech: <span className="text-[#8c93a0]">أسلوب حياة</span>
            </h2>
          </div>
          <div className="mt-4 md:mt-0 font-mono text-xs text-[#525866] text-right">
            <span>PHILOSOPHY SPECIFICATION // REVISION 4.2</span>
          </div>
        </div>

        {/* 3 Pillars Tactical Switcher Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isActive = activePillar === idx;

            return (
              <button
                key={pillar.id}
                onClick={() => {
                  audioHaptics.playRelay();
                  setActivePillar(idx);
                }}
                onMouseEnter={() => audioHaptics.playTick()}
                className={`p-6 rounded-xl text-right transition-all flex flex-col justify-between ${
                  isActive
                    ? 'industrial-panel-active'
                    : 'industrial-panel hover:border-[#384152]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`tactical-tag font-bold ${
                        isActive ? 'text-[#ff5500]' : 'text-[#525866]'
                      }`}
                    >
                      PILLAR // {pillar.id}
                    </span>
                    <Icon className={`w-5 h-5 ${isActive ? 'text-[#ff5500]' : 'text-[#8c93a0]'}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{pillar.title}</h3>
                  <div className="text-xs font-mono text-[#8c93a0]">{pillar.subtitle}</div>
                </div>

                <div className="mt-6 flex items-center justify-between text-xs font-mono pt-4 border-t border-[#222733]">
                  <span className={isActive ? 'text-[#ff5500]' : 'text-[#525866]'}>
                    {isActive ? 'STATUS: EXAMINING' : 'CLICK TO INSPECT'}
                  </span>
                  <ChevronLeft
                    className={`w-4 h-4 transition-transform ${
                      isActive ? 'text-[#ff5500] -translate-x-1' : 'text-[#525866]'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Focus View of the Selected Pillar */}
        <div className="industrial-panel p-8 rounded-2xl border border-[#232936] bg-[#0c0e13] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-1 bg-[#ff5500]" />

          <div className="max-w-3xl space-y-6">
            <div className="inline-block px-3 py-1 rounded bg-[#171a22] border border-[#272f3e] text-xs font-mono text-[#ff5500]">
              CORE MANIFESTO // {pillars[activePillar].id}
            </div>

            <blockquote className="text-xl sm:text-2xl font-bold text-white italic border-r-4 border-[#ff5500] pr-4">
              {pillars[activePillar].quote}
            </blockquote>

            <p className="text-base sm:text-lg text-[#8c93a0] leading-relaxed">
              {pillars[activePillar].description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#1f242e]">
              {pillars[activePillar].metrics.map((m, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-[#12151b] border border-[#1f2531] rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-[#ff5500] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-mono text-[#525866]">{m.label}</div>
                    <div className="text-sm font-bold text-white mt-0.5">{m.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
