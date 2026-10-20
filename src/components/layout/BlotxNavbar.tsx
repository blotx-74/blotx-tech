import { useState, useEffect, type FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Globe, Sparkles, MessageSquareCode } from 'lucide-react';
import { playAppleClick } from '../../utils/soundEffects';
import { handleSmoothScrollClick } from '../../utils/smoothScroll';
import { useLanguage } from '../../LanguageContext';

interface BlotxNavbarProps {
  onOpenInquiry?: () => void;
  onOpenSupport?: (tab?: 'team' | 'developer' | 'docs') => void;
}

export const BlotxNavbar: FC<BlotxNavbarProps> = ({ onOpenInquiry }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const { t, toggleLanguage } = useLanguage();

  const navLinks = [
    { href: '#services', label: t.navServices },
    { href: '#projects', label: t.navProjects },
    { href: '#standards', label: t.navStandards },
    { href: '#process', label: t.navProcess },
    { href: '#contact', label: t.navContact },
  ];

  // Scroll spy
  useEffect(() => {
    const sectionIds = ['services', 'projects', 'standards', 'gallery', 'process', 'contact'];
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (window.scrollY < 200) {
          setActiveSection('');
          return;
        }
        const scrollMid = window.scrollY + 250;
        let current = '';
        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollMid >= top && scrollMid < top + height) {
              current = id;
              break;
            }
          }
        }
        setActiveSection(current);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/85 backdrop-blur-xl border-b border-slate-200/80 shadow-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand & Logo */}
        <a
          href="#"
          onClick={(e) => {
            handleSmoothScrollClick(e, '#');
            playAppleClick();
          }}
          className="flex items-center gap-3 group shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 p-0.5 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200 flex items-center justify-center overflow-hidden">
            <img
              src="/assets/logos/blotx-tech-logo.png"
              alt="Blotx Tech Solutions Logo"
              className="w-full h-full object-cover rounded-[10px]"
              onError={(e) => {
                // Fallback to text icon if not loaded
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 text-lg sm:text-xl tracking-tight leading-none group-hover:text-blue-600 transition-colors">
                Blotx
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/60 rounded-md">
                Solutions
              </span>
            </div>
            <span className="text-[11px] font-medium text-slate-500 hidden sm:inline-block leading-tight mt-0.5">
              {t.techBrandTagline}
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  handleSmoothScrollClick(e, link.href);
                  playAppleClick();
                }}
                className={`relative px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-150 ${
                  isActive
                    ? 'text-blue-600 font-bold bg-blue-50/80 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="activePill"
                    className="absolute bottom-0 inset-x-2 h-0.5 bg-blue-600 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Actions & CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Toggle */}
          <button
            onClick={() => {
              toggleLanguage();
              playAppleClick();
            }}
            className="px-2.5 py-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5 border border-slate-200 cursor-pointer"
            title="تبديل اللغة / Toggle Language"
          >
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            <span>{t.toggleLangBtn}</span>
          </button>

          {/* Primary CTA: Start a project */}
          <button
            onClick={() => {
              playAppleClick();
              if (onOpenInquiry) {
                onOpenInquiry();
              } else {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <MessageSquareCode className="w-4 h-4" />
            <span>{t.startProjectBtn}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              playAppleClick();
            }}
            className="md:hidden p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-4 pt-2 pb-6 flex flex-col gap-2 shadow-xl"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  handleSmoothScrollClick(e, link.href);
                  setMobileMenuOpen(false);
                  playAppleClick();
                }}
                className="px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50/80 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  playAppleClick();
                  if (onOpenInquiry) {
                    onOpenInquiry();
                  } else {
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t.startProjectBtn}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
