import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { useLanguage } from '../../LanguageContext';

interface LiveCairoTimeProps {
  className?: string;
  showIcon?: boolean;
}

export const LiveCairoTime: React.FC<LiveCairoTimeProps> = ({ className = '', showIcon = true }) => {
  const { language } = useLanguage();
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Africa/Cairo',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        });
        setTimeStr(formatter.format(now));
      } catch {
        const now = new Date();
        setTimeStr(now.toLocaleTimeString());
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const isAr = language === 'ar';

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-[#1A1A1A]/10 text-xs text-[#1A1A1A] font-medium shadow-xs transition-all hover:border-[#8C7A54]/40 ${className}`}
      title={isAr ? 'توقيت القاهرة المباشر (توقيت مصر)' : 'Live Cairo Local Time (Egypt GMT+3)'}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      {showIcon && <Clock className="w-3.5 h-3.5 text-[#8C7A54]" />}
      <span className="font-editorial-serif tracking-wider font-semibold text-[11px] sm:text-xs">
        {timeStr || 'Cairo Time'}
      </span>
      <span className="text-[10px] text-[#8C7A54] uppercase tracking-wider font-bold">
        {isAr ? 'القاهرة' : 'Cairo'}
      </span>
    </div>
  );
};
