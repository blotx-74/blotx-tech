import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, Tag, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../LanguageContext';

export const EditorialRoadmaps: React.FC = () => {
  const { language, t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  const isAr = language === 'ar';

  const articles = [
    {
      id: 'web-roadmap',
      tag: isAr ? 'خريطة طريق' : 'Roadmap',
      title: isAr
        ? 'مسار تعلم تطوير الويب الحديث من الصفر حتى المعمارية الاحترافية'
        : 'Modern Web Engineering Roadmap: From Fundamentals to Architecture',
      readTime: '8 min read',
      date: 'March 2026',
      excerpt: isAr
        ? 'دليل عملي شامل لتجاوز تشتت المبتدئين: كيف تنتقل بذكاء من أساسيات HTML/CSS/JS إلى إتقان React 19، ضبط TypeScript الصارم، ومعمارية الواجهات السريعة وتجاوز فخ الـ Tutorial Hell.'
        : 'A comprehensive, pragmatic roadmap navigating beyond tutorial hell: mastering modern JavaScript, React 19 paradigms, strict TypeScript typing, and production-grade state architectures.',
      keyTakeaways: isAr
        ? ['فهم عميق لمحرك الجافاسكريبت وEvent Loop', 'هندسة المكونات القابلة لإعادة الاستخدام في React', 'تحسين الأداء وCore Web Vitals']
        : ['Deep understanding of JS Engine & Event Loop', 'Clean reusable component architectures in React', 'Performance optimization & Core Web Vitals'],
    },
    {
      id: 'flutter-roadmap',
      tag: isAr ? 'هندسة تطبيقات' : 'Mobile Craft',
      title: isAr
        ? 'خريطة إتقان إطار عمل Flutter: كيف تبني تطبيقات تعيش وتنافس عالمياً؟'
        : 'Mastering Flutter Architecture: Engineering Resilient 120fps Cross-Platform Apps',
      readTime: '10 min read',
      date: 'February 2026',
      excerpt: isAr
        ? 'تحليل معماري لكيفية بناء تطبيقات Flutter احترافية تتجاوز الشاشات البسيطة: استخدام معمارية Clean Architecture، الفصل التام بين البيانات والواجهات، والتشفير المحلي بالعتاد.'
        : 'An architectural breakdown of building high-performance Flutter mobile apps: Clean Architecture principles, reactive state decoupling, and hardware keystore encryption.',
      keyTakeaways: isAr
        ? ['تطبيق Clean Architecture مع Bloc/Riverpod', 'إدارة دورة حياة الذاكرة وتفادي الـ Memory Leaks', 'التعامل مع قواعد البيانات المحلية المشفرة']
        : ['Applying Clean Architecture with robust state management', 'Memory lifecycle management & leak prevention', 'Handling local encrypted databases securely'],
    },
    {
      id: 'system-architecture',
      tag: isAr ? 'أمان وأنظمة' : 'Zero-Knowledge',
      title: isAr
        ? 'معمارية الأنظمة المستقلة: لماذا يجب أن تعتمد تطبيقاتك على التشفير المحلي بدون سحابة؟'
        : 'Autonomous Systems Architecture: Why Your Apps Should Run 100% Offline-First',
      readTime: '12 min read',
      date: 'January 2026',
      excerpt: isAr
        ? 'فلسفة منظومة Blotx Tech وتطبيقي «تحت البلاطة» و «افتكر»: دراسة تحليلية في بناء برمجيات لا تعتمد على خوادم تجسسية وتمنح المستخدم السيادة والسرية المطلقة لبياناته المالية والشخصية.'
        : 'The architectural rationale behind Blotx Tech, Taht El Balata, and Eftekir: building software resilient to cloud outages and surveillance capitalism.',
      keyTakeaways: isAr
        ? ['بروتوكول المصافحة اللاسلكية P2P بدون إنترنت', 'توليد المفاتيح داخل Secure Enclave', 'تصميم قواعد البيانات المحمية بـ AES-256']
        : ['Offline P2P wireless handshake protocols', 'On-device key generation in Secure Enclave', 'AES-256 GCM encrypted local storage topology'],
    },
    {
      id: 'real-projects-philosophy',
      tag: isAr ? 'فلسفة المطور' : 'Developer Mindset',
      title: isAr
        ? 'الصبر في حل المشكلات البرمجية وثقافة المشاريع الحقيقية مقابل فخ الشهادات'
        : 'The Developer Crucible: Deep Problem Solving & Real Products Over Empty Certificates',
      readTime: '7 min read',
      date: 'December 2025',
      excerpt: isAr
        ? 'مقالة تحريرية تناقش الفارق الحقيقي بين من يجمع شهادات الدورات النظرية ومن يجلس لساعات لحل مشكلة برمجية حقيقية، وبناء منتج حقيقي يلمسه الناس ويحل مشاكلهم اليومية.'
        : 'An honest editorial essay exploring why shipping tangible, battle-tested software matters infinitely more than collecting superficial certificates and course completions.',
      keyTakeaways: isAr
        ? ['بناء عقلية المهندس التي لا تستسلم أمام الـ Bugs المعقدة', 'قوة الـ Edge Cases في صقل المهارة البرمجية', 'من الفكرة حتى النشر الفعلي أمام مستخدمين حقيقيين']
        : ['Cultivating an engineer mindset that tackles deep bugs', 'The pedagogical power of real-world edge cases', 'Shipping from scratch to real end-users'],
    },
  ];

  // Show first 3, or all 4 if expanded
  const visibleArticles = isExpanded ? articles : articles.slice(0, 3);

  return (
    <section id="roadmaps" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#FAF9F6] border-t border-[#1A1A1A]/8">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-start">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8C7A54]/12 text-[#8C7A54] text-xs font-bold uppercase tracking-wider">
              <span>{t.roadmapsTag}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#1A1A1A] tracking-tight">
              {t.roadmapsTitle}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#6e6e73] max-w-md leading-relaxed">
            {isAr
              ? 'مقالات تحريرية متعمقة وخارطة طريق عملية للمطورين الراغبين في بناء حلول برمجية حقيقية متماسكة.'
              : 'Editorial essays and pragmatic roadmaps for developers committed to engineering durable, real-world systems.'}
          </p>
        </div>

        {/* Articles List / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {visibleArticles.map((article) => (
            <div
              key={article.id}
              className="editorial-card p-6 sm:p-8 bg-white flex flex-col justify-between group hover:border-[#8C7A54]/40"
            >
              <div className="space-y-4 text-start">
                {/* Meta Top: Tag + Read Time + Date */}
                <div className="flex items-center justify-between text-xs text-[#6e6e73]">
                  <span className="inline-flex items-center gap-1 font-mono font-bold text-[#8C7A54] px-2.5 py-0.5 rounded-full bg-[#8C7A54]/10 text-[10px] uppercase">
                    <Tag className="w-3 h-3" />
                    {article.tag}
                  </span>
                  <div className="flex items-center gap-1.5 font-editorial-serif text-[11px]">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-[#1A1A1A] group-hover:text-[#8C7A54] transition-colors leading-snug">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm text-[#6e6e73] leading-relaxed">
                  {article.excerpt}
                </p>

                {/* Key Takeaways */}
                <div className="pt-3 border-t border-black/[0.05] space-y-1.5">
                  <span className="text-[10px] font-bold text-[#8C7A54] uppercase tracking-wider block">
                    {isAr ? 'محاور المقال الأساسية:' : 'Key Takeaways:'}
                  </span>
                  {article.keyTakeaways.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-xs text-[#1A1A1A] font-medium">
                      <span className="text-[#8C7A54] font-bold">•</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Footer Action */}
              <div className="pt-4 mt-6 border-t border-black/[0.04] flex items-center justify-between text-xs font-bold text-[#8C7A54]">
                <span>{isAr ? 'قراءة المقال والمسار' : 'Read Deep Dive'}</span>
                <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </div>
          ))}
        </div>

        {/* Smart Expansion Toggle Button (from DESIGN.md) */}
        <div className="flex justify-center pt-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-6 py-3 rounded-full bg-[#1A1A1A] hover:bg-[#8C7A54] text-white text-xs sm:text-sm font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer border border-[#8C7A54]/30"
          >
            {isExpanded ? (
              <>
                <span>{t.showLessArticles}</span>
                <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>{t.showMoreArticles}</span>
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
