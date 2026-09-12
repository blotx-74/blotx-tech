import { useState, useEffect, type FC } from 'react';
import { Menu, X, ArrowUpRight, Volume2, VolumeX, Globe, HelpCircle, ShieldCheck } from 'lucide-react';
import { playAppleClick, setMuted, getIsMuted } from '../../utils/soundEffects';
import { handleSmoothScrollClick } from '../../utils/smoothScroll';
import { useLanguage } from '../../LanguageContext';

interface AppleNavbarProps {
  onOpenSupport?: (tab?: 'team' | 'developer' | 'docs') => void;
}

export const AppleNavbar: FC<AppleNavbarProps> = ({ onOpenSupport }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(getIsMuted());
  const [activeSection, setActiveSection] = useState<string>('');
  const { language, t, toggleLanguage } = useLanguage();

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
      <header className="rounded-full bg-white/90 backdrop-blur-2xl border border-black/[0.08] shadow-[0_10px_35px_-10px_rgba(0,0,0,0.08)] px-3 sm:px-5 py-2 flex items-center justify-between transition-all gap-2">
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
            <span className="font-black text-[#1d1d1f] tracking-tight text-sm sm:text-base group-hover:text-[#0071e3] transition-colors">
              Blotx Tech
            </span>
            <span className="hidden sm:inline-block text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/[0.05] text-[#86868b]">
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
                    ? 'bg-[#1d1d1f]/[0.08] text-[#1d1d1f] font-black border border-[#1d1d1f]/15 shadow-xs scale-105'
                    : 'font-bold text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-black/[0.04] border border-transparent'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Controls Group */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 whitespace-nowrap">
          {/* Support & Docs Quick Trigger */}
          <button
            type="button"
            onClick={() => {
              playAppleClick();
              onOpenSupport?.('team');
            }}
            title={t.footerSupport}
            className="px-2.5 py-1.5 rounded-full text-xs font-bold text-[#0071e3] bg-blue-50/70 hover:bg-blue-100/80 border border-blue-200/80 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer shrink-0 shadow-2xs"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">{t.footerSupport}</span>
          </button>

          {/* Language Switcher Toggle */}
          <button
            type="button"
            onClick={() => {
              playAppleClick();
              toggleLanguage();
            }}
            title={language === 'ar' ? 'Switch to English' : 'التحويل للغة العربية'}
            className="px-2.5 py-1.5 rounded-full text-xs font-bold text-[#1d1d1f] bg-black/[0.04] hover:bg-black/[0.08] active:scale-95 transition-all flex items-center gap-1.5 border border-black/[0.06] cursor-pointer shadow-2xs shrink-0"
          >
            <Globe className="w-3.5 h-3.5 text-[#0071e3]" />
            <span className="tracking-wide">{language === 'ar' ? 'EN' : 'عربي'}</span>
          </button>

          {/* Haptic Sound Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            title={isAudioMuted ? 'تفعيل المؤثرات اللمسية' : 'كتم المؤثرات اللمسية'}
            className="p-2 rounded-full text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-black/[0.05] transition-all cursor-pointer shrink-0"
          >
            {isAudioMuted ? (
              <VolumeX className="w-4 h-4 opacity-50" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#0071e3]" />
            )}
          </button>

          {/* Primary Action Button */}
          <a
            href="#devices"
            onClick={(e) => {
              handleSmoothScrollClick(e, '#devices', 85, 850, () => {
                playAppleClick();
                setActiveSection('#devices');
              });
            }}
            className="apple-pill-btn px-3.5 sm:px-4 py-2 bg-[#1d1d1f] hover:bg-black text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer shrink-0 whitespace-nowrap"
          >
            <span>{t.liveDemo}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full hover:bg-neutral-100 text-[#1d1d1f] shrink-0"
            title="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mt-2 rounded-3xl bg-white/95 backdrop-blur-2xl border border-black/[0.08] p-5 shadow-2xl space-y-2 lg:hidden animate-fadeIn">
          {/* Mobile Language Toggle */}
          <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
            <span className="text-xs font-bold text-[#86868b]">{language === 'ar' ? 'اللغة / Language' : 'Language / اللغة'}</span>
            <button
              type="button"
              onClick={() => {
                playAppleClick();
                toggleLanguage();
              }}
              className="px-3 py-1.5 rounded-full text-xs font-bold text-white bg-[#0071e3] hover:bg-[#0077ed] flex items-center gap-1.5 shadow-sm"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'English (EN)' : 'العربية (AR)'}</span>
            </button>
          </div>

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
                    ? 'bg-neutral-100 text-[#0071e3] font-black border border-blue-200'
                    : 'font-bold text-[#1d1d1f] hover:bg-neutral-50'
                }`}
              >
                {link.label}
              </a>
            );
          })}

          <button
            type="button"
            onClick={() => {
              playAppleClick();
              setMobileMenuOpen(false);
              onOpenSupport?.('team');
            }}
            className="w-full text-start block p-2.5 rounded-xl text-xs font-bold text-[#0071e3] hover:bg-blue-50 transition-colors cursor-pointer"
          >
            {t.footerSupport}
          </button>

          <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between text-xs text-neutral-500 font-bold">
            <span className="flex items-center gap-1 text-emerald-600">
              <ShieldCheck className="w-3.5 h-3.5" /> {t.trustLocal}
            </span>
            <span>Blotx Tech Ecosystem</span>
          </div>
        </div>
      )}
    </div>
  );
};

