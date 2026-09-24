import { useState, useContext, type FC } from 'react';
import { Download, X, CheckCircle, SmartphoneNfc, ArrowUpRight, Bell } from 'lucide-react';
import { playAppleClick, playVaultThud, playClarityChime } from '../../utils/soundEffects';
import { handleSmoothScrollClick } from '../../utils/smoothScroll';
import { useLanguage } from '../../LanguageContext';
import { ConfigContext } from '../../ConfigContext';

const GooglePlayIcon = () => (
  <svg className="w-6 h-6 shrink-0" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M47.5 13.9C40.6 17.6 36 24.8 36 33.7v444.6c0 8.9 4.6 16.1 11.5 19.8l232.7-242.1L47.5 13.9z" fill="#00D3FF"/>
    <path d="M371.3 146.9L280.2 256l91.1 109.1 52.8-30.2c15.1-8.6 24.5-24.3 24.5-41.9s-9.4-33.3-24.5-41.9l-52.8-30.2z" fill="#FFD400"/>
    <path d="M47.5 13.9l232.7 242.1 91.1-109.1L126.8 63.6 47.5 13.9z" fill="#00E676"/>
    <path d="M47.5 498.1l79.3-49.7 244.5-139.3-91.1-109.1L47.5 498.1z" fill="#FF334B"/>
  </svg>
);

