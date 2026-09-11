import { useState, useMemo, type FC } from 'react';
import {
  Wallet,
  TrendingUp,
  Eye,
  EyeOff,
  Bot,
  Sun,
  Moon,
  Bell,
  CheckCircle2,
  Radio,
  Coffee,
  ShoppingCart,
  Zap,
  ArrowDownLeft,
  ArrowDown,
  ArrowUp,
  ShieldCheck,
  LayoutGrid,
  CreditCard,
  PieChart,
  Target,
  Sparkles,
  X,
  AlertTriangle,
  Lightbulb,
  Inbox,
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Copy,
  Plus
} from 'lucide-react';
import {
  playAppleClick,
  playVaultThud,
  playCashRegister,
  playPrivacyToggle,
  playClarityChime
} from '../../utils/soundEffects';

export interface TransactionItem {
  id: string;
  referenceNumber: string;
  title: string;
  category: string;
  amount: number;
  isExpense: boolean;
  wallet: 'instapay' | 'cash' | 'bank' | 'ewallet';
  walletLabel: string;
  time: string;
  note?: string;
  iconType: 'coffee' | 'cart' | 'zap' | 'salary' | 'car' | 'other';
}

interface TahtBalataScreenProps {
  balance: number;
  onBalanceChange: (newBalance: number) => void;
  isAirDropReceived?: boolean;
}

const MONTH_NAMES = [
  'يناير 2026', 'فبراير 2026', 'مارس 2026', 'أبريل 2026', 'مايو 2026', 'يونيو 2026',
  'يوليو 2026', 'أغسطس 2026', 'سبتمبر 2026', 'أكتوبر 2026', 'نوفمبر 2026', 'ديسمبر 2026'
];

