import { useState, type FC } from 'react';
import { ShieldCheck, Brain, Lock, TrendingUp, CheckCircle, BellRing, Calendar, Sparkles } from 'lucide-react';

export const AppleAppsShowcase: FC = () => {
  const [activeSavingsTab, setActiveSavingsTab] = useState<'vault' | 'expenses'>('vault');
  const [activeMemoryTab, setActiveMemoryTab] = useState<'tasks' | 'capture'>('tasks');

  return (
    <section id="showcase" className="py-24 bg-white border-t border-black/[0.04]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Showcase Item 1: تحت البلاطة */}
        <div id="taht-elbalata" className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 text-right space-y-6">
            <div className="flex items-center gap-4 mb-2">
              <img
                src="/assets/logos/taht-elbalata-logo.png"
                alt="لوجو تحت البلاطة"
                className="w-16 h-16 object-contain drop-shadow-md hover:scale-105 transition-transform"
              />
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>المنتج الأول • الأمان المالي والادخار</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-bold text-[#1d1d1f] tracking-tight leading-tight">
                  تحت البلاطة.
                </h2>
              </div>
            </div>

            <p className="text-base sm:text-lg text-[#6e6e73] leading-relaxed">
              ليه سميناه "تحت البلاطة"؟ لأن أجدادنا كان عندهم حكمة فطرية في تأمين القرش الأبيض لليوم الأسود. أخذنا المفهوم الأصيل ده وحولناه لتجربة رقمية نقية وفائقة السهولة؛ تدير مصاريفك، تبني خزن ادخارية لأحلامك، وتضمن إن فلوسك في أمان تام بدون قلق.
            </p>

            {/* Key Benefits */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-[#1d1d1f] font-medium">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-3.5 h-3.5" />
                </div>
                <span>خزنات ذكية مخصصة: طوارئ، استثمار، ومصروفات محددة</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-[#1d1d1f] font-medium">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-3.5 h-3.5" />
                </div>
                <span>كشف التسريبات المالية غير المرئية بلمسة واحدة</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-[#1d1d1f] font-medium">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Lock className="w-3.5 h-3.5" />
                </div>
                <span>أعلى معايير الخصوصية: بياناتك ملكك وحدك ومشفرة بالكامل</span>
              </div>
            </div>
          </div>

          {/* Interactive UI Mockup Card */}
          <div className="w-full lg:w-1/2 apple-card p-6 sm:p-8 bg-gradient-to-br from-emerald-50/40 via-white to-neutral-50/80">
            {/* Interactive Toggle */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/[0.06]">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveSavingsTab('vault')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeSavingsTab === 'vault'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-black/[0.04] text-[#6e6e73] hover:text-black'
                  }`}
                >
                  الخزنة الرقمية
                </button>
                <button
                  onClick={() => setActiveSavingsTab('expenses')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeSavingsTab === 'expenses'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-black/[0.04] text-[#6e6e73] hover:text-black'
                  }`}
                >
                  تتبع المصروفات
                </button>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src="/assets/logos/taht-elbalata-logo.png"
                  alt="لوجو تحت البلاطة"
                  className="w-6 h-6 object-contain"
                />
                <span className="text-xs font-semibold text-emerald-600">تحت البلاطة App</span>
              </div>
            </div>

            {/* Screen Content */}
            {activeSavingsTab === 'vault' ? (
              <div className="space-y-4 text-right">
                <div className="bg-neutral-900 text-white p-6 rounded-2xl shadow-md">
                  <span className="text-xs text-neutral-400">إجمالي مدخرات الأمان</span>
                  <div className="text-3xl sm:text-4xl font-bold mt-1 tracking-tight">
                    148,500 <span className="text-lg font-normal text-emerald-400">ج.م</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-neutral-800 flex justify-between text-xs text-neutral-300">
                    <span>نسبة الأمان المالي: ممتازة ✓</span>
                    <span className="text-emerald-400 font-bold">+18% هذا الشهر</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 bg-white rounded-xl border border-black/[0.06] shadow-xs">
                    <span className="text-xs text-[#6e6e73]">خزنة الطوارئ</span>
                    <div className="text-lg font-bold text-[#1d1d1f] mt-1">60,000 ج.م</div>
                    <span className="text-[11px] text-emerald-600 font-medium">مكتملة 100%</span>
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-black/[0.06] shadow-xs">
                    <span className="text-xs text-[#6e6e73]">حصالة الهدف القادم</span>
                    <div className="text-lg font-bold text-[#1d1d1f] mt-1">35,000 ج.م</div>
                    <span className="text-[11px] text-amber-600 font-medium">متبقي 15,000 ج.م</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-right">
                <div className="p-4 bg-white rounded-xl border border-black/[0.06] shadow-xs flex items-center justify-between">
                  <span className="text-xs font-bold text-red-600">- 450 ج.م</span>
                  <div>
                    <div className="text-sm font-bold text-[#1d1d1f]">مشتريات سوبرماركت</div>
                    <div className="text-[11px] text-[#6e6e73]">تم تصنيفها ضمن الاحتياجات الأساسية</div>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-black/[0.06] shadow-xs flex items-center justify-between">
                  <span className="text-xs font-bold text-red-600">- 1,200 ج.م</span>
                  <div>
                    <div className="text-sm font-bold text-[#1d1d1f]">فاتورة الكهرباء والإنترنت</div>
                    <div className="text-[11px] text-[#6e6e73]">تم تنبيهك بها مسبقاً عبر تطبيق افتكر</div>
                  </div>
                </div>

                <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-700">+ 15,000 ج.م</span>
                  <div>
                    <div className="text-sm font-bold text-emerald-900">إيداع الدخل الشهري</div>
                    <div className="text-[11px] text-emerald-700">تم حجز 20% تلقائياً في الخزنة</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Showcase Item 2: افتكر */}
        <div id="efteker" className="flex flex-col lg:flex-row-reverse items-center gap-12 pt-8">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 text-right space-y-6">
            <div className="flex items-center gap-4 mb-2">
              <img
                src="/assets/logos/efteker-logo.png"
                alt="لوجو افتكر"
                className="w-16 h-16 object-contain rounded-2xl shadow-sm hover:scale-105 transition-transform"
              />
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-1">
                  <Brain className="w-3.5 h-3.5" />
                  <span>المنتج الثاني • العقل الثاني والذاكرة</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-bold text-[#1d1d1f] tracking-tight leading-tight">
                  افتكر.
                </h2>
              </div>
            </div>

            <p className="text-base sm:text-lg text-[#6e6e73] leading-relaxed">
              الإنسان العصري مخه مجهد بآلاف التفاصيل، المواعيد، والأفكار اللي بتضيع في زحمة اليوم. تطبيق "افتكر" اتعمل ليكون حارسك الشخصي؛ بيلتقط فكرتك في اللحظة اللي تلمع في دماغك، وبيفكرك باللي يهمك بجد بدون أي إزعاج أو إجهاد ذهني.
            </p>

            {/* Key Benefits */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-[#1d1d1f] font-medium">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <BellRing className="w-3.5 h-3.5" />
                </div>
                <span>تنبيهات استباقية ذكية: بتفكرك في الوقت والمكان المناسب</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-[#1d1d1f] font-medium">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Calendar className="w-3.5 h-3.5" />
                </div>
                <span>ربط تلقائي مع مدفوعاتك وأقساطك في «تحت البلاطة»</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-[#1d1d1f] font-medium">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <span>التقاط الأفكار السريعة بدون كتابة طويلة وبسهولة مريحة</span>
              </div>
            </div>
          </div>

          {/* Interactive UI Mockup Card */}
          <div className="w-full lg:w-1/2 apple-card p-6 sm:p-8 bg-gradient-to-br from-blue-50/40 via-white to-neutral-50/80">
            {/* Interactive Toggle */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/[0.06]">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveMemoryTab('tasks')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeMemoryTab === 'tasks'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-black/[0.04] text-[#6e6e73] hover:text-black'
                  }`}
                >
                  أولويات اليوم
                </button>
                <button
                  onClick={() => setActiveMemoryTab('capture')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeMemoryTab === 'capture'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-black/[0.04] text-[#6e6e73] hover:text-black'
                  }`}
                >
                  التقاط الأفكار
                </button>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src="/assets/logos/efteker-logo.png"
                  alt="لوجو افتكر"
                  className="w-6 h-6 object-contain rounded-md"
                />
                <span className="text-xs font-semibold text-blue-600">افتكر App</span>
              </div>
            </div>

            {/* Screen Content */}
            {activeMemoryTab === 'tasks' ? (
              <div className="space-y-3 text-right">
                <div className="p-4 bg-white rounded-xl border border-black/[0.06] shadow-xs">
                  <div className="flex justify-between items-center text-xs text-[#6e6e73] mb-1">
                    <span className="text-emerald-600 font-bold">متصل مع تحت البلاطة</span>
                    <span>اليوم • 04:00 عصراً</span>
                  </div>
                  <h4 className="text-base font-bold text-[#1d1d1f]">سداد قسط السيارة الشهري</h4>
                  <p className="text-xs text-[#6e6e73] mt-1">المبلغ جاهز ومحجوز في خزنة الالتزامات تلقائياً.</p>
                </div>

                <div className="p-4 bg-white rounded-xl border border-black/[0.06] shadow-xs">
                  <div className="flex justify-between items-center text-xs text-[#6e6e73] mb-1">
                    <span className="text-blue-600 font-bold">موعد مهم</span>
                    <span>اليوم • 07:30 مساءً</span>
                  </div>
                  <h4 className="text-base font-bold text-[#1d1d1f]">اجتماع فريق عمل Blotx Tech</h4>
                  <p className="text-xs text-[#6e6e73] mt-1">مناقشة ميزات الإيكوسيستم الجديد لخدمة المستخدمين.</p>
                </div>

                <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-100">
                  <div className="text-xs text-blue-700 font-semibold mb-1">حالة الذاكرة</div>
                  <div className="text-sm font-bold text-blue-900">أنت في حالة صفاء ذهني كاملة؛ لا توجد مهام متراكمة.</div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-right">
                <div className="p-5 bg-white rounded-xl border border-black/[0.06] shadow-xs">
                  <span className="text-xs text-blue-600 font-bold">فكرة مدونة حديثاً:</span>
                  <p className="text-sm font-bold text-[#1d1d1f] mt-1 leading-relaxed">
                    "فكرة عمل ميزة ادخار تشاركي بين أفراد الأسرة في تحت البلاطة، مربوطة بمناسبات العائلة في افتكر."
                  </p>
                  <span className="text-[11px] text-[#86868b] block mt-2">سُجلت صوتياً قبل ساعتين • تم تحويلها لخطة عمل</span>
                </div>

                <div className="p-4 bg-neutral-100 rounded-xl text-center">
                  <button className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs">
                    ＋ سجّل فكرة جديدة بنقرة واحدة
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
