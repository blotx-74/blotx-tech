import { useState, useMemo, useEffect, type FC } from 'react';
import {
  Shield,
  Camera,
  Mic,
  Sparkles,
  CheckCircle2,
  Sun,
  Moon,
  Bell,
  Radio,
  Laptop,
  Play,
  Pause,
  CreditCard,
  RefreshCw,
  Lock,
  FileText,
  HeartPulse,
  Paperclip,
  X,
  Sliders,
} from 'lucide-react';
import {
  playAppleClick,
  playClarityChime,
  playScanLaser,
  playAirDropChime,
  playCardFlip,
} from '../../utils/soundEffects';

// Smart Collection Categories matching Compose SmartCollection enum
export type SmartCollection = 'ALL' | 'PURCHASES' | 'HEALTH' | 'INVOICES' | 'DOCUMENTS' | 'VOICE';

export type MemoryCategory =
  | 'ELECTRONICS_APPLIANCE'
  | 'HEALTH_MEDICINE'
  | 'LUXURY_VALUABLES'
  | 'DOCUMENTS_CONTRACTS'
  | 'GROCERY_CONSUMABLE'
  | 'OTHER';

export interface EvidenceItem {
  id: string;
  type: 'voice' | 'invoice_pdf' | 'camera_photo' | 'contract';
  title: string;
  fileSize?: string;
}

export interface Memory {
  id: string;
  title: string;
  merchantOrParty: string;
  collection: SmartCollection;
  category: MemoryCategory;
  summary: string;
  dateFormatted: string;
  priceAmount?: number;
  currency: string;
  isWarrantyActive: boolean;
  warrantyText?: string;
  expiryDate?: string;
  modelNumber?: string;
  serialNumber?: string;
  activeIngredient?: string;
  hasTahtElBalataSync: boolean;
  evidences: EvidenceItem[];
  duration?: string;
}

interface EftekirScreenProps {
  onTriggerAirDropSync?: (invoiceAmount: number, invoiceTitle: string) => void;
  isSyncedFromBalata?: boolean;
}

