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
  const { language, isRTL, t } = useLanguage();
  const [activePillar, setActivePillar] = useState<HeroPillar>('all');

  const handlePillarSelect = (pillar: HeroPillar) => {
    setActivePillar(pillar);
    if (pillar === 'taht') playVaultThud();
    else if (pillar === 'efteker') playClarityChime();
    else playSyncPulse();
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-3 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#ffffff] via-[#fbfbfd] to-[#f4f4f7] dark:from-[#050608] dark:via-[#090b10] dark:to-[#0c0d12] pt-14 pb-20 font-cairo w-full max-w-full transition-colors duration-300">
      {/* Ambient Diffused Lighting Halos */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] bg-gradient-to-tr from-blue-100/30 via-emerald-100/25 to-amber-100/15 dark:from-blue-600/10 dark:via-emerald-500/10 dark:to-amber-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* ======================================================== */}
      {/* 1. THE EXECUTIVE TRIAD CREST (THE 3 OFFICIAL LOGOS) */}
      {/* ======================================================== */}
      <div className="relative mb-10 flex items-center justify-center gap-2 sm:gap-6 max-w-full">
        {/* Hairline Connecting Bridge Line behind emblems */}
        <div className="absolute top-1/2 left-4 sm:left-8 right-4 sm:right-8 h-[1.5px] bg-gradient-to-r from-transparent via-black/[0.12] dark:via-white/[0.15] to-transparent pointer-events-none -z-10" />

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
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#15171e] p-2.5 shadow-xl border border-emerald-200/80 dark:border-emerald-500/30 flex items-center justify-center transition-colors">
            <img
              src="/assets/logos/taht-elbalata-logo.png"
              alt={language === 'ar' ? 'تحت البلاطة' : 'Taht El Balata'}
              className="w-full h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform"
            />
          </div>

          {/* Micro Floating Badge */}
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-700/50 shadow-xs text-[10px] font-bold">
            {language === 'ar' ? 'تحت البلاطة' : 'Taht El Balata'}
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
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-black dark:bg-[#12141c] p-3 shadow-2xl border-2 border-white/30 dark:border-white/20 flex items-center justify-center overflow-hidden">
            <img
              src={config?.images?.logo || "/assets/logos/blotx-tech-logo.png"}
              alt="Blotx Tech Official Emblem"
              className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform"
            />
            {/* Glass Sheen Sweep */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Formal Master Status Pill */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-0.5 rounded-full bg-neutral-900 dark:bg-[#1c1f2a] text-white shadow-md flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-tight border border-white/20">
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
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#15171e] p-2.5 shadow-xl border border-blue-200/80 dark:border-blue-500/30 flex items-center justify-center transition-colors">
            <img
              src="/assets/logos/efteker-logo.png"
              alt={language === 'ar' ? 'افتكر' : 'Eftekir'}
              className="w-full h-full object-contain drop-shadow-md rounded-xl group-hover:scale-105 transition-transform"
            />
          </div>

          {/* Micro Floating Badge */}
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-200/80 dark:border-blue-700/50 shadow-xs text-[10px] font-bold">
            {language === 'ar' ? 'افتكر' : 'Eftekir'}
          </div>
        </div>
      </div>

      {/* Eyebrow Formal Tag */}
      <div className="mb-4 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] text-xs font-bold text-[#6e6e73] dark:text-[#a1a1a6]">
        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        <span>{language === 'ar' && config?.content?.heroBadge ? config.content.heroBadge : t.heroBadge}</span>
      </div>

      {/* Main Majestic Headline */}
      <div className="max-w-4xl mx-auto space-y-5 px-1">
        <h1 className="text-3xl sm:text-6xl lg:text-7xl font-black text-[#1d1d1f] dark:text-white tracking-tight leading-[1.18] sm:leading-[1.12] break-words">
          {language === 'ar' && config?.content?.heroTitle ? (
            config.content.heroTitle
          ) : (
            <>
              {t.heroTitle1}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1d1d1f] via-[#0071e3] to-[#059669] dark:from-white dark:via-blue-400 dark:to-emerald-400">
                {t.heroTitle2}
              </span>
            </>
          )}
        </h1>

        <p className="text-sm sm:text-xl lg:text-2xl text-[#6e6e73] dark:text-[#98989f] max-w-3xl mx-auto font-normal leading-relaxed px-2">
          {language === 'ar' && config?.content?.heroSubtitle ? config.content.heroSubtitle : t.heroDesc}
        </p>
      </div>

      {/* 2-Second Instant Practical Value Capsules */}
      <div className="mt-8 max-w-3xl w-full grid grid-cols-1 sm:grid-cols-2 gap-3 px-2">
        {/* Capsule 1: Taht El Balata */}
        <div
          onClick={(e) => {
            handlePillarSelect('taht');
            handleSmoothScrollClick(e as any, '#devices', 85, 850);
          }}
          className="group relative cursor-pointer text-start p-4 rounded-2xl bg-white/80 dark:bg-[#11131a]/80 hover:bg-white dark:hover:bg-[#161822] border border-emerald-500/25 hover:border-emerald-500/50 dark:border-emerald-500/30 dark:hover:border-emerald-500/60 shadow-xs hover:shadow-md transition-all duration-300 backdrop-blur-md overflow-hidden"
        >
          <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-100 dark:border-emerald-800/40 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-1 min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#1d1d1f] dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {t.heroInstantTahtTitle}
                </span>
                <span className="px-1.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-mono font-bold shrink-0 border border-emerald-200/50 dark:border-emerald-800/40">
                  {t.heroInstantTahtBadge}
                </span>
              </div>
              <p className="text-xs text-[#6e6e73] dark:text-[#98989f] leading-relaxed">
                {t.heroInstantTahtDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Capsule 2: Eftekir */}
        <div
          onClick={(e) => {
            handlePillarSelect('efteker');
            handleSmoothScrollClick(e as any, '#devices', 85, 850);
          }}
          className="group relative cursor-pointer text-start p-4 rounded-2xl bg-white/80 dark:bg-[#11131a]/80 hover:bg-white dark:hover:bg-[#161822] border border-blue-500/25 hover:border-blue-500/50 dark:border-blue-500/30 dark:hover:border-blue-500/60 shadow-xs hover:shadow-md transition-all duration-300 backdrop-blur-md overflow-hidden"
        >
          <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-800/40 group-hover:scale-105 transition-transform">
              <Brain className="w-5 h-5" />
            </div>
            <div className="space-y-1 min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#1d1d1f] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {t.heroInstantEftekerTitle}
                </span>
                <span className="px-1.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-[10px] font-mono font-bold shrink-0 border border-blue-200/50 dark:border-blue-800/40">
                  {t.heroInstantEftekerBadge}
                </span>
              </div>
              <p className="text-xs text-[#6e6e73] dark:text-[#98989f] leading-relaxed">
                {t.heroInstantEftekerDesc}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Value Focus Switcher */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => handlePillarSelect('all')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
            activePillar === 'all'
              ? 'bg-[#1d1d1f] dark:bg-white text-white dark:text-black shadow-md'
              : 'bg-white dark:bg-[#15171e] text-[#1d1d1f] dark:text-white border border-black/[0.08] dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-[#1d2029]'
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
              : 'bg-white dark:bg-[#15171e] text-[#1d1d1f] dark:text-white border border-black/[0.08] dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-[#1d2029]'
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
              : 'bg-white dark:bg-[#15171e] text-[#1d1d1f] dark:text-white border border-black/[0.08] dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-[#1d2029]'
          }`}
        >
          <Brain className="w-3.5 h-3.5" />
          <span>{t.eftekerPillar}</span>
        </button>
      </div>

      {/* Dynamic Live Focus Card */}
      <div className="mt-6 max-w-xl w-full p-4 rounded-2xl bg-white/95 dark:bg-[#11131a]/95 border border-black/[0.08] dark:border-white/10 shadow-lg flex items-center justify-between transition-all backdrop-blur-md">
        {activePillar === 'all' && (
          <>
            <div className="flex items-center gap-3 text-start">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-xs shrink-0">
                BLOTX
              </div>
              <div>
                <div className="text-xs font-bold text-[#1d1d1f] dark:text-white">
                  {t.allPillarCardTitle}
                </div>
                <div className="text-[11px] text-[#6e6e73] dark:text-[#98989f]">
                  {t.allPillarCardDesc}
                </div>
              </div>
            </div>
            <div className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/40 px-2.5 py-1 rounded-full shrink-0">
              100% Sync
            </div>
          </>
        )}

        {activePillar === 'taht' && (
          <>
            <div className="flex items-center gap-3 text-start">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 border border-emerald-200/50 dark:border-emerald-800/40">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#1d1d1f] dark:text-white">
                  {t.tahtPillarCardTitle}
                </div>
                <div className="text-[11px] text-emerald-700 dark:text-emerald-400">
                  {t.tahtPillarCardDesc}
                </div>
              </div>
            </div>
            <div className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/40 px-2.5 py-1 rounded-full shrink-0">
              148,500 {t.currency}
            </div>
          </>
        )}

        {activePillar === 'efteker' && (
          <>
            <div className="flex items-center gap-3 text-start">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 flex items-center justify-center font-bold text-xs shrink-0 border border-blue-200/50 dark:border-blue-800/40">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#1d1d1f] dark:text-white">
                  {t.eftekerPillarCardTitle}
                </div>
                <div className="text-[11px] text-blue-700 dark:text-blue-400">
                  {t.eftekerPillarCardDesc}
                </div>
              </div>
            </div>
            <div className="text-xs font-mono font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/40 px-2.5 py-1 rounded-full shrink-0">
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
          className="apple-pill-btn px-7 py-3.5 bg-[#1d1d1f] hover:bg-black dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black font-bold text-sm shadow-xl flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
        >
          <Smartphone className="w-4 h-4 text-blue-400 dark:text-blue-600" />
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
          className="apple-pill-btn px-6 py-3.5 bg-white dark:bg-[#15171e] text-[#1d1d1f] dark:text-white border border-black/[0.1] dark:border-white/10 hover:bg-neutral-50 dark:hover:bg-[#1d2029] font-semibold text-sm shadow-xs flex items-center gap-2 cursor-pointer transition-all"
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>{t.exploreMatrix}</span>
        </a>
      </div>

      {/* ======================================================== */}
      {/* SOCIAL PROOF & EXECUTIVE TRUST METRICS BAR */}
      {/* ======================================================== */}
      <div className="max-w-4xl w-full mx-auto mt-14 pt-8 border-t border-black/[0.06] dark:border-white/10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Metric 1: User Rating */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/90 dark:bg-[#11131a]/90 border border-black/[0.06] dark:border-white/10 shadow-xs flex flex-col items-center justify-center text-center group hover:border-amber-400/40 transition-colors">
            <div className="text-xl sm:text-2xl font-black text-amber-500 tracking-tight font-mono">
              {t.metricRatingVal}
            </div>
            <div className="text-[11px] sm:text-xs font-semibold text-[#6e6e73] dark:text-[#98989f] mt-0.5">
              {t.metricRatingLabel}
            </div>
          </div>

          {/* Metric 2: 100% Offline */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/90 dark:bg-[#11131a]/90 border border-black/[0.06] dark:border-white/10 shadow-xs flex flex-col items-center justify-center text-center group hover:border-emerald-500/40 transition-colors">
            <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight font-mono">
              {t.metricOfflineVal}
            </div>
            <div className="text-[11px] sm:text-xs font-semibold text-[#6e6e73] dark:text-[#98989f] mt-0.5">
              {t.metricOfflineLabel}
            </div>
          </div>

          {/* Metric 3: Zero Ads */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/90 dark:bg-[#11131a]/90 border border-black/[0.06] dark:border-white/10 shadow-xs flex flex-col items-center justify-center text-center group hover:border-blue-500/40 transition-colors">
            <div className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 tracking-tight font-mono">
              {t.metricAdsVal}
            </div>
            <div className="text-[11px] sm:text-xs font-semibold text-[#6e6e73] dark:text-[#98989f] mt-0.5">
              {t.metricAdsLabel}
            </div>
          </div>

          {/* Metric 4: Verified Operations */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/90 dark:bg-[#11131a]/90 border border-black/[0.06] dark:border-white/10 shadow-xs flex flex-col items-center justify-center text-center group hover:border-purple-500/40 transition-colors">
            <div className="text-xl sm:text-2xl font-black text-purple-600 dark:text-purple-400 tracking-tight font-mono">
              {t.metricOpsVal}
            </div>
            <div className="text-[11px] sm:text-xs font-semibold text-[#6e6e73] dark:text-[#98989f] mt-0.5">
              {t.metricOpsLabel}
            </div>
          </div>
        </div>

        {/* Supporting Micro Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-[#6e6e73] dark:text-[#98989f]">
            <Lock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{t.trustLocal}</span>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-[#6e6e73] dark:text-[#98989f]">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
            <span>{t.trustZeroAds}</span>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-[#6e6e73] dark:text-[#98989f]">
            <WifiOff className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>{t.trustOffline}</span>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-[#6e6e73] dark:text-[#98989f]">
            <Smartphone className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" />
            <span>{t.trustAndroid}</span>
          </div>
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
        className="mt-10 flex flex-col items-center gap-1 text-xs text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors cursor-pointer"
      >
        <span>{t.scrollDown}</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-[#0071e3]" />
      </a>
    </section>
  );
};
