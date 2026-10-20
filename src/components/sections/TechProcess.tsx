import { type FC } from 'react';
import { motion } from 'framer-motion';
import { Compass, Palette, Code, Rocket, Sparkles } from 'lucide-react';
import { useLanguage } from '../../LanguageContext';

export const TechProcess: FC = () => {
  const { t } = useLanguage();

  const steps = [
    {
      num: '01',
      icon: Compass,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      title: t.processStep1Title,
      desc: t.processStep1Desc,
    },
    {
      num: '02',
      icon: Palette,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      title: t.processStep2Title,
      desc: t.processStep2Desc,
    },
    {
      num: '03',
      icon: Code,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      title: t.processStep3Title,
      desc: t.processStep3Desc,
    },
    {
      num: '04',
      icon: Rocket,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      title: t.processStep4Title,
      desc: t.processStep4Desc,
    },
  ];

  return (
    <section id="process" className="py-20 md:py-28 bg-slate-50/70 relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>{t.processBadge}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug mb-4">
            {t.processTitle}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-medium">
            {t.processSubtitle}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div className={`w-12 h-12 rounded-xl ${step.bgColor} flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${step.color}`} />
                    </div>
                    <span className="text-2xl font-extrabold font-mono text-slate-300">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2.5">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100 text-[11px] font-semibold text-slate-400">
                  Sprint {idx + 1}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
