import { type FC } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Gamepad2, Globe2, LayoutDashboard, CheckCircle2, Cpu } from 'lucide-react';
import { useLanguage } from '../../LanguageContext';

export const TechServices: FC = () => {
  const { t } = useLanguage();

  const services = [
    {
      id: 'mobile',
      icon: Smartphone,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200/80',
      textColor: 'text-blue-600',
      title: t.serviceMobileTitle,
      desc: t.serviceMobileDesc,
      features: ['Flutter & Dart High Performance', 'Offline-First Local Storage', 'iOS & Android Native Experience', 'On-Device Cryptography'],
    },
    {
      id: 'games',
      icon: Gamepad2,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200/80',
      textColor: 'text-purple-600',
      title: t.serviceGamesTitle,
      desc: t.serviceGamesDesc,
      features: ['3D Cartoon Vector Pipeline', 'Party & Social Group Dynamics', 'Zero-Latency Offline Play', 'Custom Sound & Motion Physics'],
    },
    {
      id: 'cloud',
      icon: Globe2,
      color: 'from-sky-500 to-cyan-600',
      bgColor: 'bg-sky-50',
      borderColor: 'border-sky-200/80',
      textColor: 'text-sky-600',
      title: t.serviceCloudTitle,
      desc: t.serviceCloudDesc,
      features: ['React & Next.js Ecosystem', 'Serverless Cloud Functions', 'Dynamic High-Speed Dashboards', 'Global CDN Distribution'],
    },
    {
      id: 'enterprise',
      icon: LayoutDashboard,
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200/80',
      textColor: 'text-emerald-600',
      title: t.serviceEnterpriseTitle,
      desc: t.serviceEnterpriseDesc,
      features: ['Electron Desktop Suite', 'Cross-Project Database Telemetry', 'Secure Subscription Governance', 'Custom Executive Analytics'],
    },
  ];

  return (
    <section id="services" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold mb-4">
            <Cpu className="w-3.5 h-3.5 text-blue-600" />
            <span>{t.servicesBadge}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug mb-4">
            {t.servicesTitle}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-medium">
            {t.servicesSubtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative bg-slate-50/70 hover:bg-white p-7 sm:p-9 rounded-3xl border border-slate-200/80 hover:border-slate-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-2xl ${item.bgColor} ${item.borderColor} border flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-200`}>
                      <Icon className={`w-7 h-7 ${item.textColor}`} />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-200/60">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {item.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                        <CheckCircle2 className={`w-4 h-4 ${item.textColor} shrink-0`} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
