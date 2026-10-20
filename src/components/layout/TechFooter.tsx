import { type FC } from 'react';
import { ShieldCheck, ArrowUp, MessageCircle, Mail } from 'lucide-react';
import { playAppleClick } from '../../utils/soundEffects';
import { handleSmoothScrollClick } from '../../utils/smoothScroll';

interface TechFooterProps {
  onOpenPrivacy?: () => void;
  onOpenSupport?: (tab?: 'team' | 'developer' | 'docs') => void;
}

export const TechFooter: FC<TechFooterProps> = ({ onOpenPrivacy, onOpenSupport }) => {

  const scrollToTop = () => {
    playAppleClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-0.5 flex items-center justify-center overflow-hidden shadow-md">
                <img
                  src="/assets/logos/blotx-tech-logo.png"
                  alt="Blotx Tech Solutions Logo"
                  className="w-full h-full object-cover rounded-[10px]"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <span className="font-extrabold text-white text-lg tracking-tight">
                Blotx Tech Solutions
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              استوديو هندسة برمجيات وتطوير منتجات رقمية متكاملة. نبني تطبيقات الموبايل، الأنظمة السحابية، والألعاب التفاعلية بأعلى معايير الأداء والخصوصية.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/201131751988"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="mailto:blotxtech@gmail.com"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              الخدمات والحلول
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#services" onClick={(e) => handleSmoothScrollClick(e, '#services')} className="hover:text-white transition-colors">
                  تطوير تطبيقات الموبايل (Flutter)
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleSmoothScrollClick(e, '#services')} className="hover:text-white transition-colors">
                  تطوير الألعاب التفاعلية (3D Games)
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleSmoothScrollClick(e, '#services')} className="hover:text-white transition-colors">
                  المنصات السحابية وهندسة الويب
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleSmoothScrollClick(e, '#services')} className="hover:text-white transition-colors">
                  أتمتة الأعمال وتكامل النظم
                </a>
              </li>
            </ul>
          </div>

          {/* Shipped Products */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              أعمالنا ومنتجاتنا
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="https://play.google.com/store/apps/details?id=com.blotxtech.taht_elbalata" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  تحت البلاطة (Google Play) 📱
                </a>
              </li>
              <li>
                <a href="https://play.google.com/store/apps/details?id=com.blotxtech.eftekir" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  افتكر (Google Play) 💡
                </a>
              </li>
              <li>
                <a href="#projects" onClick={(e) => handleSmoothScrollClick(e, '#projects')} className="hover:text-white transition-colors font-semibold text-amber-400">
                  لعبة شلة هبد 3D (Shella Habad) 🎮
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Trust */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              الخصوصية والدعم
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => {
                    playAppleClick();
                    if (onOpenPrivacy) onOpenPrivacy();
                  }}
                  className="hover:text-white transition-colors text-start cursor-pointer flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>سياسة الخصوصية والشفافية</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    playAppleClick();
                    if (onOpenSupport) onOpenSupport('developer');
                  }}
                  className="hover:text-white transition-colors text-start cursor-pointer"
                >
                  التواصل المباشر مع المطور
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    playAppleClick();
                    if (onOpenSupport) onOpenSupport('docs');
                  }}
                  className="hover:text-white transition-colors text-start cursor-pointer"
                >
                  مركز التوثيق الفني
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Blotx Tech Solutions. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
              <span>العودة للأعلى</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