export const FloatingEcosystemDock: FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [downloadNotification, setDownloadNotification] = useState<string | null>(null);
  const { language, t } = useLanguage();
  const config = useContext(ConfigContext);

  const handleDownloadApp = (appName: string, customUrl?: string) => {
    playAppleClick();
    if (customUrl) {
      window.open(customUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    const message =
      language === 'ar'
        ? `تطبيق «${appName}» جاهز للإطلاق! تم تجهيز حزمة Google Play الرسمية وستتوفر للتحميل المباشر فور اعتماد المتجر 🚀`
        : `"${appName}" package is ready! Google Play direct store link will activate upon official store rollout 🚀`;
    setDownloadNotification(message);
    setTimeout(() => {
      setDownloadNotification(null);
    }, 4500);
  };

  return (
    <>
      {/* Floating Dynamic Island Dock at Bottom Center */}
      <div className="fixed bottom-3 sm:bottom-5 inset-x-3 sm:inset-x-4 max-w-2xl mx-auto z-50 pointer-events-none font-cairo">
        <div className="apple-card px-2.5 sm:px-4 py-1.5 sm:py-2 bg-white/95 dark:bg-[#121217]/95 backdrop-blur-2xl border border-black/[0.12] dark:border-white/[0.15] shadow-[0_15px_45px_rgba(0,0,0,0.15)] flex items-center justify-between pointer-events-auto rounded-full w-full max-w-full">
          {/* Left Quick Navigation Icons */}
          <div className="flex items-center gap-0.5 sm:gap-2">
            <a
              href="#devices"
              onClick={(e) => {
                handleSmoothScrollClick(e, '#devices', 85, 850, () => {
                  playAppleClick();
                });
              }}
              title={t.dock3d}
              className="p-1 sm:p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 flex items-center gap-1 text-xs font-bold text-[#1d1d1f] dark:text-[#f5f5f7] transition-all cursor-pointer"
            >
              <SmartphoneNfc className="w-4 h-4 text-[#0071e3]" />
              <span className="hidden md:inline">{t.dock3d}</span>
            </a>

            <span className="text-neutral-300 dark:text-neutral-700">|</span>

            <a
              href="#taht-experience"
              onClick={(e) => {
                handleSmoothScrollClick(e, '#taht-experience', 85, 850, () => {
                  playVaultThud();
                });
              }}
              title={t.dockTaht}
              className="p-1 sm:p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 flex items-center gap-1 text-xs font-bold text-[#1d1d1f] dark:text-[#f5f5f7] transition-all cursor-pointer"
            >
              <img
                src="/assets/logos/taht-elbalata-logo.png"
                alt={t.dockTaht}
                className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
              />
              <span className="hidden sm:inline">{t.dockTaht}</span>
            </a>

            <span className="text-neutral-300 dark:text-neutral-700">|</span>

            <a
              href="#efteker-experience"
              onClick={(e) => {
                handleSmoothScrollClick(e, '#efteker-experience', 85, 850, () => {
                  playClarityChime();
                });
              }}
              title={t.dockEfteker}
              className="p-1 sm:p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 flex items-center gap-1 text-xs font-bold text-[#1d1d1f] dark:text-[#f5f5f7] transition-all cursor-pointer"
            >
              <img
                src="/assets/logos/efteker-logo.png"
                alt={t.dockEfteker}
                className="w-4 h-4 sm:w-5 sm:h-5 object-contain rounded-md"
              />
              <span className="hidden sm:inline">{t.dockEfteker}</span>
            </a>

            <span className="text-neutral-300 dark:text-neutral-700 hidden sm:inline">|</span>

            <a
              href="#philosophy"
              onClick={(e) => {
                handleSmoothScrollClick(e, '#philosophy', 85, 850, () => {
                  playAppleClick();
                });
              }}
              className="hidden lg:inline text-xs font-bold text-[#6e6e73] dark:text-[#a1a1a6] hover:text-[#1d1d1f] dark:hover:text-white px-1.5 py-1 cursor-pointer"
            >
              {t.dockPhilosophy}
            </a>
          </div>

          {/* Right Action: Download Apps */}
          <button
            type="button"
            onClick={() => {
              playAppleClick();
              setModalOpen(true);
            }}
            className="apple-pill-btn px-3 sm:px-4 py-1.5 sm:py-2 bg-[#0071e3] hover:bg-[#0077ed] text-white text-[11px] sm:text-xs font-bold shadow-md flex items-center gap-1 sm:gap-1.5 cursor-pointer shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t.dockGetApps}</span>
          </button>
        </div>
      </div>

      {/* Download / Google Play Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-md animate-fadeIn font-cairo">
          <div className="relative w-full max-w-lg bg-white dark:bg-[#121217] rounded-3xl p-6 sm:p-8 shadow-2xl border border-black/[0.08] dark:border-white/[0.1] text-[#1d1d1f] dark:text-[#f5f5f7] space-y-6">
            {/* Close Button */}
            <button
              onClick={() => {
                playAppleClick();
                setModalOpen(false);
                setDownloadNotification(null);
              }}
              className="absolute top-5 left-5 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-white/10 dark:hover:bg-white/20 text-[#1d1d1f] dark:text-white transition-colors cursor-pointer"
              title={t.closeBtn}
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="text-start">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{t.modalBadge}</span>
              </div>
              <h3 className="text-2xl font-black text-[#1d1d1f]">
                {t.modalTitle}
              </h3>
              <p className="text-xs sm:text-sm text-[#6e6e73] mt-1">
                {t.modalDesc}
              </p>
            </div>

            {/* In-Modal Notification Alert */}
            {downloadNotification && (
              <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200/80 text-blue-900 text-xs font-bold flex items-start gap-2.5 animate-fadeIn">
                <Bell className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{downloadNotification}</span>
              </div>
            )}

            {/* Authentic Google Play Store Download Badges */}
            <div className="space-y-3">
              {/* Taht El Balata - Google Play Card */}
              <div className="p-4 rounded-2xl bg-neutral-50/80 hover:bg-neutral-100/90 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] border border-black/[0.08] dark:border-white/[0.08] transition-all flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3.5 w-full sm:w-auto">
                  <img
                    src="/assets/logos/taht-elbalata-logo.png"
                    alt={language === 'ar' ? 'تحت البلاطة' : 'Taht El Balata'}
                    className="w-12 h-12 object-contain rounded-2xl bg-white p-1.5 shadow-sm border border-black/[0.05]"
                  />
                  <div className="text-start">
                    <div className="font-extrabold text-sm text-[#1d1d1f] dark:text-white">
                      {language === 'ar' ? 'تحت البلاطة' : 'Taht El Balata'}
                    </div>
                    <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-bold">
                      {t.tahtTag}
                    </div>
                  </div>
                </div>

                {/* Google Play Store Badge Button */}
                <button
                  type="button"
                  onClick={() =>
                    handleDownloadApp(
                      language === 'ar' ? 'تحت البلاطة' : 'Taht El Balata',
                      config?.tahtPlayUrl
                    )
                  }
                  className="w-full sm:w-auto px-4 py-2.5 bg-[#1d1d1f] hover:bg-black dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black rounded-xl shadow-sm hover:shadow flex items-center justify-center gap-3 transition-all cursor-pointer group shrink-0"
                >
                  <GooglePlayIcon />
                  <div className="text-start leading-tight">
                    <div className="text-[9px] uppercase tracking-wider text-neutral-300 dark:text-neutral-600 font-medium">
                      {t.getOnPlay}
                    </div>
                    <div className="text-xs font-bold text-white dark:text-black tracking-wide flex items-center gap-1">
                      <span>{t.googlePlay}</span>
                      <ArrowUpRight className="w-3 h-3 text-neutral-400 dark:text-neutral-600 group-hover:text-white dark:group-hover:text-black transition-colors" />
                    </div>
                  </div>
                </button>
              </div>

              {/* Eftekir - Google Play Card */}
              <div className="p-4 rounded-2xl bg-neutral-50/80 hover:bg-neutral-100/90 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] border border-black/[0.08] dark:border-white/[0.08] transition-all flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3.5 w-full sm:w-auto">
                  <img
                    src="/assets/logos/efteker-logo.png"
                    alt={language === 'ar' ? 'افتكر' : 'Eftekir'}
                    className="w-12 h-12 object-contain rounded-2xl bg-white p-1.5 shadow-sm border border-black/[0.05]"
                  />
                  <div className="text-start">
                    <div className="font-extrabold text-sm text-[#1d1d1f] dark:text-white">
                      {language === 'ar' ? 'افتكر' : 'Eftekir'}
                    </div>
                    <div className="text-[11px] text-blue-700 dark:text-blue-400 font-bold">
                      {t.eftekerTag}
                    </div>
                  </div>
                </div>

                {/* Google Play Store Badge Button */}
                <button
                  type="button"
                  onClick={() =>
                    handleDownloadApp(
                      language === 'ar' ? 'افتكر' : 'Eftekir',
                      config?.eftekerPlayUrl
                    )
                  }
                  className="w-full sm:w-auto px-4 py-2.5 bg-[#1d1d1f] hover:bg-black dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black rounded-xl shadow-sm hover:shadow flex items-center justify-center gap-3 transition-all cursor-pointer group shrink-0"
                >
                  <GooglePlayIcon />
                  <div className="text-start leading-tight">
                    <div className="text-[9px] uppercase tracking-wider text-neutral-300 dark:text-neutral-600 font-medium">
                      {t.getOnPlay}
                    </div>
                    <div className="text-xs font-bold text-white dark:text-black tracking-wide flex items-center gap-1">
                      <span>{t.googlePlay}</span>
                      <ArrowUpRight className="w-3 h-3 text-neutral-400 dark:text-neutral-600 group-hover:text-white dark:group-hover:text-black transition-colors" />
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Platform Specifications Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#86868b] border-t border-black/[0.06] pt-4 gap-2">
              <span className="flex items-center gap-1.5 text-emerald-600 font-bold">
                <CheckCircle className="w-3.5 h-3.5" /> {t.freeForAll}
              </span>
              <span className="font-bold text-[#1d1d1f] bg-black/[0.04] px-2.5 py-1 rounded-full border border-black/[0.05]">
                {t.supportsAndroidOnly}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

