import { useState, useRef, type FC } from 'react';
import {
  Brain,
  Lock,
  Sparkles,
  Activity,
  ArrowLeftRight,
} from 'lucide-react';
import {
  playAppleClick,
  playVaultThud,
  playClarityChime,
  playAirDropChime,
} from '../../utils/soundEffects';

export type ActiveCardId = 'blotx' | 'taht' | 'efteker';

interface EcosystemSolidCards3DProps {
  onCardSelect?: (id: ActiveCardId) => void;
}

type ModeType = 'baseline' | 'installment' | 'emergency';

export const EcosystemSolidCards3D: FC<EcosystemSolidCards3DProps> = ({ onCardSelect }) => {
  const [selectedNode, setSelectedNode] = useState<ActiveCardId>('blotx');
  const [activeMode, setActiveMode] = useState<ModeType>('baseline');
  const [isPulsing, setIsPulsing] = useState(false);

  // 3D Parallax Tilt
  const stageRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    setTilt({ x: y, y: x });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const selectNode = (id: ActiveCardId) => {
    setSelectedNode(id);
    onCardSelect?.(id);
    if (id === 'taht') playVaultThud();
    else if (id === 'efteker') playClarityChime();
    else playAppleClick();
  };

  const triggerBusPulse = () => {
    playAirDropChime();
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 2400);
  };

  const handleModeChange = (mode: ModeType) => {
    playAppleClick();
    setActiveMode(mode);
    triggerBusPulse();
  };

  return (
    <div className="relative w-full flex flex-col items-center select-none font-cairo">
      {/* Formal Architecture Header & Telemetry Bar */}
      <div className="w-full max-w-5xl mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white/90 backdrop-blur-xl border border-black/[0.08] shadow-sm text-right">
        {/* Left: Live Telemetry Indicator */}
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <div className="text-right">
            <div className="text-[11px] font-mono font-bold text-[#1d1d1f] tracking-tight">
              ARCHITECTURE SPEC 2.4 // DUAL-NODE SYMMETRIC
            </div>
            <div className="text-[10px] text-emerald-700 font-semibold">
              تشفير محلي عسكري • زمن الاستجابة 0.002s
            </div>
          </div>
        </div>

        {/* Right: Operational Mode Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-neutral-100/90 border border-black/[0.04]">
          <button
            type="button"
            onClick={() => handleModeChange('baseline')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeMode === 'baseline'
                ? 'bg-white text-[#1d1d1f] shadow-xs'
                : 'text-[#6e6e73] hover:text-[#1d1d1f]'
            }`}
          >
            الوضع المتوازن
          </button>
          <button
            type="button"
            onClick={() => handleModeChange('installment')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeMode === 'installment'
                ? 'bg-[#1d1d1f] text-white shadow-xs'
                : 'text-[#6e6e73] hover:text-[#1d1d1f]'
            }`}
          >
            تنسيق الأقساط
          </button>
          <button
            type="button"
            onClick={() => handleModeChange('emergency')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeMode === 'emergency'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-[#6e6e73] hover:text-[#1d1d1f]'
            }`}
          >
            حماية الطوارئ
          </button>
        </div>
      </div>

      {/* Main Architectural Showcase Container */}
      <div
        ref={stageRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full max-w-5xl rounded-[36px] bg-gradient-to-b from-[#ffffff] via-[#fbfbfd] to-[#f4f4f7] border border-black/[0.08] shadow-2xl p-6 sm:p-12 overflow-hidden transition-all"
        style={{ perspective: 1200 }}
      >
        {/* Soft Luxury Halos in Background (No 90s grid!) */}
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* High-Precision Laser Circuit Bus Overlay (SVG Hairline Conduits) */}
        <div className="absolute inset-0 pointer-events-none z-10 hidden md:block">
          <svg className="w-full h-full" viewBox="0 0 1000 520" fill="none">
            {/* 1. Horizontal Master Conduits between Node 1 <-> Center <-> Node 2 */}
            <line
              x1="310"
              y1="250"
              x2="410"
              y2="250"
              stroke="#059669"
              strokeWidth="2"
              strokeOpacity="0.4"
            />
            <line
              x1="310"
              y1="254"
              x2="410"
              y2="254"
              stroke="#059669"
              strokeWidth="1"
              strokeDasharray="4 4"
              strokeOpacity="0.6"
            />

            <line
              x1="590"
              y1="250"
              x2="690"
              y2="250"
              stroke="#0071e3"
              strokeWidth="2"
              strokeOpacity="0.4"
            />
            <line
              x1="590"
              y1="254"
              x2="690"
              y2="254"
              stroke="#0071e3"
              strokeWidth="1"
              strokeDasharray="4 4"
              strokeOpacity="0.6"
            />

            {/* 2. Lower Symmetrical Arc directly between Node 1 (تحت البلاطة) & Node 2 (افتكر) */}
            <path
              d="M 230 420 C 350 490, 650 490, 770 420"
              stroke="#94a3b8"
              strokeWidth="1.5"
              strokeDasharray="6 6"
              strokeOpacity="0.5"
            />

            {/* 3. Glowing Traveling Photons / Data Packets */}
            <circle
              cx={isPulsing ? 500 : 360}
              cy="252"
              r="4"
              fill="#059669"
              className="transition-all duration-1000"
            />
            <circle
              cx={isPulsing ? 500 : 640}
              cy="252"
              r="4"
              fill="#0071e3"
              className="transition-all duration-1000"
            />
          </svg>
        </div>

        {/* The 3 Symmetrical Architectural Pedestals */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch relative z-20 transition-transform duration-300 ease-out"
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          }}
        >
          {/* ======================================================= */}
          {/* PEDESTAL 1: «تحت البلاطة» (FINANCIAL FORTRESS NODE) */}
          {/* ======================================================= */}
          <div
            onClick={() => selectNode('taht')}
            className={`p-6 sm:p-7 rounded-[28px] border transition-all duration-400 cursor-pointer flex flex-col justify-between text-right relative group ${
              selectedNode === 'taht'
                ? 'bg-white border-emerald-500 shadow-[0_20px_45px_-12px_rgba(5,150,105,0.2)] ring-2 ring-emerald-500/20 -translate-y-2'
                : 'bg-white/85 backdrop-blur-md border-black/[0.08] hover:border-emerald-300 hover:shadow-lg'
            }`}
          >
            {/* Top Chamfer Tag */}
            <div>
              <div className="flex items-center justify-between mb-5 border-b border-black/[0.05] pb-3">
                <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  NODE 01 // FINANCIAL ENCLAVE
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              {/* Recessed Jewel Emblem */}
              <div className="relative w-20 h-20 mx-auto mb-5 rounded-2xl bg-neutral-50 p-2 border border-emerald-200/80 shadow-inner flex items-center justify-center group-hover:scale-105 transition-transform">
                <img
                  src="/assets/logos/taht-elbalata-logo.png"
                  alt="تحت البلاطة"
                  className="w-full h-full object-contain drop-shadow-md z-10"
                />
                {isPulsing && selectedNode === 'taht' && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-24 h-24 rounded-full border-2 border-emerald-400/80 animate-airdrop-pulse" />
                    <div className="w-40 h-40 rounded-full border border-emerald-300/40 animate-airdrop-pulse [animation-delay:250ms]" />
                  </div>
                )}
              </div>

              <h3 className="text-xl font-black text-[#1d1d1f] tracking-tight mb-1">
                تحت البلاطة
              </h3>
              <div className="text-xs font-semibold text-emerald-700 mb-4">
                الحصن المالي وحارس الثروة
              </div>

              {/* Live Architectural Metrics */}
              <div className="p-4 rounded-xl bg-neutral-50/80 border border-black/[0.04] space-y-2 mb-4">
                <div className="flex items-center justify-between text-[11px] text-neutral-500 font-bold">
                  <span>148,500 ج.م</span>
                  <span>الأصول المحمية</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-emerald-800 font-bold">
                  <span>مكتملة 100%</span>
                  <span>خزنة الطوارئ</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-blue-800 font-bold">
                  <span>محجوز تلقائياً</span>
                  <span>قسط السيارة</span>
                </div>
              </div>
            </div>

            {/* Bottom Status Footnote */}
            <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between text-[10px] text-emerald-700 font-bold">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span>تشفير أوفلاين مستقل</span>
              </span>
              <span>نشط ✓</span>
            </div>
          </div>

          {/* ======================================================= */}
          {/* PEDESTAL 2: «BLOTX STACK» (THE CORE MASTER ORCHESTRATOR) */}
          {/* ======================================================= */}
          <div
            onClick={() => selectNode('blotx')}
            className={`p-6 sm:p-7 rounded-[28px] border transition-all duration-400 cursor-pointer flex flex-col justify-between text-right relative group ${
              selectedNode === 'blotx'
                ? 'bg-[#0a0b10] text-white border-[#0071e3] shadow-[0_25px_60px_-15px_rgba(0,113,227,0.35)] ring-2 ring-blue-500/30 -translate-y-3 scale-[1.03]'
                : 'bg-[#11131a] text-white border-white/10 hover:border-blue-400/50 hover:shadow-2xl'
            }`}
          >
            {/* Top Chamfer Tag */}
            <div>
              <div className="flex items-center justify-between mb-5 border-b border-white/10 pb-3">
                <span className="text-[10px] font-mono font-bold text-sky-300 bg-sky-950/80 px-2.5 py-0.5 rounded-full border border-sky-500/30">
                  MASTER HUB // BLOTX STACK v2.4
                </span>
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              </div>

              {/* Recessed Chrome Emblem Housing */}
              <div className="w-24 h-24 mx-auto mb-5 rounded-3xl bg-black p-3 border border-white/20 shadow-2xl flex items-center justify-center group-hover:scale-105 transition-transform relative">
                <img
                  src="/assets/logos/blotx-tech-logo.png"
                  alt="Blotx Stack Emblem"
                  className="w-full h-full object-contain drop-shadow-xl z-10"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none rounded-3xl" />
                {isPulsing && selectedNode === 'blotx' && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-28 h-28 rounded-full border-2 border-sky-400/80 animate-airdrop-pulse" />
                    <div className="w-44 h-44 rounded-full border border-blue-400/40 animate-airdrop-pulse [animation-delay:250ms]" />
                  </div>
                )}
              </div>

              <h3 className="text-xl font-black text-white tracking-tight mb-1">
                نواة Blotx Stack
              </h3>
              <div className="text-xs font-semibold text-sky-400 mb-4">
                المحرك المركزي للتحكيم والتنسيق الذاتي
              </div>

              {/* Telemetry Display */}
              <div className="p-4 rounded-xl bg-white/[0.06] border border-white/10 space-y-2 mb-4">
                <div className="flex items-center justify-between text-[11px] text-neutral-300 font-bold">
                  <span className="font-mono text-emerald-400">0.002s</span>
                  <span>سرعة المزامنة المحلية</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-neutral-300 font-bold">
                  <span className="text-sky-300">P2P Encrypted Bus</span>
                  <span>بروتوكول الربط</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-neutral-300 font-bold">
                  <span className="text-emerald-400">متصل 100% ✓</span>
                  <span>حالة الإيكوسيستم</span>
                </div>
              </div>
            </div>

            {/* Bottom Status Footnote */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-neutral-400 font-bold">
              <span className="flex items-center gap-1 text-sky-400">
                <Activity className="w-3 h-3" />
                <span>تحكيم لحظي بين العقدتين</span>
              </span>
              <span className="text-white">CENTRAL</span>
            </div>
          </div>

          {/* ======================================================= */}
          {/* PEDESTAL 3: «افتكر» (COGNITIVE SECOND BRAIN NODE) */}
          {/* ======================================================= */}
          <div
            onClick={() => selectNode('efteker')}
            className={`p-6 sm:p-7 rounded-[28px] border transition-all duration-400 cursor-pointer flex flex-col justify-between text-right relative group ${
              selectedNode === 'efteker'
                ? 'bg-white border-[#0071e3] shadow-[0_20px_45px_-12px_rgba(0,113,227,0.2)] ring-2 ring-blue-500/20 -translate-y-2'
                : 'bg-white/85 backdrop-blur-md border-black/[0.08] hover:border-blue-300 hover:shadow-lg'
            }`}
          >
            {/* Top Chamfer Tag */}
            <div>
              <div className="flex items-center justify-between mb-5 border-b border-black/[0.05] pb-3">
                <span className="text-[10px] font-mono font-bold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  NODE 02 // COGNITIVE ENCLAVE
                </span>
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              </div>

              {/* Recessed Jewel Emblem */}
              <div className="relative w-20 h-20 mx-auto mb-5 rounded-2xl bg-neutral-50 p-2 border border-blue-200/80 shadow-inner flex items-center justify-center group-hover:scale-105 transition-transform">
                <img
                  src="/assets/logos/efteker-logo.png"
                  alt="افتكر"
                  className="w-full h-full object-contain drop-shadow-md rounded-xl z-10"
                />
                {isPulsing && selectedNode === 'efteker' && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-24 h-24 rounded-full border-2 border-blue-500/80 animate-airdrop-pulse" />
                    <div className="w-40 h-40 rounded-full border border-blue-300/40 animate-airdrop-pulse [animation-delay:250ms]" />
                  </div>
                )}
              </div>

              <h3 className="text-xl font-black text-[#1d1d1f] tracking-tight mb-1">
                افتكر
              </h3>
              <div className="text-xs font-semibold text-blue-700 mb-4">
                العقل الثاني وحارس الذاكرة والصفاء
              </div>

              {/* Live Architectural Metrics */}
              <div className="p-4 rounded-xl bg-neutral-50/80 border border-black/[0.04] space-y-2 mb-4">
                <div className="flex items-center justify-between text-[11px] text-neutral-500 font-bold">
                  <span className="font-mono text-blue-700">100% صافي</span>
                  <span>مؤشر الصفاء الذهني</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-neutral-700 font-bold">
                  <span>0 مشتتات</span>
                  <span>الالتزامات المعلقة</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-emerald-800 font-bold">
                  <span>منسق مع الخزنة</span>
                  <span>تنبيه الاستحقاق</span>
                </div>
              </div>
            </div>

            {/* Bottom Status Footnote */}
            <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between text-[10px] text-blue-700 font-bold">
              <span className="flex items-center gap-1">
                <Brain className="w-3 h-3" />
                <span>ذاكرة هادئة غير مشوشة</span>
              </span>
              <span>نشط ✓</span>
            </div>
          </div>
        </div>

        {/* Bottom Interactive Laser Bus Action Trigger */}
        <div className="mt-10 pt-6 border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-[#6e6e73]">
            <ArrowLeftRight className="w-4 h-4 text-[#0071e3]" />
            <span>
              اضغط على أي عقدة لاستكشاف حالتها، أو جرّب بث نبضة الاستعلام المعماري بين العقد:
            </span>
          </div>

          <button
            type="button"
            onClick={triggerBusPulse}
            disabled={isPulsing}
            className={`apple-pill-btn px-6 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
              isPulsing
                ? 'bg-emerald-600 text-white animate-pulse'
                : 'bg-[#1d1d1f] hover:bg-black text-white shadow-md'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{isPulsing ? 'جاري بث النبضة عبر الممرات...' : 'بث نبضة التنسيق المعماري ✦'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
