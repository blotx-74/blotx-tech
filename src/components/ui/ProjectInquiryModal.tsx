import { useState, type FC, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Mail, Sparkles, Smartphone, Gamepad2, Globe, LayoutDashboard } from 'lucide-react';
import { playAppleClick } from '../../utils/soundEffects';
import { useLanguage } from '../../LanguageContext';

interface ProjectInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectInquiryModal: FC<ProjectInquiryModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [selectedType, setSelectedType] = useState<string>('mobile');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const projectTypes = [
    { id: 'mobile', label: t.inquiryTypeMobile, icon: Smartphone },
    { id: 'game', label: t.inquiryTypeGame, icon: Gamepad2 },
    { id: 'web', label: t.inquiryTypeWeb, icon: Globe },
    { id: 'system', label: t.inquiryTypeSystem, icon: LayoutDashboard },
  ];

  const handleSubmitWhatsApp = (e: FormEvent) => {
    e.preventDefault();
    playAppleClick();

    const selectedLabel = projectTypes.find((p) => p.id === selectedType)?.label || selectedType;
    const text = encodeURIComponent(
      `مرحباً فريق Blotx Tech Solutions 🚀\nأنا: ${name || 'عميل مهتم'}\nأرغب في استشارة/تسعير لمشروع برمجيات:\n- نوع المشروع: ${selectedLabel}\n- التفاصيل:\n${description || 'طلب مناقشة عامة للفكرة'}`
    );

    window.open(`https://wa.me/201131751988?text=${text}`, '_blank');
    onClose();
  };

  const handleSendEmail = () => {
    playAppleClick();
    const selectedLabel = projectTypes.find((p) => p.id === selectedType)?.label || selectedType;
    const subject = encodeURIComponent(`طلب استشارة مشروع برمجيات: ${selectedLabel}`);
    const body = encodeURIComponent(
      `مرحباً فريق Blotx Tech Solutions،\n\nأنا: ${name || 'عميل مهتم'}\n\nنوع المشروع المطلوب: ${selectedLabel}\n\nتفاصيل المشروع:\n${description || '...'}\n\nشكراً لكم.`
    );
    window.location.href = `mailto:blotxtech@gmail.com?subject=${subject}&body=${body}`;
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 bg-slate-900 text-white flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold mb-2">
                <Sparkles className="w-3 h-3" />
                <span>Blotx Tech Solutions</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                {t.inquiryModalTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                {t.inquiryModalSubtitle}
              </p>
            </div>

            <button
              onClick={() => {
                playAppleClick();
                onClose();
              }}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmitWhatsApp} className="p-6 space-y-5">
            {/* Project Category */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                {t.inquiryTypeLabel}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {projectTypes.map((type) => {
                  const Icon = type.icon;
                  const isSelected = selectedType === type.id;
                  return (
                    <button
                      type="button"
                      key={type.id}
                      onClick={() => {
                        setSelectedType(type.id);
                        playAppleClick();
                      }}
                      className={`p-3 rounded-xl border text-xs font-bold text-start flex items-center gap-2.5 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50 text-blue-800 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                      <span>{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                الاسم أو اسم المؤسسة
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="مثال: م. أحمد أو شركة..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {t.inquiryDescLabel}
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t.inquiryDescPlaceholder}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
              />
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.inquirySendBtn}</span>
              </button>

              <button
                type="button"
                onClick={handleSendEmail}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <Mail className="w-4 h-4 text-slate-500" />
                <span>إرسال إيميل</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
