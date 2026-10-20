import { type FC } from 'react';
import { MessageSquare, MessageCircle, Mail, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../LanguageContext';
import { playAppleClick } from '../../utils/soundEffects';

interface TechContactCtaProps {
  onOpenInquiry?: () => void;
}

export const TechContactCta: FC<TechContactCtaProps> = ({ onOpenInquiry }) => {
  const { t } = useLanguage();

  const handleWhatsApp = () => {
    playAppleClick();
    const text = encodeURIComponent('مرحباً فريق Blotx Tech Solutions، أود مناقشة مشروع برمجيات جديد معكم.');
    window.open(`https://wa.me/201131751988?text=${text}`, '_blank');
  };

  const handleEmail = () => {
    playAppleClick();
    window.location.href = 'mailto:blotxtech@gmail.com?subject=استفسار عن مشروع برمجي جديد';
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-8 sm:p-14 lg:p-16 text-white overflow-hidden shadow-2xl border border-slate-800">
          {/* Subtle tech background accents */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/20 text-xs font-bold mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.contactBadge}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-5">
              {t.contactTitle}
            </h2>

            <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed mb-10">
              {t.contactSubtitle}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handleWhatsApp}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm sm:text-base font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{t.contactWhatsappBtn}</span>
              </button>

              <button
                onClick={() => {
                  playAppleClick();
                  if (onOpenInquiry) {
                    onOpenInquiry();
                  } else {
                    handleWhatsApp();
                  }
                }}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm sm:text-base font-bold text-slate-900 bg-white hover:bg-slate-100 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <span>{t.contactConsultationBtn}</span>
              </button>

              <button
                onClick={handleEmail}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold text-slate-300 hover:text-white bg-white/10 hover:bg-white/15 border border-white/10 transition-colors cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>blotxtech@gmail.com</span>
              </button>
            </div>

            {/* Quick Guarantees */}
            <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-slate-400 font-medium">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>متوسط وقت الرد: خلال ساعات معدودة</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>اتفاقية سرية وحماية للملكية الفكرية (NDA)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
