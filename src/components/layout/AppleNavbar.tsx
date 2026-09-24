import { useState, useEffect, type FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ArrowUpRight, Volume2, VolumeX, Globe, HelpCircle, ShieldCheck, Sun, Moon } from 'lucide-react';
import { playAppleClick, setMuted, getIsMuted } from '../../utils/soundEffects';
import { handleSmoothScrollClick } from '../../utils/smoothScroll';
import { useLanguage } from '../../LanguageContext';
import { useTheme } from '../../ThemeContext';

interface AppleNavbarProps {
  onOpenSupport?: (tab?: 'team' | 'developer' | 'docs') => void;
}

export const AppleNavbar: FC<AppleNavbarProps> = ({ onOpenSupport }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(getIsMuted());
  const [activeSection, setActiveSection] = useState<string>('');
  const { language, t, toggleLanguage } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  const toggleSound = () => {
    const nextMuted = !isAudioMuted;
    setMuted(nextMuted);
    setIsAudioMuted(nextMuted);
    if (!nextMuted) {
      playAppleClick();
    }
  };

  const navLinks = [
    { href: '#devices', label: t.navDevices },
    { href: '#taht-experience', label: t.navTaht },
    { href: '#efteker-experience', label: t.navEfteker },
    { href: '#synergy-matrix', label: t.navMatrix },
    { href: '#philosophy', label: t.navPhilosophy },
    { href: '#calculator', label: t.navCalculator },
  ];

  // Active section scroll spy
  useEffect(() => {
    const sectionIds = [
      'devices',
      'taht-experience',
      'efteker-experience',
      'synergy-matrix',
      'philosophy',
      'calculator',
    ];

    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        // If at the top of the page (Hero / Home)
        if (window.scrollY < 260) {
          setActiveSection('');
          return;
        }

        const scrollMid = window.scrollY + 200;
        let current = '';

        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollMid >= top && scrollMid < top + height) {
              current = `#${id}`;
              break;
            }
          }
        }

        // Fallback to closest section above
        if (!current) {
          for (let i = sectionIds.length - 1; i >= 0; i--) {
            const el = document.getElementById(sectionIds[i]);
            if (el && scrollMid >= el.offsetTop) {
              current = `#${sectionIds[i]}`;
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
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="sticky top-3 z-50 px-3 sm:px-6 w-full max-w-7xl mx-auto font-cairo">
      <header className="rounded-full bg-white/90 dark:bg-[#121217]/90 backdrop-blur-2xl border border-black/[0.08] dark:border-white/[0.1] shadow-[0_10px_35px_-10px_rgba(0,0,0,0.08)] px-3 sm:px-5 py-2 flex items-center justify-between transition-all gap-2">
        {/* Brand Identity */}
        <a
          href="#"
          onClick={(e) => {
            handleSmoothScrollClick(e, '#root', 0, 850, () => {
              playAppleClick();
              setActiveSection('');
            });
          }}
          className="flex items-center gap-2.5 group shrink-0 whitespace-nowrap"
        >
          {/* 3D Metallic Emblem in Precision Housing */}
          <div className="w-8 h-8 rounded-xl bg-black p-1 shadow-md border border-white/20 flex items-center justify-center group-hover:scale-105 transition-transform overflow-hidden shrink-0">
            <img
              src="/assets/logos/blotx-tech-logo.png"
              alt="Blotx Tech"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-black text-[#1d1d1f] dark:text-[#f5f5f7] tracking-tight text-sm sm:text-base group-hover:text-[#0071e3] transition-colors">
              Blotx Tech
            </span>
            <span className="hidden sm:inline-block text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/[0.05] dark:bg-white/[0.1] text-[#86868b] dark:text-neutral-400">
              STUDIOS
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links with Live Active Box Indicator */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 shrink-0">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  handleSmoothScrollClick(e, link.href, 85, 850, () => {
                    playAppleClick();
                    setActiveSection(link.href);
                  });
                }}
                className={`px-3 py-1.5 rounded-full text-xs transition-all duration-300 cursor-pointer whitespace-nowrap select-none ${
                  isActive
                    ? 'bg-[#1d1d1f]/[0.08] dark:bg-white/[0.12] text-[#1d1d1f] dark:text-white font-black border border-[#1d1d1f]/15 dark:border-white/20 shadow-xs scale-105'
                    : 'font-bold text-[#6e6e73] dark:text-[#a1a1a6] hover:text-[#1d1d1f] dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] border border-transparent'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Controls Group */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Support & Docs Quick Trigger (Tablet / Desktop) */}
          <button
            type="button"
            onClick={() => {
              playAppleClick();
              onOpenSupport?.('team');
            }}
            title={t.footerSupport}
            className="hidden md:flex px-2.5 py-1.5 rounded-full text-xs font-bold text-[#0071e3] bg-blue-50/70 hover:bg-blue-100/80 dark:bg-blue-950/40 dark:hover:bg-blue-900/60 border border-blue-200/80 dark:border-blue-800/80 active:scale-95 transition-all items-center gap-1.5 cursor-pointer shrink-0 shadow-2xs"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">{t.footerSupport}</span>
          </button>

          {/* Theme Toggle (Dark / Light) */}
          <button
            type="button"
            onClick={() => {
              playAppleClick();
              toggleTheme();
            }}
            title={isDark ? (language === 'ar' ? 'التحويل للوضع النهاري' : 'Switch to Light Mode') : (language === 'ar' ? 'التحويل للوضع الليلي' : 'Switch to Dark Mode')}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-full text-xs font-bold text-[#1d1d1f] dark:text-[#f5f5f7] bg-black/[0.04] hover:bg-black/[0.08] dark:bg-white/[0.08] dark:hover:bg-white/[0.14] active:scale-95 transition-all flex items-center gap-1 border border-black/[0.06] dark:border-white/[0.08] cursor-pointer shadow-2xs shrink-0"
          >
            {isDark ? (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-indigo-500" />
            )}
            <span className="hidden sm:inline text-[11px] font-mono">
              {isDark ? (language === 'ar' ? 'نهاري' : 'Light') : (language === 'ar' ? 'ليلي' : 'Dark')}
            </span>
          </button>

          {/* Language Switcher Toggle (Always Visible) */}
          <button
            type="button"
            onClick={() => {
              playAppleClick();
              toggleLanguage();
            }}
            title={language === 'ar' ? 'Switch to English' : 'التحويل للغة العربية'}
            className="px-2.5 py-1.5 rounded-full text-xs font-bold text-[#1d1d1f] dark:text-[#f5f5f7] bg-black/[0.04] hover:bg-black/[0.08] dark:bg-white/[0.08] dark:hover:bg-white/[0.14] active:scale-95 transition-all flex items-center gap-1 border border-black/[0.06] dark:border-white/[0.08] cursor-pointer shadow-2xs shrink-0"
          >
            <Globe className="w-3.5 h-3.5 text-[#0071e3]" />
            <span className="tracking-wide text-[11px] sm:text-xs font-mono">{language === 'ar' ? 'EN' : 'عربي'}</span>
          </button>

          {/* Haptic Sound Toggle (Tablet / Desktop) */}
          <button
            type="button"
            onClick={toggleSound}
            title={isAudioMuted ? 'تفعيل المؤثرات اللمسية' : 'كتم المؤثرات اللمسية'}
            className="hidden sm:flex p-2 rounded-full text-[#6e6e73] dark:text-neutral-400 hover:text-[#1d1d1f] dark:hover:text-white hover:bg-black/[0.05] dark:hover:bg-white/[0.06] transition-all cursor-pointer shrink-0"
          >
            {isAudioMuted ? (
              <VolumeX className="w-4 h-4 opacity-50" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#0071e3]" />
            )}
          </button>

          {/* Primary Action Button (Tablet / Desktop) */}
          <a
            href="#devices"
            onClick={(e) => {
              handleSmoothScrollClick(e, '#devices', 85, 850, () => {
                playAppleClick();
                setActiveSection('#devices');
              });
            }}
            className="hidden md:flex apple-pill-btn px-3.5 sm:px-4 py-2 bg-[#1d1d1f] hover:bg-black dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black text-xs font-bold items-center gap-1.5 shadow-sm cursor-pointer shrink-0 whitespace-nowrap"
          >
            <span>{t.liveDemo}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Menu Trigger with Animated Icon Flip */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 text-[#1d1d1f] dark:text-white shrink-0 active:scale-90 transition-transform cursor-pointer"
            title="Menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay with Smooth Open & Close Transitions */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop overlay to close when clicking outside */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="fixed inset-0 bg-black/25 backdrop-blur-xs z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Floating Dropdown Card with Apple Spring Motion */}
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.95, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, scale: 0.96, filter: 'blur(6px)' }}
              transition={{
                duration: 0.25,
                ease: [0.16, 1, 0.3, 1], // Apple cubic-bezier
              }}
              className="absolute top-[calc(100%+8px)] inset-x-3 sm:inset-x-6 z-50 rounded-3xl bg-white/95 dark:bg-[#121217]/95 backdrop-blur-2xl border border-black/[0.08] dark:border-white/[0.1] p-4 sm:p-5 shadow-2xl space-y-3 lg:hidden max-h-[82vh] overflow-y-auto"
            >
              {/* Quick Primary Demo Button */}
              <a
                href="#devices"
                onClick={(e) => {
                  handleSmoothScrollClick(e, '#devices', 85, 850, () => {
                    playAppleClick();
                    setActiveSection('#devices');
                    setMobileMenuOpen(false);
                  });
                }}
                className="w-full apple-pill-btn py-2.5 px-4 bg-[#1d1d1f] hover:bg-black dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black text-xs font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <span>{t.liveDemo}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              {/* Mobile Controls Quick Bar: Language, Sound, Theme */}
              <div className="grid grid-cols-3 gap-2 pb-2 border-b border-black/[0.06] dark:border-white/[0.08]">
                {/* Theme Toggle Button */}
                <button
                  type="button"
                  onClick={() => {
                    playAppleClick();
                    toggleTheme();
                  }}
                  className="px-2 py-2 rounded-xl text-xs font-bold text-[#1d1d1f] dark:text-[#f5f5f7] bg-black/[0.04] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/[0.14] flex items-center justify-center gap-1 border border-black/[0.06] dark:border-white/[0.08]"
                >
                  {isDark ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-[11px]">{language === 'ar' ? 'نهاري' : 'Light'}</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-indigo-500" />
                      <span className="text-[11px]">{language === 'ar' ? 'ليلي' : 'Dark'}</span>
                    </>
                  )}
                </button>

                {/* Language Button */}
                <button
                  type="button"
                  onClick={() => {
                    playAppleClick();
                    toggleLanguage();
                  }}
                  className="px-2 py-2 rounded-xl text-xs font-bold text-[#1d1d1f] dark:text-[#f5f5f7] bg-black/[0.04] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/[0.14] flex items-center justify-center gap-1 border border-black/[0.06] dark:border-white/[0.08]"
                >
                  <Globe className="w-3.5 h-3.5 text-[#0071e3]" />
                  <span className="text-[11px]">{language === 'ar' ? 'EN' : 'عربي'}</span>
                </button>

                {/* Sound Button */}
                <button
                  type="button"
                  onClick={() => {
                    playAppleClick();
                    toggleSound();
                  }}
                  className="px-2 py-2 rounded-xl text-xs font-bold text-[#1d1d1f] dark:text-[#f5f5f7] bg-black/[0.04] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/[0.14] flex items-center justify-center gap-1 border border-black/[0.06] dark:border-white/[0.08]"
                >
                  {isAudioMuted ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
                      <span className="text-[11px]">{language === 'ar' ? 'مكتوم' : 'Muted'}</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-[#0071e3]" />
                      <span className="text-[11px]">{language === 'ar' ? 'مفعل' : 'Sound'}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Nav Links with Scroll Spy Highlight */}
              <div className="space-y-1">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href;

                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => {
                        handleSmoothScrollClick(e, link.href, 85, 850, () => {
                          playAppleClick();
                          setActiveSection(link.href);
                          setMobileMenuOpen(false);
                        });
                      }}
                      className={`block p-2.5 rounded-xl text-xs transition-all cursor-pointer ${
                        isActive
                          ? 'bg-blue-50 dark:bg-blue-950/50 text-[#0071e3] dark:text-blue-400 font-black border border-blue-200 dark:border-blue-900'
                          : 'font-bold text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-neutral-50 dark:hover:bg-white/5'
                      }`}
                    >
                      {link.label}
                    </a>
                  );
                })}
              </div>

              {/* Support & Docs Trigger */}
              <button
                type="button"
                onClick={() => {
                  playAppleClick();
                  setMobileMenuOpen(false);
                  onOpenSupport?.('team');
                }}
                className="w-full text-start flex items-center gap-2 p-2.5 rounded-xl text-xs font-bold text-[#0071e3] bg-blue-50/60 hover:bg-blue-100/60 dark:bg-blue-950/40 dark:hover:bg-blue-900/60 border border-blue-200/60 dark:border-blue-800/40 transition-colors cursor-pointer"
              >
                <HelpCircle className="w-4 h-4 text-[#0071e3]" />
                <span>{t.footerSupport}</span>
              </button>

              {/* Micro Footer */}
              <div className="pt-2 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400 font-bold">
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" /> {t.trustLocal}
                </span>
                <span>Blotx Tech Ecosystem</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

