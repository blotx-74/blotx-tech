import type { FC } from 'react';
import { BlotxCoreScene } from '../canvas/BlotxCoreScene';
import { audioHaptics } from '../../utils/audioHaptics';
import { ArrowDown, Compass, Activity, ShieldCheck, Sparkles } from 'lucide-react';

interface HeroManifestoProps {
  cadMode: boolean;
}

export const HeroManifesto: FC<HeroManifestoProps> = ({ cadMode }) => {
  return (
    <section id="manifesto" className="relative pt-8 pb-16 overflow-hidden">
      {/* Background Decorative Tech Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-10 w-96 h-[1px] bg-gradient-to-r from-transparent via-[#ff5500] to-transparent" />
        <div className="absolute bottom-1/3 right-10 w-80 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Eyebrow Tag */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171a22] border border-[#272d3b] text-xs font-mono text-[#8c93a0]">
            <span className="w-2 h-2 rounded-full bg-[#ff5500] animate-ping" />
            <span className="text-white font-semibold">BLOTX TECH PROTOCOL</span>
            <span className="text-[#525866]">|</span>
            <span>صُنع لسد ثغرات الحياة اليومية</span>
          </div>
        </div>

        {/* The Bold Avant-Garde Statement */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight">
            نبتكر ما ينقص يومك
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5500] via-white to-[#ff5500]">
              قبل أن تدرك حاجتك إليه
            </span>
          </h1>

          <p className="text-base sm:text-xl text-[#8c93a0] max-w-2xl mx-auto leading-relaxed">
            Blotx Tech ليست مجرد كيان برمجيات عادي؛ إنها فلسفة وهندسة دقيقة لأسلوب الحياة. نرصد الاحتياجات غير المرئية للإنسان العصري، ونبني لها إيكوسيستم متكامل من الأدوات فائقة الحرفية.
          </p>
        </div>

        {/* The 3D Precision Core Stage */}
        <div className="mt-4 relative rounded-2xl border border-[#1f242e] bg-gradient-to-b from-[#0e1015] to-[#08090c] overflow-hidden shadow-2xl">
          <BlotxCoreScene cadMode={cadMode} />

          {/* Tactical Specs Bottom Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-[#1f242e] bg-[#0c0e12]/95 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-[#1f242e] text-right font-mono">
            <div className="p-4 flex items-center gap-3">
              <Activity className="w-5 h-5 text-[#ff5500] shrink-0" />
              <div>
                <div className="text-[10px] text-[#525866]">ECOSYSTEM SYNCHRONY</div>
                <div className="text-xs font-bold text-white">REALTIME PEER LINK</div>
              </div>
            </div>

            <div className="p-4 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#ff5500] shrink-0" />
              <div>
                <div className="text-[10px] text-[#525866]">PRIVACY INTEGRITY</div>
                <div className="text-xs font-bold text-white">ZERO CLOUD LEAK</div>
              </div>
            </div>

            <div className="p-4 flex items-center gap-3">
              <Compass className="w-5 h-5 text-[#ff5500] shrink-0" />
              <div>
                <div className="text-[10px] text-[#525866]">INDUSTRIAL TACTICS</div>
                <div className="text-xs font-bold text-white">PROTOTYPED FOR LIFE</div>
              </div>
            </div>

            <div className="p-4 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[#ff5500] shrink-0" />
              <div>
                <div className="text-[10px] text-[#525866]">ACTIVE APPLICATIONS</div>
                <div className="text-xs font-bold text-[#ff5500]">تحت البلاطة + افتكر</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll CTA Indicator */}
        <div className="flex justify-center mt-8">
          <a
            href="#philosophy"
            onClick={() => audioHaptics.playClick(900)}
            onMouseEnter={() => audioHaptics.playTick()}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#222733] hover:border-[#ff5500] text-xs font-mono text-[#8c93a0] hover:text-white transition-all group"
          >
            <span>اكتشف الفلسفة وكيف يسد النظام ثغرات حياتك</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#ff5500] group-hover:translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};
