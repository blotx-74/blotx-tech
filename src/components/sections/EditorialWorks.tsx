import React, { useState } from 'react';
import {
  ShieldCheck,
  Brain,
  Lock,
  ScanLine,
  Download,
  Eye,
  X,
} from 'lucide-react';
import { useLanguage } from '../../LanguageContext';

export const EditorialWorks: React.FC = () => {
  const { language, t } = useLanguage();
  const [activePreview, setActivePreview] = useState<'eftekir' | 'taht' | null>(null);

  const isAr = language === 'ar';

  return (
    <section id="works" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#F7F7F4] border-t border-[#1A1A1A]/8">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-start">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8C7A54]/12 text-[#8C7A54] text-xs font-bold uppercase tracking-wider">
              <span>{t.worksTag}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#1A1A1A] tracking-tight">
              {t.worksTitle}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#6e6e73] max-w-md leading-relaxed">
            {t.worksSubtitle}
          </p>
        </div>

        {/* Feature Cards Grid (Two Large Feature Cards) */}
        <div className="space-y-12">
          {/* Card 1: Eftekir (Digital Memory & Mental Clarity) */}
          <div className="editorial-card bg-white p-6 sm:p-10 lg:p-12 overflow-hidden relative border border-[#1A1A1A]/10 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Product Info & Editorial Narrative (7 cols) */}
              <div className="lg:col-span-7 space-y-6 text-start">
                {/* Meta Top: Category + Year + Launch Badge */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-[#1A1A1A] text-white text-[11px] font-bold tracking-widest uppercase font-mono">
                    DIGITAL MEMORY • العقل الثاني
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#8C7A54]/15 text-[#8C7A54] text-[11px] font-bold">
                    Mental Clarity • 2026
                  </span>
                </div>

                {/* Title & Slogan */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 p-1.5 border border-black/10 flex items-center justify-center">
                      <img
                        src="/assets/logos/efteker-logo.png"
                        alt="افتكر Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-[#1A1A1A]">
                      {isAr ? 'تطبيق افتكر (Eftekir)' : 'Eftekir App (افتكر)'}
                    </h3>
                  </div>
                  <p className="text-sm font-semibold text-[#8C7A54]">
                    {isAr
                      ? 'مستودع أفكارك، فواتيرك، وضماناتك الذكية — مساحتك للوضوح الذهني التام.'
                      : 'Cognitive Second Brain: Smart Receipts, Warranties & Mental Clarity.'}
                  </p>
                </div>

                {/* Narrative */}
                <p className="text-xs sm:text-sm text-[#6e6e73] leading-relaxed">
                  {isAr
                    ? 'صُمم تطبيق افتكر ليكون عقلك الرقمي الثاني. بفضل تقنية المسح الضوئي الذكية المعتمدة على معالجة محلية On-Device OCR، يقوم التطبيق بقراءة الفواتير والضمانات، استخراج مدد الانتهاء، وتنظيم أفكارك اليومية ومذكراتك دون إرسال بكسل واحد إلى أي خادم خارجي.'
                    : 'Engineered as your cognitive second brain. Powered by on-device OCR machine learning, Eftekir extracts warranty dates, archives receipts, and organizes notes with zero cloud dependence.'}
                </p>

                {/* Key Roles & Specifications Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-start">
                  <div className="p-3 rounded-xl bg-neutral-50 border border-black/[0.05]">
                    <span className="text-[10px] font-bold text-[#8C7A54] uppercase block">
                      {isAr ? 'الدور الهندسي' : 'Architecture'}
                    </span>
                    <span className="text-xs font-bold text-[#1A1A1A]">Full Systems &amp; UI</span>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-50 border border-black/[0.05]">
                    <span className="text-[10px] font-bold text-[#8C7A54] uppercase block">
                      {isAr ? 'التقنية الأساسية' : 'Core Tech'}
                    </span>
                    <span className="text-xs font-bold text-[#1A1A1A]">Flutter &amp; ML Kit OCR</span>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-50 border border-black/[0.05]">
                    <span className="text-[10px] font-bold text-[#8C7A54] uppercase block">
                      {isAr ? 'الخصوصية' : 'Privacy'}
                    </span>
                    <span className="text-xs font-bold text-[#1A1A1A]">100% Offline Local</span>
                  </div>
                </div>

                {/* Feature Highlights */}
                <div className="space-y-2 pt-2 border-t border-black/[0.06]">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#1A1A1A]">
                    <Brain className="w-4 h-4 text-[#8C7A54]" />
                    <span>{isAr ? 'استخراج ذكي لبيانات الضمانات ومواعيد الصيانة' : 'Intelligent warranty passport extraction'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#1A1A1A]">
                    <ScanLine className="w-4 h-4 text-[#8C7A54]" />
                    <span>{isAr ? 'فحص سريع للفواتير الورقية بأعلى دقة' : 'Instant high-resolution document scanner'}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <a
                    href="https://play.google.com/store/apps"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full bg-[#1A1A1A] hover:bg-[#8C7A54] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2"
                  >
                    <Download className="w-3.5 h-3.5 text-[#8C7A54] group-hover:text-white" />
                    <span>{isAr ? 'تحميل تطبيق افتكر' : 'Download Eftekir'}</span>
                  </a>
                  <button
                    onClick={() => setActivePreview('eftekir')}
                    className="px-5 py-2.5 rounded-full bg-white hover:bg-neutral-100 text-[#1A1A1A] border border-black/10 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#8C7A54]" />
                    <span>{isAr ? 'معاينة الواجهة والشاشة' : 'Preview Interface'}</span>
                  </button>
                </div>
              </div>

              {/* Product Visual Mockup / Showcase Frame (5 cols) */}
              <div className="lg:col-span-5 flex items-center justify-center">
                <div className="relative w-full max-w-[320px] aspect-[9/18] rounded-[38px] p-3 bg-[#1A1A1A] border-4 border-[#8C7A54]/30 shadow-2xl overflow-hidden flex flex-col justify-center items-center">
                  <div className="absolute top-2.5 w-24 h-4 bg-black rounded-full z-20" />
                  <img
                    src="/assets/mockups/efteker-screen.png"
                    alt="Eftekir App Screenshot"
                    className="w-full h-full object-cover rounded-[28px]"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/assets/mockups/afteker-screen-2.png';
                    }}
                  />
                  <div className="absolute bottom-3 inset-x-3 p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-black/10 text-start shadow-md">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-[#1A1A1A]">افتكر • Eftekir 2.0</span>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        {isAr ? 'مشفر محلياً' : 'Encrypted'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Taht El Balata (Personal Finance & Financial Clarity) */}
          <div className="editorial-card bg-white p-6 sm:p-10 lg:p-12 overflow-hidden relative border border-[#1A1A1A]/10 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Product Info & Editorial Narrative (7 cols) */}
              <div className="lg:col-span-7 space-y-6 text-start">
                {/* Meta Top: Category + Year + Launch Badge */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-[#1A1A1A] text-white text-[11px] font-bold tracking-widest uppercase font-mono">
                    PERSONAL FINANCE • أمان مالي
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#8C7A54]/15 text-[#8C7A54] text-[11px] font-bold">
                    Financial Clarity • 2026
                  </span>
                </div>

                {/* Title & Slogan */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 p-1.5 border border-black/10 flex items-center justify-center">
                      <img
                        src="/assets/logos/taht-elbalata-logo.png"
                        alt="تحت البلاطة Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-[#1A1A1A]">
                      {isAr ? 'تطبيق تحت البلاطة (Taht El Balata)' : 'Taht El Balata (تحت البلاطة)'}
                    </h3>
                  </div>
                  <p className="text-sm font-semibold text-[#8C7A54]">
                    {isAr
                      ? 'خزنتك المالية المستقلة — إدارة السيولة، الذهب، العملات، والميزانيات بأمان عسكري.'
                      : 'Sovereign Financial Vault: Cash, Gold, Currencies & Budget Clarity.'}
                  </p>
                </div>

                {/* Narrative */}
                <p className="text-xs sm:text-sm text-[#6e6e73] leading-relaxed">
                  {isAr
                    ? 'تطبيق «تحت البلاطة» هو الرد الهندسي على الفوضى المالية والتتبع المصرفي. يوفر لك خزائن مشفرة محلياً بتشفير AES-256 GCM بدون الحاجة لحساب بنكي، بدون إعلانات، وبدون أي اتصال بالإنترنت. يمنحك الرؤية الشاملة لمدخراتك وسيولتك بوضوح تام.'
                    : 'The cryptographic answer to financial chaos and invasive banking telemetry. Taht El Balata provides local AES-256 GCM encrypted vaults to track cash, gold, foreign currencies, and budgets without accounts or tracking.'}
                </p>

                {/* Key Roles & Specifications Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-start">
                  <div className="p-3 rounded-xl bg-neutral-50 border border-black/[0.05]">
                    <span className="text-[10px] font-bold text-[#8C7A54] uppercase block">
                      {isAr ? 'الدور الهندسي' : 'Architecture'}
                    </span>
                    <span className="text-xs font-bold text-[#1A1A1A]">Security &amp; Vaults</span>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-50 border border-black/[0.05]">
                    <span className="text-[10px] font-bold text-[#8C7A54] uppercase block">
                      {isAr ? 'التشفير' : 'Cipher'}
                    </span>
                    <span className="text-xs font-bold text-[#1A1A1A]">AES-256 GCM Local</span>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-50 border border-black/[0.05]">
                    <span className="text-[10px] font-bold text-[#8C7A54] uppercase block">
                      {isAr ? 'الاتصال' : 'Connectivity'}
                    </span>
                    <span className="text-xs font-bold text-[#1A1A1A]">AirDrop P2P Sync</span>
                  </div>
                </div>

                {/* Feature Highlights */}
                <div className="space-y-2 pt-2 border-t border-black/[0.06]">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#1A1A1A]">
                    <Lock className="w-4 h-4 text-[#8C7A54]" />
                    <span>{isAr ? 'حساب أسعار الذهب والعملات وتحديثها لحظياً' : 'Real-time gold & currency valuations'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#1A1A1A]">
                    <ShieldCheck className="w-4 h-4 text-[#8C7A54]" />
                    <span>{isAr ? 'انعدام تام للإعلانات أو التتبع أو مشاركة البيانات' : 'Zero ads, zero data mining, zero tracking'}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <a
                    href="https://play.google.com/store/apps"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full bg-[#1A1A1A] hover:bg-[#8C7A54] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2"
                  >
                    <Download className="w-3.5 h-3.5 text-[#8C7A54] group-hover:text-white" />
                    <span>{isAr ? 'تحميل تطبيق تحت البلاطة' : 'Download Taht El Balata'}</span>
                  </a>
                  <button
                    onClick={() => setActivePreview('taht')}
                    className="px-5 py-2.5 rounded-full bg-white hover:bg-neutral-100 text-[#1A1A1A] border border-black/10 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#8C7A54]" />
                    <span>{isAr ? 'معاينة الواجهة والشاشة' : 'Preview Interface'}</span>
                  </button>
                </div>
              </div>

              {/* Product Visual Mockup / Showcase Frame (5 cols) */}
              <div className="lg:col-span-5 flex items-center justify-center">
                <div className="relative w-full max-w-[320px] aspect-[9/18] rounded-[38px] p-3 bg-[#1A1A1A] border-4 border-[#8C7A54]/30 shadow-2xl overflow-hidden flex flex-col justify-center items-center">
                  <div className="absolute top-2.5 w-24 h-4 bg-black rounded-full z-20" />
                  <img
                    src="/assets/mockups/taht-screen.png"
                    alt="Taht El Balata Screenshot"
                    className="w-full h-full object-cover rounded-[28px]"
                  />
                  <div className="absolute bottom-3 inset-x-3 p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-black/10 text-start shadow-md">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-[#1A1A1A]">تحت البلاطة • Balata 2.0</span>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                        {isAr ? 'أمان عسكري' : 'Military Grade'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Screenshot Preview Modal */}
      {activePreview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setActivePreview(null)}
        >
          <div
            className="relative max-w-sm w-full bg-[#1A1A1A] rounded-[36px] p-3 border-2 border-[#8C7A54]/50 shadow-2xl flex flex-col items-center animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePreview(null)}
              className="absolute -top-3 -right-3 sm:-right-4 w-9 h-9 rounded-full bg-[#8C7A54] text-black hover:bg-white flex items-center justify-center font-bold shadow-lg transition-all cursor-pointer z-30"
              title="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full aspect-[9/18] rounded-[28px] overflow-hidden bg-black relative">
              <img
                src={
                  activePreview === 'eftekir'
                    ? '/assets/mockups/efteker-screen.png'
                    : '/assets/mockups/taht-screen.png'
                }
                alt="App Screenshot Full Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  if (activePreview === 'eftekir') {
                    (e.currentTarget as HTMLImageElement).src = '/assets/mockups/afteker-screen-2.png';
                  }
                }}
              />
            </div>

            <div className="w-full mt-3 p-3 rounded-2xl bg-white/10 text-white text-center text-xs font-bold">
              <span>
                {activePreview === 'eftekir'
                  ? isAr
                    ? 'معاينة حية: تطبيق افتكر (حفظ الفواتير والضمانات)'
                    : 'Live Preview: Eftekir (OCR & Memory Brain)'
                  : isAr
                  ? 'معاينة حية: تطبيق تحت البلاطة (الخزنة المالية المشفرة)'
                  : 'Live Preview: Taht El Balata (Encrypted Financial Vault)'}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
