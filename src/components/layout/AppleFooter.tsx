import type { FC } from 'react';
import { handleSmoothScrollClick } from '../../utils/smoothScroll';
import { playAppleClick } from '../../utils/soundEffects';
import { useLanguage } from '../../LanguageContext';

export const AppleFooter: FC = () => {
  const { language, t } = useLanguage();

  const onLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    handleSmoothScrollClick(e, href, 85, 850, () => {
      playAppleClick();
    });
  };

  return (
    <footer className="bg-[#f5f5f7] border-t border-black/[0.06] text-[#6e6e73] text-xs py-14 font-cairo">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Footnote statement */}
        <div className="border-b border-black/[0.06] pb-6 space-y-4 text-start leading-relaxed">
          <div className="flex items-center gap-3">
            <img
              src="/assets/logos/blotx-tech-logo.png"
              alt="Blotx Tech"
              className="w-10 h-10 rounded-xl object-contain bg-black p-1 shadow-sm"
            />
            <div>
              <span className="font-bold text-sm text-[#1d1d1f] tracking-tight block">BLOTX TECH</span>
              <span className="text-[11px] text-[#86868b]">The Human Lifestyle &amp; Precision Ecosystem</span>
            </div>
          </div>
          <p>
            {t.footerDisclaimer1}
          </p>
          <p>
            {t.footerDisclaimer2}
          </p>
        </div>

        {/* Links directory */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-start">
          <div className="space-y-3">
            <h4 className="font-semibold text-[#1d1d1f]">{t.footerEcosystemHeader}</h4>
            <ul className="space-y-2">
              <li><a href="#devices" onClick={(e) => onLinkClick(e, '#devices')} className="hover:text-[#1d1d1f] transition-colors cursor-pointer">{language === 'ar' ? 'معرض الأجهزة 3D التفاعلي' : '3D Interactive Devices'}</a></li>
              <li><a href="#taht-experience" onClick={(e) => onLinkClick(e, '#taht-experience')} className="hover:text-[#1d1d1f] transition-colors cursor-pointer">{language === 'ar' ? 'تحت البلاطة (المال والأمان)' : 'Taht El Balata (Vaults & Security)'}</a></li>
              <li><a href="#efteker-experience" onClick={(e) => onLinkClick(e, '#efteker-experience')} className="hover:text-[#1d1d1f] transition-colors cursor-pointer">{language === 'ar' ? 'افتكر (الذاكرة وحفظ الأولويات)' : 'Eftekir (Cognitive Second Brain)'}</a></li>
              <li><a href="#synergy-matrix" onClick={(e) => onLinkClick(e, '#synergy-matrix')} className="hover:text-[#1d1d1f] transition-colors cursor-pointer">{language === 'ar' ? 'الترابط البيني الذكي (AirDrop)' : 'Smart AirDrop Symbiosis'}</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-[#1d1d1f]">{t.footerPhilosophyHeader}</h4>
            <ul className="space-y-2">
              <li><a href="#philosophy" onClick={(e) => onLinkClick(e, '#philosophy')} className="hover:text-[#1d1d1f] transition-colors cursor-pointer">{language === 'ar' ? 'سد ثغرات الحياة' : 'Human Empathy Engine'}</a></li>
              <li><a href="#philosophy" onClick={(e) => onLinkClick(e, '#philosophy')} className="hover:text-[#1d1d1f] transition-colors cursor-pointer">{language === 'ar' ? 'أسلوب الحياة اليومي' : 'Ambient Lifestyle'}</a></li>
              <li><a href="#calculator" onClick={(e) => onLinkClick(e, '#calculator')} className="hover:text-[#1d1d1f] transition-colors cursor-pointer">{language === 'ar' ? 'حاسبة الأمان المالي' : 'Savings Calculator'}</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-[#1d1d1f]">{t.footerValuesHeader}</h4>
            <ul className="space-y-2">
              <li><a href="#philosophy" onClick={(e) => onLinkClick(e, '#philosophy')} className="hover:text-[#1d1d1f] transition-colors cursor-pointer">{language === 'ar' ? 'الخصوصية أولاً (بدون تتبع)' : 'Privacy-First (No Telemetry)'}</a></li>
              <li><a href="#philosophy" onClick={(e) => onLinkClick(e, '#philosophy')} className="hover:text-[#1d1d1f] transition-colors cursor-pointer">{language === 'ar' ? 'تشفير محلي 100%' : '100% On-Device Encryption'}</a></li>
              <li><a href="#faq" onClick={(e) => onLinkClick(e, '#faq')} className="hover:text-[#1d1d1f] transition-colors cursor-pointer">{language === 'ar' ? 'الأسئلة الشائعة والأمان' : 'FAQ & Security Architecture'}</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-[#1d1d1f]">{t.footerAboutHeader}</h4>
            <ul className="space-y-2">
              <li><a href="#devices" onClick={(e) => onLinkClick(e, '#devices')} className="hover:text-[#1d1d1f] transition-colors cursor-pointer">{language === 'ar' ? 'فريق العمل والابتكار' : 'Studios & Innovation'}</a></li>
              <li><a href="#synergy-matrix" onClick={(e) => onLinkClick(e, '#synergy-matrix')} className="hover:text-[#1d1d1f] transition-colors cursor-pointer">{language === 'ar' ? 'المعمارية المتكاملة' : 'Integrated Architecture'}</a></li>
              <li><span className="text-[#86868b]">{t.madeInEgypt}</span></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-black/[0.06] pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-start">
          <div>
            {t.footerCopyright}
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#1d1d1f] transition-colors">{t.footerPrivacy}</a>
            <span>•</span>
            <a href="#" className="hover:text-[#1d1d1f] transition-colors">{t.footerTerms}</a>
            <span>•</span>
            <a href="#" className="hover:text-[#1d1d1f] transition-colors">{t.footerSupport}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
