import { useState, useEffect, type FC } from 'react';
import { ShieldCheck, X, ChevronRight, Lock } from 'lucide-react';
import { useLanguage } from '../../LanguageContext';
import { playAppleClick } from '../../utils/soundEffects';

interface ZeroCookiesBannerProps {
  onOpenPrivacy: () => void;
}

const STORAGE_KEY = 'blotx_zero_cookies_dismissed';

export const ZeroCookiesBanner: FC<ZeroCookiesBannerProps> = ({ onOpenPrivacy }) => {
  const { isRTL, t } = useLanguage();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(STORAGE_KEY);
      if (!dismissed) {
        // Show after a gentle 1-second delay so it enters smoothly
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage may fail in strict private modes
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    playAppleClick();
    setIsVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // Ignore if localStorage unavailable
    }
  };

  const handlePrivacyClick = () => {
    playAppleClick();
    onOpenPrivacy();
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Zero Cookies Notice"
      className="fixed bottom-24 sm:bottom-6 right-3 sm:right-6 z-40 max-w-[calc(100vw-24px)] sm:max-w-md animate-fade-in font-cairo"
    >
      <div className="relative p-4 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-neutral-900/95 border border-black/10 dark:border-white/10 shadow-2xl backdrop-blur-xl transition-all duration-300">
        {/* Subtle Ambient Shield Glow */}
        <div className="absolute -inset-1 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-transparent blur-md -z-10 pointer-events-none" />

        <div className="flex items-start gap-3">
          {/* Shield Badge Icon */}
          <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-200/60 dark:border-emerald-800/60 shadow-xs">
            <ShieldCheck className="w-5 h-5" />
          </div>

          {/* Text & Actions Content */}
          <div className="flex-1 min-w-0 text-start">
            <div className="flex items-center justify-between gap-2">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-100/70 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">
                <Lock className="w-3 h-3" />
                <span>{t.cookiesBannerBadge}</span>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={handleDismiss}
                className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                title={t.cookiesBannerDismiss}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="mt-2 text-xs sm:text-[13px] text-[#48484a] dark:text-neutral-300 leading-relaxed font-normal">
              {t.cookiesBannerText}
            </p>

            {/* Bottom Actions Bar */}
            <div className="mt-3 pt-2.5 border-t border-black/5 dark:border-white/5 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={handlePrivacyClick}
                className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                <span>{t.cookiesBannerPrivacyLink}</span>
                <ChevronRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
              </button>

              <button
                type="button"
                onClick={handleDismiss}
                className="px-3 py-1 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
              >
                {t.cookiesBannerDismiss}
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
