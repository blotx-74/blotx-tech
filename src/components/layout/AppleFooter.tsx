import type { FC } from 'react';
import { handleSmoothScrollClick } from '../../utils/smoothScroll';
import { playAppleClick } from '../../utils/soundEffects';
import { useLanguage } from '../../LanguageContext';

interface AppleFooterProps {
  onOpenPrivacy?: () => void;
  onOpenSupport?: (tab?: 'team' | 'developer' | 'docs') => void;
}

export const AppleFooter: FC<AppleFooterProps> = ({ onOpenPrivacy, onOpenSupport }) => {
  const { language, t } = useLanguage();

  const onLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    handleSmoothScrollClick(e, href, 85, 850, () => {
      playAppleClick();
    });
  };

  return (
    <footer className="bg-[#f5f5f7] dark:bg-[#07080a] border-t border-black/[0.06] dark:border-white/10 text-[#6e6e73] dark:text-[#98989f] text-xs py-14 font-cairo transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Footnote statement */}
        <div className="border-b border-black/[0.06] dark:border-white/10 pb-6 space-y-4 text-start leading-relaxed">
          <div className="flex items-center gap-3">
            <img
              src="/assets/logos/blotx-tech-logo.png"
              alt="Blotx Tech"
              className="w-10 h-10 rounded-xl object-contain bg-black p-1 shadow-sm border border-white/10"
            />
            <div>
              <span className="font-bold text-sm text-[#1d1d1f] dark:text-white tracking-tight block">BLOTX TECH</span>
              <span className="text-[11px] text-[#86868b] dark:text-[#a1a1a6]">The Human Lifestyle &amp; Precision Ecosystem</span>
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
            <h4 className="font-semibold text-[#1d1d1f] dark:text-white">{t.footerEcosystemHeader}</h4>
            <ul className="space-y-2">
              <li><a href="#devices" onClick={(e) => onLinkClick(e, '#devices')} className="hover:text-[#1d1d1f] dark:hover:text-white transition-colors cursor-pointer">{language === 'ar' ? 'معرض الأجهزة 3D التفاعلي' : '3D Interactive Devices'}</a></li>
              <li><a href="#taht-experience" onClick={(e) => onLinkClick(e, '#taht-experience')} className="hover:text-[#1d1d1f] dark:hover:text-white transition-colors cursor-pointer">{language === 'ar' ? 'تحت البلاطة (المال والأمان)' : 'Taht El Balata (Vaults & Security)'}</a></li>
              <li><a href="#efteker-experience" onClick={(e) => onLinkClick(e, '#efteker-experience')} className="hover:text-[#1d1d1f] dark:hover:text-white transition-colors cursor-pointer">{language === 'ar' ? 'افتكر (الذاكرة وحفظ الأولويات)' : 'Eftekir (Cognitive Second Brain)'}</a></li>
              <li><a href="#synergy-matrix" onClick={(e) => onLinkClick(e, '#synergy-matrix')} className="hover:text-[#1d1d1f] dark:hover:text-white transition-colors cursor-pointer">{language === 'ar' ? 'الترابط البيني الذكي (AirDrop)' : 'Smart AirDrop Symbiosis'}</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-[#1d1d1f] dark:text-white">{t.footerPhilosophyHeader}</h4>
            <ul className="space-y-2">
              <li><a href="#philosophy" onClick={(e) => onLinkClick(e, '#philosophy')} className="hover:text-[#1d1d1f] dark:hover:text-white transition-colors cursor-pointer">{language === 'ar' ? 'سد ثغرات الحياة' : 'Human Empathy Engine'}</a></li>
              <li><a href="#philosophy" onClick={(e) => onLinkClick(e, '#philosophy')} className="hover:text-[#1d1d1f] dark:hover:text-white transition-colors cursor-pointer">{language === 'ar' ? 'أسلوب الحياة اليومي' : 'Ambient Lifestyle'}</a></li>
              <li><a href="#calculator" onClick={(e) => onLinkClick(e, '#calculator')} className="hover:text-[#1d1d1f] dark:hover:text-white transition-colors cursor-pointer">{language === 'ar' ? 'حاسبة الأمان المالي' : 'Savings Calculator'}</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-[#1d1d1f] dark:text-white">{t.footerValuesHeader}</h4>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    playAppleClick();
                    onOpenPrivacy?.();
                  }}
                  className="hover:text-[#1d1d1f] dark:hover:text-white transition-colors cursor-pointer text-left rtl:text-right"
                >
                  {language === 'ar' ? 'ميثاق الخصوصية العام' : 'General Privacy Charter'}
                </button>
              </li>
              <li>
                <a
                  href="/privacy-taht-el-balata.html"
                  className="hover:text-[#0071e3] transition-colors cursor-pointer text-left rtl:text-right block"
                >
                  {language === 'ar' ? 'خصوصية: تحت البلاطة (Google Play)' : 'Privacy: Taht El Balata (Google Play)'}
                </a>
              </li>
              <li>
                <a
                  href="/privacy-eftekir.html"
                  className="hover:text-[#0071e3] transition-colors cursor-pointer text-left rtl:text-right block"
                >
                  {language === 'ar' ? 'خصوصية: تطبيق افتكر (Google Play)' : 'Privacy: Eftekir App (Google Play)'}
                </a>
              </li>
              <li>
                <a
                  href="/delete-account.html"
                  className="hover:text-red-700 transition-colors cursor-pointer text-left rtl:text-right block text-red-500 font-semibold"
                >
                  {language === 'ar' ? 'طلب حذف الحساب والبيانات' : 'Account & Data Deletion Portal'}
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    playAppleClick();
                    onOpenSupport?.('docs');
                  }}
                  className="hover:text-[#1d1d1f] dark:hover:text-white transition-colors cursor-pointer text-left rtl:text-right"
                >
                  {language === 'ar' ? 'تشفير محلي 100% والتوثيق' : '100% On-Device Encryption & Docs'}
                </button>
              </li>
              <li><a href="#faq" onClick={(e) => onLinkClick(e, '#faq')} className="hover:text-[#1d1d1f] dark:hover:text-white transition-colors cursor-pointer">{language === 'ar' ? 'الأسئلة الشائعة والأمان' : 'FAQ & Security Architecture'}</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-[#1d1d1f] dark:text-white">{t.footerAboutHeader}</h4>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    playAppleClick();
                    onOpenSupport?.('developer');
                  }}
                  className="hover:text-[#1d1d1f] dark:hover:text-white transition-colors cursor-pointer text-left rtl:text-right"
                >
                  {language === 'ar' ? 'التواصل المباشر مع المطور' : 'Direct Developer Contact'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    playAppleClick();
                    onOpenSupport?.('team');
                  }}
                  className="hover:text-[#1d1d1f] dark:hover:text-white transition-colors cursor-pointer text-left rtl:text-right"
                >
                  {language === 'ar' ? 'فريق الدعم للويبسايت' : 'Website Support Team'}
                </button>
              </li>
              <li>
                <a
                  href="https://ziadmohamed.web.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0071e3] transition-colors cursor-pointer text-left rtl:text-right flex items-center gap-1.5 font-bold text-[#1d1d1f] dark:text-white"
                >
                  <span>{language === 'ar' ? 'موقع المطور: زياد محمد ↗' : 'Developer: Ziad Mohamed ↗'}</span>
                </a>
              </li>
              <li><span className="text-[#86868b] dark:text-[#a1a1a6]">{t.madeInEgypt}</span></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-black/[0.06] dark:border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-start">
          <div className="flex flex-wrap items-center gap-2">
            <span>{t.footerCopyright}</span>
            <span>•</span>
            <a
              href="https://ziadmohamed.web.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6e6e73] dark:text-[#a1a1a6] hover:text-[#0071e3] font-bold transition-colors inline-flex items-center gap-1"
            >
              <span>{language === 'ar' ? 'تطوير: زياد محمد ↗' : 'Dev: Ziad Mohamed ↗'}</span>
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-5">
            <button
              type="button"
              onClick={() => {
                playAppleClick();
                onOpenPrivacy?.();
              }}
              className="hover:text-[#1d1d1f] dark:hover:text-white transition-colors cursor-pointer font-medium"
            >
              {t.footerPrivacy}
            </button>
            <span>•</span>
            <a
              href="/privacy-taht-el-balata.html"
              className="hover:text-[#0071e3] transition-colors cursor-pointer font-medium"
            >
              {language === 'ar' ? 'خصوصية تحت البلاطة' : 'Taht El Balata Privacy'}
            </a>
            <span>•</span>
            <a
              href="/privacy-eftekir.html"
              className="hover:text-[#0071e3] transition-colors cursor-pointer font-medium"
            >
              {language === 'ar' ? 'خصوصية افتكر' : 'Eftekir Privacy'}
            </a>
            <span>•</span>
            <a
              href="/delete-account.html"
              className="hover:text-red-500 transition-colors cursor-pointer font-medium"
            >
              {language === 'ar' ? 'حذف الحساب' : 'Delete Account'}
            </a>
            <span>•</span>
            <button
              type="button"
              onClick={() => {
                playAppleClick();
                onOpenSupport?.('team');
              }}
              className="hover:text-[#0071e3] transition-colors cursor-pointer font-bold text-[#1d1d1f] dark:text-white"
            >
              {t.footerSupport}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
