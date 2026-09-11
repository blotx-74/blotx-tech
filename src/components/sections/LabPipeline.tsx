import type { FC } from 'react';
import { audioHaptics } from '../../utils/audioHaptics';
import { Sparkles, Terminal, Shield, Ruler, Users, ArrowUpRight } from 'lucide-react';

export const LabPipeline: FC = () => {
  const upcomingProjects = [
    {
      code: 'PROJECT // SHEBBAK',
      arabicName: 'شباك (Shebbak)',
      category: 'HUMAN CONNECTION',
      status: 'ALPHA LAB',
      statusColor: 'text-[#ff5500]',
      description:
        'سد ثغرة البعد والانفصال الإنساني؛ نافذة تواصل فورية وهادئة بدون إزعاج السوشيال ميديا أو الإشعارات المزعجة، مصممة للعائلات ودوائر الثقة المقربة.',
      icon: Users,
      progress: 68,
    },
    {
      code: 'PROJECT // EL-MASTARA',
      arabicName: 'المسطرة (El-Mastara)',
      category: 'HABIT CALIBRATION',
      status: 'CAD BLUEPRINT',
      statusColor: 'text-[#8c93a0]',
      description:
        'أداة ضبط وقياس دقيقة للعادات اليومية والمؤشرات الحيوية بأسلوب فيزيائي صارم يلغي المماطلة ويقيس التطور الحقيقي للإنسان.',
      icon: Ruler,
      progress: 42,
    },
    {
      code: 'PROJECT // EL-CAPSULE',
      arabicName: 'الكبسولة (El-Capsule)',
      category: 'IMMUTABLE ARCHIVE',
      status: 'RESEARCH PHASE',
      statusColor: 'text-[#525866]',
      description:
        'كبسولة تشفير فائقة الأمان لحفظ المستندات الحيوية، الوصايا الرقمية، وذكريات العمر التي لا تقدر بثمن مع نظام توريث مشفر.',
      icon: Shield,
      progress: 25,
    },
  ];

  return (
    <section id="lab" className="py-20 border-t border-[#1a1e27] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#222834] pb-6">
          <div>
            <div className="tactical-tag text-[#ff5500] mb-1">SECTION // 04</div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              معمل أبحاث Blotx: <span className="text-[#8c93a0]">المشاريع القادمة</span>
            </h2>
          </div>
          <div className="mt-4 md:mt-0 font-mono text-xs text-[#525866] text-right">
            <span>R&amp;D PIPELINE // ACTIVE SCHEMATICS</span>
          </div>
        </div>

        <p className="text-base sm:text-lg text-[#8c93a0] max-w-3xl mb-10 leading-relaxed">
          عقلية Blotx Tech مستمرة دائماً في دراسة ما ينقص الإنسان. هذه المخططات الهندسية قيد التطوير والاختبار داخل المعمل، وكل مشروع مصمم ليكتمل به عقد الإيكوسيستم.
        </p>

        {/* CAD Blueprint Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingProjects.map((p, idx) => {
            const Icon = p.icon;

            return (
              <div
                key={idx}
                onMouseEnter={() => audioHaptics.playTick()}
                className="industrial-panel p-6 rounded-xl hover:border-[#ff5500]/70 transition-all flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Subtle blueprint grid watermark */}
                <div className="absolute top-0 right-0 w-24 h-24 cad-grid-bg opacity-40 pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="tactical-tag text-[#ff5500] font-bold">{p.code}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded bg-[#161922] border border-[#232834] ${p.statusColor}`}>
                      {p.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded bg-[#14171f] border border-[#252b38] flex items-center justify-center text-white group-hover:text-[#ff5500] group-hover:border-[#ff5500] transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{p.arabicName}</h3>
                  </div>

                  <div className="text-[10px] font-mono text-[#525866] mb-3">{p.category}</div>

                  <p className="text-xs text-[#8c93a0] leading-relaxed mb-6">
                    {p.description}
                  </p>
                </div>

                {/* Progress Bar & Telemetry */}
                <div className="pt-4 border-t border-[#1e232e] space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-[#525866]">ENGINEERING COMPLETION</span>
                    <span className="text-white font-bold">{p.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#171a22] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#8c93a0] to-[#ff5500] rounded-full"
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Suggest an Idea / Community Co-Creation Callout */}
        <div className="mt-12 p-6 rounded-xl border border-[#222834] bg-gradient-to-r from-[#101319] via-[#0d0f14] to-[#101319] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-right">
            <div className="w-12 h-12 rounded-lg bg-[#ff5500]/10 border border-[#ff5500]/30 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-[#ff5500]" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">شايف حاجة ناقصة الناس في حياتهم اليومية؟</h4>
              <p className="text-xs sm:text-sm text-[#8c93a0]">
                معمل Blotx مفتوح للأفكار الحقيقية. شاركنا الملاحظات اليومية التي تستحق هندسة حل صناعي دقيق.
              </p>
            </div>
          </div>

          <a
            href="#terminal"
            onClick={() => audioHaptics.playRelay()}
            className="px-5 py-2.5 rounded-lg bg-[#ff5500] hover:bg-[#e04b00] text-black font-mono font-bold text-xs flex items-center gap-2 transition-all shadow-lg shrink-0"
          >
            <Terminal className="w-4 h-4" />
            <span>اطرح فكرتك للمعمل</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
