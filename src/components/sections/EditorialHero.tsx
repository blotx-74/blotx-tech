import React from 'react';
import { motion } from 'framer-motion';
import {
  ExternalLink,
  ChevronDown,
  Layers,
  Sparkles,
  ShieldCheck,
  Code2,
  Coffee,
  Trophy,
} from 'lucide-react';
import { useLanguage } from '../../LanguageContext';
import { LiveCairoTime } from '../ui/LiveCairoTime';
import { scrollToSection } from '../../utils/useSmoothScroll';

export const EditorialHero: React.FC = () => {
  const { language, t } = useLanguage();
  const isAr = language === 'ar';

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 bg-[#FAF9F6] text-[#1A1A1A] overflow-hidden flex flex-col justify-between"
    >
      {/* Subtle Editorial Topographic/Architectural Glow Lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute -top-32 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#8C7A54]/15 via-transparent to-transparent blur-3xl" />
        <div className="absolute top-1/2 -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#8C7A54]/10 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 my-auto">
        {/* Top Badges Strip: Editorial Tag + Live Cairo Time + Developer Mention */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-6 sm:mb-8">
          {/* Editorial Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1A1A] text-white text-[11px] sm:text-xs font-bold tracking-wide shadow-xs border border-[#8C7A54]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8C7A54]" />
            <span className="font-editorial-serif tracking-wider">LUXURY TECH × EDITORIAL DESIGN</span>
          </div>

          {/* Cairo Live Time Capsule */}
          <LiveCairoTime />

          {/* Developer Portfolio Quick Badge */}
          <a
            href="https://ziadmohamed.web.app"
            target="_blank"
            rel="noopener noreferrer"
            title="Visit Founder's Portfolio"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-[#8C7A54] border border-[#8C7A54]/30 text-xs font-bold transition-all shadow-xs hover:shadow-md cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#8C7A54]" />
            <span>{isAr ? 'زياد محمد • المؤسس والمطور' : 'Founder: Ziad Mohamed'}</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
        </div>

        {/* Main Editorial Grid: Headline & Manifesto on Left, Founder & Passions on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Main Headline & Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-start">
            <div className="space-y-3">
              <span className="text-xs sm:text-sm font-bold text-[#8C7A54] tracking-widest uppercase block font-sans">
                {isAr ? 'منظومة التطبيقات المستقلة والأمان المالي' : 'Autonomous Software & Financial Sovereignty'}
              </span>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1A1A1A] leading-[1.12] tracking-tight">
                {isAr ? (
                  <>
                    نبتكر أدوات رقمية <br className="hidden sm:inline" />
                    تعيد صياغة <span className="text-[#8C7A54] font-editorial-serif italic font-normal">خصوصيتك</span> وهدوءك الذهني.
                  </>
                ) : (
                  <>
                    Engineering instruments <br className="hidden sm:inline" />
                    that redefine your <span className="text-[#8C7A54] font-editorial-serif italic font-normal">privacy</span> and clarity.
                  </>
                )}
              </h1>
            </div>

            <p className="text-sm sm:text-base lg:text-lg text-[#6e6e73] leading-relaxed max-w-2xl font-normal">
              {t.heroEditorialDesc}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={() => scrollToSection('works')}
                className="px-6 sm:px-8 py-3.5 rounded-full bg-[#1A1A1A] hover:bg-[#8C7A54] text-white text-xs sm:text-sm font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer border border-[#8C7A54]/30"
              >
                <Layers className="w-4 h-4 text-[#8C7A54] group-hover:text-white" />
                <span>{isAr ? 'استكشف منتجاتنا الرائدة' : 'Explore Flagship Works'}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              <a
                href="https://ziadmohamed.web.app"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-white hover:bg-neutral-50 text-[#1A1A1A] border border-[#1A1A1A]/15 text-xs sm:text-sm font-bold transition-all shadow-xs hover:shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#8C7A54]" />
                <span>{isAr ? 'موقع المطور: ziadmohamed.web.app' : 'Developer Portfolio'}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-3 text-xs text-[#6e6e73] font-medium border-t border-[#1A1A1A]/8">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#8C7A54]" />
                <span>{isAr ? 'تشفير عتادي محلي AES-256' : 'On-Device AES-256 GCM'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8C7A54]" />
                <span>{isAr ? 'بدون خوادم سحابية أو تتبع' : 'Zero Cloud Telemetry'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8C7A54]" />
                <span>{isAr ? 'تطبيقات أصلية 100%' : '100% Native Architecture'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Founder Card + Passions Signature (5 cols) */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="editorial-card p-6 sm:p-8 bg-gradient-to-b from-white to-[#F7F7F4] relative border border-[#1A1A1A]/10 shadow-xl space-y-6"
            >
              {/* Founder Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1 text-start">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#8C7A54]/15 text-[#8C7A54] text-[10px] font-bold uppercase tracking-wider">
                    {isAr ? 'القيادة الهندسية' : 'Lead Engineering'}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#1A1A1A]">
                    {isAr ? 'زياد محمد' : 'Ziad Mohamed'}
                  </h3>
                  <p className="text-xs font-semibold text-[#8C7A54] font-editorial-serif tracking-wide">
                    Lead Developer &amp; Founder • BLOTX TECH
                  </p>
                </div>

                <div className="w-14 h-14 rounded-2xl bg-[#1A1A1A] p-2 border border-[#8C7A54]/40 shadow-sm flex items-center justify-center shrink-0">
                  <img
                    src="/assets/logos/blotx-tech-logo.png"
                    alt="Blotx Tech"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Founder Statement */}
              <p className="text-xs sm:text-sm text-[#6e6e73] leading-relaxed text-start border-s-2 border-[#8C7A54] ps-3.5">
                {isAr
                  ? '«نحن لا نصنع قوالب مكررة، بل نبني منظومات برمجية تحترم خصوصية الإنسان، تعيش معه دون انقطاع، وتمنحه السيادة الكاملة على بياناته.»'
                  : '"We do not build generic templates; we engineer autonomous software ecosystems that respect personal sovereignty and operate without compromise."'}
              </p>

              {/* Passions Signature (from DESIGN.md) */}
              <div className="space-y-2 pt-2 border-t border-[#1A1A1A]/8 text-start">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C7A54]">
                  {isAr ? 'شغف حقيقي وتفاصيل شخصية' : 'Authentic Passions'}
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-[#1A1A1A] text-xs font-semibold transition-colors">
                    <Coffee className="w-3.5 h-3.5 text-[#8C7A54]" />
                    <span>{t.passionCoffee}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-[#1A1A1A] text-xs font-semibold transition-colors">
                    <Trophy className="w-3.5 h-3.5 text-blue-600" />
                    <span>{t.passionBarca}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-[#1A1A1A] text-xs font-semibold transition-colors">
                    <Code2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{t.passionCode}</span>
                  </span>
                </div>
              </div>

              {/* Direct Portfolio Link Button */}
              <a
                href="https://ziadmohamed.web.app"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-[#1A1A1A] hover:bg-[#8C7A54] text-white text-xs font-bold transition-all shadow-md group cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#8C7A54] group-hover:text-white" />
                  <span>{isAr ? 'تصفح محفظة أعمال زياد محمد الكاملة' : "Visit Ziad Mohamed's Full Portfolio"}</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Stats Banner (from DESIGN.md) */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-[#1A1A1A]/10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {/* Stat 1 */}
            <div className="editorial-card p-5 sm:p-6 bg-white/90 text-start space-y-1">
              <span className="font-editorial-serif text-3xl sm:text-4xl font-bold text-[#8C7A54]">
                {t.statsYears}
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-[#1A1A1A]">
                {t.statsYearsLabel}
              </h4>
              <p className="text-[11px] text-[#6e6e73]">
                {isAr ? 'تركيز على هندسة النظم، أمان التشفير، والواجهات السينمائية' : 'Focusing on clean systems architecture & cryptographic safety'}
              </p>
            </div>

            {/* Stat 2 */}
            <div className="editorial-card p-5 sm:p-6 bg-white/90 text-start space-y-1">
              <span className="font-editorial-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
                {t.statsProducts}
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-[#1A1A1A]">
                {t.statsProductsLabel}
              </h4>
              <p className="text-[11px] text-[#6e6e73]">
                {isAr ? 'تطبيق تحت البلاطة المالي وتطبيق افتكر للذاكرة الرقمية' : 'Taht El Balata (Personal Finance) & Eftekir (Digital Brain)'}
              </p>
            </div>

            {/* Stat 3 */}
            <div className="editorial-card p-5 sm:p-6 bg-white/90 text-start space-y-1">
              <span className="font-editorial-serif text-3xl sm:text-4xl font-bold text-[#8C7A54]">
                {t.statsHours}
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-[#1A1A1A]">
                {t.statsHoursLabel}
              </h4>
              <p className="text-[11px] text-[#6e6e73]">
                {isAr ? 'كتابة وتطوير أسطر برمجية أصلية بدون قوالب جاهزة' : 'Pure native software craft without generic boilerplates'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
