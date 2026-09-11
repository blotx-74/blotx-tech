import type { FC } from 'react';
import { ArrowLeft, Sparkles, CheckCircle2, Heart } from 'lucide-react';
import { EcosystemSolidCards3D } from '../canvas/EcosystemSolidCards3D';

export const AppleSymbiosis: FC = () => {
  const steps = [
    {
      num: '01',
      title: 'رصد الحدث في «افتكر»',
      desc: 'سجلت موعد تجديد رخصة، سفرية، أو مناسبة شخصية. التطبيق يفهم إن ده التزام قادم ومهم.',
    },
    {
      num: '02',
      title: 'تأمين الميزانية في «تحت البلاطة»',
      desc: 'تلقائياً، تحت البلاطة يخصص جزء من فائضك المالي في خزنة المناسبة بدون ما تحس بأي ضغط على مصاريفك اليومية.',
    },
    {
      num: '03',
      title: 'صفاء ذهني وأسلوب حياة هادئ',
      desc: 'لما يجي وقت الموعد، تلاقي كل حاجة جاهزة، الفلوس مدفوعة، والذاكرة صافية ومستريحة.',
    },
  ];

  return (
    <section id="symbiosis" className="py-24 bg-[#fbfbfd] border-t border-black/[0.04]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>إيكوسيستم الكروت ثلاثية الأبعاد • 3D Solid Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-[#1d1d1f] tracking-tight">
            كروت صلبة ومترابطة،
            <br />
            <span className="text-[#6e6e73]">تجمع أدواتك في نظام حياة متكامل.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#6e6e73]">
            كروت 3D فيزيائية صلبة تعرض اللوجوهات الرسمية لـ <strong className="text-[#1d1d1f]">Blotx Stack</strong> و<strong className="text-emerald-600">تحت البلاطة</strong> و<strong className="text-blue-600">افتكر</strong> مع مسارات ربط لحظية.
          </p>
        </div>

        {/* 3D Interactive Solid Cards */}
        <div className="mb-20">
          <EcosystemSolidCards3D />
        </div>

        {/* Practical Life Flow Steps */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h3 className="text-2xl font-bold text-[#1d1d1f]">كيف يصنع هذا الترابط راحة بالك في 3 خطوات؟</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="apple-card p-8 text-right flex flex-col justify-between relative"
            >
              <div>
                <span className="text-3xl font-bold text-neutral-300 mb-4 block font-mono">
                  {step.num}
                </span>
                <h3 className="text-xl font-bold text-[#1d1d1f] mb-3">{step.title}</h3>
                <p className="text-sm text-[#6e6e73] leading-relaxed">{step.desc}</p>
              </div>

              <div className="pt-6 mt-6 border-t border-black/[0.05] flex items-center gap-2 text-xs text-emerald-600 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>مترابط في الخلفية بدون تدخلك</span>
              </div>
            </div>
          ))}
        </div>

        {/* Manifesto Banner Card */}
        <div className="apple-card p-8 sm:p-12 bg-gradient-to-r from-neutral-900 to-neutral-800 text-white text-center space-y-6">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto">
            <Heart className="w-6 h-6 text-red-400" />
          </div>

          <h3 className="text-2xl sm:text-4xl font-bold max-w-2xl mx-auto leading-snug">
            "Blotx Tech اتعملت علشان تكون أسلوب حياة يفيدك ويفهمك، مش مجرد شركة برمجيات."
          </h3>

          <p className="text-sm sm:text-base text-neutral-300 max-w-xl mx-auto">
            كل خطوة بنعملها، وكل تطبيق بنضيفه للإيكوسيستم، بيكون هدفه الأول والوحيد هو راحة بالك وسد اللي ناقصك في الدنيا.
          </p>

          <div className="pt-4 flex justify-center">
            <a
              href="#showcase"
              className="apple-pill-btn px-8 py-3.5 bg-white text-[#1d1d1f] hover:bg-neutral-100 font-semibold text-sm flex items-center gap-2 shadow-lg"
            >
              <span>انضم لعائلة Blotx Tech</span>
              <ArrowLeft className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
