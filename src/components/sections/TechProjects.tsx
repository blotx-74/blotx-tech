import { useState, type FC } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Download, 
  ExternalLink, 
  Gamepad2, 
  WifiOff, 
  Star,
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../../LanguageContext';
import { playAppleClick } from '../../utils/soundEffects';
import { GameDetailsModal } from '../ui/GameDetailsModal';

export const TechProjects: FC = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'games' | 'apps' | 'systems'>('all');
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);

  const filters = [
    { key: 'all', label: t.filterAll },
    { key: 'games', label: t.filterGames },
    { key: 'apps', label: t.filterApps },
    { key: 'systems', label: t.filterSystems },
  ];

  return (
    <section id="projects" className="py-20 md:py-28 bg-slate-50/60 relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>{t.projectsBadge}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug mb-4">
            {t.projectsTitle}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-medium">
            {t.projectsSubtitle}
          </p>

          {/* Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl shadow-xs">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => {
                  setFilter(f.key as any);
                  playAppleClick();
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  filter === f.key
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects List */}
        <div className="space-y-12">
          {/* FEATURED PROJECT 1: شلة هبد (SHELLA HABAD GAME) */}
          {(filter === 'all' || filter === 'games') && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 rounded-3xl overflow-hidden shadow-xl text-white border border-purple-500/20"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 lg:p-12 items-center">
                {/* Visual Showcase Side */}
                <div className="lg:col-span-6 relative">
                  <div className="relative rounded-2xl overflow-hidden bg-slate-950/40 border border-white/10 shadow-2xl group aspect-[16/10] flex items-center justify-center">
                    <img
                      src="/assets/games/so7ab/home_hero.png"
                      alt="شلة هبد Party Game"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Floating mascot badge */}
                    <div className="absolute bottom-4 right-4 left-4 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-white p-1 shadow-lg shrink-0 overflow-hidden flex items-center justify-center">
                          <img
                            src="/assets/games/so7ab/logo.png"
                            alt="Logo"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-white text-base">شلة هبد • Shella Habad</h4>
                          <span className="text-xs text-amber-300 font-semibold flex items-center gap-1">
                            <Star className="w-3 h-3 fill-amber-300" />
                            7 ألعاب تفاعلية داخل تطبيق واحد
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          playAppleClick();
                          setIsGameModalOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-md text-xs font-bold text-white transition-colors cursor-pointer shrink-0"
                      >
                        معاينة الشاشات
                      </button>
                    </div>
                  </div>

                  {/* Mode thumbnails strip */}
                  <div className="mt-4 grid grid-cols-4 gap-2">
                    <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black/20 aspect-video flex items-center justify-center p-1">
                      <img src="/assets/games/so7ab/imposter.png" alt="Imposter" className="max-h-full object-contain" />
                    </div>
                    <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black/20 aspect-video flex items-center justify-center p-1">
                      <img src="/assets/games/so7ab/liar.png" alt="Liar" className="max-h-full object-contain" />
                    </div>
                    <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black/20 aspect-video flex items-center justify-center p-1">
                      <img src="/assets/games/so7ab/spin_bottle_3d.png" alt="Spin Bottle" className="max-h-full object-contain" />
                    </div>
                    <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black/20 aspect-video flex items-center justify-center p-1">
                      <img src="/assets/games/so7ab/challenges.png" alt="Challenges" className="max-h-full object-contain" />
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="lg:col-span-6 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-400 text-slate-950 uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                        <Gamepad2 className="w-3.5 h-3.5" />
                        {t.shellaHabadBadge}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/15 text-purple-200 border border-white/15 flex items-center gap-1.5">
                        <WifiOff className="w-3 h-3 text-emerald-400" />
                        {t.shellaHabadOfflineTag}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 leading-tight">
                      {t.shellaHabadTitle}
                    </h3>

                    <p className="text-sm sm:text-base text-purple-100/90 leading-relaxed font-normal mb-6">
                      {t.shellaHabadDesc}
                    </p>

                    {/* Modes Badges */}
                    <div className="mb-8">
                      <span className="text-xs font-bold text-amber-300 block mb-3 uppercase tracking-wider">
                        {t.shellaHabadModesCount}:
                      </span>
                      <div className="flex flex-wrap gap-2 text-xs font-semibold">
                        <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/10">{t.shellaHabadMode1}</span>
                        <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/10">{t.shellaHabadMode2}</span>
                        <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/10">{t.shellaHabadMode3}</span>
                        <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/10">{t.shellaHabadMode4}</span>
                        <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/10">{t.shellaHabadMode5}</span>
                        <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/10">{t.shellaHabadMode6}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-6 border-t border-white/15 flex flex-wrap items-center gap-3">
                    <a
                      href="/downloads/Shella_Habad_v1.0.apk"
                      download="Shella_Habad_v1.0.apk"
                      onClick={() => playAppleClick()}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 shadow-lg shadow-amber-400/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>{t.downloadApkBtn} (v1.0 APK)</span>
                    </a>

                    <button
                      onClick={() => {
                        playAppleClick();
                        setIsGameModalOpen(true);
                      }}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <span>{t.viewGameDetailsBtn}</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* PROJECT 2: تحت البلاطة (TAHT EL BALATA FINTECH APP) */}
          {(filter === 'all' || filter === 'apps') && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Content Side */}
                <div className="lg:col-span-7 flex flex-col justify-between order-2 lg:order-1">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                        {t.tahtBadge}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                        {t.tahtSecurityTag}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
                      {t.tahtTitle}
                    </h3>

                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal mb-6">
                      {t.tahtDesc}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>محفظة ذهب وعملات أوفلاين</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>تشفير AES-256 محلي مستقل</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>صفر إعلانات وصفر تتبع بيانات</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>نسخ احتياطي محلي مشفر بكلمة سر</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-3">
                    <a
                      href="https://play.google.com/store/apps/details?id=com.blotxtech.taht_elbalata"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playAppleClick()}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>{t.downloadPlayBtn}</span>
                    </a>

                    <a
                      href="https://taht-el-balata.web.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playAppleClick()}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <span>{t.openWebAppBtn}</span>
                      <ExternalLink className="w-4 h-4 text-slate-400" />
                    </a>
                  </div>
                </div>

                {/* Mockup Image Side */}
                <div className="lg:col-span-5 order-1 lg:order-2 flex items-center justify-center">
                  <div className="relative w-full max-w-sm rounded-2xl overflow-hidden border border-slate-200/80 shadow-lg bg-slate-100 p-2 group">
                    <img
                      src="/assets/mockups/taht-screen.png"
                      alt="Taht El Balata Screen"
                      className="w-full h-auto object-cover rounded-xl group-hover:scale-102 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* PROJECT 3 & 4 IN TWO-COLUMN GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* PROJECT 3: افتكر (AFTEKER) */}
            {(filter === 'all' || filter === 'apps') && (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200/80">
                      {t.aftekerBadge}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                      {t.aftekerSyncTag}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
                    {t.aftekerTitle}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed font-normal mb-6">
                    {t.aftekerDesc}
                  </p>

                  <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50 mb-6 aspect-video flex items-center justify-center p-2">
                    <img
                      src="/assets/mockups/afteker-screen.png"
                      alt="Eftekir Screen"
                      className="max-h-full object-contain rounded-lg"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <a
                    href="https://eftekir-app-f9116.web.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playAppleClick()}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <span>{t.openWebAppBtn}</span>
                    <ExternalLink className="w-4 h-4 text-slate-300" />
                  </a>
                </div>
              </motion.div>
            )}

            {/* PROJECT 4: BLOTX MASTER CONTROL */}
            {(filter === 'all' || filter === 'systems') && (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/80">
                      {t.masterControlBadge}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                      {t.masterControlDesktopTag}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
                    {t.masterControlTitle}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed font-normal mb-6">
                    {t.masterControlDesc}
                  </p>

                  <div className="bg-slate-900 rounded-2xl p-5 text-white font-mono text-xs space-y-2 mb-6 border border-slate-800">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>STATUS: OPERATIONAL & SECURED</span>
                    </div>
                    <div className="text-slate-400">
                      $ blotx-master-control --telemetry live --firebase-admin
                    </div>
                    <div className="text-slate-300 pt-1 border-t border-slate-800">
                      OAuth2 Token: Valid (expires in 3599s)
                    </div>
                    <div className="text-slate-400">
                      Cross-Project Sync: taht-el-balata • eftekir-app
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">
                    نظام مكتبي داخلي لإدارة العمليات
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                    معتمد ونشط
                  </span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Shella Habad Modal */}
      <GameDetailsModal
        isOpen={isGameModalOpen}
        onClose={() => setIsGameModalOpen(false)}
      />
    </section>
  );
};
