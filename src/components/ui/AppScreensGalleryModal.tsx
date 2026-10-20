import { useState, useEffect, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { playAppleClick } from '../../utils/soundEffects';

interface ScreenItem {
  url: string;
  caption?: string;
}

interface AppScreensGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  appName: string;
  logoUrl?: string;
  screens: ScreenItem[];
}

export const AppScreensGalleryModal: FC<AppScreensGalleryModalProps> = ({
  isOpen,
  onClose,
  title,
  appName,
  logoUrl,
  screens,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : screens.length - 1));
      }
      if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev < screens.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, screens.length, onClose]);

  if (!isOpen || screens.length === 0) return null;

  const currentScreen = screens[activeIndex];

  const handleNext = () => {
    playAppleClick();
    setActiveIndex((prev) => (prev < screens.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    playAppleClick();
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : screens.length - 1));
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-4xl bg-slate-900 text-white rounded-3xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between gap-4 bg-slate-900/90">
            <div className="flex items-center gap-3">
              {logoUrl && (
                <div className="w-10 h-10 rounded-xl bg-white p-1 overflow-hidden shrink-0 shadow-md flex items-center justify-center">
                  <img src={logoUrl} alt={appName} className="w-full h-full object-contain" />
                </div>
              )}
              <div>
                <h3 className="font-extrabold text-white text-base sm:text-lg tracking-tight">
                  {appName}
                </h3>
                <p className="text-xs text-slate-400">
                  {title} • {activeIndex + 1} من {screens.length}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                playAppleClick();
                onClose();
              }}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Gallery"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Stage */}
          <div className="relative flex-1 bg-black/60 p-4 sm:p-6 flex items-center justify-center overflow-hidden min-h-[360px] sm:min-h-[460px]">
            {/* Prev button */}
            <button
              onClick={handlePrev}
              className="absolute right-4 z-10 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700/60 shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Current Image & Caption */}
            <div className="relative max-h-[62vh] flex flex-col items-center justify-center gap-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center gap-2.5"
                >
                  <img
                    src={currentScreen.url}
                    alt={currentScreen.caption || `Screen ${activeIndex + 1}`}
                    className="max-h-[50vh] sm:max-h-[54vh] w-auto object-contain rounded-2xl shadow-2xl border border-slate-800/80"
                  />
                  {currentScreen.caption && (
                    <p className="text-xs sm:text-sm font-semibold text-slate-300 text-center px-4 max-w-lg">
                      {currentScreen.caption}
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Next button */}
            <button
              onClick={handleNext}
              className="absolute left-4 z-10 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700/60 shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer"
              aria-label="Next image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          {/* Thumbnails strip */}
          <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-center gap-2.5 overflow-x-auto">
            {screens.map((s, idx) => (
              <button
                key={idx}
                onClick={() => {
                  playAppleClick();
                  setActiveIndex(idx);
                }}
                className={`relative w-14 h-20 rounded-lg overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                  activeIndex === idx
                    ? 'border-blue-500 scale-105 shadow-md shadow-blue-500/30'
                    : 'border-slate-800 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={s.url} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
