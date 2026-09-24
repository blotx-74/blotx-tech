import React from 'react';
import {
  Terminal,
  Sparkles,
  ExternalLink,
  Milestone,
  CheckCircle,
} from 'lucide-react';
import { useLanguage } from '../../LanguageContext';

export const EditorialAboutBento: React.FC = () => {
  const { language, t } = useLanguage();
  const isAr = language === 'ar';

  const timelineSteps = [
    {
      year: '2023 - 2024',
      title: isAr ? 'الانطلاق والبحث المعماري' : 'Genesis & Architectural Research',
      desc: isAr
        ? 'تأسيس فلسفة Blotx Tech الهندسية: رفض جمع بيانات المستخدمين، والتركيز على أجهزة الهواتف الذكية كبيئات تشفير مستقلة.'
        : 'Founding Blotx Tech engineering manifesto: rejecting surveillance capitalism and embracing on-device cryptography.',
    },
    {
      year: '2025',
      title: isAr ? 'هندسة «تحت البلاطة» و «افتكر»' : 'Engineering the Core Ecosystem',
      desc: isAr
        ? 'بناء محرك التشفير AES-256 GCM محلياً، وتطوير معالج OCR لاستخراج الفواتير والضمانات بأداء 60/120fps عبر إطار عمل Flutter.'
        : 'Building local AES-256 GCM keychains, on-device OCR models, and crafting 120fps responsive Flutter architectures.',
    },
    {
      year: '2026',
      title: isAr ? 'إطلاق الهوية الرقمية والإنتاج العالمي' : 'Digital Brand Identity & Flagship Release',
      desc: isAr
        ? 'إطلاق المنظومة بالكامل على الويب والمتاجر، مع بروتوكول المصافحة اللاسلكي AirDrop ونظام الخصوصية المتوافق مع قانون 151/2020.'
        : 'Releasing the complete ecosystem, P2P AirDrop sync, and legal compliance under Egyptian Data Protection Law 151/2020.',
    },
  ];

  const techStack = [
    { name: 'Flutter', category: 'Mobile Core', level: 'Expert', icon: '📱' },
    { name: 'Dart', category: 'Language', level: 'Native', icon: '🎯' },
    { name: 'React 19', category: 'Web Platform', level: 'Advanced', icon: '⚛️' },
    { name: 'TypeScript', category: 'Strict Typing', level: 'Enterprise', icon: '🔷' },
    { name: 'Tailwind CSS', category: 'Design System', level: 'Mastery', icon: '🎨' },
    { name: 'Firebase', category: 'Cloud Infrastructure', level: 'Production', icon: '🔥' },
    { name: 'Node.js', category: 'Backend Runtimes', level: 'Solid', icon: '🟢' },
    { name: 'Figma', category: 'Editorial UI/UX', level: 'Craftsman', icon: '✒️' },
  ];

  return (
    <section id="about" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A] text-white relative overflow-hidden">
      {/* Background Gold Ambient Glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-[#8C7A54]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-[#8C7A54]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-start">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8C7A54]/20 border border-[#8C7A54]/30 text-[#8C7A54] text-xs font-bold uppercase tracking-wider">
              <span>{t.aboutTag}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              {t.aboutTitle}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md leading-relaxed">
            {isAr
              ? 'نبذة شاملة عن الرحلة المعمارية، ترسانة التقنيات المستخدمة، ومطور المنظومة زياد محمد.'
              : 'A deep look into our engineering trajectory, battle-tested tech stack, and lead developer Ziad Mohamed.'}
          </p>
        </div>

        {/* Bento Grid: Founder Spotlight (4 cols) + Tech Stack & Timeline (8 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Lead Developer & Founder Spotlight Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="editorial-card-dark p-6 sm:p-8 bg-[#222222] border border-[#8C7A54]/35 space-y-6 text-start relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#8C7A54]/20 rounded-full blur-2xl pointer-events-none" />

              {/* Founder Header */}
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8C7A54]/25 text-[#8C7A54] text-[10px] font-bold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-[#8C7A54]" />
                  <span>{isAr ? 'المؤسس والمطور الرئيسي' : 'Lead Architect & Founder'}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {t.aboutLeadDev}
                </h3>
                <p className="text-xs font-bold text-[#8C7A54] font-editorial-serif tracking-wide">
                  {t.aboutLeadDevRole}
                </p>
              </div>

              {/* Bio & Philosophy */}
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {t.aboutLeadDevBio}
              </p>

              {/* Developer Highlights List */}
              <div className="space-y-2.5 pt-2 border-t border-white/10 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#8C7A54] shrink-0" />
                  <span>{isAr ? 'أكثر من 4 سنوات في بناء الأنظمة وهندسة الواجهات' : '4+ Years Engineering Clean Scalable Systems'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#8C7A54] shrink-0" />
                  <span>{isAr ? 'شغف بالكود النظيف، القهوة المختصة، وتجارب المستخدم الاستثنائية' : 'Passionate for Clean Code, Craft, & Fluid UX'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#8C7A54] shrink-0" />
                  <span>{isAr ? 'إطلاق كامل لتطبيقي تحت البلاطة وافتكر' : 'Architected & Shipped Taht El Balata & Eftekir'}</span>
                </div>
              </div>

              {/* PROMINENT DIRECT LINK TO DEVELOPER PORTFOLIO */}
              <div className="pt-4 border-t border-white/10">
                <a
                  href="https://ziadmohamed.web.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-[#8C7A54] to-[#B5A27A] hover:brightness-110 text-black font-bold text-xs shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-black" />
                    <span>{isAr ? 'زيارة الموقع الشخصي: ziadmohamed.web.app' : 'Visit Portfolio: ziadmohamed.web.app'}</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-black" />
                </a>
                <span className="block text-[11px] text-neutral-400 mt-2 text-center">
                  {isAr ? 'تصفح كافة أعمال زياد محمد وخبراته الهندسية' : "Explore Ziad's full engineering works & story"}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Timeline & Tech Bento Grid (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Timeline (رحلة التطور) */}
            <div className="editorial-card-dark p-6 sm:p-8 bg-[#202020] border border-white/10 space-y-6 text-start">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <Milestone className="w-5 h-5 text-[#8C7A54]" />
                <span>{isAr ? 'المسار الزمني لتطور المنظومة (Timeline)' : 'Evolutionary Trajectory & Milestones'}</span>
              </div>

              <div className="space-y-6 relative before:absolute before:inset-y-0 before:start-2.5 before:w-0.5 before:bg-[#8C7A54]/30 ps-6">
                {timelineSteps.map((step, idx) => (
                  <div key={idx} className="relative space-y-1">
                    <div className="absolute -start-[31px] top-1 w-3 h-3 rounded-full bg-[#8C7A54] border-2 border-[#1A1A1A]" />
                    <span className="text-[11px] font-mono font-bold text-[#8C7A54] tracking-wider uppercase">
                      {step.year}
                    </span>
                    <h4 className="text-sm font-bold text-white">
                      {step.title}
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bento Grid: Tech Arsenal */}
            <div className="editorial-card-dark p-6 sm:p-8 bg-[#202020] border border-white/10 space-y-4 text-start">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white font-bold text-base">
                  <Terminal className="w-5 h-5 text-[#8C7A54]" />
                  <span>{isAr ? 'ترسانة التقنيات (Tech Arsenal)' : 'Core Technology Stack'}</span>
                </div>
                <span className="text-[10px] font-mono text-[#8C7A54] tracking-widest uppercase">
                  Production-Ready
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {techStack.map((tech, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-[#181818] border border-white/8 hover:border-[#8C7A54]/50 transition-all space-y-1 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base">{tech.icon}</span>
                      <span className="text-[9px] font-mono text-[#8C7A54] font-bold px-1.5 py-0.5 rounded bg-black/40">
                        {tech.level}
                      </span>
                    </div>
                    <div className="font-bold text-xs text-white group-hover:text-[#8C7A54] transition-colors">
                      {tech.name}
                    </div>
                    <div className="text-[10px] text-neutral-400 truncate">
                      {tech.category}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