export const EftekirScreen: FC<EftekirScreenProps> = ({
  onTriggerAirDropSync,
  isSyncedFromBalata = false,
}) => {
  const [isDark, setIsDark] = useState(true);
  const [selectedCollection, setSelectedCollection] = useState<SmartCollection>('ALL');

  // 3D Flip Card state (180deg flip)
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // Scanner state
  const [isScanning, setIsScanning] = useState(false);
  const [scannedSuccess, setScannedSuccess] = useState(false);

  // Voice recording / playback state
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);

  // Active Memory Inspection Modal
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  // Notifications modal
  const [showNotifications, setShowNotifications] = useState(false);

  // Settings / Profile modal
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Card Parallax Tilt
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });

  // Initial Memories state strictly derived from Eftekir Jetpack Compose Database
  const [memories, setMemories] = useState<Memory[]>([
    {
      id: 'MEM-88219-MAC',
      title: 'ماك بوك برو M3 Max (16 بوصة)',
      merchantOrParty: 'Tradeline Egypt (الموزع المعتمد)',
      collection: 'PURCHASES',
      category: 'ELECTRONICS_APPLIANCE',
      summary: 'تم استخراج شهادة الضمان والفاتورة الضريبية تلقائياً برقم المسلسل المعتمد مع توثيق حق الصيانة الدورية المعتمدة.',
      dateFormatted: '14 أغسطس 2026',
      priceAmount: 48900,
      currency: 'ج.م',
      isWarrantyActive: true,
      warrantyText: 'ساري حتى 14 نوفمبر 2026 - استبدال فوري',
      expiryDate: '14 نوفمبر 2026',
      modelNumber: 'A2991',
      serialNumber: 'C02GL0AAQ05D',
      hasTahtElBalataSync: true,
      evidences: [
        { id: 'ev-1', type: 'invoice_pdf', title: 'فاتورة ضريبية إلكترونية رقم 99182.pdf', fileSize: '1.4 MB' },
        { id: 'ev-2', type: 'camera_photo', title: 'صورة السيريال من علبة الجهاز.jpg', fileSize: '2.8 MB' },
        { id: 'ev-3', type: 'contract', title: 'عقد تمديد كفالة أبل كير بلس.pdf', fileSize: '850 KB' },
      ],
    },
    {
      id: 'MEM-77102-CAR',
      title: 'صيانة السيارة الدورية (زيت وفلاتر)',
      merchantOrParty: 'مركز غبور أوتو التجمع',
      collection: 'INVOICES',
      category: 'ELECTRONICS_APPLIANCE',
      summary: 'تغيير زيت تخليقي كامل وفلتر هواء وفحص شامل للمكابح، مع اعتماد فاتورة التوكيل الرسمية وضمان 6 أشهر.',
      dateFormatted: 'اليوم، 10:00 ص',
      priceAmount: 3500,
      currency: 'ج.م',
      isWarrantyActive: true,
      warrantyText: 'ضمان قطع الغيار 6 أشهر',
      expiryDate: '11 مارس 2027',
      modelNumber: 'E4-SYNTHETIC',
      serialNumber: 'GH-88219-CAI',
      hasTahtElBalataSync: false,
      evidences: [
        { id: 'ev-4', type: 'invoice_pdf', title: 'إيصال استلام مركز الصيانة المعتمد.pdf', fileSize: '640 KB' },
        { id: 'ev-5', type: 'camera_photo', title: 'صورة عداد السيارة وتقرير الفحص.jpg', fileSize: '1.9 MB' },
      ],
    },
    {
      id: 'MEM-66314-MED',
      title: 'كونكور كور 5 مجم (3 علب)',
      merchantOrParty: 'صيدليات العزبي',
      collection: 'HEALTH',
      category: 'HEALTH_MEDICINE',
      summary: 'جرعة يومية حبة صباحاً - منبه تلقائي لإعادة الشراء مسجل في جدول الأدوية بالخزينة قبل النفاد بأسبوع.',
      dateFormatted: 'أمس، 06:15 م',
      priceAmount: 185,
      currency: 'ج.م',
      isWarrantyActive: false,
      activeIngredient: 'بيسوبرولول فومارات (Bisoprolol)',
      expiryDate: 'أكتوبر 2026',
      hasTahtElBalataSync: false,
      evidences: [
        { id: 'ev-6', type: 'camera_photo', title: 'روشتة طبيب الباطنة المعتمدة.jpg', fileSize: '3.1 MB' },
      ],
    },
    {
      id: 'MEM-55410-DOC',
      title: 'عقد إيجار شقة المعادي الجديدة',
      merchantOrParty: 'المالك: د. هشام عثمان',
      collection: 'DOCUMENTS',
      category: 'DOCUMENTS_CONTRACTS',
      summary: 'عقد موثق بالشهر العقاري ساري لعامين، استحقاق الإيجار يوم 1 من كل شهر ميلادي مع إيصال التأمين.',
      dateFormatted: '01 سبتمبر 2026',
      priceAmount: 18000,
      currency: 'ج.م',
      isWarrantyActive: true,
      warrantyText: 'ساري حتى سبتمبر 2027',
      expiryDate: '01 سبتمبر 2027',
      hasTahtElBalataSync: false,
      evidences: [
        { id: 'ev-7', type: 'contract', title: 'أصل العقد الرسمي موثق شهر عقاري.pdf', fileSize: '4.2 MB' },
        { id: 'ev-8', type: 'invoice_pdf', title: 'إيصال استلام التأمين الوديعة.pdf', fileSize: '920 KB' },
      ],
    },
    {
      id: 'MEM-44912-VOI',
      title: 'ملاحظة صوتية: أفكار إطلاق التطبيق',
      merchantOrParty: 'سجل صوتي مشفر بالخزينة',
      collection: 'VOICE',
      category: 'OTHER',
      summary: 'تسجيل صوتي عالي الدقة تم تحويله لنص واستخراج بنود العمل: مزامنة AirDrop وتأمين الواجهات بدون خوادم.',
      dateFormatted: 'أول أمس، 11:20 م',
      duration: '٠:٤٢ د',
      currency: 'ج.م',
      isWarrantyActive: false,
      hasTahtElBalataSync: false,
      evidences: [
        { id: 'ev-9', type: 'voice', title: 'ملف صوتي عالي النقاء WAV.opus', fileSize: '480 KB' },
      ],
    },
  ]);

  // If synced from Balata via external trigger, mark the car maintenance item as synced
  useEffect(() => {
    if (isSyncedFromBalata) {
      setMemories((prev) =>
        prev.map((m) =>
          m.id === 'MEM-77102-CAR' ? { ...m, hasTahtElBalataSync: true } : m
        )
      );
    }
  }, [isSyncedFromBalata]);

  // Greeting based on Egyptian local hour (HomeScreen.kt HomeHeaderBar logic)
  const greetingText = useMemo(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'صباح الفل والروقان ☀️';
    if (hour >= 12 && hour < 18) return 'مساك سعيد في الخزينة ✨';
    return 'سهرة رايقة في الخزينة 🌙';
  }, []);

  // Filter memories matching Compose SmartCollection logic
  const filteredMemories = useMemo(() => {
    if (selectedCollection === 'ALL') return memories;
    return memories.filter((m) => {
      if (m.collection === selectedCollection) return true;
      if (selectedCollection === 'PURCHASES' && (m.category === 'ELECTRONICS_APPLIANCE' || m.category === 'LUXURY_VALUABLES')) return true;
      if (selectedCollection === 'HEALTH' && m.category === 'HEALTH_MEDICINE') return true;
      if (selectedCollection === 'DOCUMENTS' && m.category === 'DOCUMENTS_CONTRACTS') return true;
      if (selectedCollection === 'INVOICES' && (m.isWarrantyActive || (m.warrantyText && m.warrantyText.length > 0))) return true;
      if (selectedCollection === 'VOICE' && (m.collection === 'VOICE' || m.duration)) return true;
      return false;
    });
  }, [selectedCollection, memories]);

  // Featured Warranty Card (InteractiveWarrantyCard3D)
  const featuredWarrantyMemory = useMemo(() => {
    return (
      memories.find((m) => m.isWarrantyActive || m.serialNumber || m.modelNumber) ||
      memories[0]
    );
  }, [memories]);

  // Computed metrics for WarrantyHealthGauge
  const totalInsuredAssets = useMemo(() => {
    return memories.reduce((acc, m) => acc + (m.priceAmount || 0), 0);
  }, [memories]);

  const activeWarrantiesCount = useMemo(() => {
    return memories.filter((m) => m.isWarrantyActive).length;
  }, [memories]);

  const coveragePercentage = useMemo(() => {
    const techItems = memories.filter(
      (m) => m.isWarrantyActive || m.category === 'ELECTRONICS_APPLIANCE' || m.category === 'LUXURY_VALUABLES'
    );
    if (techItems.length === 0) return 100;
    return Math.min(100, Math.round((activeWarrantiesCount / techItems.length) * 100));
  }, [memories, activeWarrantiesCount]);

  // Flip 3D Card handler
  const handleToggleCardFlip = () => {
    playCardFlip();
    setIsCardFlipped((prev) => !prev);
  };

  // Card Parallax Tilt handlers
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setCardTilt({ x: y, y: x });
  };

  const handleCardMouseLeave = () => {
    setCardTilt({ x: 0, y: 0 });
  };

  // Start OCR Laser Scan
  const handleStartScan = () => {
    playScanLaser();
    setIsScanning(true);
    setScannedSuccess(false);

    setTimeout(() => {
      setIsScanning(false);
      setScannedSuccess(true);
      playClarityChime();

      // Extracted Invoice item
      const newInvoice: Memory = {
        id: `MEM-${Date.now().toString().slice(-5)}-OCR`,
        title: 'شاشة سامسونج Odyssey OLED G9 (49 بوصة)',
        merchantOrParty: 'سامسونج ستور مصر (B.TECH)',
        collection: 'INVOICES',
        category: 'ELECTRONICS_APPLIANCE',
        summary: 'تم استخراج الفاتورة الضريبية عبر الذكاء الاصطناعي مع تفعيل ضمان الاستبدال الفوري وسيريال التوكيل.',
        dateFormatted: 'الآن (مسح ذكي OCR)',
        priceAmount: 42000,
        currency: 'ج.م',
        isWarrantyActive: true,
        warrantyText: 'ضمان سنتين شامل العيوب المصنعية',
        expiryDate: '11 سبتمبر 2028',
        modelNumber: 'LS49CG954EMXUE',
        serialNumber: 'SN: SAM-ODYSSEY-G9-49',
        hasTahtElBalataSync: false,
        evidences: [
          { id: 'ev-new-1', type: 'invoice_pdf', title: 'فاتورة بي تك الرسمية الممسوحة ضوئياً.pdf', fileSize: '2.1 MB' },
          { id: 'ev-new-2', type: 'camera_photo', title: 'صورة باركود الصندوق.jpg', fileSize: '1.7 MB' },
        ],
      };

      setMemories((prev) => [newInvoice, ...prev]);

      setTimeout(() => setScannedSuccess(false), 4000);
    }, 1900);
  };

  // Toggle Voice Note Playback
  const handleToggleVoicePlayback = (memoryId: string) => {
    if (activePlayingId === memoryId && isPlayingVoice) {
      setIsPlayingVoice(false);
      setActivePlayingId(null);
    } else {
      playClarityChime();
      setActivePlayingId(memoryId);
      setIsPlayingVoice(true);
      setTimeout(() => {
        setIsPlayingVoice(false);
        setActivePlayingId(null);
      }, 5500);
    }
  };

  // Trigger AirDrop Sync to Taht El Balata
  const handleSyncToBalata = (memory: Memory) => {
    playAirDropChime();
    setMemories((prev) =>
      prev.map((m) => (m.id === memory.id ? { ...m, hasTahtElBalataSync: true } : m))
    );
    if (selectedMemory && selectedMemory.id === memory.id) {
      setSelectedMemory((prev) => (prev ? { ...prev, hasTahtElBalataSync: true } : null));
    }
    if (onTriggerAirDropSync && memory.priceAmount) {
      onTriggerAirDropSync(memory.priceAmount, memory.title);
    }
  };

  return (
    <div
      dir="rtl"
      className={`relative w-full h-full flex flex-col justify-between select-none font-cairo transition-colors duration-300 overflow-hidden ${
        isDark ? 'bg-[#070B14] text-white' : 'bg-[#F8FAFC] text-[#0F172A]'
      }`}
    >
      {/* ────────────────────────────────────────────────────────── */}
      {/* 1. HOME HEADER BAR (HomeHeaderBar)                         */}
      {/* ────────────────────────────────────────────────────────── */}
      <div
        className={`px-3.5 py-2.5 mx-3 mt-2 rounded-2xl flex items-center justify-between border transition-all shadow-sm shrink-0 z-10 ${
          isDark
            ? 'bg-[#0B132B]/95 border-[#1E293B] shadow-black/40'
            : 'bg-white/95 border-slate-200 shadow-slate-200/50'
        }`}
      >
        {/* Right in RTL: Crest Logo + Pulse + Greeting */}
        <div className="flex items-center gap-2.5">
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-[#0B132B] to-[#1E293B] p-1 border border-blue-500/40 flex items-center justify-center shrink-0 shadow-xs">
            <img
              src="/assets/logos/efteker-logo.png"
              alt="شعار افتكر الرسمي"
              className="w-full h-full object-contain"
            />
            {/* Pulsating Emerald Security Dot */}
            <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-black" />
            </span>
          </div>

          <div className="flex flex-col text-right">
            <span className="text-[10px] opacity-70 font-semibold">{greetingText}</span>
            <span className="text-xs font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-emerald-400">
              زياد الشربيني (الخزينة)
            </span>
          </div>
        </div>

        {/* Left in RTL: Theme Toggle, Notifications, Profile */}
        <div className="flex items-center gap-1.5">
          {/* Sun / Moon Toggle */}
          <button
            type="button"
            title="تبديل المظهر"
            onClick={() => {
              playAppleClick();
              setIsDark(!isDark);
            }}
            className={`p-1.5 rounded-xl border transition-all cursor-pointer active:scale-90 ${
              isDark
                ? 'bg-[#0F172A] border-[#1E293B] text-amber-400 hover:border-amber-400/50'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:border-slate-300'
            }`}
          >
            {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          {/* Notifications Bell */}
          <button
            type="button"
            title="التنبيهات"
            onClick={() => {
              playAppleClick();
              setShowNotifications(true);
            }}
            className={`relative p-1.5 rounded-xl border transition-all cursor-pointer active:scale-90 ${
              isDark
                ? 'bg-[#0F172A] border-[#1E293B] text-slate-300 hover:border-blue-400'
                : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
          </button>

          {/* Profile / Settings Button */}
          <button
            type="button"
            title="إعدادات الخزينة"
            onClick={() => {
              playAppleClick();
              setShowProfileModal(true);
            }}
            className={`p-1.5 rounded-xl border transition-all cursor-pointer active:scale-90 ${
              isDark
                ? 'bg-[#0F172A] border-[#1E293B] text-slate-300 hover:border-blue-400'
                : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────── */}
      {/* 2. SCROLLABLE BODY AREA                                    */}
      {/* ────────────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-3.5 py-2.5 space-y-3 scrollbar-none">
        {/* Scanned Success Notification */}
        {scannedSuccess && (
          <div className="p-2.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 flex items-center gap-2 text-[11px] font-bold animate-fadeIn shadow-lg">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>تم استخراج الفاتورة وحفظ الضمان بنجاح عبر OCR!</span>
          </div>
        )}

        {/* ────────────────────────────────────────────────────────── */}
        {/* 2.1 WARRANTY HEALTH GAUGE HUD (WarrantyHealthGauge)       */}
        {/* ────────────────────────────────────────────────────────── */}
        <div
          className={`p-3.5 rounded-3xl border transition-all shadow-md ${
            isDark
              ? 'bg-gradient-to-br from-[#0B132B] via-[#0F172A] to-[#131F37] border-[#1E293B]'
              : 'bg-gradient-to-br from-white via-[#F8FAFC] to-[#EFF6FF] border-slate-200'
          }`}
        >
          {/* Header Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/35 flex items-center justify-center text-emerald-400 shrink-0">
                <Shield className="w-4.5 h-4.5" />
              </div>
              <div className="text-right">
                <div className="text-[11px] font-black">مؤشر صحة وقيمة الضمانات</div>
                <div className="text-[9.5px] text-emerald-400 font-bold">
                  {activeWarrantiesCount} أجهزة تحت الحماية الفعالة
                </div>
              </div>
            </div>

            {/* Coverage Badge */}
            <div className="px-2.5 py-1 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-[10px] font-black">
              {coveragePercentage}٪ مغطى
            </div>
          </div>

          {/* Divider */}
          <div className={`my-2.5 h-[1px] ${isDark ? 'bg-slate-800/80' : 'bg-slate-200'}`} />

          {/* Metrics Row */}
          <div className="flex items-end justify-between">
            <div>
              <span className="text-[10px] opacity-70 block">إجمالي الأصول المؤمنة:</span>
              <div className="flex items-baseline gap-1 font-cairo">
                <span className="text-xl font-black text-emerald-400">
                  {totalInsuredAssets.toLocaleString('ar-EG')}
                </span>
                <span className="text-[10px] text-emerald-500 font-bold">ج.م</span>
              </div>
            </div>

            <div className="text-left">
              <span className="text-[9.5px] opacity-65 block">أقرب سريان / انتهاء:</span>
              <span className="text-[10.5px] font-bold text-amber-400 font-mono">
                متبقي 11 شهر - صيانة مجانية
              </span>
            </div>
          </div>

          {/* Balata Integration Shard (شارة التكامل مع تحت البلاطة) */}
          <div
            className={`mt-2.5 px-2.5 py-1.5 rounded-xl border flex items-center justify-between text-[9.5px] font-bold ${
              isDark
                ? 'bg-[#070B14]/80 border-amber-500/30 text-amber-300'
                : 'bg-amber-50/80 border-amber-300 text-amber-800'
            }`}
          >
            <div className="flex items-center gap-1">
              <span className="text-xs">⚡</span>
              <span>متصل بنواة «تحت البلاطة» المركزية</span>
            </div>
            <span className="opacity-75 font-mono text-[9px]">مزامنة لحظية 🔒</span>
          </div>
        </div>

        {/* ────────────────────────────────────────────────────────── */}
        {/* 2.2 INTERACTIVE 3D HOLOGRAPHIC FLIP CARD                   */}
        {/* (InteractiveWarrantyCard3D)                                */}
        {/* ────────────────────────────────────────────────────────── */}
        {featuredWarrantyMemory && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between px-1 text-[11px] font-extrabold">
              <div className="flex items-center gap-1.5 text-blue-400">
                <CreditCard className="w-3.5 h-3.5" />
                <span>كارت الضمان والتوثيق الرقمي ثلاثي الأبعاد</span>
              </div>
              <button
                type="button"
                onClick={handleToggleCardFlip}
                className="flex items-center gap-1 text-[10px] text-blue-400 hover:text-blue-300 cursor-pointer"
              >
                <span>انقر للقلب</span>
                <RefreshCw className={`w-2.5 h-2.5 ${isCardFlipped ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* 3D Perspective Card Container */}
            <div
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              onClick={handleToggleCardFlip}
              style={{
                perspective: 1200,
                transform: `rotateX(${cardTilt.x}deg) rotateY(${cardTilt.y}deg)`,
              }}
              className="relative w-full h-[184px] cursor-pointer transition-transform duration-200 group"
            >
              <div
                className={`relative w-full h-full duration-700 transition-transform [transform-style:preserve-3d] ${
                  isCardFlipped ? '[transform:rotateY(180deg)]' : ''
                }`}
              >
                {/* ── FRONT FACE (Titanium Passport) ── */}
                <div
                  className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-[22px] p-3.5 flex flex-col justify-between text-white border border-blue-500/40 shadow-xl overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #030712 0%, #0F172A 50%, #1E1B4B 100%)',
                  }}
                >
                  {/* Subtle Sheen */}
                  <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Top Row: Title + Merchant */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[9px] font-mono font-bold tracking-widest text-slate-400">
                        OFFICIAL VAULT PASSPORT
                      </div>
                      <div className="text-xs font-black text-white truncate max-w-[200px]">
                        {featuredWarrantyMemory.title}
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-lg bg-white/10 border border-white/20 text-[9px] font-bold text-slate-200">
                      {featuredWarrantyMemory.merchantOrParty}
                    </span>
                  </div>

                  {/* Middle Row: Gold Chip + Specification */}
                  <div className="flex items-center gap-3">
                    {/* Golden Smart Chip */}
                    <div className="w-10 h-7 rounded-md bg-gradient-to-br from-amber-400 via-amber-200 to-amber-600 border border-amber-700/60 p-1 flex items-center justify-center shadow-inner shrink-0">
                      <span className="text-[7.5px] font-black text-amber-950 tracking-wider">CHIP</span>
                    </div>

                    <div className="overflow-hidden">
                      <span className="text-[8.5px] text-slate-400 font-mono block">
                        IDENTIFIER / SPECIFICATION:
                      </span>
                      <span className="text-[10px] text-sky-300 font-mono font-bold truncate block">
                        MODEL: {featuredWarrantyMemory.modelNumber} • S/N: {featuredWarrantyMemory.serialNumber}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-[1px] bg-white/15" />

                  {/* Bottom Row: Expiry + Status Badge */}
                  <div className="flex items-center justify-between text-[9.5px]">
                    <div>
                      <span className="text-slate-400 text-[8.5px] block">سريان التوثيق والضمان:</span>
                      <span className="text-emerald-400 font-bold truncate max-w-[170px] block">
                        {featuredWarrantyMemory.warrantyText}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-[9px]">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>الضمان ساري</span>
                    </div>
                  </div>
                </div>

                {/* ── BACK FACE (Encrypted Vault Passport & Cryptographic Token) ── */}
                <div
                  className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-[22px] p-3.5 flex flex-col justify-between text-white border border-amber-500/40 shadow-xl overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #030712 0%, #0F172A 50%, #0A0F1D 100%)',
                  }}
                >
                  {/* Top Row: Passport Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-amber-400">
                      <Shield className="w-3.5 h-3.5" />
                      <span className="text-[10.5px] font-black">جواز التوثيق الرقمي المشفر</span>
                    </div>
                    <span className="text-[9.5px] font-mono text-slate-400">
                      #ID-{featuredWarrantyMemory.id.slice(-8)}
                    </span>
                  </div>

                  {/* Center: Barcode Box */}
                  <div className="bg-white rounded-lg p-2 text-center text-black shadow-inner">
                    <div className="font-mono text-xs tracking-widest font-black leading-none py-0.5">
                      ||| | |||| | || |||| | ||| | |||
                    </div>
                    <div className="font-mono text-[8px] text-neutral-600 font-bold mt-1">
                      VAULT-TOKEN-9F3A4B2C • SHA256 VERIFIED
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-[1px] bg-slate-800" />

                  {/* Bottom Row: Authenticated Stamp */}
                  <div className="flex items-center justify-between text-[9px]">
                    <div className="flex items-center gap-1 text-emerald-400 font-bold">
                      <Lock className="w-3 h-3" />
                      <span>حالة التوثيق: أصلي ومعتمد</span>
                    </div>
                    <span className="text-slate-400">تاريخ الإيداع: {featuredWarrantyMemory.dateFormatted}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ────────────────────────────────────────────────────────── */}
        {/* 2.3 CATEGORY FILTERS ROW (CategoryFiltersRow)              */}
        {/* ────────────────────────────────────────────────────────── */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[10px] font-bold">
            {[
              { id: 'ALL', label: 'الكل', count: memories.length, icon: Sparkles },
              {
                id: 'PURCHASES',
                label: 'أجهزة ومقتنيات',
                count: memories.filter(
                  (m) => m.category === 'ELECTRONICS_APPLIANCE' || m.category === 'LUXURY_VALUABLES'
                ).length,
                icon: Laptop,
              },
              {
                id: 'HEALTH',
                label: 'صحة وأدوية',
                count: memories.filter((m) => m.category === 'HEALTH_MEDICINE').length,
                icon: HeartPulse,
              },
              {
                id: 'INVOICES',
                label: 'فواتير وضمانات',
                count: memories.filter((m) => m.isWarrantyActive || m.warrantyText).length,
                icon: FileText,
              },
              {
                id: 'DOCUMENTS',
                label: 'عقود ووثائق',
                count: memories.filter((m) => m.category === 'DOCUMENTS_CONTRACTS').length,
                icon: Shield,
              },
              {
                id: 'VOICE',
                label: 'صوتيات',
                count: memories.filter((m) => m.collection === 'VOICE' || m.duration).length,
                icon: Mic,
              },
            ].map((f) => {
              const Icon = f.icon;
              const isSelected = selectedCollection === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => {
                    playAppleClick();
                    setSelectedCollection(f.id as SmartCollection);
                  }}
                  className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md font-black'
                      : isDark
                      ? 'bg-[#0F172A] border border-[#1E293B] text-slate-300 hover:border-slate-700'
                      : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>
                    {f.label} ({f.count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ────────────────────────────────────────────────────────── */}
        {/* 2.4 SIMULATOR ACTIONS BAR                                  */}
        {/* ────────────────────────────────────────────────────────── */}
        <div className="space-y-1.5 pt-0.5">
          <div className="flex items-center justify-between text-[11px] font-black px-1 opacity-90">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-blue-400" />
              <span>أكشنز حية في الخزينة:</span>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {/* Action 1: OCR Scan Camera */}
            <button
              type="button"
              onClick={handleStartScan}
              disabled={isScanning}
              className={`p-2 rounded-xl border text-right transition-all flex items-center gap-2 cursor-pointer active:scale-95 ${
                isDark
                  ? 'bg-[#0F172A] border-[#1E293B] hover:border-blue-500'
                  : 'bg-white border-slate-200 hover:border-blue-400'
              }`}
            >
              <div className="w-7 h-7 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0">
                <Camera className="w-3.5 h-3.5" />
              </div>
              <div className="overflow-hidden">
                <div className="text-[10px] font-black truncate">مسح فاتورة OCR</div>
                <div className="text-[8.5px] text-blue-400 font-bold">فحص ليزر ذكي</div>
              </div>
            </button>

            {/* Action 2: Voice Note Playback Toggle */}
            <button
              type="button"
              onClick={() => handleToggleVoicePlayback('MEM-44912-VOI')}
              className={`p-2 rounded-xl border text-right transition-all flex items-center gap-2 cursor-pointer active:scale-95 ${
                isDark
                  ? 'bg-[#0F172A] border-[#1E293B] hover:border-purple-500'
                  : 'bg-white border-slate-200 hover:border-purple-400'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  isPlayingVoice && activePlayingId === 'MEM-44912-VOI'
                    ? 'bg-purple-600 text-white animate-pulse'
                    : 'bg-purple-600/20 text-purple-400'
                }`}
              >
                {isPlayingVoice && activePlayingId === 'MEM-44912-VOI' ? (
                  <Pause className="w-3.5 h-3.5" />
                ) : (
                  <Play className="w-3.5 h-3.5" />
                )}
              </div>
              <div className="overflow-hidden">
                <div className="text-[10px] font-black truncate">كبسولة صوتية</div>
                <div className="text-[8.5px] text-purple-400 font-bold">
                  {isPlayingVoice && activePlayingId === 'MEM-44912-VOI' ? 'جاري الاستماع...' : 'استمع للملخص'}
                </div>
              </div>
            </button>
          </div>

          {/* Action 3: AirDrop Bridge Button to Taht El Balata */}
          <button
            type="button"
            onClick={() => handleSyncToBalata(memories[1])}
            className="w-full py-2 px-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white text-[10.5px] font-black shadow-md flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer"
          >
            <Radio className="w-3.5 h-3.5 animate-spin" />
            <span>مزامنة فاتورة الصيانة (3,500 ج.م) مع «تحت البلاطة» ✦</span>
          </button>
        </div>

        {/* ────────────────────────────────────────────────────────── */}
        {/* 2.5 MEMORIES LIST (MemoryCard.kt 1:1)                      */}
        {/* ────────────────────────────────────────────────────────── */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-xs font-bold px-1">
            <span className="font-black">أحدث الذكريات المحفوظة</span>
            <span className="text-[10px] opacity-60">{filteredMemories.length} عناصر موثقة</span>
          </div>

          <div className="space-y-2">
            {filteredMemories.map((mem) => {
              const isVoice = mem.collection === 'VOICE' || mem.duration;
              const isThisVoicePlaying = isPlayingVoice && activePlayingId === mem.id;

              return (
                <div
                  key={mem.id}
                  onClick={() => {
                    playAppleClick();
                    setSelectedMemory(mem);
                  }}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer shadow-xs ${
                    isDark
                      ? 'bg-[#0F172A]/90 border-[#1E293B] hover:border-blue-500/60 hover:bg-[#0F172A]'
                      : 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-md'
                  }`}
                >
                  {/* Top Row: Icon + Title + Merchant & Price */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                          isVoice
                            ? 'bg-purple-600/15 border-purple-500/30 text-purple-400'
                            : mem.category === 'HEALTH_MEDICINE'
                            ? 'bg-emerald-600/15 border-emerald-500/30 text-emerald-400'
                            : mem.category === 'DOCUMENTS_CONTRACTS'
                            ? 'bg-amber-600/15 border-amber-500/30 text-amber-400'
                            : 'bg-blue-600/15 border-blue-500/30 text-blue-400'
                        }`}
                      >
                        {isVoice && <Mic className="w-4 h-4" />}
                        {mem.category === 'ELECTRONICS_APPLIANCE' && <Laptop className="w-4 h-4" />}
                        {mem.category === 'HEALTH_MEDICINE' && <HeartPulse className="w-4 h-4" />}
                        {mem.category === 'DOCUMENTS_CONTRACTS' && <FileText className="w-4 h-4" />}
                        {mem.category === 'OTHER' && !isVoice && <Shield className="w-4 h-4" />}
                      </div>

                      <div className="overflow-hidden text-right">
                        <div className="text-[11.5px] font-black truncate">{mem.title}</div>
                        <div className="text-[9.5px] opacity-60 truncate">
                          {mem.merchantOrParty} • {mem.dateFormatted}
                        </div>
                      </div>
                    </div>

                    {/* Price or Voice Duration */}
                    <div className="text-left shrink-0 font-cairo">
                      {isVoice ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleVoicePlayback(mem.id);
                          }}
                          className="px-2 py-0.5 rounded-lg bg-purple-600/20 text-purple-300 font-mono text-[10px] font-black flex items-center gap-1 cursor-pointer"
                        >
                          {isThisVoicePlaying ? <Pause className="w-2.5 h-2.5" /> : <Play className="w-2.5 h-2.5" />}
                          <span>{mem.duration}</span>
                        </button>
                      ) : mem.priceAmount ? (
                        <div className="text-xs font-black text-emerald-400">
                          {mem.priceAmount.toLocaleString('ar-EG')} {mem.currency}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {/* Middle: Sound Wave or AI Summary */}
                  {isVoice ? (
                    <div
                      className={`my-2 p-2 rounded-xl flex items-center justify-between ${
                        isDark ? 'bg-[#070B14]' : 'bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-1 w-full justify-around h-6">
                        {[12, 22, 10, 24, 16, 20, 14, 22, 8, 18, 12, 16].map((h, i) => (
                          <span
                            key={i}
                            style={{ height: `${h}px` }}
                            className={`w-1 rounded-full transition-all ${
                              isThisVoicePlaying
                                ? 'bg-purple-500 animate-pulse'
                                : 'bg-purple-400/40'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-[10px] opacity-75 line-clamp-2 my-1.5 leading-relaxed text-right">
                      {mem.summary}
                    </p>
                  )}

                  {/* Micro-Badges Row (الشارات الدقيقة المستخرجة بالذكاء الاصطناعي) */}
                  {(mem.modelNumber || mem.serialNumber || mem.activeIngredient || mem.expiryDate) && (
                    <div className="flex flex-wrap items-center gap-1 my-1.5">
                      {mem.modelNumber && (
                        <span className="px-1.5 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-[8.5px] font-mono font-bold text-blue-300">
                          موديل: {mem.modelNumber}
                        </span>
                      )}
                      {mem.serialNumber && (
                        <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[8.5px] font-mono font-bold text-emerald-300">
                          S/N: {mem.serialNumber}
                        </span>
                      )}
                      {mem.activeIngredient && (
                        <span className="px-1.5 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-[8.5px] font-bold text-amber-300">
                          المادة: {mem.activeIngredient}
                        </span>
                      )}
                      {mem.expiryDate && !mem.warrantyText && (
                        <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[8.5px] font-bold text-emerald-300">
                          صلاحية: {mem.expiryDate}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Divider */}
                  <div className={`h-[1px] my-1.5 ${isDark ? 'bg-slate-800/80' : 'bg-slate-200'}`} />

                  {/* Bottom Row: Balata Sync Status / Warranty Badge + Evidence Count */}
                  <div className="flex items-center justify-between text-[9.5px]">
                    {mem.hasTahtElBalataSync ? (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 font-black">
                        <span>⚡ مقيّد في «تحت البلاطة»</span>
                      </span>
                    ) : mem.isWarrantyActive ? (
                      <span className="flex items-center gap-1 text-emerald-400 font-bold">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>ضمانك ساري وفـ ضهرك</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-blue-400 font-bold">
                        <Shield className="w-3 h-3" />
                        <span>محفوظ بالخزينة المشفرة</span>
                      </span>
                    )}

                    <span className="opacity-60 flex items-center gap-1 font-mono">
                      <Paperclip className="w-2.5 h-2.5" />
                      <span>{mem.evidences.length} أدلة موثقة</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────── */}
      {/* 3. OCR SCANNING LASER OVERLAY                              */}
      {/* ────────────────────────────────────────────────────────── */}
      {isScanning && (
        <div className="absolute inset-0 z-50 bg-black/90 backdrop-blur-md p-6 flex flex-col items-center justify-center text-center animate-fadeIn">
          <div className="relative w-52 h-44 rounded-3xl border-2 border-dashed border-blue-400 p-3 flex flex-col items-center justify-center overflow-hidden bg-blue-950/20">
            {/* Laser Scanning Beam */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_20px_#38bdf8] animate-bounce" />
            <Camera className="w-9 h-9 text-blue-400 animate-pulse mb-2" />
            <span className="text-xs font-black text-white">جاري مسح الفاتورة واستخراج الضمان...</span>
            <span className="text-[9.5px] text-blue-300 mt-1 font-mono">Blotx Vision Neural OCR</span>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* 4. MEMORY INSPECTION BOTTOM SHEET / MODAL                  */}
      {/* ────────────────────────────────────────────────────────── */}
      {selectedMemory && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col justify-end animate-fadeIn">
          <div
            className={`w-full max-h-[85%] rounded-t-[28px] border-t p-4 flex flex-col space-y-3 overflow-y-auto shadow-2xl ${
              isDark ? 'bg-[#0F172A] border-[#1E293B] text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            {/* Handle Bar + Close */}
            <div className="flex items-center justify-between pb-1 border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black">تفاصيل الإيداع في الخزينة</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono">
                  {selectedMemory.id}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  playAppleClick();
                  setSelectedMemory(null);
                }}
                className="p-1 rounded-full hover:bg-white/10 cursor-pointer"
              >
                <X className="w-4 h-4 opacity-75" />
              </button>
            </div>

            {/* Title + Price */}
            <div>
              <h3 className="text-sm font-black">{selectedMemory.title}</h3>
              <p className="text-[10.5px] opacity-70 mt-0.5">
                {selectedMemory.merchantOrParty} • {selectedMemory.dateFormatted}
              </p>
              {selectedMemory.priceAmount && (
                <div className="text-base font-black text-emerald-400 font-cairo mt-1">
                  {selectedMemory.priceAmount.toLocaleString('ar-EG')} {selectedMemory.currency}
                </div>
              )}
            </div>

            {/* AI Summary Box */}
            <div
              className={`p-2.5 rounded-xl border text-[10.5px] leading-relaxed ${
                isDark ? 'bg-[#070B14] border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <div className="font-bold text-blue-400 mb-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>تحليل الذكاء الاصطناعي والاستخراج المعتمد:</span>
              </div>
              <p>{selectedMemory.summary}</p>
            </div>

            {/* Extracted Specifications */}
            <div className="space-y-1 text-[10px]">
              {selectedMemory.modelNumber && (
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="opacity-65">رقم الموديل (Model):</span>
                  <span className="font-mono font-bold text-blue-300">{selectedMemory.modelNumber}</span>
                </div>
              )}
              {selectedMemory.serialNumber && (
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="opacity-65">السيريال المسجل (Serial No):</span>
                  <span className="font-mono font-bold text-emerald-300">{selectedMemory.serialNumber}</span>
                </div>
              )}
              {selectedMemory.warrantyText && (
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="opacity-65">سريان الضمان:</span>
                  <span className="font-bold text-amber-400">{selectedMemory.warrantyText}</span>
                </div>
              )}
              {selectedMemory.activeIngredient && (
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="opacity-65">المادة الفعالة:</span>
                  <span className="font-bold text-amber-300">{selectedMemory.activeIngredient}</span>
                </div>
              )}
            </div>

            {/* Attached Evidence List */}
            <div>
              <span className="text-[10.5px] font-bold block mb-1">الأدلة والمستندات المشفرة:</span>
              <div className="space-y-1">
                {selectedMemory.evidences.map((ev) => (
                  <div
                    key={ev.id}
                    className={`p-2 rounded-xl flex items-center justify-between text-[9.5px] ${
                      isDark ? 'bg-[#070B14]' : 'bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      <Paperclip className="w-3 h-3 text-blue-400 shrink-0" />
                      <span className="truncate">{ev.title}</span>
                    </div>
                    <span className="opacity-60 shrink-0 font-mono text-[8.5px]">{ev.fileSize}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AirDrop Action Button */}
            <div className="pt-1">
              {!selectedMemory.hasTahtElBalataSync && selectedMemory.priceAmount ? (
                <button
                  type="button"
                  onClick={() => handleSyncToBalata(selectedMemory)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 text-white text-xs font-black shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Radio className="w-3.5 h-3.5 animate-spin" />
                  <span>مزامنة هذا الالتزام مع «تحت البلاطة» (AirDrop)</span>
                </button>
              ) : (
                <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-300 text-[10.5px] font-bold text-center flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>تم التوثيق والمزامنة مسبقاً مع نواة تحت البلاطة</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* 5. NOTIFICATIONS SHEET                                      */}
      {/* ────────────────────────────────────────────────────────── */}
      {showNotifications && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col justify-end animate-fadeIn">
          <div
            className={`w-full max-h-[70%] rounded-t-[28px] border-t p-4 flex flex-col space-y-3 ${
              isDark ? 'bg-[#0F172A] border-[#1E293B] text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-1 border-b border-white/10">
              <span className="text-xs font-black">إشعارات وتنبيهات الخزينة</span>
              <button
                type="button"
                onClick={() => {
                  playAppleClick();
                  setShowNotifications(false);
                }}
                className="p-1 rounded-full hover:bg-white/10 cursor-pointer"
              >
                <X className="w-4 h-4 opacity-75" />
              </button>
            </div>

            <div className="space-y-2 text-[10.5px]">
              <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-right">
                <div className="font-bold text-blue-400">تذكير بصيانة ماك بوك برو المعتمدة</div>
                <div className="opacity-70 text-[9.5px]">متبقي 60 يوماً على موعد الفحص السنوي المجاني في تريد لاين.</div>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-right">
                <div className="font-bold text-emerald-400">مزامنة تامة مع تحت البلاطة</div>
                <div className="opacity-70 text-[9.5px]">تم قيد التزامات فواتيرك تلقائياً في مصاريف الشهر.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* 6. PROFILE & SETTINGS SHEET                                */}
      {/* ────────────────────────────────────────────────────────── */}
      {showProfileModal && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col justify-end animate-fadeIn">
          <div
            className={`w-full max-h-[70%] rounded-t-[28px] border-t p-4 flex flex-col space-y-3 ${
              isDark ? 'bg-[#0F172A] border-[#1E293B] text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-1 border-b border-white/10">
              <span className="text-xs font-black">إعدادات الخزينة وأمان البيانات</span>
              <button
                type="button"
                onClick={() => {
                  playAppleClick();
                  setShowProfileModal(false);
                }}
                className="p-1 rounded-full hover:bg-white/10 cursor-pointer"
              >
                <X className="w-4 h-4 opacity-75" />
              </button>
            </div>

            <div className="space-y-2 text-[10.5px]">
              <div className="p-2 rounded-xl border border-white/10 flex items-center justify-between">
                <span>تشفير الخزينة (AES-256)</span>
                <span className="text-emerald-400 font-bold">مُفعل</span>
              </div>
              <div className="p-2 rounded-xl border border-white/10 flex items-center justify-between">
                <span>النسخ الاحتياطي على Google Drive</span>
                <span className="text-blue-400 font-bold">متصل</span>
              </div>
              <div className="p-2 rounded-xl border border-white/10 flex items-center justify-between">
                <span>ربط AirDrop اللاسلكي المحلي</span>
                <span className="text-emerald-400 font-bold">جاهز</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
