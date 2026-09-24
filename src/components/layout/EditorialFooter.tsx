import React from 'react';
import { ShieldCheck, Headphones, ExternalLink, Sparkles, Heart } from 'lucide-react';
import { useLanguage } from '../../LanguageContext';
import { scrollToSection } from '../../utils/useSmoothScroll';

interface EditorialFooterProps {
  onOpenPrivacy: () => void;
  onOpenSupport: (tab?: 'team' | 'developer' | 'docs') => void;
}

export const EditorialFooter: React.FC<EditorialFooterProps> = ({ onOpenPrivacy, onOpenSupport }) => {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <footer className="bg-[#111111] text-white pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t border-white/8 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Grid: Brand & Vision on Left, Navigation Links on Right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4 text-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1e1e1e] p-1.5 border border-[#8C7A54]/40 flex items-center justify-center">
                <img
                  src="/assets/logos/blotx-tech-logo.png"
                  alt="Blotx Tech"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-editorial-serif text-xl font-bold tracking-tight text-white block leading-none">
                  BLOTX <span className="text-[#8C7A54]">TECH</span>
                </span>
                <span className="text-[10px] tracking-widest text-[#8C7A54] uppercase font-bold">
                  Studios • Egypt
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              {isAr
                ? 'مختبر برمجيات مستقل يكرس مهاراته لبناء حلول تقنية راقية تضع خصوصية المستخدم وسيادته الرقمية فوق أي اعتبار. مطورو تطبيقي «تحت البلاطة» و «افتكر».'
                : 'Independent software engineering laboratory dedicated to crafting luxury digital instruments prioritizing user privacy and data sovereignty.'}
            </p>

            {/* Developer Mention in Footer */}
            <div className="pt-2">
              <a
                href="https://ziadmohamed.web.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-[#8C7A54]/20 border border-[#8C7A54]/30 text-neutral-300 hover:text-white text-xs font-semibold transition-all group"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#8C7A54]" />
                <span>{isAr ? 'تطوير وتصميم: زياد محمد (الموقع الشخصي ↗)' : 'Engineered by Ziad Mohamed (Portfolio ↗)'}</span>
              </a>
            </div>
          </div>

          {/* Quick Links (7 cols) */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 text-start">
            {/* Column 1: Ecosystem */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C7A54]">
                {isAr ? 'المنظومة' : 'Ecosystem'}
              </h4>
              <ul className="space-y-2 text-xs text-neutral-400">
                <li>
                  <button onClick={() => scrollToSection('works')} className="hover:text-white transition-colors cursor-pointer">
                    {isAr ? 'تطبيق افتكر (Eftekir)' : 'Eftekir App'}
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('works')} className="hover:text-white transition-colors cursor-pointer">
                    {isAr ? 'تطبيق تحت البلاطة' : 'Taht El Balata'}
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors cursor-pointer">
                    {isAr ? 'تطبيقات الموبايل' : 'Mobile Engineering'}
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors cursor-pointer">
                    {isAr ? 'منصات الويب' : 'Web Platforms'}
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: Architecture & Content */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C7A54]">
                {isAr ? 'المحتوى والمعمارية' : 'Architecture'}
              </h4>
              <ul className="space-y-2 text-xs text-neutral-400">
                <li>
                  <button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors cursor-pointer">
                    {isAr ? 'عن المطور والتقنيات' : 'About & Tech Stack'}
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('roadmaps')} className="hover:text-white transition-colors cursor-pointer">
                    {isAr ? 'المدونة والمسارات' : 'Editorial & Roadmaps'}
                  </button>
                </li>
                <li>
                  <button onClick={() => onOpenSupport('docs')} className="hover:text-white transition-colors cursor-pointer">
                    {isAr ? 'التوثيق الفني والأمان' : 'Security Whitepaper'}
                  </button>
                </li>
                <li>
                  <a href="https://github.com/blotx-74/portfolio-" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                    <span>GitHub Repos</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Legal & Support */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C7A54]">
                {isAr ? 'القانونية والدعم' : 'Legal & Support'}
              </h4>
              <ul className="space-y-2 text-xs text-neutral-400">
                <li>
                  <button
                    onClick={onOpenPrivacy}
                    className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{isAr ? 'سياسة الخصوصية الرسمية' : 'Privacy Policy'}</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onOpenSupport('team')}
                    className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Headphones className="w-3.5 h-3.5 text-[#8C7A54]" />
                    <span>{isAr ? 'مركز الدعم الفني' : 'Support Desk'}</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onOpenSupport('developer')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {isAr ? 'التواصل المباشر مع المطور' : 'Direct Developer Line'}
                  </button>
                </li>
                <li>
                  <span className="text-[10px] text-neutral-500 font-mono block pt-1">
                    {isAr ? 'قانون 151/2020 المصري' : 'Law 151/2020 Compliant'}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div className="flex items-center gap-1.5 text-center sm:text-start">
            <span>© {new Date().getFullYear()} BLOTX TECH STUDIOS. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-2">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>by</span>
            <a
              href="https://ziadmohamed.web.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8C7A54] hover:text-white font-bold transition-colors underline decoration-[#8C7A54]/40"
            >
              Ziad Mohamed
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
