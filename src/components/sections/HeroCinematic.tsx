import { type FC } from 'react';
import { useConfig } from '../../ConfigContext';
import { useLanguage } from '../../LanguageContext';
import {
  ArrowLeft,
  ArrowRight,
  Lock,
  WifiOff,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';
import { playAppleClick } from '../../utils/soundEffects';
import { handleSmoothScrollClick } from '../../utils/smoothScroll';

const GooglePlayIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M47.5 13.9C40.6 17.6 36 24.8 36 33.7v444.6c0 8.9 4.6 16.1 11.5 19.8l232.7-242.1L47.5 13.9z" fill="#00D3FF"/>
    <path d="M371.3 146.9L280.2 256l91.1 109.1 52.8-30.2c15.1-8.6 24.5-24.3 24.5-41.9s-9.4-33.3-24.5-41.9l-52.8-30.2z" fill="#FFD400"/>
    <path d="M47.5 13.9l232.7 242.1 91.1-109.1L126.8 63.6 47.5 13.9z" fill="#00E676"/>
    <path d="M47.5 498.1l79.3-49.7 244.5-139.3-91.1-109.1L47.5 498.1z" fill="#FF334B"/>
  </svg>
);

export const HeroCinematic: FC = () => {
  const config = useConfig();
  const { language, isRTL, t } = useLanguage();

  const googlePlayUrl =
    config?.tahtPlayUrl ||
    'https://play.google.com/store/apps/details?id=com.blotxtech.taht_elbalata';

  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#ffffff] via-[#fbfbfd] to-[#f4f4f7] pt-12 pb-16 font-cairo w-full max-w-full">
      {/* Ambient Diffused Lighting Halos */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-100/40 via-blue-100/30 to-amber-100/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* 1. Official Ecosystem Triad Emblems */}
      <div className="relative mb-6 flex items-center justify-center gap-3 sm:gap-6">
        {/* Taht El Balata Emblem */}
        <div className="group relative p-1.5 transition-transform hover:scale-105">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white p-2 shadow-md border border-emerald-100 flex items-center justify-center">
            <img
              src="/assets/logos/taht-elbalata-logo.png"
              alt={language === 'ar' ? 'تحت البلاطة' : 'Taht El Balata'}
              className="w-full h-full object-contain drop-shadow-xs"
            />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold shadow-2xs">
            {language === 'ar' ? 'تحت البلاطة' : 'Taht El Balata'}
          </div>
        </div>

        {/* Blotx Tech Master Emblem */}
        <div className="group relative p-1.5 transition-transform hover:scale-105 z-10">
          <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-3xl bg-black p-2.5 shadow-xl border-2 border-white/20 flex items-center justify-center overflow-hidden">
            <img
              src={config?.images?.logo || '/assets/logos/blotx-tech-logo.png'}
              alt="Blotx Tech"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-0.5 rounded-full bg-neutral-900 text-white text-[9px] font-mono font-bold tracking-tight shadow-md flex items-center gap-1.5 border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>BLOTX CORE</span>
          </div>
        </div>

        {/* Eftekir Emblem */}
        <div className="group relative p-1.5 transition-transform hover:scale-105">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white p-2 shadow-md border border-blue-100 flex items-center justify-center">
            <img
              src="/assets/logos/efteker-logo.png"
              alt={language === 'ar' ? 'افتكر' : 'Eftekir'}
              className="w-full h-full object-contain rounded-xl drop-shadow-xs"
            />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-[10px] font-bold shadow-2xs">
            {language === 'ar' ? 'افتكر' : 'Eftekir'}
          </div>
        </div>
      </div>

      {/* 2. Official Google Play Live Badge */}
      <a
        href={googlePlayUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={playAppleClick}
        className="mt-4 mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 text-xs font-bold text-emerald-800 shadow-xs transition-all hover:scale-105 cursor-pointer"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>{t.heroLiveStoreBadge}</span>
      </a>

      {/* 3. Main Friendly Casual Headline & Subtitle */}
      <div className="max-w-3xl mx-auto space-y-4 px-2">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1d1d1f] tracking-tight leading-[1.18] sm:leading-[1.12]">
          {language === 'ar' && config?.content?.heroTitle ? (
            config.content.heroTitle
          ) : (
            <>
              {t.heroTitle1}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0071e3] via-[#059669] to-[#0071e3]">
                {t.heroTitle2}
              </span>
            </>
          )}
        </h1>

        <p className="text-base sm:text-xl text-[#6e6e73] max-w-2xl mx-auto font-normal leading-relaxed">
          {language === 'ar' && config?.content?.heroSubtitle
            ? config.content.heroSubtitle
            : t.heroDesc}
        </p>
      </div>

      {/* 4. Primary Actions: Direct Google Play Download & 3D Tour */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8">
        {/* Primary CTA: Official Google Play Download */}
        <a
          href={googlePlayUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={playAppleClick}
          className="px-7 py-3.5 bg-[#059669] hover:bg-[#047857] text-white font-bold text-sm sm:text-base rounded-full shadow-lg hover:shadow-xl flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 group cursor-pointer"
        >
          <GooglePlayIcon />
          <div className="text-start leading-tight">
            <div className="text-[10px] uppercase tracking-wider text-emerald-100 font-medium">
              {language === 'ar' ? 'متاح مجاناً على' : 'Get it on'}
            </div>
            <div className="text-sm sm:text-base font-black text-white tracking-wide">
              Google Play
            </div>
          </div>
        </a>

        {/* Secondary CTA: Explore 3D Device */}
        <a
          href="#devices"
          onClick={(e) => {
            handleSmoothScrollClick(e, '#devices', 85, 850, () => {
              playAppleClick();
            });
          }}
          className="px-6 py-3.5 bg-white text-[#1d1d1f] border border-black/[0.1] hover:bg-neutral-50 rounded-full font-bold text-sm shadow-xs flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
        >
          <span>{t.explore3d}</span>
          {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </a>
      </div>

      {/* 5. Minimalist Elegant Trust Strip */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-2 sm:gap-6 text-xs text-[#6e6e73] font-semibold py-3 px-6 rounded-full bg-white/80 border border-black/[0.06] shadow-xs backdrop-blur-md">
        <div className="flex items-center gap-1.5">
          <span className="text-amber-500 font-bold">★ 4.9</span>
          <span>{language === 'ar' ? 'تقييم Google Play' : 'Google Play Rating'}</span>
        </div>
        <span className="text-neutral-300 hidden sm:inline">•</span>
        <div className="flex items-center gap-1.5">
          <WifiOff className="w-3.5 h-3.5 text-emerald-600" />
          <span>{language === 'ar' ? 'أوفلاين 100% بدون إنترنت' : '100% Offline'}</span>
        </div>
        <span className="text-neutral-300 hidden sm:inline">•</span>
        <div className="flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-blue-600" />
          <span>{language === 'ar' ? 'تشفير محلي على تليفونك' : 'Local Encryption'}</span>
        </div>
        <span className="text-neutral-300 hidden sm:inline">•</span>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
          <span>{language === 'ar' ? 'بدون إعلانات مزعجة' : 'Zero Intrusive Ads'}</span>
        </div>
      </div>

      {/* 6. Subtle Scroll Cue */}
      <a
        href="#devices"
        onClick={(e) => {
          handleSmoothScrollClick(e, '#devices', 85, 850, () => {
            playAppleClick();
          });
        }}
        className="mt-8 flex flex-col items-center gap-1 text-xs text-[#86868b] hover:text-[#1d1d1f] transition-colors cursor-pointer"
      >
        <span>{t.scrollDown}</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-[#0071e3]" />
      </a>
    </section>
  );
};
