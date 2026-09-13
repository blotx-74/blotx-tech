import { Hammer, Clock, MessageSquare, ShieldAlert } from 'lucide-react';


interface MaintenanceScreenProps {
  title?: string;
  message?: string;
  estimatedReturn?: string;
  supportEmail?: string;
  whatsapp?: string;
}

export function MaintenanceScreen({
  title = "نعمل على ترقية استثنائية",
  message = "الموقع في وضع الصيانة المجدولة لتطبيق تحسينات فائقة السرعة والأمان. سنعود للعمل قريباً جداً.",
  estimatedReturn = "خلال دقائق معدودة",
  supportEmail = "support@blotx.tech",
  whatsapp = ""
}: MaintenanceScreenProps) {
  return (
    <div className="fixed inset-0 z-50 bg-[#000000] text-white flex items-center justify-center p-6 overflow-hidden select-none font-sans">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#0071e3]/20 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[350px] h-[350px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-xl w-full bg-[#161617]/90 border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-2xl text-center space-y-6">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 shadow-inner">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span className="text-xs font-bold text-white/80 tracking-wide">وضع الصيانة والترقية المجدولة</span>
        </div>

        {/* Icon */}
        <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-b from-white/10 to-white/[0.02] border border-white/10 flex items-center justify-center shadow-lg">
          <Hammer className="w-10 h-10 text-white/90" />
        </div>

        {/* Title & Body */}
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            {title}
          </h1>
          <p className="text-sm text-[#86868b] leading-relaxed max-w-md mx-auto">
            {message}
          </p>
        </div>

        {/* Expected return time card */}
        {estimatedReturn && (
          <div className="flex items-center justify-center gap-2 bg-white/[0.03] border border-white/[0.08] px-5 py-3 rounded-2xl max-w-xs mx-auto">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-[#86868b]">العودة المتوقعة:</span>
            <span className="text-xs font-bold text-white">{estimatedReturn}</span>
          </div>
        )}

        {/* Support Buttons */}
        <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-center gap-3">
          {whatsapp && (
            <a
              href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md hover:scale-105"
            >
              <MessageSquare className="w-4 h-4" />
              <span>تواصل عبر واتساب</span>
            </a>
          )}
          {supportEmail && (
            <a
              href={`mailto:${supportEmail}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/10"
            >
              <span>دعم المنظومة</span>
            </a>
          )}
        </div>

        {/* Security / System Footer */}
        <div className="flex items-center justify-center gap-2 text-[11px] text-[#86868b]">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Blotx Enterprise Infrastructure · جميع بياناتك آمنة ومشفرة</span>
        </div>
      </div>
    </div>
  );
}
