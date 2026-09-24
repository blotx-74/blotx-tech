import React, { useState } from 'react';
import { Mail, MessageCircle, ExternalLink, Sparkles, Copy, Check, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../LanguageContext';

export const EditorialContact: React.FC = () => {
  const { language, t } = useLanguage();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const isAr = language === 'ar';

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#111111] text-white relative overflow-hidden border-t border-white/5">
      {/* Background Gold Ambient Glows */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-[#8C7A54]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-start">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8C7A54]/20 border border-[#8C7A54]/30 text-[#8C7A54] text-xs font-bold uppercase tracking-wider">
              <span>{t.contactTag}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              {t.contactTitle}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md leading-relaxed">
            {t.contactSubtitle}
          </p>
        </div>

        {/* 3 Interactive Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* 1. Direct Email Card */}
          <div className="editorial-card-dark p-6 sm:p-8 bg-[#1c1c1c] border border-white/8 flex flex-col justify-between group hover:border-[#8C7A54]/40">
            <div className="space-y-4 text-start">
              <div className="w-12 h-12 rounded-2xl bg-[#282828] text-[#8C7A54] flex items-center justify-center shadow-sm group-hover:bg-[#8C7A54] group-hover:text-black transition-colors">
                <Mail className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#8C7A54] transition-colors">
                  {t.contactEmailTitle}
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  {isAr ? 'للاستفسارات التقنية، الشراكات، والدعم' : 'Technical inquiries & partnerships'}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-neutral-300 font-bold">blotx.tech@gmail.com</span>
                  <button
                    onClick={() => copyToClipboard('blotx.tech@gmail.com', 'email-team')}
                    className="p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                    title={isAr ? 'نسخ البريد' : 'Copy email'}
                  >
                    {copiedKey === 'email-team' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="flex items-center justify-between text-xs pt-1 border-t border-white/5">
                  <span className="font-mono text-neutral-300 font-bold">ziadmahamed36@gmail.com</span>
                  <button
                    onClick={() => copyToClipboard('ziadmahamed36@gmail.com', 'email-dev')}
                    className="p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                    title={isAr ? 'نسخ بريد المطور' : 'Copy dev email'}
                  >
                    {copiedKey === 'email-dev' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/5">
              <a
                href="mailto:blotx.tech@gmail.com?subject=Inquiry%20from%20Blotx%20Tech"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-[#8C7A54] text-white hover:text-black font-bold text-xs transition-all"
              >
                <span>{isAr ? 'إرسال بريد إلكتروني ↗' : 'Send Direct Email ↗'}</span>
              </a>
            </div>
          </div>

          {/* 2. Direct WhatsApp Card */}
          <div className="editorial-card-dark p-6 sm:p-8 bg-[#1c1c1c] border border-white/8 flex flex-col justify-between group hover:border-emerald-500/40">
            <div className="space-y-4 text-start">
              <div className="w-12 h-12 rounded-2xl bg-[#282828] text-emerald-400 flex items-center justify-center shadow-sm group-hover:bg-emerald-500 group-hover:text-black transition-colors">
                <MessageCircle className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {t.contactWhatsAppTitle}
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  {isAr ? 'محادثات فورية مباشرة مع المطور والدعم' : 'Instant direct messaging with lead developer'}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-neutral-400 block">{isAr ? 'خط المطور المباشر:' : 'Lead Dev Line:'}</span>
                    <span className="font-mono text-neutral-200 font-bold">01558090257</span>
                  </div>
                  <a
                    href="https://wa.me/201558090257"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500 hover:text-black font-bold text-[10px] transition-all"
                  >
                    {isAr ? 'محادثة' : 'Chat'}
                  </a>
                </div>
                <div className="flex items-center justify-between text-xs pt-1 border-t border-white/5">
                  <div>
                    <span className="text-[10px] text-neutral-400 block">{isAr ? 'فريق الدعم الفني:' : 'Support Team:'}</span>
                    <span className="font-mono text-neutral-200 font-bold">01131751988</span>
                  </div>
                  <a
                    href="https://wa.me/201131751988"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500 hover:text-black font-bold text-[10px] transition-all"
                  >
                    {isAr ? 'محادثة' : 'Chat'}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/5">
              <a
                href="https://wa.me/201558090257"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-black font-bold text-xs transition-all"
              >
                <span>{isAr ? 'فتح محادثة واتساب الآن ↗' : 'Start WhatsApp Chat ↗'}</span>
              </a>
            </div>
          </div>

          {/* 3. Developer Portfolio Highlight Card (Prominent per user request) */}
          <div className="editorial-card-dark p-6 sm:p-8 bg-[#1c1c1c] border border-[#8C7A54]/30 flex flex-col justify-between group hover:border-[#8C7A54]/60 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#8C7A54]/15 rounded-full blur-xl pointer-events-none" />

            <div className="space-y-4 text-start">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#8C7A54] to-[#B5A27A] text-black flex items-center justify-center shadow-md">
                <Sparkles className="w-6 h-6 text-black" />
              </div>

              <div>
                <span className="inline-block text-[10px] font-bold text-[#8C7A54] uppercase tracking-wider">
                  FOUNDER &amp; LEAD DEVELOPER
                </span>
                <h3 className="text-lg font-bold text-white group-hover:text-[#8C7A54] transition-colors">
                  {t.contactPortfolioTitle}
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  {t.contactPortfolioDesc}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-[#8C7A54]/20 space-y-1">
                <span className="text-[10px] text-[#8C7A54] font-bold uppercase block">
                  {isAr ? 'الرابط المباشر للموقع:' : 'Direct Web Link:'}
                </span>
                <a
                  href="https://ziadmohamed.web.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-white font-bold hover:text-[#8C7A54] flex items-center gap-1.5"
                >
                  <span>https://ziadmohamed.web.app</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#8C7A54]" />
                </a>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/5">
              <a
                href="https://ziadmohamed.web.app"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#8C7A54] to-[#B5A27A] hover:brightness-110 text-black font-bold text-xs transition-all shadow-md"
              >
                <span>{isAr ? 'زيارة موقع المطور (Portfolio) ↗' : 'Explore Portfolio ↗'}</span>
                <ExternalLink className="w-3.5 h-3.5 text-black" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
