import { useState } from 'react';
import { Gift, CheckCircle2, AlertCircle, X, ArrowLeft, Sparkles } from 'lucide-react';


interface PromoCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  promoCodes?: Array<{
    code: string;
    discount: string;
    active: boolean;
  }>;
}

export function PromoCodeModal({ isOpen, onClose, promoCodes = [] }: PromoCodeModalProps) {
  const [inputCode, setInputCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [rewardMessage, setRewardMessage] = useState('');

  if (!isOpen) return null;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = inputCode.trim().toUpperCase();
    if (!cleanCode) return;

    const matched = promoCodes.find(
      (p) => p.code.toUpperCase() === cleanCode && p.active
    );

    if (matched) {
      setStatus('success');
      setRewardMessage(matched.discount || 'تم تفعيل الكود بنجاح!');
    } else {
      setStatus('error');
      setRewardMessage('الكود غير صحيح أو انتهت صلاحيته. تأكد من الحروف وحاول مجدداً.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 font-sans animate-fade-in">
      <div className="relative max-w-md w-full bg-[#1c1c1e] text-white rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl space-y-6">
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 rounded-full text-[#86868b] hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-3">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-amber-500/20 to-amber-400/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Gift className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold tracking-tight">كود الوصول المبكر والخصومات</h3>
          <p className="text-xs text-[#86868b] leading-relaxed">
            أدخل كود الدعوة الخاص بك لتفعيل الميزات الحصرية أو الاشتراك التجريبي في منظومة Blotx.
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-[#86868b] uppercase tracking-wider block text-right">
              أدخل كود العرض (Promo Code)
            </label>
            <input
              type="text"
              value={inputCode}
              onChange={(e) => {
                setInputCode(e.target.value);
                if (status !== 'idle') setStatus('idle');
              }}
              placeholder="مثال: BLOTX2026"
              className="w-full bg-white/5 border border-white/15 rounded-2xl px-4 py-3 text-center text-sm font-mono tracking-widest uppercase text-white placeholder-white/20 focus:outline-none focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-bold transition-all shadow-md hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>التحقق من الكود</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </form>

        {/* Verification Result */}
        {status === 'success' && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 space-y-2 text-right">
            <div className="flex items-center gap-2 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>مبروك! الكود صالح وفعّال</span>
            </div>
            <p className="text-[11px] text-emerald-300/90 pr-6">
              المكافأة: {rewardMessage}
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 space-y-1 text-right">
            <div className="flex items-center gap-2 font-bold text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>كود غير معتمد</span>
            </div>
            <p className="text-[11px] text-rose-300/80 pr-6">
              {rewardMessage}
            </p>
          </div>
        )}

        <div className="pt-2 border-t border-white/10 text-center">
          <p className="text-[10px] text-[#86868b] flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>يمكنك الحصول على أكواد خاصة بمتابعة قنواتنا الرسمية</span>
          </p>
        </div>
      </div>
    </div>
  );
}
