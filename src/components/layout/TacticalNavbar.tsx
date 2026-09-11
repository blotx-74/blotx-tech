import { useState, useEffect, type FC } from 'react';
import { audioHaptics } from '../../utils/audioHaptics';
import { Volume2, VolumeX, Grid, Radio, Terminal } from 'lucide-react';

interface TacticalNavbarProps {
  gridActive: boolean;
  onToggleGrid: () => void;
}

export const TacticalNavbar: FC<TacticalNavbarProps> = ({ gridActive, onToggleGrid }) => {
  const [time, setTime] = useState<string>('');
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Africa/Cairo',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAudioToggle = () => {
    const nextMuted = audioHaptics.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) {
      audioHaptics.playClick(1500);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#202530] optical-glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo & Brand Industrial Badge */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            onClick={() => audioHaptics.playClick(1100)}
            className="flex items-center gap-3 group"
          >
            {/* Custom Industrial Emblem */}
            <div className="w-9 h-9 rounded bg-[#151820] border border-[#2e3544] group-hover:border-[#ff5500] flex items-center justify-center transition-all shadow-inner">
              <div className="w-4 h-4 border-2 border-[#ff5500] rounded-sm flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              </div>
            </div>

            <div className="flex flex-col text-right">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold tracking-tight text-white font-mono text-base group-hover:text-[#ff5500] transition-colors">
                  BLOTX TECH
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#20242e] text-[#8c93a0] font-mono font-normal">
                  OS 2.6
                </span>
              </div>
              <span className="text-[10px] text-[#8c93a0] font-mono tracking-wider">
                PRECISION HUMAN ECOSYSTEM
              </span>
            </div>
          </a>

          {/* System Status telemetry indicator */}
          <div className="hidden md:flex items-center gap-2 pl-4 border-l border-[#242934] text-[11px] font-mono">
            <Radio className="w-3.5 h-3.5 text-[#ff5500] animate-pulse" />
            <span className="text-[#8c93a0]">STATUS:</span>
            <span className="text-white font-semibold">ALL SYSTEMS NOMINAL</span>
          </div>
        </div>

        {/* Navigation Anchors */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-mono">
          <a
            href="#manifesto"
            onMouseEnter={() => audioHaptics.playTick()}
            onClick={() => audioHaptics.playClick()}
            className="text-[#8c93a0] hover:text-[#ff5500] transition-colors"
          >
            // 01. البيان التأسيسي
          </a>
          <a
            href="#philosophy"
            onMouseEnter={() => audioHaptics.playTick()}
            onClick={() => audioHaptics.playClick()}
            className="text-[#8c93a0] hover:text-[#ff5500] transition-colors"
          >
            // 02. فلسفة سد النواقص
          </a>
          <a
            href="#ecosystem"
            onMouseEnter={() => audioHaptics.playTick()}
            onClick={() => audioHaptics.playClick()}
            className="text-[#8c93a0] hover:text-[#ff5500] transition-colors"
          >
            // 03. الإيكوسيستم المترابط
          </a>
          <a
            href="#lab"
            onMouseEnter={() => audioHaptics.playTick()}
            onClick={() => audioHaptics.playClick()}
            className="text-[#8c93a0] hover:text-[#ff5500] transition-colors"
          >
            // 04. مختبر الابتكار
          </a>
        </nav>

        {/* Tactical Controls (Time, Audio Haptics, CAD Grid) */}
        <div className="flex items-center gap-3">
          {/* Live Cairo Time */}
          <div className="hidden sm:flex flex-col text-left font-mono text-[10px] bg-[#12151b] px-2.5 py-1 rounded border border-[#252a36]">
            <span className="text-[#525866]">CAIRO TIME (CLT)</span>
            <span className="text-[#ff5500] font-bold tracking-wider">{time || '00:00:00'}</span>
          </div>

          {/* Grid Toggle Switch */}
          <button
            onClick={() => {
              audioHaptics.playClick(900);
              onToggleGrid();
            }}
            onMouseEnter={() => audioHaptics.playTick()}
            title="Toggle CAD Grid"
            className={`p-2 rounded border transition-all ${
              gridActive
                ? 'bg-[#ff5500]/15 border-[#ff5500] text-[#ff5500]'
                : 'bg-[#151820] border-[#29303d] text-[#8c93a0] hover:text-white'
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>

          {/* Audio Haptics Toggle */}
          <button
            onClick={handleAudioToggle}
            onMouseEnter={() => audioHaptics.playTick()}
            title={isMuted ? 'تفعيل الصوت التكتيكي' : 'كتم الصوت التكتيكي'}
            className={`p-2 rounded border transition-all ${
              !isMuted
                ? 'bg-[#ff5500] border-[#ff5500] text-black font-bold'
                : 'bg-[#151820] border-[#29303d] text-[#525866] hover:text-white'
            }`}
          >
            {!isMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Terminal Console Trigger Button */}
          <a
            href="#terminal"
            onClick={() => audioHaptics.playRelay()}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#1c202a] hover:bg-[#252b38] border border-[#313847] hover:border-[#ff5500] text-xs font-mono text-white transition-all"
          >
            <Terminal className="w-3.5 h-3.5 text-[#ff5500]" />
            <span>CONNECT</span>
          </a>
        </div>
      </div>
    </header>
  );
};
