import { useState, type FC } from 'react';
import {
  Layers,
  X,
  Maximize2,
} from 'lucide-react';
import { playAppleClick } from '../../utils/soundEffects';

interface ScreenItem {
  id: string;
  category: 'taht' | 'efteker' | 'stack';
  title: string;
  subtitle: string;
  tag: string;
  accentColor: string;
  description: string;
  details: { label: string; value: string }[];
  uiHeader: string;
  uiMetric: string;
  uiMetricLabel: string;
  uiHighlights: string[];
}

export const AppScreensGallery: FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'taht' | 'efteker' | 'stack'>('all');
  const [selectedModalScreen, setSelectedModalScreen] = useState<ScreenItem | null>(null);

  const screens: ScreenItem[] = [
    {
      id: 'taht-vault',
      category: 'taht',
      title: 'خزنة الأصول والطوارئ المحمية',
      subtitle: 'توزيع رأس المال في قنوات أمان غير قابلة للكسر',
      tag: 'تحت البلاطة • شاشة 01',
      accentColor: '#059669',
      description:
        'واجهة إدارة الخزنات المركزية؛ تقسم أموالك تلقائياً لخزنة طوارئ تغطي 6 أشهر، وخزنة تحوط بالذهب، وخزنة التزامات مجدولة مع تطبيق افتكر.',
      details: [
        { label: 'نوع التشفير', value: 'محلي AES-256' },
        { label: 'الاستقلالية', value: 'تعمل 100% أوفلاين' },
        { label: 'التحكم', value: 'حجز فوري بلمسة واحدة' },
      ],
      uiHeader: 'الخزنة المركزية المحصنة',
      uiMetric: '148,500 ج.م',
      uiMetricLabel: 'إجمالي الأصول المحمية',
      uiHighlights: [
        'خزنة طوارئ البيت: 60,000 ج.م (مكتملة)',
        'سبائك ذهب عيار 24: 55,000 ج.م',
        'قسط السيارة: 33,500 ج.م (محجوز تلقائياً عبر افتكر)',
      ],
    },
    {
      id: 'taht-leaks',
      category: 'taht',
      title: 'رادار كشف التسريبات والمصاريف الخفية',
      subtitle: 'إيقاف نزيف الجنيهات الصغيرة قبل أن تلتهم مدخراتك',
      tag: 'تحت البلاطة • شاشة 02',
      accentColor: '#047857',
      description:
        'نظام استشعار ذكي يرصد المصاريف اليومية المتكررة غير المحسوبة والاشتراكات المنسية، ويعرض لك بالأرقام كم ستوفر في عام كامل إذا أوقفتها.',
      details: [
        { label: 'متوسط الوفر السنوي', value: '28,000 ج.م' },
        { label: 'التنبيه', value: 'استباقي هادئ' },
        { label: 'الدقة', value: 'تحليل سلوكي دقيق' },
      ],
      uiHeader: 'رادار التسريبات المكتشفة',
      uiMetric: '7,450 ج.م / شهر',
      uiMetricLabel: 'تسريبات تم إيقافها وحمايتها',
      uiHighlights: [
        'اشتراكات خدمات رقمية غير مستخدمة: 850 ج.م',
        'مشروبات وكماليات سريعة متكررة: 3,200 ج.م',
        'فروق أسعار تسوق بدون ميزانية: 3,400 ج.م',
      ],
    },
    {
      id: 'efteker-timeline',
      category: 'efteker',
      title: 'الجدول الزمني الذكي والذاكرة الهادئة',
      subtitle: 'ترتيب الأولويات الحياتية حسب السياق والوقت المظبوط',
      tag: 'افتكر • شاشة 01',
      accentColor: '#0071e3',
      description:
        'عقلك الثاني لتنظيم اليوم؛ لا يعتمد على قوائم المهام المملة والمنسية، بل يرتب التزاماتك وفق سياقك الذهني ويبث تذكيراً هادئاً في اللحظة الحاسمة.',
      details: [
        { label: 'مؤشر الصفاء', value: '98% راحة بال' },
        { label: 'التنسيق', value: 'مرتبط بحصن البلاطة' },
        { label: 'طريقة الإدخال', value: 'صوت أو نص في ثانية' },
      ],
      uiHeader: 'اليوم • Smart Timeline',
      uiMetric: '0 تشتيت ذهني',
      uiMetricLabel: 'حالة العقل والذاكرة الآن',
      uiHighlights: [
        '10:00 ص: سداد قسط السيارة (الفلوس محجوزة بالبلاطة ✓)',
        '02:00 م: توثيق فكرة جديدة لمعمل Blotx Lab',
        '07:30 م: موعد شراء مستلزمات العائلة',
      ],
    },
    {
      id: 'efteker-capsule',
      category: 'efteker',
      title: 'كبسولة التقاط الأفكار وتفريغ الشحنة',
      subtitle: 'تسجيل أي فكرة طارئة في لمح البصر لمنع فقدانها',
      tag: 'افتكر • شاشة 02',
      accentColor: '#2563eb',
      description:
        'مساحة آمنة ومريحة للعين لتفريغ الضغط العصبي والأفكار المتطايرة. تسحب الأفكار من رأسك وتضعها في تصنيفات ذكية جاهزة للتنفيذ.',
      details: [
        { label: 'سرعة الالتقاط', value: 'أقل من ثانية واحدة' },
        { label: 'الخصوصية', value: 'بدون سحابة أو إعلانات' },
        { label: 'الاسترجاع', value: 'بحث لحظي فوري' },
      ],
      uiHeader: 'الكبسولة الإدراكية الفورية',
      uiMetric: '3 أفكار مؤمنة',
      uiMetricLabel: 'جاهزة للتحويل لخطوات عملية',
      uiHighlights: [
        'فكرة تطوير ميزة توريث رقمي في المعمل',
        'ملاحظة مهمة خاصة بعقد العمل الجديد',
        'هدية عيد ميلاد الوالدة وترتيب الميزانية',
      ],
    },
    {
      id: 'stack-bridge',
      category: 'stack',
      title: 'لوحة التزامن المشفر بين التطبيقين',
      subtitle: 'نواة التخاطب الذاتي بين تحت البلاطة وافتكر',
      tag: 'Blotx Stack • شاشة 01',
      accentColor: '#1d1d1f',
      description:
        'الطبقة الهندسية التي تجعل النظامين يتصرفان ككيان واحد متناغم. عندما يُسجل التزام في افتكر، يعزل له تحت البلاطة ميزانيته فوراً في صمت.',
      details: [
        { label: 'زمن التأخير', value: '0.002 ثانية محلياً' },
        { label: 'بروتوكول الربط', value: 'Local P2P Conduit' },
        { label: 'الأمان', value: 'حماية ثنائية مشفرة' },
      ],
      uiHeader: 'مركز المزامنة الحية',
      uiMetric: '100% متصل',
      uiMetricLabel: 'تزامن لحظي بين العقدتين',
      uiHighlights: [
        'تم تبادل موعد سداد القسط مع محفظة الطوارئ',
        'تأمين ميزانية المناسبة القادمة قبل موعدها بشهر',
        'حالة الحماية: نشطة ومحصنة محلياً',
      ],
    },
  ];

  const filteredScreens =
    activeCategory === 'all'
      ? screens
      : screens.filter((s) => s.category === activeCategory);

  return (
    <section id="gallery" className="py-24 bg-[#fbfbfd] border-t border-black/[0.04]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100 text-[#1d1d1f] text-xs font-bold shadow-xs">
            <Layers className="w-3.5 h-3.5 text-[#0071e3]" />
            <span>معرض الشاشات والهندسة البصرية • Visual Architecture</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1d1d1f] tracking-tight leading-tight">
            نظرة مقربة على الشاشات..
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#059669] via-[#0071e3] to-[#059669]">
              جمال نقي بدون تعقيد.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#6e6e73] leading-relaxed">
            استعرض تفاصيل واجهات التطبيقات الحقيقية؛ صُممت كل أيقونة، بطاقة، ورسم بياني لتبث الطمأنينة والوضوح في يومك.
          </p>
        </div>

        {/* Filter Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            type="button"
            onClick={() => {
              playAppleClick();
              setActiveCategory('all');
            }}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
              activeCategory === 'all'
                ? 'bg-[#1d1d1f] text-white shadow-md'
                : 'bg-white text-[#1d1d1f] border border-black/[0.08] hover:bg-neutral-100'
            }`}
          >
            كافة الشاشات (All Modules)
          </button>
          <button
            type="button"
            onClick={() => {
              playAppleClick();
              setActiveCategory('taht');
            }}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
              activeCategory === 'taht'
                ? 'bg-[#059669] text-white shadow-md'
                : 'bg-white text-[#1d1d1f] border border-black/[0.08] hover:bg-neutral-100'
            }`}
          >
            شاشات «تحت البلاطة»
          </button>
          <button
            type="button"
            onClick={() => {
              playAppleClick();
              setActiveCategory('efteker');
            }}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
              activeCategory === 'efteker'
                ? 'bg-[#0071e3] text-white shadow-md'
                : 'bg-white text-[#1d1d1f] border border-black/[0.08] hover:bg-neutral-100'
            }`}
          >
            شاشات «افتكر»
          </button>
          <button
            type="button"
            onClick={() => {
              playAppleClick();
              setActiveCategory('stack');
            }}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
              activeCategory === 'stack'
                ? 'bg-neutral-900 text-white shadow-md'
                : 'bg-white text-[#1d1d1f] border border-black/[0.08] hover:bg-neutral-100'
            }`}
          >
            نواة الربط «Blotx Stack»
          </button>
        </div>

        {/* Gallery Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredScreens.map((item) => (
            <div
              key={item.id}
              className="apple-card p-6 flex flex-col justify-between text-right border border-black/[0.06] hover:border-black/[0.14] transition-all group"
            >
              <div>
                {/* Simulated Screen Visual Shell */}
                <div
                  className="rounded-2xl p-5 mb-6 text-right border border-black/[0.08] shadow-sm relative overflow-hidden transition-transform group-hover:scale-[1.02]"
                  style={{
                    background:
                      item.category === 'taht'
                        ? 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)'
                        : item.category === 'efteker'
                        ? 'linear-gradient(135deg, #eff6ff 0%, #ffffff 100%)'
                        : 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
                  }}
                >
                  <div className="flex items-center justify-between mb-3 text-[10px] font-bold">
                    <span
                      className="px-2 py-0.5 rounded-full text-white font-mono"
                      style={{ backgroundColor: item.accentColor }}
                    >
                      {item.tag}
                    </span>
                    <span className="text-neutral-500">{item.uiHeader}</span>
                  </div>

                  <div className="space-y-1 mb-4">
                    <div className="text-2xl font-black text-[#1d1d1f] font-cairo">
                      {item.uiMetric}
                    </div>
                    <div className="text-[11px] text-[#6e6e73] font-medium">
                      {item.uiMetricLabel}
                    </div>
                  </div>

                  {/* Highlights mini lines */}
                  <div className="space-y-1.5 pt-3 border-t border-black/[0.05]">
                    {item.uiHighlights.map((h, i) => (
                      <div
                        key={i}
                        className="text-[11px] text-neutral-700 bg-white/80 p-2 rounded-lg border border-black/[0.04] flex items-center justify-between"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                        <span className="truncate pr-1">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Title & Description */}
                <h3 className="text-xl font-bold text-[#1d1d1f] mb-1">{item.title}</h3>
                <p className="text-xs text-[#0071e3] font-semibold mb-3">{item.subtitle}</p>
                <p className="text-xs sm:text-sm text-[#6e6e73] leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {/* Action and Inspect Button */}
              <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    playAppleClick();
                    setSelectedModalScreen(item);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1d1d1f] hover:text-[#0071e3] transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>معاينة تفاصيل الشاشة</span>
                </button>

                <div className="text-[11px] font-mono text-[#86868b]">
                  {item.details[0].value}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Deep Inspection */}
        {selectedModalScreen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 text-right shadow-2xl border border-black/10 relative max-h-[90vh] overflow-y-auto">
              <button
                type="button"
                onClick={() => {
                  playAppleClick();
                  setSelectedModalScreen(null);
                }}
                className="absolute top-6 left-6 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div>
                  <span
                    className="inline-block px-3 py-1 rounded-full text-white text-xs font-bold mb-2"
                    style={{ backgroundColor: selectedModalScreen.accentColor }}
                  >
                    {selectedModalScreen.tag}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#1d1d1f]">
                    {selectedModalScreen.title}
                  </h3>
                  <div className="text-sm text-[#0071e3] font-semibold mt-1">
                    {selectedModalScreen.subtitle}
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#52525b] leading-relaxed">
                  {selectedModalScreen.description}
                </p>

                {/* Deep Technical Specs */}
                <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-neutral-50 border border-black/[0.05]">
                  {selectedModalScreen.details.map((d, i) => (
                    <div key={i} className="text-center">
                      <div className="text-[11px] text-[#86868b]">{d.label}</div>
                      <div className="text-xs sm:text-sm font-bold text-[#1d1d1f] mt-0.5">
                        {d.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Simulated In-Depth View */}
                <div className="p-5 rounded-2xl bg-neutral-900 text-white space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                    <span>STATUS: ACTIVE // ZERO-LATENCY</span>
                    <span>{selectedModalScreen.uiHeader}</span>
                  </div>
                  <div className="text-3xl font-black text-amber-400 font-cairo">
                    {selectedModalScreen.uiMetric}
                  </div>
                  <div className="space-y-2 pt-2 border-t border-white/10 text-xs text-neutral-200">
                    {selectedModalScreen.uiHighlights.map((h, i) => (
                      <div key={i} className="flex items-center justify-end gap-2">
                        <span>{h}</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      playAppleClick();
                      setSelectedModalScreen(null);
                    }}
                    className="apple-pill-btn px-6 py-2.5 bg-[#1d1d1f] text-white text-xs font-bold"
                  >
                    إغلاق المعاينة
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
