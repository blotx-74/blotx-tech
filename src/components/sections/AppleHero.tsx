import type { FC } from 'react';
import { AppleHero3D } from '../canvas/AppleHero3D';
import { ArrowLeft, Sparkles, ChevronDown } from 'lucide-react';

export const AppleHero: FC = () => {
  return (
    <section className="relative pt-12 pb-20 overflow-hidden text-center">
      {/* Background Soft Radiant Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-blue-50/60 via-emerald-50/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Subtle pill tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/[0.06] shadow-xs text-xs font-medium text-[#1d1d1f] mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#0071e3]" />
          <span>Blotx Tech • أسلوب حياة صُنع للإنسان</span>
        </div>

        {/* Hero Apple Typography */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#1d1d1f] leading-[1.12] mb-6">
          تكنولوجيا تفهم يومك.
          <br />
          <span className="text-[#6e6e73]">وتسد ما ينقصك في الحياة.</span>
        </h1>

        <p className="text-lg sm:text-xl text-[#6e6e73] max-w-2xl mx-auto leading-relaxed mb-8 font-normal">
          Blotx Tech مش مجرد تطبيقات منفصلة؛ ده إيكوسيستم متناغم يربط احتياجاتك اليومية ببعضها. من أمانك المالي مع <strong className="text-[#1d1d1f] font-semibold">«تحت البلاطة»</strong>، لصفاء ذهنك وترتيب أولوياتك مع <strong className="text-[#1d1d1f] font-semibold">«افتكر»</strong>.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <a
            href="#showcase"
            className="apple-pill-btn px-7 py-3 bg-[#0071e3] hover:bg-[#0077ed] text-white text-sm font-semibold shadow-md flex items-center gap-2"
          >
            <span>استكشف التطبيقات</span>
            <ArrowLeft className="w-4 h-4" />
          </a>
          <a
            href="#philosophy"
            className="apple-pill-btn px-7 py-3 bg-white hover:bg-neutral-50 text-[#1d1d1f] border border-black/[0.1] text-sm font-medium shadow-xs"
          >
            فلسفة ورؤية Blotx
          </a>
        </div>

        {/* 3D Interactive Devices Stage */}
        <div className="relative mt-2">
          <AppleHero3D />
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-6">
          <a
            href="#philosophy"
            className="flex flex-col items-center text-xs text-[#86868b] hover:text-[#1d1d1f] transition-colors"
          >
            <span>تعرف على الفلسفة</span>
            <ChevronDown className="w-4 h-4 mt-1 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};
