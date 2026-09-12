import { useState, type FC } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../LanguageContext';

export const FaqSection: FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const { t } = useLanguage();

  const faqs = [
    {
      q: t.faqQ1,
      a: t.faqA1,
    },
    {
      q: t.faqQ2,
      a: t.faqA2,
    },
    {
      q: t.faqQ3,
      a: t.faqA3,
    },
    {
      q: t.faqQ4,
      a: t.faqA4,
    },
    {
      q: t.faqQ5,
      a: t.faqA5,
    },
  ];

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-[#fbfbfd] border-t border-black/[0.04] font-cairo">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neutral-100 text-[#1d1d1f] text-xs font-bold">
            <HelpCircle className="w-3.5 h-3.5 text-[#0071e3]" />
            <span>{t.faqBadge}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#1d1d1f] tracking-tight">
            {t.faqTitle}
          </h2>

          <p className="text-base sm:text-lg text-[#6e6e73]">
            {t.faqDesc}
          </p>
        </div>

        {/* Accordion Items */}
        <div className="space-y-4 text-start">
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
                  className="w-full p-6 text-start flex items-center justify-between gap-4 transition-colors cursor-pointer"
                >
                  <span className="font-bold text-base sm:text-lg text-[#1d1d1f] leading-snug">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#0071e3] transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                  />
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
          <span>{t.faqAssurance}</span>
        </div>
      </div>
    </section>
  );
};

