import { useState, type FC } from 'react';
import { Menu, X, ArrowUpRight, Volume2, VolumeX, ShieldCheck, Globe } from 'lucide-react';
import { playAppleClick, setMuted, getIsMuted } from '../../utils/soundEffects';
import { handleSmoothScrollClick } from '../../utils/smoothScroll';
import { useLanguage } from '../../LanguageContext';

export const AppleNavbar: FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(getIsMuted());
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

  return (
    <div className="sticky top-3 z-50 px-3 sm:px-6 w-full max-w-7xl mx-auto font-cairo">
      <header className="rounded-full bg-white/85 backdrop-blur-2xl border border-black/[0.08] shadow-[0_10px_35px_-10px_rgba(0,0,0,0.08)] px-4 sm:px-6 py-2.5 flex items-center justify-between transition-all">
        {/* Brand Identity */}
        <a
          href="#"
          onClick={(e) => {
            handleSmoothScrollClick(e, '#root', 0, 850, () => {
              playAppleClick();
            });
          }}
          className="flex items-center gap-3 group shrink-0"
        >
          {/* 3D Metallic Emblem in Precision Housing */}
          <div className="w-8 h-8 rounded-xl bg-black p-1 shadow-md border border-white/20 flex items-center justify-center group-hover:scale-105 transition-transform overflow-hidden">
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
            <span className="hidden sm:inline-block text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/[0.05] text-[#86868b]">
              STUDIOS
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links with Cinematic Smooth Scroll */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                handleSmoothScrollClick(e, link.href, 85, 850, () => {
                  playAppleClick();
                });
              }}
              className="px-3 py-1.5 rounded-full text-xs font-bold text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-black/[0.04] transition-all cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Controls Group */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Live Security Indicator (Desktop) */}
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[10px] font-bold text-emerald-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{t.encryptedLocally}</span>
          </div>

          {/* Language Switcher Toggle */}
          <button
            type="button"
            onClick={() => {
              playAppleClick();
              toggleLanguage();
            }}
            title={language === 'ar' ? 'Switch to English' : 'التحويل للغة العربية'}
            className="px-2.5 py-1.5 rounded-full text-xs font-bold text-[#1d1d1f] bg-black/[0.04] hover:bg-black/[0.08] active:scale-95 transition-all flex items-center gap-1.5 border border-black/[0.06] cursor-pointer shadow-sm"
          >
            <Globe className="w-3.5 h-3.5 text-[#0071e3]" />
            <span className="tracking-wide">{language === 'ar' ? 'EN' : 'عربي'}</span>
          </button>

          {/* Haptic Sound Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            title={isAudioMuted ? 'تفعيل المؤثرات اللمسية' : 'كتم المؤثرات اللمسية'}
            className="p-2 rounded-full text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-black/[0.05] transition-all cursor-pointer"
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
              });
            }}
            className="apple-pill-btn px-3.5 sm:px-5 py-2 bg-[#1d1d1f] hover:bg-black text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <span>{t.liveDemo}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full hover:bg-neutral-100 text-[#1d1d1f]"
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

          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                handleSmoothScrollClick(e, link.href, 85, 850, () => {
                  playAppleClick();
                  setMobileMenuOpen(false);
                });
              }}
              className="block p-2.5 rounded-xl text-xs font-bold text-[#1d1d1f] hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              {link.label}
            </a>
          ))}
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
