import { useState, type FC } from 'react';
import { useConfig } from '../../ConfigContext';
import { useLanguage } from '../../LanguageContext';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Brain,
  Sparkles,
  Smartphone,
  Lock,
  WifiOff,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';
import {
  playAppleClick,
  playVaultThud,
  playClarityChime,
  playSyncPulse,
} from '../../utils/soundEffects';
import { handleSmoothScrollClick } from '../../utils/smoothScroll';

type HeroPillar = 'all' | 'taht' | 'efteker';

export const HeroCinematic: FC = () => {
  const config = useConfig();
  const { isRTL, t } = useLanguage();
  const [activePillar, setActivePillar] = useState<HeroPillar>('all');

  const handlePillarSelect = (pillar: HeroPillar) => {
    setActivePillar(pillar);
    if (pillar === 'taht') playVaultThud();
    else if (pillar === 'efteker') playClarityChime();
    else playSyncPulse();
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#ffffff] via-[#fbfbfd] to-[#f4f4f7] pt-14 pb-20 font-cairo">
      {/* Ambient Diffused Lighting Halos */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] bg-gradient-to-tr from-blue-100/30 via-emerald-100/25 to-amber-100/15 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* ======================================================== */}
      {/* 1. THE EXECUTIVE TRIAD CREST (THE 3 OFFICIAL LOGOS) */}
      {/* ======================================================== */}
      <div className="relative mb-10 flex items-center justify-center gap-3 sm:gap-6">
        {/* Hairline Connecting Bridge Line behind emblems */}
        <div className="absolute top-1/2 left-8 right-8 h-[1.5px] bg-gradient-to-r from-transparent via-black/[0.12] to-transparent pointer-events-none -z-10" />

        {/* 1. Right Wing: «تحت البلاطة» 3D Mascot Medallion */}
        <div
          onClick={() => handlePillarSelect('taht')}
          onMouseEnter={playAppleClick}
          className={`relative group cursor-pointer transition-all duration-400 p-2 rounded-3xl ${
            activePillar === 'taht'
              ? 'scale-110 -translate-y-2'
              : 'scale-95 opacity-80 hover:opacity-100 hover:scale-100'
          }`}
        >
          {/* Ambient Glow */}
          <div className="absolute -inset-2 rounded-3xl bg-emerald-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Medallion Housing */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-white p-2.5 shadow-xl border border-emerald-200/80 flex items-center justify-center">
            <img
              src="/assets/logos/taht-elbalata-logo.png"
              alt="تحت البلاطة"
              className="w-full h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform"
            />
          </div>

          {/* Micro Floating Badge */}
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-xs text-[10px] font-bold">
            تحت البلاطة
          </div>
        </div>

        {/* 2. Centerpiece: «Blotx Tech» Master 3D Metallic Emblem */}
        <div
          onClick={() => handlePillarSelect('all')}
          onMouseEnter={playAppleClick}
          className={`relative group cursor-pointer transition-all duration-500 z-10 ${
            activePillar === 'all'
              ? 'scale-105'
              : 'scale-100 hover:scale-105'
          }`}
        >
          {/* Intense Dual Specular Halo */}
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[#0071e3]/25 via-emerald-400/20 to-sky-400/25 blur-2xl group-hover:opacity-100 transition-opacity" />

          {/* Master Jewel Housing */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-black p-3 shadow-2xl border-2 border-white/30 flex items-center justify-center overflow-hidden">
            <img
              src="/assets/logos/blotx-tech-logo.png"
              alt="Blotx Tech Official Emblem"
              className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform"
            />
            {/* Glass Sheen Sweep */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Formal Master Status Pill */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-0.5 rounded-full bg-neutral-900 text-white shadow-md flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-tight border border-white/20">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span>BLOTX CORE</span>
          </div>
        </div>

        {/* 3. Left Wing: «افتكر» 3D Squircle Medallion */}
        <div
          onClick={() => handlePillarSelect('efteker')}
          onMouseEnter={playAppleClick}
          className={`relative group cursor-pointer transition-all duration-400 p-2 rounded-3xl ${
            activePillar === 'efteker'
              ? 'scale-110 -translate-y-2'
              : 'scale-95 opacity-80 hover:opacity-100 hover:scale-100'
          }`}
        >
          {/* Ambient Glow */}
          <div className="absolute -inset-2 rounded-3xl bg-blue-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Medallion Housing */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-white p-2.5 shadow-xl border border-blue-200/80 flex items-center justify-center">
            <img
              src="/assets/logos/efteker-logo.png"
              alt="افتكر"
              className="w-full h-full object-contain drop-shadow-md rounded-xl group-hover:scale-105 transition-transform"
            />
          </div>

          {/* Micro Floating Badge */}
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200/80 shadow-xs text-[10px] font-bold">
            افتكر
          </div>
        </div>
      </div>

      {/* Eyebrow Formal Tag */}
      <div className="mb-4 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/[0.04] border border-black/[0.06] text-xs font-bold text-[#6e6e73]">
        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        <span>{t.heroBadge}</span>
      </div>

      {/* Main Majestic Headline */}
      <div className="max-w-4xl mx-auto space-y-5">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#1d1d1f] tracking-tight leading-[1.12]">
          {config?.content?.heroTitle || (
            <>
              {t.heroTitle1}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1d1d1f] via-[#0071e3] to-[#059669]">
                {t.heroTitle2}
              </span>
            </>
          )}
        </h1>

        <p className="text-base sm:text-xl lg:text-2xl text-[#6e6e73] max-w-3xl mx-auto font-normal leading-relaxed">
          {config?.content?.heroSubtitle || t.heroDesc}
        </p>
      </div>

      {/* Interactive Value Focus Switcher */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => handlePillarSelect('all')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
            activePillar === 'all'
              ? 'bg-[#1d1d1f] text-white shadow-md'
              : 'bg-white text-[#1d1d1f] border border-black/[0.08] hover:bg-neutral-100'
          }`}
        >
          {t.allPillar}
        </button>
        <button
          type="button"
          onClick={() => handlePillarSelect('taht')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activePillar === 'taht'
              ? 'bg-[#059669] text-white shadow-md'
              : 'bg-white text-[#1d1d1f] border border-black/[0.08] hover:bg-neutral-100'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{t.tahtPillar}</span>
        </button>
        <button
          type="button"
          onClick={() => handlePillarSelect('efteker')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activePillar === 'efteker'
              ? 'bg-[#0071e3] text-white shadow-md'
              : 'bg-white text-[#1d1d1f] border border-black/[0.08] hover:bg-neutral-100'
          }`}
        >
          <Brain className="w-3.5 h-3.5" />
          <span>{t.eftekerPillar}</span>
        </button>
      </div>

      {/* Dynamic Live Focus Card */}
      <div className="mt-6 max-w-xl w-full p-4 rounded-2xl bg-white/95 border border-black/[0.08] shadow-lg flex items-center justify-between transition-all">
        {activePillar === 'all' && (
          <>
            <div className="flex items-center gap-3 text-start">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                BLOTX
              </div>
              <div>
                <div className="text-xs font-bold text-[#1d1d1f]">
                  {t.allPillarCardTitle}
                </div>
                <div className="text-[11px] text-[#6e6e73]">
                  {t.allPillarCardDesc}
                </div>
              </div>
            </div>
            <div className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full shrink-0">
              100% Sync
            </div>
          </>
        )}

        {activePillar === 'taht' && (
          <>
            <div className="flex items-center gap-3 text-start">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#1d1d1f]">
                  {t.tahtPillarCardTitle}
                </div>
                <div className="text-[11px] text-emerald-700">
                  {t.tahtPillarCardDesc}
                </div>
              </div>
            </div>
            <div className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full shrink-0">
              148,500 {t.currency}
            </div>
          </>
        )}

        {activePillar === 'efteker' && (
          <>
            <div className="flex items-center gap-3 text-start">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#1d1d1f]">
                  {t.eftekerPillarCardTitle}
                </div>
                <div className="text-[11px] text-blue-700">
                  {t.eftekerPillarCardDesc}
                </div>
              </div>
            </div>
            <div className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full shrink-0">
              100% Clarity
            </div>
          </>
        )}
      </div>

      {/* Primary Executive Actions with Cinematic Smooth Scroll */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
        <a
          href="#devices"
          onClick={(e) => {
            handleSmoothScrollClick(e, '#devices', 85, 850, () => {
              playAppleClick();
            });
          }}
          className="apple-pill-btn px-7 py-3.5 bg-[#1d1d1f] hover:bg-black text-white font-bold text-sm shadow-xl flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
        >
          <Smartphone className="w-4 h-4 text-blue-400" />
          <span>{t.explore3d}</span>
          {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </a>

        <a
          href="#synergy-matrix"
          onClick={(e) => {
            handleSmoothScrollClick(e, '#synergy-matrix', 85, 850, () => {
              playAppleClick();
            });
          }}
          className="apple-pill-btn px-6 py-3.5 bg-white text-[#1d1d1f] border border-black/[0.1] hover:bg-neutral-50 font-semibold text-sm shadow-xs flex items-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>{t.exploreMatrix}</span>
        </a>
      </div>

      {/* Formal Assurance Trust Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-16 pt-8 border-t border-black/[0.06]">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#1d1d1f]">
          <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{t.trustLocal}</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-[#1d1d1f]">
          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
          <span>{t.trustZeroAds}</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-[#1d1d1f]">
          <WifiOff className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{t.trustOffline}</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-[#1d1d1f]">
          <Smartphone className="w-4 h-4 text-purple-600 shrink-0" />
          <span>{t.trustAndroid}</span>
        </div>
      </div>

      {/* Subtle Scroll Cue with smooth glide */}
      <a
        href="#devices"
        onClick={(e) => {
          handleSmoothScrollClick(e, '#devices', 85, 850, () => {
            playAppleClick();
          });
        }}
        className="mt-10 flex flex-col items-center gap-1 text-xs text-[#86868b] hover:text-[#1d1d1f] transition-colors cursor-pointer"
      >
        <span>{t.scrollDown}</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-[#0071e3]" />
      </a>
    </section>
  );
};
