import { useEffect, type FC } from 'react';
import {
  ShieldCheck,
  Lock,
  X,
  Printer,
  Scale,
  EyeOff,
  UserCheck,
  Mail,
  Smartphone,
  WifiOff,
} from 'lucide-react';
import { useLanguage } from '../../LanguageContext';
import { playAppleClick } from '../../utils/soundEffects';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  const { language, t } = useLanguage();

  // Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isAr = language === 'ar';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 bg-black/60 backdrop-blur-md animate-fadeIn font-cairo"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[86dvh] sm:max-h-[90vh] bg-white dark:bg-[#0c0e14] rounded-3xl shadow-2xl border border-black/[0.1] dark:border-white/10 flex flex-col overflow-hidden animate-scaleUp text-[#1d1d1f] dark:text-[#f5f5f7]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-8 border-b border-black/[0.06] dark:border-white/10 bg-gradient-to-b from-neutral-50/90 to-white dark:from-[#11131a] dark:to-[#0c0e14] flex items-center justify-between gap-4 shrink-0">
          <div className="text-start space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{t.privacyLastUpdated}</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-[#1d1d1f] dark:text-white tracking-tight">
              {t.privacyModalTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#6e6e73] dark:text-[#86868b] max-w-2xl">
              {t.privacyModalSubtitle}
            </p>
          </div>

          {/* Top Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => window.print()}
              title={t.privacyPrintBtn}
              className="p-2.5 rounded-full bg-neutral-100 dark:bg-white/10 hover:bg-neutral-200 dark:hover:bg-white/15 text-[#1d1d1f] dark:text-white transition-all cursor-pointer hidden sm:flex items-center gap-1.5 text-xs font-bold"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden md:inline">{t.privacyPrintBtn}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                playAppleClick();
                onClose();
              }}
              className="p-2.5 rounded-full bg-neutral-100 dark:bg-white/10 hover:bg-neutral-200 dark:hover:bg-white/15 text-[#1d1d1f] dark:text-white transition-all cursor-pointer"
              title={t.privacyCloseBtn}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-4 sm:p-8 overflow-y-auto space-y-6 sm:space-y-8 text-start text-[#1d1d1f] dark:text-[#e5e5ea] leading-relaxed text-sm sm:text-base">
          {isAr ? (
            // ================= Arabic Legal Document =================
            <>
              {/* Preamble */}
              <div className="p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 space-y-2">
                <div className="flex items-center gap-2 text-blue-900 dark:text-blue-300 font-bold text-sm sm:text-base">
                  <Scale className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span>ديباجة الوثيقة وبيان المسؤولية القانونية</span>
                </div>
                <p className="text-xs sm:text-sm text-blue-900/90 dark:text-blue-200/90 leading-relaxed">
                  تلتزم <strong>Blotx Tech Studios</strong> (المشار إليها بـ "الشركة" أو "المختبر")، كمطور ومالك حصري لتطبيقي «تحت البلاطة» و«افتكر» وموقعها الإلكتروني (blotxtech.site)، بأعلى المعايير الدستورية والقانونية لحماية الحق في الخصوصية وحرمة البيانات الشخصية والمالية وفقاً لأحكام <strong>قانون حماية البيانات الشخصية المصري رقم 151 لسنة 2020</strong> ولائحته التنفيذية، والمعايير الدولية للائحة العامة لحماية البيانات (GDPR).
                </p>
              </div>

              {/* Official Google Play App Policies Banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-[#131620] dark:to-[#171a26] border border-neutral-200 dark:border-white/10 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-[#6e6e73] dark:text-[#86868b]">
                  الوثائق الرسمية المعتمدة لمتجر Google Play
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <a
                    href="/privacy-taht-el-balata.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white dark:bg-[#10121a] border border-emerald-200 dark:border-emerald-800/40 hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-sm transition-all group flex flex-col justify-between"
                  >
                    <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 group-hover:text-emerald-900 dark:group-hover:text-emerald-300">
                      سياسة «تحت البلاطة»
                    </span>
                    <span className="text-[11px] text-[#6e6e73] dark:text-[#86868b] mt-1">
                      عرض الوثيقة المستقلة الكاملة ↗
                    </span>
                  </a>
                  <a
                    href="/privacy-eftekir.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white dark:bg-[#10121a] border border-blue-200 dark:border-blue-800/40 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-sm transition-all group flex flex-col justify-between"
                  >
                    <span className="text-xs font-bold text-blue-800 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-blue-300">
                      سياسة تطبيق «افتكر»
                    </span>
                    <span className="text-[11px] text-[#6e6e73] dark:text-[#86868b] mt-1">
                      عرض الوثيقة المستقلة الكاملة ↗
                    </span>
                  </a>
                  <a
                    href="/delete-account.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white dark:bg-[#10121a] border border-red-200 dark:border-red-800/40 hover:border-red-400 dark:hover:border-red-500 hover:shadow-sm transition-all group flex flex-col justify-between"
                  >
                    <span className="text-xs font-bold text-red-700 dark:text-red-400 group-hover:text-red-800 dark:group-hover:text-red-300">
                      بوابة حذف الحساب والبيانات
                    </span>
                    <span className="text-[11px] text-[#6e6e73] dark:text-[#86868b] mt-1">
                      بوابة الحذف الرسمية (Play Store) ↗
                    </span>
                  </a>
                </div>
              </div>

              {/* Clause 1: Zero-Knowledge Architecture */}
              <section className="space-y-3 border-b border-black/[0.05] dark:border-white/10 pb-6">
                <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-[#1d1d1f] dark:text-white">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <EyeOff className="w-4 h-4" />
                  </div>
                  <h3>1. مبدأ المعرفة الصفرية والتشغيل المستقل (Zero-Knowledge Architecture)</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#515154] dark:text-[#a1a1a6] leading-relaxed">
                  صُممت منظومة Blotx Tech بالكامل لتكون <strong>أوفلاين أولاً (Offline-First)</strong>؛ مما يعني أن كافة بيانات مدخراتك، خزناتك المالية، وملاحظاتك، وصور فواتيرك وبطاقات الضمان تبقى مخزنة محلياً 100% داخل الذاكرة الآمنة لجهازك الشخصي. لا تمتلك الشركة ولا أي خادم خارجي أي قدرة فنية أو صلاحية برمجية للاطلاع على معاملاتك أو قراءة تفاصيلها أو استرجاعها في حال فقدان جهازك.
                </p>
              </section>

              {/* Clause 2: Cryptographic Standards */}
              <section className="space-y-3 border-b border-black/[0.05] dark:border-white/10 pb-6">
                <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-[#1d1d1f] dark:text-white">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Lock className="w-4 h-4" />
                  </div>
                  <h3>2. معايير التشفير وحماية البيانات داخل العتاد الصلب (Hardware Keystore)</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#515154] dark:text-[#a1a1a6] leading-relaxed">
                  يتم حماية قواعد البيانات المحلية باستخدام خوارزميات التشفير المعتمدة عسكرياً <strong>AES-256 GCM</strong>، وترتبط مفاتيح فك التشفير حصرياً بمستودع المفاتيح العتادي لجهازك (Android Keystore / Secure Enclave). في حال قيامك بتفعيل بصمة الإصبع أو بصمة الوجه، تظل المصادقة حصرية للنظام التشغيلي المحلي دون إرسال أي بصمة حيوية إلى أي وسيط.
                </p>
              </section>

              {/* Clause 3: AirDrop Local P2P Sync */}
              <section className="space-y-3 border-b border-black/[0.05] dark:border-white/10 pb-6">
                <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-[#1d1d1f] dark:text-white">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 flex items-center justify-center shrink-0">
                    <WifiOff className="w-4 h-4" />
                  </div>
                  <h3>3. بروتوكول التخاطب المحلي AirDrop (المزامنة اللاسلكية المباشرة)</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#515154] dark:text-[#a1a1a6] leading-relaxed">
                  التخاطب التلقائي بين تطبيقي «افتكر» و«تحت البلاطة» أو بين أجهزتك المتجاورة يتم عبر بروتوكول اتصال طرف-لطرف (Peer-to-Peer) عبر الشبكة المحلية (Local Wi-Fi / Bluetooth LE) دون استخدام خوادم وسطية. تُبث كبسولات البيانات مشفرة بمفتاح مصافحة مؤقت (Ephemeral Key) يتم توليده محلياً وإتلافه فور تأكيد الاستلام في الخزنة.
                </p>
              </section>

              {/* Clause 4: Ads, Subscriptions, and Data Integrity */}
              <section className="space-y-3 border-b border-black/[0.05] dark:border-white/10 pb-6">
                <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-[#1d1d1f] dark:text-white">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <h3>4. سياسة الإعلانات، اشتراكات Pro، وسلامة البيانات</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#515154] dark:text-[#a1a1a6] leading-relaxed">
                  تلتزم Blotx Tech بأعلى درجات الشفافية والنزاهة المهنية فيما يخص نموذج العمل وحماية البيانات:
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-[#515154] dark:text-[#a1a1a6] pr-2">
                  <li><strong>عدم بيع أو تسريب البيانات:</strong> نلتزم التزاماً مطلقاً بعدم بيع أو تأجير أو مشاركة أي بيانات شخصية أو سجلات مالية مع أي وسطاء بيانات (Data Brokers) أو جهات خارجية.</li>
                  <li><strong>الإعلانات في الباقة المجانية:</strong> لضمان استمرارية التطوير المجاني، قد يعرض التطبيق إعلانات خفيفة غير متطفلة عبر شبكة Google AdMob المعتمدة، مع حظر كامل للإعلانات المزعجة أو المتتبعة خارج السياق العام.</li>
                  <li><strong>باقة Pro VIP والاشتراكات:</strong> يتيح التطبيق اشتراكات اختيارية (شهرية وسنوية ومدى الحياة) عبر نظام دفع Google Play الرسمي المشفر؛ تمنح المشترك إزالة تامة لكافة الإعلانات مع فتح الميزات المتقدمة دون أي انقطاع.</li>
                  <li><strong>إدارة الاشتراك:</strong> تتم إدارة وإلغاء الاشتراكات في أي وقت بمنتهى السهولة وبضغطة زر واحدة عبر حسابك في متجر Google Play.</li>
                </ul>
              </section>

              {/* Clause 5: User Rights under Egyptian Law & GDPR */}
              <section className="space-y-3 border-b border-black/[0.05] dark:border-white/10 pb-6">
                <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-[#1d1d1f] dark:text-white">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <h3>5. حقوق المستخدم والسيادة الكاملة على البيانات (Data Subject Rights)</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#515154] dark:text-[#a1a1a6] leading-relaxed">
                  بموجب القانون رقم 151 لسنة 2020، يتمتع المستخدم بالحقوق الحصرية التالية:
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-[#515154] dark:text-[#a1a1a6] pr-2">
                  <li><strong>حق محو البيانات الفوري:</strong> بمجرد مسح بيانات التطبيق أو إلغاء تثبيته من هاتفك، يتم إتلاف كافة السجلات المشفرة نهائياً من الوجود دون بقاء أي نسخة في أي مكان.</li>
                  <li><strong>حق التصدير والنسخ الاحتياطي:</strong> يتيح لك التطبيق استخراج نسخة احتياطية مشفرة برقمك السري لنقلها إلى هاتف آخر بحرية تامة.</li>
                  <li><strong>حق الامتناع والموافقة:</strong> لا يلزمك التطبيق بمنح أذونات الكاميرا أو التخزين إلا عند رغبتك الفعلية في مسح فاتورة بـ OCR أو حفظ مستند ضمان.</li>
                </ul>
              </section>

              {/* Clause 6: Contact & Inquiries */}
              <section className="p-5 rounded-2xl bg-neutral-50 dark:bg-[#11131a] border border-black/[0.06] dark:border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-[#1d1d1f] dark:text-white">
                  <Mail className="w-4 h-4 text-[#0071e3]" />
                  <span>6. مسؤول حماية البيانات والتواصل القانوني (Data Protection Officer)</span>
                </div>
                <p className="text-xs sm:text-sm text-[#6e6e73] dark:text-[#86868b]">
                  لأية استفسارات قانونية أو ممارسة لحقوقك المتعلقة بسياسة الخصوصية، يمكنك التواصل المباشر مع فريق الدعم القانوني والتقني عبر:
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono font-bold pt-1">
                  <span className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#171a26] border border-black/[0.08] dark:border-white/10 text-neutral-900 dark:text-white">
                    blotx.tech@gmail.com
                  </span>
                  <span className="text-neutral-500 dark:text-neutral-400 font-sans font-normal text-xs">
                    مختبرات Blotx Tech • جمهورية مصر العربية
                  </span>
                </div>
              </section>
            </>
          ) : (
            // ================= English Legal Document =================
            <>
              {/* Preamble */}
              <div className="p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 space-y-2">
                <div className="flex items-center gap-2 text-blue-900 dark:text-blue-300 font-bold text-sm sm:text-base">
                  <Scale className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span>Preamble & Legal Responsibility Statement</span>
                </div>
                <p className="text-xs sm:text-sm text-blue-900/90 dark:text-blue-200/90 leading-relaxed">
                  <strong>Blotx Tech Studios</strong> ("the Studio", "we", or "us"), as the sole developer and intellectual property owner of "Taht El Balata", "Eftekir", and blotxtech.site, is strictly committed to safeguarding your constitutional and fundamental human right to digital privacy and financial sovereignty under <strong>Egyptian Personal Data Protection Law No. 151 of 2020</strong> and international standards of the General Data Protection Regulation (GDPR).
                </p>
              </div>

              {/* Official Google Play App Policies Banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-[#131620] dark:to-[#171a26] border border-neutral-200 dark:border-white/10 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-[#6e6e73] dark:text-[#86868b]">
                  Official Google Play Compliance Documents
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <a
                    href="/privacy-taht-el-balata.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white dark:bg-[#10121a] border border-emerald-200 dark:border-emerald-800/40 hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-sm transition-all group flex flex-col justify-between"
                  >
                    <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 group-hover:text-emerald-900 dark:group-hover:text-emerald-300">
                      Taht El Balata Policy
                    </span>
                    <span className="text-[11px] text-[#6e6e73] dark:text-[#86868b] mt-1">
                      View full standalone document ↗
                    </span>
                  </a>
                  <a
                    href="/privacy-eftekir.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white dark:bg-[#10121a] border border-blue-200 dark:border-blue-800/40 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-sm transition-all group flex flex-col justify-between"
                  >
                    <span className="text-xs font-bold text-blue-800 dark:text-blue-400 group-hover:text-blue-900 dark:group-hover:text-blue-300">
                      Eftekir App Policy
                    </span>
                    <span className="text-[11px] text-[#6e6e73] dark:text-[#86868b] mt-1">
                      View full standalone document ↗
                    </span>
                  </a>
                  <a
                    href="/delete-account.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white dark:bg-[#10121a] border border-red-200 dark:border-red-800/40 hover:border-red-400 dark:hover:border-red-500 hover:shadow-sm transition-all group flex flex-col justify-between"
                  >
                    <span className="text-xs font-bold text-red-700 dark:text-red-400 group-hover:text-red-800 dark:group-hover:text-red-300">
                      Account &amp; Data Deletion
                    </span>
                    <span className="text-[11px] text-[#6e6e73] dark:text-[#86868b] mt-1">
                      Official Play Store Portal ↗
                    </span>
                  </a>
                </div>
              </div>

              {/* Clause 1: Zero-Knowledge Architecture */}
              <section className="space-y-3 border-b border-black/[0.05] dark:border-white/10 pb-6">
                <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-[#1d1d1f] dark:text-white">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <EyeOff className="w-4 h-4" />
                  </div>
                  <h3>1. Zero-Knowledge & Offline-First Operating Architecture</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#515154] dark:text-[#a1a1a6] leading-relaxed">
                  The Blotx Tech ecosystem is engineered from first principles to be <strong>100% Offline-First</strong>. All your savings records, financial vaults, cognitive notes, OCR receipts, and warranty passports remain strictly localized within the encrypted sandbox of your physical device. We operate zero centralized surveillance databases and possess zero technological capability to view, inspect, or reconstruct your data.
                </p>
              </section>

              {/* Clause 2: Cryptographic Standards */}
              <section className="space-y-3 border-b border-black/[0.05] dark:border-white/10 pb-6">
                <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-[#1d1d1f] dark:text-white">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Lock className="w-4 h-4" />
                  </div>
                  <h3>2. Military-Grade Hardware Keystore Cryptography</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#515154] dark:text-[#a1a1a6] leading-relaxed">
                  Local app databases are encrypted with military-grade <strong>AES-256 GCM</strong> authenticated ciphers. Cryptographic keys are anchored directly in hardware-backed security modules (Android Keystore / Secure Enclave). Biometric authentications (Fingerprint / Face ID) are executed strictly on-device by your operating system, never transferred or stored externally.
                </p>
              </section>

              {/* Clause 3: AirDrop Local P2P Sync */}
              <section className="space-y-3 border-b border-black/[0.05] dark:border-white/10 pb-6">
                <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-[#1d1d1f] dark:text-white">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 flex items-center justify-center shrink-0">
                    <WifiOff className="w-4 h-4" />
                  </div>
                  <h3>3. Peer-to-Peer AirDrop Synchronization Protocol</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#515154] dark:text-[#a1a1a6] leading-relaxed">
                  Wireless communication between Eftekir and Taht El Balata relies exclusively on local Peer-to-Peer channels (Local Wi-Fi / Bluetooth LE) without intermediate cloud servers. Broadcast capsules are encrypted with ephemeral session keys that are generated locally and discarded immediately upon vault receipt confirmation.
                </p>
              </section>

              {/* Clause 4: Ads, Pro Subscriptions & Data Integrity */}
              <section className="space-y-3 border-b border-black/[0.05] dark:border-white/10 pb-6">
                <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-[#1d1d1f] dark:text-white">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <h3>4. Advertising Policy, Pro Subscriptions &amp; Zero Data Brokerage</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#515154] dark:text-[#a1a1a6] leading-relaxed">
                  Blotx Tech adheres to rigorous data integrity and monetization transparency:
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-[#515154] dark:text-[#a1a1a6] pl-2">
                  <li><strong>Zero Data Brokerage:</strong> We never sell, lease, or monetize your personal or financial records with data brokers or marketing aggregators.</li>
                  <li><strong>Non-Intrusive Free Tier Ads:</strong> To support independent maintenance, free tiers may present non-intrusive Google AdMob banners without cross-app behavioral surveillance.</li>
                  <li><strong>Pro VIP Tiers (100% Ad-Free):</strong> Optional monthly, annual, and lifetime VIP subscriptions via Google Play In-App Billing eliminate all advertisements entirely while unlocking unlimited capabilities.</li>
                  <li><strong>Subscription Autonomy:</strong> Subscriptions can be reviewed, managed, or cancelled at any time directly through your Google Play Store account settings.</li>
                </ul>
              </section>

              {/* Clause 5: User Rights under Egyptian Law & GDPR */}
              <section className="space-y-3 border-b border-black/[0.05] dark:border-white/10 pb-6">
                <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-[#1d1d1f] dark:text-white">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <h3>5. Comprehensive Data Subject Rights</h3>
                </div>
                <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-[#515154] dark:text-[#a1a1a6] pl-2">
                  <li><strong>Instant Permanent Deletion:</strong> Uninstalling the application or clearing storage instantly wipes all cryptographic keys and records with zero residual cloud trace.</li>
                  <li><strong>Portability & Encrypted Backup:</strong> You have the right to generate password-protected encrypted archives to migrate between devices at will.</li>
                  <li><strong>Granular Device Permissions:</strong> Camera and file access are solely requested at runtime when you choose to scan a physical receipt with OCR.</li>
                </ul>
              </section>

              {/* Clause 6: Contact & Inquiries */}
              <section className="p-5 rounded-2xl bg-neutral-50 dark:bg-[#11131a] border border-black/[0.06] dark:border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-[#1d1d1f] dark:text-white">
                  <Mail className="w-4 h-4 text-[#0071e3]" />
                  <span>6. Data Protection Officer (DPO) & Legal Inquiries</span>
                </div>
                <p className="text-xs sm:text-sm text-[#6e6e73] dark:text-[#86868b]">
                  For legal inquiries, official certifications, or compliance audits regarding our privacy infrastructure, contact:
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono font-bold pt-1">
                  <span className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#171a26] border border-black/[0.08] dark:border-white/10 text-neutral-900 dark:text-white">
                    blotx.tech@gmail.com
                  </span>
                  <span className="text-neutral-500 dark:text-neutral-400 font-sans font-normal text-xs">
                    Blotx Tech Studios • Arab Republic of Egypt
                  </span>
                </div>
              </section>
            </>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-3.5 sm:p-5 border-t border-black/[0.06] dark:border-white/10 bg-neutral-50 dark:bg-[#11131a] flex items-center justify-between gap-3 shrink-0">
          <span className="text-[11px] text-[#86868b] dark:text-[#a1a1a6] truncate">
            {isAr ? 'وثيقة خصوصية Blotx Tech الرسمية • سارية المفعول قانونياً' : 'Official Blotx Tech Privacy Charter • Legally Binding'}
          </span>
          <button
            type="button"
            onClick={() => {
              playAppleClick();
              onClose();
            }}
            className="apple-pill-btn px-6 py-2.5 bg-[#1d1d1f] dark:bg-white text-white dark:text-black hover:bg-black dark:hover:bg-neutral-200 text-xs font-bold shadow-md cursor-pointer"
          >
            {t.privacyCloseBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
