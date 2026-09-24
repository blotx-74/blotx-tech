import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, Headphones, ExternalLink, Sparkles } from 'lucide-react';
import { useLanguage } from '../../LanguageContext';
import { LiveCairoTime } from '../ui/LiveCairoTime';
import { scrollToSection } from '../../utils/useSmoothScroll';

interface EditorialNavbarProps {
  onOpenSupport: (tab?: 'team' | 'developer' | 'docs') => void;
}

export const EditorialNavbar: React.FC<EditorialNavbarProps> = ({ onOpenSupport }) => {
  const { language, toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAr = language === 'ar';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = ['hero', 'services', 'works', 'about', 'roadmaps', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: t.navHome },
    { id: 'services', label: t.navServices },
    { id: 'works', label: t.navWorks },
    { id: 'about', label: t.navAbout },
    { id: 'roadmaps', label: t.navRoadmap },
    { id: 'contact', label: t.navContact },
  ];

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF9F6]/90 backdrop-blur-xl border-b border-[#1A1A1A]/8 shadow-xs py-3'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3">
            {/* Brand Logo & Title */}
            <div className="flex items-center gap-3 shrink-0">
              <a
                href="#hero"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('hero');
                }}
                className="group flex items-center gap-2.5 cursor-pointer"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#1A1A1A] p-1.5 shadow-sm border border-[#8C7A54]/30 flex items-center justify-center transition-transform group-hover:scale-105">
                  <img
                    src="/assets/logos/blotx-tech-logo.png"
                    alt="Blotx Tech Logo"
                    className="w-full h-full object-contain filter drop-shadow-sm"
                  />
                </div>
                <div className="flex flex-col text-start">
                  <span className="font-editorial-serif text-lg sm:text-xl font-bold tracking-tight text-[#1A1A1A] leading-none">
                    BLOTX <span className="text-[#8C7A54]">TECH</span>
                  </span>
                  <span className="text-[9px] font-sans font-semibold tracking-widest text-[#8C7A54] uppercase">
                    Studios • 2026
                  </span>
                </div>
              </a>

              {/* Cairo Live Time (Desktop) */}
              <div className="hidden lg:block ms-3">
                <LiveCairoTime />
              </div>
            </div>

            {/* Desktop Navigation Links with Gold Active Dot */}
            <nav className="hidden xl:flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/75 backdrop-blur-md border border-[#1A1A1A]/8 shadow-xs">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                      isActive
                        ? 'text-[#1A1A1A] font-bold'
                        : 'text-[#6e6e73] hover:text-[#1A1A1A] hover:bg-black/[0.03]'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavBackground"
                        className="absolute inset-0 bg-[#8C7A54]/12 border border-[#8C7A54]/30 rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8C7A54]" />
                      )}
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* Actions: Developer Portfolio Mention Button + Language + Support + Mobile Toggle */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              {/* Developer Mention Button (Prominent & Clickable) */}
              <a
                href="https://ziadmohamed.web.app"
                target="_blank"
                rel="noopener noreferrer"
                title={isAr ? 'زيارة الموقع الرسمي لمطور ومؤسس Blotx Tech' : "Visit Founder & Lead Developer's Portfolio"}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1A1A1A] hover:bg-[#8C7A54] text-white text-xs font-bold transition-all shadow-sm hover:shadow-md cursor-pointer border border-[#8C7A54]/30"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#8C7A54] group-hover:text-white" />
                <span>{isAr ? 'موقع المطور: زياد محمد' : 'Dev: Ziad Mohamed'}</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>

              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                title={isAr ? 'Switch to English' : 'التبديل إلى العربية'}
                className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-[#1A1A1A] border border-[#1A1A1A]/10 text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-[#8C7A54]" />
                <span className="font-editorial-serif uppercase">{language === 'ar' ? 'EN' : 'عربي'}</span>
              </button>

              {/* Support & Docs Modal Trigger */}
              <button
                onClick={() => onOpenSupport('team')}
                title={t.supportModalTitle}
                className="inline-flex items-center justify-center p-2 rounded-full bg-white/80 hover:bg-white text-[#1A1A1A] hover:text-[#8C7A54] border border-[#1A1A1A]/10 transition-all shadow-xs cursor-pointer"
              >
                <Headphones className="w-4 h-4" />
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Mobile Menu"
                className="xl:hidden inline-flex items-center justify-center p-2 rounded-full bg-[#1A1A1A] text-white transition-all cursor-pointer shadow-xs"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer Overlay (Absolute, Floating, Zero Layout Shift) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xs xl:hidden"
              />

              {/* Floating Menu Card */}
              <motion.div
                initial={{ opacity: 0, y: -12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.97 }}
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                className="absolute top-[calc(100%+8px)] inset-x-3 sm:inset-x-6 z-50 bg-[#FAF9F6]/95 backdrop-blur-2xl rounded-3xl p-5 shadow-2xl border border-[#1A1A1A]/10 xl:hidden space-y-4"
              >
                {/* Cairo Time Capsule inside Drawer */}
                <div className="flex items-center justify-between pb-3 border-b border-[#1A1A1A]/8">
                  <LiveCairoTime />
                  <span className="text-[11px] font-bold text-[#8C7A54] uppercase tracking-wider">
                    {isAr ? 'نسخة الموبايل' : 'Mobile Edition'}
                  </span>
                </div>

                {/* Nav Links */}
                <div className="grid grid-cols-2 gap-2">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`text-start px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#1A1A1A] text-white shadow-xs'
                            : 'bg-white/80 hover:bg-white text-[#1A1A1A] border border-[#1A1A1A]/6'
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>

                {/* Developer Portfolio Link Highlight (Prominent) */}
                <div className="pt-2 border-t border-[#1A1A1A]/8 space-y-2">
                  <a
                    href="https://ziadmohamed.web.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-gradient-to-r from-[#1A1A1A] to-[#2a2a2a] text-white text-xs font-bold shadow-md border border-[#8C7A54]/40"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#8C7A54]" />
                      <span>{isAr ? 'موقع المطور: زياد محمد (Portfolio)' : "Founder Portfolio: Ziad Mohamed"}</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-[#8C7A54]" />
                  </a>

                  {/* Support & Docs in Mobile Drawer */}
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenSupport('team');
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-white hover:bg-neutral-50 text-[#1A1A1A] border border-[#1A1A1A]/10 text-xs font-bold transition-all"
                  >
                    <Headphones className="w-4 h-4 text-[#8C7A54]" />
                    <span>{t.supportModalTitle}</span>
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
