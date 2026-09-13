import { useState, useEffect } from 'react';
import { Sparkles, ArrowLeft, X, Clock } from 'lucide-react';


interface AnnouncementBarProps {
  data?: {
    is_enabled?: boolean;
    text?: string;
    badge?: string;
    type?: 'announcement' | 'warning' | 'info' | 'countdown';
    targetDate?: string;
    actionUrl?: string;
    actionText?: string;
    closable?: boolean;
  };
}

export function AnnouncementBar({ data }: AnnouncementBarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    if (!data?.targetDate || data?.type !== 'countdown') return;

    const calculateTime = () => {
      const difference = +new Date(data.targetDate!) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft(null);
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [data?.targetDate, data?.type]);

  if (!data || !data.is_enabled || !isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-[#1d1d1f] via-[#2d2d30] to-[#1d1d1f] text-white px-4 py-2.5 text-xs border-b border-white/10 z-50 shadow-md font-sans">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left / Main message */}
        <div className="flex items-center gap-2.5 flex-1 min-w-[280px]">
          {data.badge && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#0071e3] text-white flex items-center gap-1 shadow-sm tracking-wide shrink-0">
              <Sparkles className="w-3 h-3" />
              {data.badge}
            </span>
          )}
          <p className="font-medium text-white/90 leading-tight">
            {data.text}
          </p>
        </div>

        {/* Center: Live Countdown if active */}
        {timeLeft && (
          <div className="flex items-center gap-2 bg-black/30 border border-white/10 px-3 py-1 rounded-full text-[11px] font-mono shrink-0">
            <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>باقي:</span>
            <span className="text-white font-bold">{timeLeft.days}ي</span>
            <span>:</span>
            <span className="text-white font-bold">{String(timeLeft.hours).padStart(2, '0')}س</span>
            <span>:</span>
            <span className="text-white font-bold">{String(timeLeft.minutes).padStart(2, '0')}د</span>
            <span>:</span>
            <span className="text-amber-400 font-bold">{String(timeLeft.seconds).padStart(2, '0')}ث</span>
          </div>
        )}

        {/* Right: Action link & dismiss button */}
        <div className="flex items-center gap-2 shrink-0">
          {data.actionUrl && (
            <a
              href={data.actionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold transition-all hover:scale-105 border border-white/10"
            >
              <span>{data.actionText || 'التفاصيل'}</span>
              <ArrowLeft className="w-3 h-3" />
            </a>
          )}
          {data.closable && (
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              title="إغلاق الإعلان"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
