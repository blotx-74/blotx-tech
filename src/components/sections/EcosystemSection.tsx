import type { FC } from 'react';
import { AppViewer3D } from '../canvas/AppViewer3D';
import { audioHaptics } from '../../utils/audioHaptics';
import { BellRing, Wallet, Link2, ShieldAlert } from 'lucide-react';

export const EcosystemSection: FC = () => {
  return (
    <section id="ecosystem" className="py-20 border-t border-[#1a1e27] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-[#222834] pb-6">
          <div>
            <div className="tactical-tag text-[#ff5500] mb-1">SECTION // 03</div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              الإيكوسيستم الحيوي: <span className="text-[#8c93a0]">تحت البلاطة + افتكر</span>
            </h2>
          </div>
          <div className="mt-4 md:mt-0 font-mono text-xs text-[#525866] text-right">
            <span>HARDWARE-GRADE SOFTWARE INTEGRATION</span>
          </div>
        </div>

        {/* Introduction Narrative */}
        <p className="text-base sm:text-lg text-[#8c93a0] max-w-3xl mb-8 leading-relaxed">
          الأدوات مش معمولة كجزر معزولة. تطبيق <strong className="text-white">"تحت البلاطة"</strong> وتطبيق <strong className="text-white">"افتكر"</strong> صُمما ليعملا كتروس ميكانيكية متوافقة داخل محرك واحد يخدم جودة حياتك.
        </p>

        {/* 3D Interactive Device & App Showcase */}
        <AppViewer3D initialApp="taht-elbalata" />

        {/* The Symbiosis Connection Bridge (الترابط الحيوي بين التطبيقين) */}
        <div className="mt-12 industrial-panel p-8 rounded-2xl border border-[#232936] bg-[#0c0e14]">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 border-b border-[#1f2532] pb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#ff5500]/10 border border-[#ff5500]/30 flex items-center justify-center">
                <Link2 className="w-5 h-5 text-[#ff5500]" />
              </div>
              <div>
                <span className="tactical-tag text-[#ff5500]">THE SYMBIOSIS PROTOCOL</span>
                <h3 className="text-xl font-bold text-white">كيف يتكامل تحت البلاطة مع افتكر؟</h3>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-[#8c93a0]">
              <span className="w-2 h-2 rounded-full bg-[#ff5500] animate-pulse" />
              <span>SYNC LATENCY: &lt; 0.05 SECONDS</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {/* Connection 1 */}
            <div
              onMouseEnter={() => audioHaptics.playTick()}
              className="p-5 rounded-lg bg-[#11141a] border border-[#1e232d] hover:border-[#ff5500]/60 transition-colors"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-[#ff5500] mb-3">
                <BellRing className="w-4 h-4" />
                <span>INTEGRATION 01</span>
              </div>
              <h4 className="text-base font-bold text-white mb-2">تنبيهات استباقية للالتزامات</h4>
              <p className="text-xs text-[#8c93a0] leading-relaxed">
                أي قسط أو فاتورة مسجلة في "تحت البلاطة" بيتم جدولتها تلقائياً في "افتكر"، وبتفكرك بميعادها قبل السداد بوقت كافي مع حساب الميزانية المتبقية.
              </p>
            </div>

            {/* Connection 2 */}
            <div
              onMouseEnter={() => audioHaptics.playTick()}
              className="p-5 rounded-lg bg-[#11141a] border border-[#1e232d] hover:border-[#ff5500]/60 transition-colors"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-[#ff5500] mb-3">
                <Wallet className="w-4 h-4" />
                <span>INTEGRATION 02</span>
              </div>
              <h4 className="text-base font-bold text-white mb-2">ميزانية مرتبطة بالأحداث</h4>
              <p className="text-xs text-[#8c93a0] leading-relaxed">
                عند إضافة مناسبة أو سفرية في "افتكر"، "تحت البلاطة" بيقترح عليك فوراً تخصيص حصالة ادخارية محددة للمناسبة بدون ما تتزنق فجأة.
              </p>
            </div>

            {/* Connection 3 */}
            <div
              onMouseEnter={() => audioHaptics.playTick()}
              className="p-5 rounded-lg bg-[#11141a] border border-[#1e232d] hover:border-[#ff5500]/60 transition-colors"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-[#ff5500] mb-3">
                <ShieldAlert className="w-4 h-4" />
                <span>INTEGRATION 03</span>
              </div>
              <h4 className="text-base font-bold text-white mb-2">حماية القرارات المالية المتسرعة</h4>
              <p className="text-xs text-[#8c93a0] leading-relaxed">
                ميزة "الهدوء الذهني": عند محاولة شراء كماليات باهظة، التطبيقان يتعاونان لتذكيرك بأهدافك الكبرى التي سجلتها لنفسك مسبقاً.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