export const TahtBalataScreen: FC<TahtBalataScreenProps> = ({
  balance,
  onBalanceChange,
  isAirDropReceived = false,
}) => {
  const [isDark, setIsDark] = useState(true);
  const [isPrivacy, setIsPrivacy] = useState(false);
  const [showCopilot, setShowCopilot] = useState(false);
  const [showLeakAlert, setShowLeakAlert] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'wallets' | 'copilot' | 'reports' | 'goals'>('home');
  const [walletPulse, setWalletPulse] = useState(false);

  // Month Selector State
  const [monthIndex, setMonthIndex] = useState(8); // September (0-indexed = 8)

  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'expense' | 'income'>('all');
  const [filterWallet, setFilterWallet] = useState<'all' | 'instapay' | 'cash' | 'bank'>('all');
  const [showFilterSheet, setShowFilterSheet] = useState(false);

  // Selected Transaction for Receipt Dialog
  const [selectedReceipt, setSelectedReceipt] = useState<TransactionItem | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  // Feature Carousel Modals
  const [activeFeatureModal, setActiveFeatureModal] = useState<'budgets' | 'insights' | 'goals' | 'inbox' | null>(null);

  // Quick Add Transaction Sheet
  const [showAddSheet, setShowAddSheet] = useState(false);
  const [newTxTitle, setNewTxTitle] = useState('');
  const [newTxAmount, setNewTxAmount] = useState('');
  const [newTxType, setNewTxType] = useState<'expense' | 'income'>('expense');
  const [newTxWallet, setNewTxWallet] = useState<'instapay' | 'cash' | 'bank'>('instapay');

  // Transactions State
  const [transactions, setTransactions] = useState<TransactionItem[]>([
    {
      id: 'tx-1',
      referenceNumber: 'REF-BALATA-2026-8841',
      title: 'سوبرماركت مترو ماركت',
      category: 'مشتريات منزلية',
      amount: 450,
      isExpense: true,
      wallet: 'instapay',
      walletLabel: 'إنستاباي',
      time: 'اليوم، 02:15 م',
      note: 'مستلزمات البيت الأسبوعية والعصائر',
      iconType: 'cart',
    },
    {
      id: 'tx-2',
      referenceNumber: 'REF-BALATA-2026-8842',
      title: 'قهوة اسبريسو وكابتشينو',
      category: 'كافيهات ومطاعم',
      amount: 85,
      isExpense: true,
      wallet: 'cash',
      walletLabel: 'كاش',
      time: 'اليوم، 11:30 ص',
      note: 'مقهى العمل الصباحي',
      iconType: 'coffee',
    },
    {
      id: 'tx-3',
      referenceNumber: 'REF-BALATA-2026-8843',
      title: 'تحويل أرباح مشروع رقمي',
      category: 'دخل إضافي',
      amount: 15000,
      isExpense: false,
      wallet: 'bank',
      walletLabel: 'حساب بنكي',
      time: 'أمس، 06:40 م',
      note: 'دفعة عقد الاستشارة البرمجية',
      iconType: 'salary',
    },
    {
      id: 'tx-4',
      referenceNumber: 'REF-BALATA-2026-8844',
      title: 'شحن عداد الكهرباء الذكي',
      category: 'فواتير منزلية',
      amount: 650,
      isExpense: true,
      wallet: 'instapay',
      walletLabel: 'إنستاباي',
      time: '08 سبتمبر 2026',
      note: 'كارت العداد مسبق الدفع',
      iconType: 'zap',
    },
  ]);

  // Monthly stats based on selected month
  const monthlyStats = useMemo(() => {
    const baseIncome = 38500 + (monthIndex - 8) * 1200;
    const baseExpense = 14200 + (monthIndex - 8) * 800;
    return {
      income: Math.max(0, baseIncome),
      expense: Math.max(0, baseExpense)
    };
  }, [monthIndex]);

  // Filtered Transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      // Type Filter
      if (filterType === 'expense' && !tx.isExpense) return false;
      if (filterType === 'income' && tx.isExpense) return false;

      // Wallet Filter
      if (filterWallet !== 'all' && tx.wallet !== filterWallet) return false;

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const matchTitle = tx.title.toLowerCase().includes(q);
        const matchCat = tx.category.toLowerCase().includes(q);
        const matchRef = tx.referenceNumber.toLowerCase().includes(q);
        const matchAmt = tx.amount.toString().includes(q);
        if (!matchTitle && !matchCat && !matchRef && !matchAmt) return false;
      }

      return true;
    });
  }, [transactions, filterType, filterWallet, searchQuery]);

  // Handle Quick Spend Simulator
  const handleQuickSpend = (title: string, category: string, amount: number, iconType: TransactionItem['iconType']) => {
    playCashRegister();
    onBalanceChange(balance - amount);

    const newTx: TransactionItem = {
      id: `tx-${Date.now()}`,
      referenceNumber: `REF-BALATA-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      title,
      category,
      amount,
      isExpense: true,
      wallet: 'instapay',
      walletLabel: 'إنستاباي',
      time: 'الآن',
      note: 'حركة سريعة عبر المحاكي التفاعلي',
      iconType,
    };

    setTransactions((prev) => [newTx, ...prev]);

    if (amount >= 500) {
      setShowLeakAlert(true);
      setTimeout(() => setShowLeakAlert(false), 4000);
    }
  };

  // Handle Manual Add Transaction Form Submit
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(newTxAmount);
    if (!newTxTitle.trim() || isNaN(parsedAmount) || parsedAmount <= 0) return;

    playCashRegister();
    const isExp = newTxType === 'expense';
    onBalanceChange(isExp ? balance - parsedAmount : balance + parsedAmount);

    const newTx: TransactionItem = {
      id: `tx-${Date.now()}`,
      referenceNumber: `REF-BALATA-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      title: newTxTitle.trim(),
      category: isExp ? 'مصروف عام' : 'دخل عام',
      amount: parsedAmount,
      isExpense: isExp,
      wallet: newTxWallet,
      walletLabel: newTxWallet === 'instapay' ? 'إنستاباي' : newTxWallet === 'cash' ? 'كاش' : 'حساب بنكي',
      time: 'الآن',
      note: 'تمت الإضافة يدوياً عبر واجهة المحاكي',
      iconType: isExp ? 'cart' : 'salary',
    };

    setTransactions((prev) => [newTx, ...prev]);
    setShowAddSheet(false);
    setNewTxTitle('');
    setNewTxAmount('');
  };

  // Copy Reference Number
  const handleCopyRef = (refNo: string) => {
    playAppleClick();
    navigator.clipboard?.writeText(refNo);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2500);
  };

  // Concentric Wave Ring Click
  const handleWaveClick = () => {
    playVaultThud();
    setWalletPulse(true);
    setTimeout(() => setWalletPulse(false), 800);
  };

  return (
    <div
      dir="rtl"
      className={`relative w-full h-full flex flex-col justify-between select-none font-cairo transition-colors duration-300 overflow-hidden ${
        isDark ? 'bg-[#080E18] text-white' : 'bg-[#F8FAFC] text-[#0F172A]'
      }`}
    >
      {/* ── 1. App Bar Header (_buildAppBar) ── */}
      <div
        className={`px-3 py-2.5 mx-3 mt-2 rounded-2xl flex items-center justify-between border transition-all shadow-sm shrink-0 ${
          isDark
            ? 'bg-[#0F172A]/90 border-[#1E293B] shadow-black/40'
            : 'bg-white/95 border-slate-200 shadow-slate-200/50'
        }`}
      >
        {/* User Greeting (Right in RTL) */}
        <div className="flex flex-col text-right">
          <div className="flex items-center gap-1">
            <span className="text-[11px] font-bold opacity-80">أهلاً بعودتك،</span>
            <span className="text-[11px] font-black text-blue-500">زياد</span>
          </div>
          <span className="text-[9px] opacity-60 font-medium leading-none">نتمنى لك يوماً منتجاً</span>
        </div>

        {/* Center Title */}
        <div className="text-center font-black text-xs tracking-tight">
          تحت البلاطة
        </div>

        {/* Action Capsule: [Eye, AI Robot, Theme Sun/Moon] + Bell */}
        <div className="flex items-center gap-1.5">
          <div
            className={`flex items-center gap-0.5 p-1 rounded-xl border ${
              isDark ? 'bg-[#0B1324] border-[#1E293B]' : 'bg-slate-100 border-slate-200'
            }`}
          >
            {/* Eye / Privacy Toggle */}
            <button
              type="button"
              onClick={() => {
                playPrivacyToggle();
                setIsPrivacy(!isPrivacy);
              }}
              title="تبديل وضع الخصوصية"
              className="p-1 rounded-lg hover:bg-blue-500/20 text-blue-400 transition-colors cursor-pointer"
            >
              {isPrivacy ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>

            {/* AI Copilot Robot */}
            <button
              type="button"
              onClick={() => {
                playClarityChime();
                setShowCopilot(true);
              }}
              title="المستشار المالي الذكي (Copilot AI)"
              className="p-1 rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 transition-colors cursor-pointer"
            >
              <Bot className="w-3.5 h-3.5" />
            </button>

            {/* Theme Sun/Moon Toggle */}
            <button
              type="button"
              onClick={() => {
                playAppleClick();
                setIsDark(!isDark);
              }}
              title="تبديل الوضع الليلي/النهاري"
              className="p-1 rounded-lg hover:bg-amber-500/20 text-amber-400 transition-colors cursor-pointer"
            >
              {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5 text-slate-600" />}
            </button>
          </div>

          {/* Bell Icon */}
          <button
            type="button"
            onClick={() => playAppleClick()}
            className={`relative p-1.5 rounded-xl border cursor-pointer ${
              isDark ? 'bg-[#0B1324] border-[#1E293B]' : 'bg-slate-100 border-slate-200'
            }`}
          >
            <Bell className="w-3.5 h-3.5 opacity-80" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-blue-500 rounded-full" />
          </button>
        </div>
      </div>

      {/* ── Scrollable Body Area ── */}
      <div className="flex-1 overflow-y-auto px-3.5 py-2 space-y-3 scrollbar-none">
        {/* ── 2. Live Broadcast Banner (_buildLiveBroadcastBanner) ── */}
        <div
          className={`p-2.5 rounded-2xl border text-[10.5px] font-bold flex items-center justify-between transition-all ${
            isDark
              ? 'bg-[#101C33]/80 border-blue-500/30 text-blue-200'
              : 'bg-blue-50 border-blue-200 text-blue-900'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-xs">💡</span>
            <span className="truncate">تقرير الأسبوع: وفّرت 2,400 ج.م مقارنة بالأسبوع الماضي!</span>
          </div>
          <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-blue-600 text-white font-mono shrink-0">
            AI REPORT
          </span>
        </div>

        {/* Leak Alert Banner (if triggered) */}
        {showLeakAlert && (
          <div className="p-2.5 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-400 flex items-center justify-between text-[11px] font-bold animate-fadeIn">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400 animate-bounce" />
              <span>رادار التسريب المالي: تخطيت حد الصرف اليومي بنسبة 15%!</span>
            </div>
            <button
              type="button"
              onClick={() => setShowLeakAlert(false)}
              className="p-1 text-amber-300 hover:text-white cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* AirDrop Received Banner */}
        {isAirDropReceived && (
          <div className="p-2.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/50 text-emerald-400 flex items-center gap-2 text-[11px] font-black animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>AirDrop: تم استلام فاتورة صيانة من «افتكر» واقتطاع 3,500 ج.م تلقائياً!</span>
          </div>
        )}

        {/* ── 3. Feature Carousel (FeatureCarousel - 4 Pulsing Circles) ── */}
        <div className="flex items-center justify-between px-1">
          {/* Budgets */}
          <button
            type="button"
            onClick={() => {
              playAppleClick();
              setActiveFeatureModal('budgets');
            }}
            className="flex flex-col items-center gap-1 cursor-pointer transition-transform hover:scale-105 active:scale-95"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#1D4ED8] to-[#3B82F6] text-white flex items-center justify-center shadow-[0_4px_12px_rgba(59,130,246,0.35)]">
              <PieChart className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold opacity-85">الميزانيات</span>
          </button>

          {/* AI Insights */}
          <button
            type="button"
            onClick={() => {
              playClarityChime();
              setActiveFeatureModal('insights');
            }}
            className="flex flex-col items-center gap-1 cursor-pointer transition-transform hover:scale-105 active:scale-95"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#059669] to-[#00FFA3] text-white flex items-center justify-center shadow-[0_4px_12px_rgba(16,185,129,0.35)]">
              <Lightbulb className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold opacity-85">الذكاء المالي</span>
          </button>

          {/* Savings Goals */}
          <button
            type="button"
            onClick={() => {
              playAppleClick();
              setActiveFeatureModal('goals');
            }}
            className="flex flex-col items-center gap-1 cursor-pointer transition-transform hover:scale-105 active:scale-95"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#D97706] to-[#FBBF24] text-white flex items-center justify-center shadow-[0_4px_12px_rgba(245,158,11,0.35)]">
              <Target className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold opacity-85">أهداف التوفير</span>
          </button>

          {/* Smart Inbox */}
          <button
            type="button"
            onClick={() => {
              playAppleClick();
              setActiveFeatureModal('inbox');
            }}
            className="flex flex-col items-center gap-1 cursor-pointer transition-transform hover:scale-105 active:scale-95"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#6D28D9] to-[#8B5CF6] text-white flex items-center justify-center shadow-[0_4px_12px_rgba(139,92,246,0.35)]">
              <Inbox className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold opacity-85">الوارد الذكي</span>
          </button>
        </div>

        {/* ── 4. The Main Luxury Card (_buildMainCard) ── */}
        <div
          className={`relative p-4 rounded-3xl border transition-all shadow-xl overflow-hidden ${
            isDark
              ? 'bg-gradient-to-br from-[#0C1322] via-[#0A101C] to-[#070B14] border-[#172338] shadow-black/60'
              : 'bg-gradient-to-br from-white via-[#F8FAFC] to-[#EFF6FF] border-slate-200 shadow-slate-200/80'
          }`}
        >
          {/* Card Top Row: [الخزينة الموحدة] ... [إجمالي الرصيد] */}
          <div className="flex items-center justify-between">
            {/* Top Left in RTL (Vault Capsule) */}
            <div
              className={`px-3 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1.5 border ${
                isDark
                  ? 'bg-[#101C33] text-blue-300 border-[#1E335A]'
                  : 'bg-blue-50 text-blue-700 border-blue-200'
              }`}
            >
              <Wallet className="w-3.5 h-3.5 text-blue-500" />
              <span>الخزينة الموحدة</span>
            </div>

            {/* Top Right in RTL */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black opacity-80">إجمالي الرصيد</span>
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center border ${
                  isDark ? 'bg-[#162238] border-[#233658] text-blue-400' : 'bg-blue-50 border-blue-200 text-blue-600'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Card Middle Row: Concentric Wave Radar + Large Balance */}
          <div className="mt-3.5 flex items-center justify-between gap-3">
            {/* Concentric Waves Radar (Clickable!) */}
            <div
              onClick={handleWaveClick}
              title="اضغط لتشغيل رادار الخزينة"
              className={`relative w-20 h-20 rounded-2xl flex items-center justify-center cursor-pointer border transition-transform hover:scale-105 active:scale-95 ${
                isDark ? 'bg-[#0A1120] border-[#152238]' : 'bg-slate-50 border-slate-200'
              }`}
            >
              {/* Outer Ring */}
              <div
                className={`absolute w-16 h-16 rounded-full border border-blue-600/30 ${
                  walletPulse ? 'animate-ping' : ''
                }`}
              />
              {/* Middle Ring */}
              <div className="absolute w-12 h-12 rounded-full border border-blue-500/40" />
              {/* Inner Ring */}
              <div className="absolute w-9 h-9 rounded-full border border-blue-400/60" />
              {/* Center Glowing Wallet */}
              <div className="relative w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 text-white flex items-center justify-center shadow-[0_0_12px_rgba(59,130,246,0.6)]">
                <Wallet className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Large Balance Display */}
            <div className="text-left flex flex-col items-end">
              {isPrivacy ? (
                <div className="text-2xl font-black tracking-widest text-blue-400 my-1 font-mono">
                  ••••••
                </div>
              ) : (
                <div className="flex items-baseline gap-1">
                  <span className="text-xs font-black opacity-70">ج.م</span>
                  <span className="text-2xl sm:text-3xl font-black tracking-tight font-cairo">
                    {balance.toLocaleString('ar-EG')}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-[10px] opacity-70 font-semibold">آمن للصرف ومحمي</span>
                <div className="w-3.5 h-3.5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  <ShieldCheck className="w-2.5 h-2.5" />
                </div>
              </div>
            </div>
          </div>

          {/* Card Bottom Row: Contactless + Live Update Capsule */}
          <div className="mt-3.5 flex items-center gap-2">
            {/* Contactless Waves */}
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center border shrink-0 ${
                isDark ? 'bg-[#0E1729] border-[#192742] text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
              }`}
            >
              <Radio className="w-4 h-4" />
            </div>

            {/* Bottom Capsule */}
            <div
              className={`flex-1 px-3 py-1.5 rounded-xl border flex items-center justify-between text-[10px] ${
                isDark ? 'bg-[#080E1A] border-[#162236]' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold">جميع العمليات محدثة</span>
              </div>
              <span className="opacity-60 text-[9px]">اليوم، 03:45 م</span>
            </div>
          </div>
        </div>

        {/* ── 5. Month Selector (_buildMonthSelector) ── */}
        <div className="flex items-center justify-between text-xs px-1 font-bold">
          <span className="text-sm font-black opacity-90">ملخص الشهر</span>
          <div
            className={`px-2 py-1 rounded-xl border flex items-center gap-2 shadow-xs ${
              isDark ? 'bg-[#0F172A] border-[#1E293B]' : 'bg-white border-slate-200'
            }`}
          >
            {/* Previous Month */}
            <button
              type="button"
              onClick={() => {
                playAppleClick();
                setMonthIndex((prev) => (prev > 0 ? prev - 1 : 11));
              }}
              className="p-1 rounded-lg hover:bg-black/10 cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <span className="text-[11px] font-bold text-blue-400 font-mono">
              {MONTH_NAMES[monthIndex]}
            </span>

            {/* Next Month */}
            <button
              type="button"
              onClick={() => {
                playAppleClick();
                setMonthIndex((prev) => (prev < 11 ? prev + 1 : 0));
              }}
              className="p-1 rounded-lg hover:bg-black/10 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ── 6. Monthly Summary Row (_buildSummaryRow) ── */}
        <div className="grid grid-cols-2 gap-2">
          {/* Income Card */}
          <div
            className={`p-3 rounded-2xl border transition-all ${
              isDark ? 'bg-[#0F172A]/80 border-[#1E293B]' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="w-7 h-7 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-1.5">
              <ArrowDown className="w-4 h-4" />
            </div>
            <div className="text-[10px] font-bold opacity-70">إيرادات الشهر</div>
            <div className="text-sm font-black text-emerald-400 font-cairo">
              {isPrivacy ? '***' : `+ ${monthlyStats.income.toLocaleString('ar-EG')} ج.م`}
            </div>
          </div>

          {/* Expense Card */}
          <div
            className={`p-3 rounded-2xl border transition-all ${
              isDark ? 'bg-[#0F172A]/80 border-[#1E293B]' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="w-7 h-7 rounded-full bg-rose-500/15 text-rose-400 flex items-center justify-center mb-1.5">
              <ArrowUp className="w-4 h-4" />
            </div>
            <div className="text-[10px] font-bold opacity-70">مصروفات الشهر</div>
            <div className="text-sm font-black text-rose-400 font-cairo">
              {isPrivacy ? '***' : `- ${monthlyStats.expense.toLocaleString('ar-EG')} ج.م`}
            </div>
          </div>
        </div>

        {/* ── 7. Search & Filter Row (_buildSearchAndFilterRow) ── */}
        <div className="flex items-center gap-2">
          <div
            className={`flex-1 px-2.5 py-1.5 rounded-xl border flex items-center gap-2 shadow-xs ${
              isDark ? 'bg-[#0F172A] border-[#1E293B]' : 'bg-white border-slate-200'
            }`}
          >
            <Search className="w-3.5 h-3.5 opacity-50 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث برقم العملية، أو التصنيف..."
              className="w-full bg-transparent text-[11px] placeholder:opacity-50 focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="opacity-60 hover:opacity-100"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setShowFilterSheet(!showFilterSheet)}
            className={`p-2 rounded-xl border cursor-pointer transition-colors ${
              filterType !== 'all' || filterWallet !== 'all'
                ? 'bg-blue-600 text-white border-blue-600'
                : isDark
                ? 'bg-[#0F172A] border-[#1E293B] text-slate-300'
                : 'bg-white border-slate-200 text-slate-700'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Filter Chips Bar (if active) */}
        {showFilterSheet && (
          <div className="p-2.5 rounded-2xl bg-black/20 border border-black/10 space-y-2 text-[10px] animate-fadeIn">
            <div className="flex items-center justify-between font-bold">
              <span>تصفية النوع:</span>
              <div className="flex gap-1">
                {(['all', 'expense', 'income'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setFilterType(t)}
                    className={`px-2 py-0.5 rounded-lg font-bold cursor-pointer ${
                      filterType === t ? 'bg-blue-600 text-white' : 'bg-white/10 opacity-70'
                    }`}
                  >
                    {t === 'all' ? 'الكل' : t === 'expense' ? 'مصروف' : 'إيراد'}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between font-bold">
              <span>تصفية المحفظة:</span>
              <div className="flex gap-1">
                {(['all', 'instapay', 'cash', 'bank'] as const).map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setFilterWallet(w)}
                    className={`px-2 py-0.5 rounded-lg font-bold cursor-pointer ${
                      filterWallet === w ? 'bg-blue-600 text-white' : 'bg-white/10 opacity-70'
                    }`}
                  >
                    {w === 'all' ? 'الكل' : w === 'instapay' ? 'إنستاباي' : w === 'cash' ? 'كاش' : 'بنك'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── 8. Quick Actions Bar ── */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-black opacity-90 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-blue-400" />
              <span>أكشنز حية سريعة:</span>
            </span>
            <button
              type="button"
              onClick={() => setShowAddSheet(true)}
              className="text-[10px] text-blue-400 font-bold flex items-center gap-0.5 cursor-pointer hover:underline"
            >
              <Plus className="w-3 h-3" />
              <span>إضافة معاملة مخصصة</span>
            </button>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={() => handleQuickSpend('قهوة مختصة فلات وايت', 'كافيهات', 85, 'coffee')}
              className={`p-2 rounded-xl border text-right transition-all flex items-center gap-2 cursor-pointer active:scale-95 ${
                isDark
                  ? 'bg-[#0F172A]/80 border-[#1E293B] hover:border-blue-500/50'
                  : 'bg-white border-slate-200 hover:border-blue-400'
              }`}
            >
              <div className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                <Coffee className="w-3.5 h-3.5" />
              </div>
              <div className="overflow-hidden">
                <div className="text-[10px] font-black truncate">قهوة مختصة</div>
                <div className="text-[9px] text-rose-400 font-bold">- 85 ج.م</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickSpend('مشتريات بقالة وسوبرماركت', 'سوبرماركت', 420, 'cart')}
              className={`p-2 rounded-xl border text-right transition-all flex items-center gap-2 cursor-pointer active:scale-95 ${
                isDark
                  ? 'bg-[#0F172A]/80 border-[#1E293B] hover:border-blue-500/50'
                  : 'bg-white border-slate-200 hover:border-blue-400'
              }`}
            >
              <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                <ShoppingCart className="w-3.5 h-3.5" />
              </div>
              <div className="overflow-hidden">
                <div className="text-[10px] font-black truncate">سوبرماركت</div>
                <div className="text-[9px] text-rose-400 font-bold">- 420 ج.م</div>
              </div>
            </button>
          </div>
        </div>

        {/* ── 9. Recent Transactions List (_buildTransactionsList) ── */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-bold px-1">
            <span className="font-black">العمليات الأخيرة ({filteredTransactions.length})</span>
            <span className="text-[10px] text-blue-400 font-bold">انقر على المعاملة لعرض الإيصال</span>
          </div>

          <div className="space-y-1.5">
            {filteredTransactions.map((tx) => (
              <div
                key={tx.id}
                onClick={() => {
                  playAppleClick();
                  setSelectedReceipt(tx);
                }}
                className={`p-2.5 rounded-2xl border flex items-center justify-between transition-all cursor-pointer ${
                  isDark
                    ? 'bg-[#0F172A]/60 border-[#1E293B]/80 hover:bg-[#0F172A] hover:border-blue-500/40'
                    : 'bg-white border-slate-200/80 hover:bg-slate-50 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      tx.isExpense
                        ? 'bg-rose-500/10 text-rose-400'
                        : 'bg-emerald-500/10 text-emerald-400'
                    }`}
                  >
                    {tx.iconType === 'coffee' && <Coffee className="w-4 h-4" />}
                    {tx.iconType === 'cart' && <ShoppingCart className="w-4 h-4" />}
                    {tx.iconType === 'zap' && <Zap className="w-4 h-4" />}
                    {tx.iconType === 'salary' && <ArrowDownLeft className="w-4 h-4" />}
                    {tx.iconType === 'car' && <ShieldCheck className="w-4 h-4" />}
                  </div>

                  <div className="text-right">
                    <div className="text-[11px] font-bold truncate max-w-[140px]">
                      {tx.title}
                    </div>
                    <div className="text-[9px] opacity-60 flex items-center gap-1.5">
                      <span>{tx.time}</span>
                      <span>•</span>
                      <span className="text-blue-400 font-bold">{tx.walletLabel}</span>
                    </div>
                  </div>
                </div>

                <div className="text-left font-cairo">
                  <div
                    className={`text-xs font-black ${
                      tx.isExpense ? 'text-rose-400' : 'text-emerald-400'
                    }`}
                  >
                    {tx.isExpense ? '-' : '+'} {tx.amount.toLocaleString('ar-EG')} ج.م
                  </div>
                  <div className="text-[8.5px] opacity-60">{tx.category}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 10. Bottom Floating Navigation Bar (_buildPremiumBottomNav) ── */}
      <div
        className={`px-4 py-2 mx-3 mb-2 rounded-2xl border flex items-center justify-around shadow-lg shrink-0 ${
          isDark
            ? 'bg-[#0F172A]/95 border-[#1E293B] shadow-black/50'
            : 'bg-white/95 border-slate-200 shadow-slate-200/60'
        }`}
      >
        <button
          type="button"
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-0.5 cursor-pointer transition-colors ${
            activeTab === 'home' ? 'text-blue-500' : 'opacity-60 hover:opacity-100'
          }`}
        >
          <LayoutGrid className="w-4 h-4" />
          <span className="text-[9px] font-bold">الرئيسية</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('wallets')}
          className={`flex flex-col items-center gap-0.5 cursor-pointer transition-colors ${
            activeTab === 'wallets' ? 'text-blue-500' : 'opacity-60 hover:opacity-100'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span className="text-[9px] font-bold">المحافظ</span>
        </button>

        {/* Elevated AI Copilot Button */}
        <button
          type="button"
          onClick={() => {
            playClarityChime();
            setShowCopilot(true);
          }}
          className="-mt-5 w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center shadow-[0_4px_14px_rgba(59,130,246,0.6)] cursor-pointer hover:scale-105 active:scale-95 transition-transform"
        >
          <Bot className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('reports')}
          className={`flex flex-col items-center gap-0.5 cursor-pointer transition-colors ${
            activeTab === 'reports' ? 'text-blue-500' : 'opacity-60 hover:opacity-100'
          }`}
        >
          <PieChart className="w-4 h-4" />
          <span className="text-[9px] font-bold">التقارير</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('goals')}
          className={`flex flex-col items-center gap-0.5 cursor-pointer transition-colors ${
            activeTab === 'goals' ? 'text-blue-500' : 'opacity-60 hover:opacity-100'
          }`}
        >
          <Target className="w-4 h-4" />
          <span className="text-[9px] font-bold">الأهداف</span>
        </button>
      </div>

      {/* ── Transaction Receipt Dialog (TransactionReceiptDialog - 1:1 with Flutter) ── */}
      {selectedReceipt && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm p-4 flex flex-col justify-end animate-fadeIn">
          <div
            className={`p-4 rounded-3xl border shadow-2xl space-y-3.5 ${
              isDark ? 'bg-[#0F172A] border-[#1E293B] text-white' : 'bg-white border-slate-200 text-[#0F172A]'
            }`}
          >
            {/* Receipt Header */}
            <div className="flex items-center justify-between border-b pb-2.5 border-black/10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                  🧾
                </div>
                <div>
                  <div className="text-xs font-black">إيصال معاملة مالية</div>
                  <div className="text-[9px] opacity-60">تطبيق «تحت البلاطة»</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedReceipt(null)}
                className="p-1.5 rounded-full hover:bg-black/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Reference Number */}
            <div className="p-2 rounded-xl bg-black/20 border border-black/10 flex items-center justify-between text-[10px] font-mono">
              <span className="text-blue-400 font-bold">{selectedReceipt.referenceNumber}</span>
              <button
                type="button"
                onClick={() => handleCopyRef(selectedReceipt.referenceNumber)}
                className="flex items-center gap-1 text-slate-400 hover:text-white cursor-pointer"
              >
                <Copy className="w-3 h-3" />
                <span>{copiedRef ? 'تم النسخ ✓' : 'نسخ'}</span>
              </button>
            </div>

            {/* Details Table */}
            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between border-b pb-1 border-white/5">
                <span className="opacity-70">المبلغ:</span>
                <span className={`font-black ${selectedReceipt.isExpense ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {selectedReceipt.amount.toLocaleString('ar-EG')} ج.م
                </span>
              </div>
              <div className="flex justify-between border-b pb-1 border-white/5">
                <span className="opacity-70">البيان:</span>
                <span className="font-bold">{selectedReceipt.title}</span>
              </div>
              <div className="flex justify-between border-b pb-1 border-white/5">
                <span className="opacity-70">التصنيف:</span>
                <span className="font-bold">{selectedReceipt.category}</span>
              </div>
              <div className="flex justify-between border-b pb-1 border-white/5">
                <span className="opacity-70">وسيلة الدفع:</span>
                <span className="font-bold text-blue-400">{selectedReceipt.walletLabel}</span>
              </div>
              <div className="flex justify-between border-b pb-1 border-white/5">
                <span className="opacity-70">التاريخ والوقت:</span>
                <span className="opacity-90">{selectedReceipt.time}</span>
              </div>
              {selectedReceipt.note && (
                <div className="flex justify-between border-b pb-1 border-white/5">
                  <span className="opacity-70">ملاحظات:</span>
                  <span className="opacity-90">{selectedReceipt.note}</span>
                </div>
              )}
            </div>

            {/* Verified Status */}
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-center text-[10px] font-bold">
              الحالة: عملية مكتملة وموثقة بنجاح بالخزينة ✅
            </div>

            <button
              type="button"
              onClick={() => setSelectedReceipt(null)}
              className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all cursor-pointer"
            >
              إغلاق الإيصال
            </button>
          </div>
        </div>
      )}

      {/* ── Add Custom Transaction Sheet ── */}
      {showAddSheet && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm p-4 flex flex-col justify-end animate-fadeIn">
          <form
            onSubmit={handleAddSubmit}
            className={`p-4 rounded-3xl border shadow-2xl space-y-3 ${
              isDark ? 'bg-[#0F172A] border-[#1E293B] text-white' : 'bg-white border-slate-200 text-[#0F172A]'
            }`}
          >
            <div className="flex items-center justify-between border-b pb-2 border-black/10">
              <div className="text-xs font-black">إضافة معاملة جديدة للخزينة</div>
              <button
                type="button"
                onClick={() => setShowAddSheet(false)}
                className="p-1 rounded-full hover:bg-black/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <label className="block text-[10px] opacity-70 mb-1">اسم المعاملة / البيان:</label>
                <input
                  type="text"
                  required
                  value={newTxTitle}
                  onChange={(e) => setNewTxTitle(e.target.value)}
                  placeholder="مثال: فاتورة صيانة، غداء عمل..."
                  className="w-full px-3 py-2 rounded-xl bg-black/10 border border-black/20 text-xs text-right focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[10px] opacity-70 mb-1">المبلغ (ج.م):</label>
                <input
                  type="number"
                  required
                  value={newTxAmount}
                  onChange={(e) => setNewTxAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-3 py-2 rounded-xl bg-black/10 border border-black/20 text-xs text-right focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] opacity-70 mb-1">النوع:</label>
                  <select
                    value={newTxType}
                    onChange={(e) => setNewTxType(e.target.value as any)}
                    className="w-full px-2 py-1.5 rounded-xl bg-black/10 border border-black/20 text-xs focus:outline-none"
                  >
                    <option value="expense">مصروف (-)</option>
                    <option value="income">إيراد (+)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] opacity-70 mb-1">المحفظة:</label>
                  <select
                    value={newTxWallet}
                    onChange={(e) => setNewTxWallet(e.target.value as any)}
                    className="w-full px-2 py-1.5 rounded-xl bg-black/10 border border-black/20 text-xs focus:outline-none"
                  >
                    <option value="instapay">إنستاباي</option>
                    <option value="cash">كاش</option>
                    <option value="bank">حساب بنكي</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all cursor-pointer shadow-md"
            >
              ✓ حفظ المعاملة فورياً
            </button>
          </form>
        </div>
      )}

      {/* ── Feature Carousel Modals ── */}
      {activeFeatureModal && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm p-4 flex flex-col justify-end animate-fadeIn">
          <div
            className={`p-4 rounded-3xl border shadow-2xl space-y-3 ${
              isDark ? 'bg-[#0F172A] border-[#1E293B] text-white' : 'bg-white border-slate-200 text-[#0F172A]'
            }`}
          >
            <div className="flex items-center justify-between border-b pb-2.5 border-black/10">
              <div className="text-xs font-black">
                {activeFeatureModal === 'budgets' && '📊 إدارة الميزانيات الذكية'}
                {activeFeatureModal === 'insights' && '💡 الذكاء المالي وتوزيع الثروة'}
                {activeFeatureModal === 'goals' && '🎯 أهداف التوفير والادخار'}
                {activeFeatureModal === 'inbox' && '📥 الوارد الذكي واستخراج الـ SMS'}
              </div>
              <button
                type="button"
                onClick={() => setActiveFeatureModal(null)}
                className="p-1.5 rounded-full hover:bg-black/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-[11px] leading-relaxed opacity-90 space-y-2">
              {activeFeatureModal === 'budgets' && (
                <div>
                  <p>تم استهلاك <strong>42%</strong> من ميزانية الشهر الحالية. لديك وفرة تقدر بـ <strong>12,800 ج.م</strong> آمنة للصرف حتى نهاية الشهر.</p>
                </div>
              )}
              {activeFeatureModal === 'insights' && (
                <div>
                  <p>توصية الخوارزمية: تحويل 5,000 ج.م لشراء سبيكة ذهب عيار 24 لحماية المدخرات من التضخم، مع الحفاظ على سيولة إنستاباي للمصاريف الطارئة.</p>
                </div>
              )}
              {activeFeatureModal === 'goals' && (
                <div>
                  <p>هدف (سفرة الصيف): مكتمل بنسبة <strong>78%</strong> (تم جمع 39,000 من أصل 50,000 ج.م). متبقي شهرين لتحقيق الهدف بالكامل.</p>
                </div>
              )}
              {activeFeatureModal === 'inbox' && (
                <div>
                  <p>تم فحص آخر 3 رسائل بنكية واردة عبر إنستاباي والبنك الأهلي المصري وتصنيفها كإيرادات ومصاريف تلقائياً بدون أي تدخل يدوي.</p>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setActiveFeatureModal(null)}
              className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all cursor-pointer"
            >
              تم الفهم
            </button>
          </div>
        </div>
      )}

      {/* ── AI Copilot Mini-Modal ── */}
      {showCopilot && (
        <div className="absolute inset-0 z-50 bg-black/70 backdrop-blur-sm p-4 flex flex-col justify-end animate-fadeIn">
          <div
            className={`p-4 rounded-3xl border shadow-2xl space-y-3 ${
              isDark ? 'bg-[#0F172A] border-[#1E293B] text-white' : 'bg-white border-slate-200 text-[#0F172A]'
            }`}
          >
            <div className="flex items-center justify-between border-b pb-2.5 border-black/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-black">المستشار الذكي (Copilot AI)</div>
                  <div className="text-[9px] opacity-60">تحليل فوري لقوة محفظتك</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowCopilot(false)}
                className="p-1.5 rounded-full hover:bg-black/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-[11px] leading-relaxed space-y-2 opacity-90">
              <p>
                💡 <span className="font-bold text-blue-400">رأي المستشار:</span> وضعك المالي ممتاز هذا الشهر! لديك وفرة قدرها <strong>24,300 ج.م</strong> آمنة للصرف.
              </p>
              <p className="text-[10px] opacity-75">
                نوصي بتحويل 15% من الفائض إلى سبيكة ذهب لحفظ القوة الشرائية، مع الحفاظ على صندوق الطوارئ مكتملاً.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowCopilot(false)}
              className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all cursor-pointer"
            >
              فهمت، شكراً لك!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
