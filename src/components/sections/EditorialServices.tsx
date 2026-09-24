import React from 'react';
import { Smartphone, Layout, Database, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../LanguageContext';

export const EditorialServices: React.FC = () => {
  const { language, t } = useLanguage();
  const isAr = language === 'ar';

  const services = [
    {
      id: 'mobile',
      number: '01',
      title: isAr ? 'تطوير تطبيقات الموبايل' : 'Mobile Engineering',
      category: 'FLUTTER & DART',
      icon: Smartphone,
      description: isAr
        ? 'بناء تطبيقات Flutter سريعة، رشيقة، وعابرة للمنصات (iOS & Android) بأداء 60/120fps وسلاسة فائقة، مع دعم التشفير العتادي والعمل الكامل بدون إنترنت (Offline-First).'
        : 'Engineering ultra-fast, cross-platform Flutter applications with 60/120fps native performance, local hardware encryption, and zero cloud dependency.',
      points: isAr
        ? [
            'معمارية Clean Architecture و Bloc/Riverpod المتقدمة',
            'دعم كامل للشاشات المتجاوبة وتصميمات Apple و Material 3',
            'تشفير محلي صارم AES-256 وربط عتادي بدون تتبع',
            'تزامن محلي لاسلكي AirDrop-style P2P بين الأجهزة',
          ]
        : [
            'Clean Architecture with enterprise state management',
            'Pixel-perfect responsive design tailored for iOS & Android',
            'Hardware keystore anchoring & zero-knowledge security',
            'Local P2P offline synchronization protocols',
          ],
    },
    {
      id: 'web',
      number: '02',
      title: isAr ? 'منصات الويب التفاعلية' : 'Modern Web Platforms',
      category: 'REACT 19 & TYPESCRIPT',
      icon: Layout,
      description: isAr
        ? 'تطوير واجهات وتطبيقات ويب سينمائية باستخدام React 19، TypeScript، و Tailwind CSS. ندمج بين سرعة التحميل اللحظية، تجربة المستخدم التحريرية، والجمال البصري.'
        : 'Developing cinematic web platforms and interfaces using React 19, TypeScript, and Tailwind CSS. Fusing instant load speeds with rich editorial aesthetics.',
      points: isAr
        ? [
            'تكامل React 19 مع معمارية المكونات الحديثة والـ Strict Typing',
            'أنيميشن سينمائي فائق الانسيابية بـ Framer Motion و Lenis',
            'دعم كامل للغتين (Arabic RTL & English LTR) وتجاوب مثالي',
            'تحسين محركات البحث SEO والأداء القياسي للويب (Core Web Vitals)',
          ]
        : [
            'React 19 ecosystem with end-to-end strict TypeScript typing',
            'Cinematic micro-interactions powered by Framer Motion & Lenis',
            'Bi-directional localization (Arabic RTL & English LTR)',
            'Flawless Core Web Vitals and search engine discovery',
          ],
    },
    {
      id: 'architecture',
      number: '03',
      title: isAr ? 'هندسة النظم والبنى التحتية' : 'Product Architecture',
      category: 'SYSTEMS & INFRASTRUCTURE',
      icon: Database,
      description: isAr
        ? 'تصميم وهندسة قواعد البيانات، البنى التحتية السحابية الهجينة، ومعماريات الأمان التام عبر Firebase، Node.js، و SQLite المشفرة محلياً لضمان عدم تسريب البيانات.'
        : 'Designing robust database topologies, hybrid cloud backends, and Zero-Knowledge security systems using Firebase, Node.js, and SQLCipher.',
      points: isAr
        ? [
            'معمارية المعرفة الصفرية (Zero-Knowledge Architecture)',
            'تكاملات سحابية آمنة عبر Firebase Authentication و Cloud Edge',
            'قواعد بيانات محلية مشفرة بتوليد مفاتيح عتادي ذاتي',
            'تصميم واجهات برمجية RESTful و WebSocket فائقة الاستجابة',
          ]
        : [
            'Zero-Knowledge architectures with client-side key generation',
            'Secure cloud integrations via Firebase Edge and Node.js microservices',
            'High-resilience local SQLite storage with cryptographic integrity',
            'Lightweight RESTful & WebSocket real-time communication bridges',
          ],
    },
  ];

  return (
    <section id="services" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#FAF9F6] border-t border-[#1A1A1A]/8">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-start">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8C7A54]/12 text-[#8C7A54] text-xs font-bold uppercase tracking-wider">
              <span>{t.servicesTag}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#1A1A1A] tracking-tight">
              {t.servicesTitle}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#6e6e73] max-w-md leading-relaxed">
            {t.servicesSubtitle}
          </p>
        </div>

        {/* 3 Bento Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className="editorial-card p-6 sm:p-8 bg-white flex flex-col justify-between group hover:border-[#8C7A54]/40"
              >
                <div className="space-y-6">
                  {/* Top Bar: Number + Category Badge */}
                  <div className="flex items-center justify-between">
                    <span className="font-editorial-serif text-3xl font-bold text-[#8C7A54]">
                      {service.number}
                    </span>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#6e6e73] px-2.5 py-1 rounded-full bg-neutral-100 uppercase">
                      {service.category}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="space-y-3 text-start">
                    <div className="w-12 h-12 rounded-2xl bg-[#1A1A1A] text-white flex items-center justify-center shadow-sm group-hover:bg-[#8C7A54] transition-colors">
                      <IconComponent className="w-6 h-6 text-[#8C7A54] group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1A1A1A] group-hover:text-[#8C7A54] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6e6e73] leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Bullet Highlights */}
                  <div className="space-y-2.5 pt-4 border-t border-black/[0.06] text-start">
                    {service.points.map((pt, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#1A1A1A] font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8C7A54] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer Tag */}
                <div className="pt-6 mt-6 border-t border-black/[0.04] flex items-center justify-between text-xs font-bold text-[#8C7A54]">
                  <span>{isAr ? 'معايير هندسية صارمة' : 'Enterprise Quality'}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
