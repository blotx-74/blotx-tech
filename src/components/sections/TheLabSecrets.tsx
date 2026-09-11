import type { FC } from 'react';
import { Users, Ruler, Shield, Sparkles, ArrowLeft } from 'lucide-react';

export const TheLabSecrets: FC = () => {
  const futureProjects = [
    {
      code: 'NODE 03 // UNDER RESEARCH',
      name: 'شباك (Shebbak)',
      subtitle: 'نافذة تواصل إنساني هادئ للعائلات',
      desc: 'سد ثغرة البعد والانفصال الإنساني؛ مساحة دافئة تشارك فيها لحظاتك مع دايرتك المقربة بدون خوارزميات رخيصة، ولا إعلانات، ولا دوشة السوشيال ميديا.',
      icon: Users,
      badge: 'مرحلة النماذج الأولية',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
    {
      code: 'NODE 04 // IN DEVELOPMENT',
      name: 'المسطرة (El-Mastara)',
      subtitle: 'معايرة العادات وإلغاء المماطلة',
      desc: 'أداة ضبط وقياس صارمة للعادات اليومية، بتفهم سلوكك وبتساعدك تبني انضباط حقيقي بدون جلد ذات وبطريقة ممتعة ومستدامة.',
      icon: Ruler,
      badge: 'قيد التطوير الفعلي',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
    {
      code: 'NODE 05 // EXPERIMENTAL',
      name: 'الكبسولة (El-Capsule)',
      subtitle: 'التشفير والتوريث الرقمي الآمن',
      desc: 'كبسولة تشفير محصنة لحفظ المستندات الحيوية، أسرار العمل، والذكريات الثمينة مع نظام ذكي لتسليمها لأحبائك في حالات الطوارئ.',
      icon: Shield,
      badge: 'أبحاث الأمان والتشفير',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
  ];

  return (
    <section id="lab" className="py-24 bg-white border-t border-black/[0.04]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100 text-[#1d1d1f] text-xs font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#0071e3]" />
            <span>معمل أفكار Blotx Tech • The Secret Lab</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#1d1d1f] tracking-tight">
            عقولنا مش بتبطل تفكير.
            <br />
            <span className="text-[#6e6e73]">إيه اللي بنجهزه لخدمتك بعد كده؟</span>
          </h2>

          <p className="text-base sm:text-lg text-[#6e6e73] leading-relaxed">
            الرحلة بدأت بـ «تحت البلاطة» و«افتكر»، لكن الإيكوسيستم بيكبر كل يوم علشان يغطي كل ثغرة ممكن تقلقك أو تعطل حياتك.
          </p>
        </div>

        {/* Prototype Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {futureProjects.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="apple-card p-8 flex flex-col justify-between text-right border border-black/[0.06] hover:border-black/[0.12] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-mono font-bold text-[#86868b]">
                      {p.code}
                    </span>
                    <div className={`w-12 h-12 rounded-2xl ${p.bg} ${p.color} flex items-center justify-center font-bold text-sm shadow-xs`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-[#1d1d1f] mb-1">{p.name}</h3>
                  <div className="text-xs font-semibold text-[#0071e3] mb-4">{p.subtitle}</div>

                  <p className="text-sm text-[#6e6e73] leading-relaxed mb-6">
                    {p.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-black/[0.05] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1d1d1f]">{p.badge}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Co-creation invitation banner */}
        <div className="mt-16 apple-card p-8 sm:p-10 bg-gradient-to-r from-neutral-900 to-neutral-800 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-right space-y-2">
            <h4 className="text-xl sm:text-2xl font-bold">شايف مشكلة أو حاجة ناقصة الناس في حياتهم؟</h4>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-xl">
              معمل Blotx مفتوح للأفكار الحقيقية اللي بتنبع من قلب الشارع وتفاصيل الحياة اليومية. شاركنا فكرتك وسيبنا نهندسها.
            </p>
          </div>

          <a
            href="mailto:hello@blotx.tech"
            className="apple-pill-btn px-7 py-3 bg-white text-black hover:bg-neutral-100 font-bold text-xs flex items-center gap-2 shrink-0 shadow-lg"
          >
            <span>شارك فكرتك مع المعمل</span>
            <ArrowLeft className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
