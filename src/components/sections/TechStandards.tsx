import { type FC } from 'react';
import { motion } from 'framer-motion';
import { Layers, WifiOff, Zap, ShieldCheck, Code2 } from 'lucide-react';
import { useLanguage } from '../../LanguageContext';

export const TechStandards: FC = () => {
  const { t } = useLanguage();

  const standards = [
    {
      icon: Layers,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      title: t.standardCleanTitle,
      desc: t.standardCleanDesc,
    },
    {
      icon: WifiOff,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      title: t.standardOfflineTitle,
      desc: t.standardOfflineDesc,
    },
    {
      icon: Zap,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      title: t.standardSpeedTitle,
      desc: t.standardSpeedDesc,
    },
    {
      icon: ShieldCheck,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      title: t.standardPrivacyTitle,
      desc: t.standardPrivacyDesc,
    },
  ];

  const technologies = [
    { name: 'Flutter', category: 'Mobile & Games', desc: 'Cross-platform native engine' },
    { name: 'React 19', category: 'Frontend', desc: 'Component architectures' },
    { name: 'TypeScript', category: 'Language', desc: 'End-to-end type safety' },
    { name: 'Next.js', category: 'Fullstack', desc: 'SSR & edge rendering' },
    { name: 'Electron', category: 'Desktop', desc: 'Native OS applications' },
    { name: 'Firebase', category: 'Cloud Platform', desc: 'Auth, Firestore, Cloud Functions' },
    { name: 'Tailwind CSS', category: 'Styling', desc: 'Modern responsive systems' },
    { name: 'Python', category: 'Automation & Data', desc: 'Scripts & intelligence' },
  ];

  return (
    <section id="standards" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold mb-4">
            <Code2 className="w-3.5 h-3.5 text-blue-600" />
            <span>{t.standardsBadge}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug mb-4">
            {t.standardsTitle}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-medium">
            {t.standardsSubtitle}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {standards.map((std, idx) => {
            const Icon = std.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-slate-50/70 p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl ${std.bgColor} flex items-center justify-center mb-5`}>
                    <Icon className={`w-6 h-6 ${std.color}`} />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-2">
                    {std.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {std.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tech Stack Strip */}
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                  التقنيات ومحركات التطوير
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  أدوات حديثة ومختبرة في مشاريع إنتاجية حقيقية
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-white/10 text-blue-300 border border-white/15 w-fit">
                MODERN TECH STACK 2026
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {technologies.map((tech, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <span className="text-[10px] font-bold text-blue-400 block mb-1 uppercase tracking-wider">
                    {tech.category}
                  </span>
                  <h4 className="font-extrabold text-white text-base">
                    {tech.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {tech.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
