import { useState, type FC } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';

export const FaqSection: FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'هل بياناتي وفلوسي في أمان تام؟ وهل التطبيقات تتطلب ربط حسابات بنكية حساسة؟',
      a: 'لا نطلب أبداً أي أرقام حسابات بنكية أو كلمات مرور سرية. «تحت البلاطة» و«افتكر» مصممان بمبدأ (الخصوصية أولاً)؛ كافة بيانات مدخراتك وملاحظاتك ومواعيدك يتم تشفيرها محلياً 100% داخل هاتفك فقط. لا نبيع بيانات، ولا نضع إعلانات، ولا يملك أي طرف ثالث إمكانية الوصول لأسرارك.',
    },
    {
      q: 'هل تطبيقا «تحت البلاطة» و«افتكر» مجانيان؟',
      a: 'نعم! الميزات الأساسية والكاملة لإدارة الأمان المالي، والخزنات الذكية، وتصفية الذهن، والتنبيهات مجانية تماماً ومتاحة لكل الناس بدون أي إعلانات مزعجة على الإطلاق. نقدم فقط باقات اختيارية للميزات السحابية التشاركية للعائلات وفرق العمل.',
    },
    {
      q: 'كيف يتواصل «تحت البلاطة» مع «افتكر» تلقائياً وبسلاسة؟',
      a: 'بمجرد تنزيل التطبيقين على نفس الجهاز، يتعرفان على بعضهما عبر بروتوكول الربط الذكي المدمج في نواة Blotx Stack. لا تحتاج لخطوات تسجيل معقدة؛ عندما تسجل التزاماً أو قسطاً في افتكر، يتم التنسيق مع تحت البلاطة لحجز ميزانيته بهدوء في الخلفية.',
    },
    {
      q: 'هل يمكنني استخدام التطبيقات بدون اتصال بالإنترنت (أوفلاين)؟',
      a: 'بكل تأكيد! كلا التطبيقين يعملان بكامل وظائفهما في أي مكان بدون اتصال بالإنترنت (أثناء السفر، أو في الأماكن ضعيفة الشبكة)، ويتم حفظ كافة المدخرات والمهام محلياً بسرعة فائقة.',
    },
    {
      q: 'ما هو الهدف من كيان Blotx Tech؟ ومن يقف وراءه؟',
      a: 'Blotx Tech هو مختبر تصميم وهندسة برمجية تأسس بهدف إنساني خالص: رصد ما ينقص الناس في تفاصيل حياتهم اليومية وهندسة أدوات فائقة الجمال والسهولة تسد هذه الفجوات وتتحول لأسلوب حياة هادئ ومستقر.',
    },
  ];

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-[#fbfbfd] border-t border-black/[0.04]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neutral-100 text-[#1d1d1f] text-xs font-bold">
            <HelpCircle className="w-3.5 h-3.5 text-[#0071e3]" />
            <span>إجابات واضحة لراحة بالك</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#1d1d1f] tracking-tight">
            الأسئلة الشائعة
          </h2>

          <p className="text-base sm:text-lg text-[#6e6e73]">
            كل ما يدور في ذهنك حول الأمان، والخصوصية، وكيفية عمل الإيكوسيستم.
          </p>
        </div>

        {/* Accordion Items */}
        <div className="space-y-4 text-right">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;

            return (
              <div
                key={idx}
                className="apple-card overflow-hidden border border-black/[0.06] transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-right flex items-center justify-between gap-4 transition-colors"
                >
                  <ChevronDown
                    className={`w-5 h-5 text-[#0071e3] transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                  />
                  <span className="font-bold text-base sm:text-lg text-[#1d1d1f] leading-snug">
                    {faq.q}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 border-t border-black/[0.04] text-sm sm:text-base text-[#6e6e73] leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Security Assurance Badge */}
        <div className="mt-12 p-6 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-center flex flex-col sm:flex-row items-center justify-center gap-3 text-xs sm:text-sm font-bold text-emerald-900">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>التزام صريح من Blotx Tech: خصوصيتك وراحة بالك خط أحمر لا مساومة عليه أبداً.</span>
        </div>
      </div>
    </section>
  );
};
