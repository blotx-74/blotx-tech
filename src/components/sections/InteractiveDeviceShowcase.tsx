import { useState, useEffect, useRef, type FC } from 'react';
import { useConfig } from '../../ConfigContext';
import { useLanguage } from '../../LanguageContext';
import {
  Smartphone,
  Sparkles,
  Radio,
  CheckCircle2,
  Camera,
  RotateCcw
} from 'lucide-react';
import {
  playAppleClick,
  playVaultThud,
  playAirDropChime,
} from '../../utils/soundEffects';
import { TahtBalataScreen } from '../simulator/TahtBalataScreen';
import { EftekirScreen } from '../simulator/EftekirScreen';

type ViewMode = 'perspective' | 'flat' | 'taht-focus' | 'efteker-focus';
type AirDropStage = 'idle' | 'radar' | 'beaming' | 'received';

export const InteractiveDeviceShowcase: FC = () => {
  const config = useConfig();
  const { language, t } = useLanguage();
  const [viewMode, setViewMode] = useState<ViewMode>('perspective');
  const [screenMode, setScreenMode] = useState<'screenshot' | 'interactive'>(
    config?.mockupScreens?.defaultMode || 'screenshot'
  );

  // Sync screenMode if config changes
  useEffect(() => {
    if (config?.mockupScreens?.defaultMode) {
      setScreenMode(config.mockupScreens.defaultMode);
    }
  }, [config?.mockupScreens?.defaultMode]);

  const [airDropStage, setAirDropStage] = useState<AirDropStage>('idle');
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  const [capsuleTitle, setCapsuleTitle] = useState<string>('صيانة السيارة الدورية (3,500 ج.م)');

  // Real app screenshot URLs from Firebase CMS with high-def default fallbacks
  const tahtScreenshotUrl = config?.mockupScreens?.tahtElBalata || '/assets/mockups/taht-screen.png';
  const eftekerScreenshotUrl = config?.mockupScreens?.efteker || '/assets/mockups/afteker-screen.png';

  // Live interactive state inside Taht El Balata phone
  const [balataBalance, setBalataBalance] = useState<number>(142580);

  // 3D Parallax Tilt state
  const stageRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current || viewMode !== 'perspective') return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setTilt({ x: y, y: x });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Reset simulator state
  const handleResetSimulator = () => {
    playAppleClick();
    setBalataBalance(142580);
    setAirDropStage('idle');
    setSyncMessage('تمت إعادة ضبط المحاكاة للوضع الافتراضي.');
    setTimeout(() => setSyncMessage(null), 3000);
  };

  // Trigger Authentic iOS AirDrop Experience with Dynamic Payload
  const triggerAirDropSync = (
    amount: number = 3500,
    title: string = 'صيانة السيارة الدورية (3,500 ج.م)'
  ) => {
    if (airDropStage !== 'idle') return;

    setCapsuleTitle(title);
    playAirDropChime();
    setAirDropStage('radar');
    setSyncMessage('AirDrop: جاري استشعار الهاتف الآخر وبث موجات الرادار...');

    // Stage 2: Beam & Flying AirDrop Capsule (after 500ms)
    setTimeout(() => {
      setAirDropStage('beaming');
      setSyncMessage(`AirDrop: إرسال كبسولة ${title} عبر الأثير...`);
    }, 550);

    // Stage 3: Reception & Acceptance in Taht El Balata (after 1450ms)
    setTimeout(() => {
      playVaultThud();
      setAirDropStage('received');
      setBalataBalance((prev) => Math.max(0, prev - amount));
      setSyncMessage(`✓ تم استلام ${title} عبر AirDrop! اقتطاع المصروف وتوثيقه في الخزنة.`);
    }, 1450);

    // Stage 4: Reset back to idle (after 4500ms)
    setTimeout(() => {
      setAirDropStage('idle');
      setSyncMessage(null);
    }, 4600);
  };

  return (
    <section
      id="devices"
      className="py-24 bg-gradient-to-b from-[#ffffff] via-[#fbfbfd] to-[#f4f4f7] border-t border-black/[0.04] overflow-hidden font-cairo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900 text-white text-xs font-bold shadow-md">
            <Smartphone className="w-3.5 h-3.5 text-blue-400" />
            <span>{t.showcaseBadge}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1d1d1f] tracking-tight leading-tight">
            {t.showcaseTitle1}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#059669] via-[#0071e3] to-[#059669]">
              {t.showcaseTitle2}
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#6e6e73] leading-relaxed">
            {t.showcaseDesc}
          </p>
        </div>

        {/* Real Screenshots vs Live Interactive Switcher */}
        <div className="flex items-center justify-center mb-6">
          <div className="bg-neutral-900/90 p-1.5 rounded-full border border-black/10 shadow-xl backdrop-blur-md flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                playAppleClick();
                setScreenMode('screenshot');
              }}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                screenMode === 'screenshot'
                  ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>{t.modeScreenshots}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                playAppleClick();
                setScreenMode('interactive');
              }}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                screenMode === 'interactive'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{t.modeInteractive}</span>
            </button>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            type="button"
            onClick={() => {
              playAppleClick();
              setViewMode('perspective');
            }}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'perspective'
                ? 'bg-[#1d1d1f] text-white shadow-md'
                : 'bg-white text-[#1d1d1f] border border-black/[0.08] hover:bg-neutral-100'
            }`}
          >
            {t.view3d}
          </button>
          <button
            type="button"
            onClick={() => {
              playAppleClick();
              setViewMode('flat');
            }}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'flat'
                ? 'bg-[#1d1d1f] text-white shadow-md'
                : 'bg-white text-[#1d1d1f] border border-black/[0.08] hover:bg-neutral-100'
            }`}
          >
            {t.viewFlat}
          </button>
          <button
            type="button"
            onClick={() => {
              playAppleClick();
              setViewMode('taht-focus');
            }}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'taht-focus'
                ? 'bg-[#059669] text-white shadow-md'
                : 'bg-white text-[#1d1d1f] border border-black/[0.08] hover:bg-neutral-100'
            }`}
          >
            {t.focusTaht}
          </button>
          <button
            type="button"
            onClick={() => {
              playAppleClick();
              setViewMode('efteker-focus');
            }}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'efteker-focus'
                ? 'bg-[#0071e3] text-white shadow-md'
                : 'bg-white text-[#1d1d1f] border border-black/[0.08] hover:bg-neutral-100'
            }`}
          >
            {t.focusEfteker}
          </button>
        </div>

        {/* Quick Ecosystem Action Bar */}
        {screenMode === 'interactive' && (
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <button
              type="button"
              onClick={() => triggerAirDropSync(3500, language === 'ar' ? 'صيانة السيارة الدورية (3,500 ج.م)' : 'Car Service Due (3,500 EGP)')}
              disabled={airDropStage !== 'idle'}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-blue-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white text-xs font-black shadow-lg flex items-center gap-2 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <Radio className={`w-4 h-4 ${airDropStage !== 'idle' ? 'animate-spin text-amber-300' : ''}`} />
              <span>{t.simulateAirDrop}</span>
            </button>

            <button
              type="button"
              onClick={handleResetSimulator}
              className="px-4 py-2.5 rounded-2xl bg-white hover:bg-neutral-100 text-[#1d1d1f] border border-black/10 text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-neutral-500" />
              <span>{t.resetSim}</span>
            </button>
          </div>
        )}

        {/* The 3D Stage Container */}
        <div
          ref={stageRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative min-h-[740px] rounded-[36px] bg-gradient-to-b from-white/95 via-[#fbfbfd] to-[#f4f4f7] border border-black/[0.06] shadow-2xl p-6 sm:p-12 flex flex-col items-center justify-center overflow-hidden"
          style={{ perspective: 1400 }}
        >
          {/* Subtle Ambient Radial Halos */}
          <div className="absolute top-1/4 left-1/4 w-[420px] h-[420px] bg-emerald-100/35 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="absolute top-1/4 right-1/4 w-[420px] h-[420px] bg-blue-100/35 rounded-full blur-3xl pointer-events-none -z-10" />

          {/* ==================================================== */}
          {/* AIRDROP RADAR RIPPLES & AURORA WAVE EFFECT */}
          {/* ==================================================== */}
          {(airDropStage === 'radar' || airDropStage === 'beaming') && (
            <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center">
              {/* Efteker (Sender) Radar Pulse Rings */}
              <div className="absolute top-28 right-[18%] sm:right-[24%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                <div className="w-24 h-24 rounded-full border-2 border-blue-500/80 animate-airdrop-pulse" />
                <div className="w-48 h-48 rounded-full border-2 border-sky-400/60 animate-airdrop-pulse [animation-delay:300ms]" />
                <div className="w-72 h-72 rounded-full border border-blue-300/40 animate-airdrop-pulse [animation-delay:600ms]" />
              </div>

              {/* Fluid Aurora Light Sweep between Phones */}
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-2xl h-36 bg-gradient-to-r from-emerald-400/30 via-sky-400/40 to-blue-500/30 blur-2xl animate-airdrop-aurora pointer-events-none" />
            </div>
          )}

          {/* AirDrop Traveling Capsule Flying Across the Air */}
          {airDropStage === 'beaming' && (
            <div className="absolute top-36 z-50 animate-airdrop-float transition-all duration-700 ease-out pointer-events-none">
              <div className="p-3.5 px-5 rounded-2xl bg-white/95 backdrop-blur-2xl border border-black/10 shadow-[0_20px_40px_rgba(0,113,227,0.3)] flex items-center gap-3 text-right">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shrink-0">
                  <Radio className="w-4 h-4 animate-spin" />
                </div>
                <div>
                  <div className="text-xs font-black text-[#1d1d1f] flex items-center gap-1.5">
                    <span>{capsuleTitle}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-blue-50 text-blue-700 font-mono font-bold">
                      AIRDROP
                    </span>
                  </div>
                  <div className="text-[10px] text-neutral-500">
                    جاري النقل المشفر من افتكر → تحت البلاطة
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sync Beam Notification Banner */}
          {syncMessage && (
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-40 px-6 py-2.5 rounded-full bg-neutral-900/95 backdrop-blur-md text-white border border-white/20 shadow-2xl text-xs sm:text-sm font-bold flex items-center gap-2 animate-bounce">
              <Radio className="w-4 h-4 text-blue-400 shrink-0" />
              <span>{syncMessage}</span>
            </div>
          )}

          {/* Dual Phone Showcase Grid */}
          <div
            className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center justify-items-center transition-transform duration-300 ease-out"
            style={{
              transform:
                viewMode === 'perspective'
                  ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
                  : 'none',
            }}
          >
            {/* ==================================================== */}
            {/* PHONE 1: «تحت البلاطة» (FINANCIAL FORTRESS) */}
            {/* ==================================================== */}
            <div
              className={`relative transition-all duration-500 w-full max-w-[360px] ${
                viewMode === 'efteker-focus'
                  ? 'opacity-35 scale-95 pointer-events-none'
                  : 'opacity-100 scale-100'
              }`}
              style={{
                transform:
                  viewMode === 'perspective'
                    ? 'rotateY(10deg) rotateX(4deg) translateZ(10px)'
                    : 'none',
              }}
            >
              {/* Phone Outer Titanium Chassis */}
              <div className="relative rounded-[50px] p-3.5 bg-gradient-to-b from-neutral-200 via-neutral-300 to-neutral-400 shadow-[0_25px_60px_-15px_rgba(5,150,105,0.25)] border-2 border-white/60">
                {/* Antenna Bands & Side Buttons */}
                <div className="absolute -left-[5px] top-24 w-[3px] h-10 bg-neutral-400 rounded-l-md" />
                <div className="absolute -left-[5px] top-38 w-[3px] h-10 bg-neutral-400 rounded-l-md" />
                <div className="absolute -right-[5px] top-28 w-[3px] h-14 bg-neutral-400 rounded-r-md" />

                {/* Inner Screen Bezel */}
                <div className="relative rounded-[42px] bg-black p-2 overflow-hidden shadow-inner">
                  {/* The Screen Display */}
                  <div className="relative rounded-[36px] bg-[#f8fafc] text-[#0f172a] h-[640px] flex flex-col justify-between overflow-hidden text-right select-none border border-black/10">
                    {/* Gloss Glass Reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none z-30" />

                    {/* Top Status Bar & Morphing Dynamic Island */}
                    <div className="pt-2.5 px-5 flex items-center justify-between z-20 text-[11px] font-bold text-neutral-800">
                      <span>09:41</span>

                      {/* Morphing Dynamic Island with iOS AirDrop Effect */}
                      <div
                        className={`transition-all duration-500 rounded-full bg-black flex items-center justify-center px-3 shadow-md ${
                          airDropStage === 'received'
                            ? 'w-60 h-8 ring-2 ring-emerald-400 bg-neutral-950'
                            : 'w-24 h-5'
                        }`}
                      >
                        {airDropStage === 'received' ? (
                          <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold whitespace-nowrap animate-fadeIn">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>AirDrop: تم استلام القسط في الخزنة ✓</span>
                          </div>
                        ) : (
                          <>
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-auto" />
                            <span className="text-[9px] text-white font-mono">BLOTX SAFE</span>
                          </>
                        )}
                      </div>

                      <div className="flex items-center gap-1 font-mono text-[10px]">
                        <span>5G</span>
                        <div className="w-4 h-2 rounded-sm border border-neutral-800 p-[1px] flex items-center">
                          <div className="w-full h-full bg-neutral-800 rounded-xs" />
                        </div>
                      </div>
                    </div>

                    {screenMode === 'screenshot' && tahtScreenshotUrl ? (
                      <div className="relative flex-1 w-full h-full overflow-hidden bg-slate-950 flex flex-col justify-between group">
                        <img
                          src={tahtScreenshotUrl}
                          alt="شاشة تطبيق تحت البلاطة"
                          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-4 text-white">
                          <p className="text-xs font-bold flex items-center gap-1.5 text-emerald-400">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>لقطة شاشة حقيقية • تطبيق تحت البلاطة</span>
                          </p>
                          <p className="text-[10px] text-slate-300 mt-0.5">تفاصيل الواجهة الرسمية للتطبيق</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex-1 w-full h-full overflow-hidden">
                        <TahtBalataScreen
                          balance={balataBalance}
                          onBalanceChange={setBalataBalance}
                          isAirDropReceived={airDropStage === 'received'}
                        />
                      </div>
                    )}

                    {/* Home Indicator Bar */}
                    <div className="pb-1.5 flex justify-center">
                      <div className="w-32 h-1 bg-black/30 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge under Taht El Balata Phone */}
              <div className="mt-4 text-center">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200 shadow-xs">
                  {t.tahtBadgeShowcase}
                </span>
              </div>
            </div>

            {/* ==================================================== */}
            {/* PHONE 2: «افتكر» (COGNITIVE SECOND BRAIN) */}
            {/* ==================================================== */}
            <div
              className={`relative transition-all duration-500 w-full max-w-[360px] ${
                viewMode === 'taht-focus'
                  ? 'opacity-35 scale-95 pointer-events-none'
                  : 'opacity-100 scale-100'
              }`}
              style={{
                transform:
                  viewMode === 'perspective'
                    ? 'rotateY(-10deg) rotateX(4deg) translateZ(10px)'
                    : 'none',
              }}
            >
              {/* Phone Outer Titanium Chassis */}
              <div className="relative rounded-[50px] p-3.5 bg-gradient-to-b from-neutral-200 via-neutral-300 to-neutral-400 shadow-[0_25px_60px_-15px_rgba(0,113,227,0.25)] border-2 border-white/60">
                {/* Antenna Bands & Side Buttons */}
                <div className="absolute -left-[5px] top-24 w-[3px] h-10 bg-neutral-400 rounded-l-md" />
                <div className="absolute -left-[5px] top-38 w-[3px] h-10 bg-neutral-400 rounded-l-md" />
                <div className="absolute -right-[5px] top-28 w-[3px] h-14 bg-neutral-400 rounded-r-md" />

                {/* Inner Screen Bezel */}
                <div className="relative rounded-[42px] bg-black p-2 overflow-hidden shadow-inner">
                  {/* The Screen Display */}
                  <div className="relative rounded-[36px] bg-[#f8fafc] text-[#0f172a] h-[640px] flex flex-col justify-between overflow-hidden text-right select-none border border-black/10">
                    {/* Gloss Glass Reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none z-30" />

                    {/* Top Status Bar & Morphing Dynamic Island */}
                    <div className="pt-2.5 px-5 flex items-center justify-between z-20 text-[11px] font-bold text-neutral-800">
                      <span>09:41</span>

                      {/* Morphing Dynamic Island with iOS AirDrop Effect */}
                      <div
                        className={`transition-all duration-500 rounded-full bg-black flex items-center justify-center px-3 shadow-md ${
                          airDropStage === 'radar' || airDropStage === 'beaming'
                            ? 'w-56 h-8 ring-2 ring-blue-400 bg-neutral-950'
                            : 'w-24 h-5'
                        }`}
                      >
                        {airDropStage === 'radar' || airDropStage === 'beaming' ? (
                          <div className="flex items-center gap-1.5 text-[10px] text-blue-300 font-bold whitespace-nowrap animate-fadeIn">
                            <Radio className="w-3.5 h-3.5 text-blue-400 animate-spin" />
                            <span>AirDrop: بث موعد القسط...</span>
                          </div>
                        ) : (
                          <>
                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse mr-auto" />
                            <span className="text-[9px] text-white font-mono">EFTEKER BRAIN</span>
                          </>
                        )}
                      </div>

                      <div className="flex items-center gap-1 font-mono text-[10px]">
                        <span>5G</span>
                        <div className="w-4 h-2 rounded-sm border border-neutral-800 p-[1px] flex items-center">
                          <div className="w-full h-full bg-neutral-800 rounded-xs" />
                        </div>
                      </div>
                    </div>

                    {screenMode === 'screenshot' && eftekerScreenshotUrl ? (
                      <div className="relative flex-1 w-full h-full overflow-hidden bg-slate-950 flex flex-col justify-between group">
                        <img
                          src={eftekerScreenshotUrl}
                          alt="شاشة تطبيق افتكر"
                          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-4 text-white">
                          <p className="text-xs font-bold flex items-center gap-1.5 text-blue-400">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>لقطة شاشة حقيقية • تطبيق افتكر</span>
                          </p>
                          <p className="text-[10px] text-slate-300 mt-0.5">تفاصيل الواجهة الرسمية للتطبيق</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex-1 w-full h-full overflow-hidden">
                        <EftekirScreen
                          onTriggerAirDropSync={(amount, title) =>
                            triggerAirDropSync(amount, title)
                          }
                          isSyncedFromBalata={airDropStage === 'received'}
                        />
                      </div>

                    )}

                    {/* Home Indicator Bar */}
                    <div className="pb-1.5 flex justify-center">
                      <div className="w-32 h-1 bg-black/30 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge under Efteker Phone */}
              <div className="mt-4 text-center">
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200 shadow-xs">
                  {t.eftekerBadgeShowcase}
                </span>
              </div>
            </div>
          </div>

          {/* Symmetrical Central Bridge & AirDrop Symbiosis Button */}
          <div className="mt-14 z-20 flex flex-col items-center gap-4 text-center max-w-lg">
            <button
              type="button"
              onClick={() => triggerAirDropSync()}
              disabled={airDropStage !== 'idle'}
              className={`apple-pill-btn px-8 py-4 bg-gradient-to-r from-[#059669] via-[#0071e3] to-[#059669] text-white font-bold text-sm shadow-xl flex items-center gap-3 transition-all cursor-pointer ${
                airDropStage !== 'idle'
                  ? 'opacity-85 ring-4 ring-blue-400/30'
                  : 'hover:scale-105 active:scale-95'
              }`}
            >
              <Radio className={`w-5 h-5 text-amber-300 ${airDropStage !== 'idle' ? 'animate-spin' : ''}`} />
              <span>
                {airDropStage === 'idle' && `${t.simulateAirDrop} ✦`}
                {airDropStage === 'radar' && t.airDropRadar}
                {airDropStage === 'beaming' && t.airDropBeaming}
                {airDropStage === 'received' && t.airDropReceived}
              </span>
            </button>

            <p className="text-xs text-[#86868b]">
              {t.airDropDesc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
