import type { FC } from 'react';
import { HeartHandshake, Network, Sparkles, Check } from 'lucide-react';

export const ApplePhilosophy: FC = () => {
  const cards = [
    {
      icon: HeartHandshake,
      iconBg: 'bg-emerald-50 text-emerald-600',
      title: 'سد النواقص الحقيقية للإنسان',
      subtitle: 'Human-Centric Purpose',
      description:
        'ما بنعملش تطبيق لمجرد التواجد في الـ App Store. بنقعد مع الناس، نسمع قلقهم من المصاريف والتشتت، ونبني حلول بتسد الفجوات دي وتتحول لعادة يومية مريحة.',
      bullet: 'فهم عميق للاحتياج قبل كتابة سطر كود واحد',
    },
    {
      icon: Network,
      iconBg: 'bg-blue-50 text-blue-600',
      title: 'إيكوسيستم متناغم يربط حياتك',
      subtitle: 'Unified Experience',
      description:
        'التطبيقات مش جزر منعزلة. لما «تحت البلاطة» يتصل مع «افتكر»، فلوسك ومواعيدك والتزاماتك بيشتغلوا كفريق واحد يحميك من أي مفاجأة غير محسوبة.',
      bullet: 'مزامنة ذكية بدون أي تشتيت للمستخدم',
    },
    {
      icon: Sparkles,
      iconBg: 'bg-amber-50 text-amber-600',
      title: 'حرفية استثنائية ونقاء تام',
      subtitle: 'Apple-Grade Craftsmanship',
      description:
        'تصميم ناصع، خالي من أي إعلانات متطفلة، وخصوصية مشفرة محلياً 100%. منتجات مصممة لتدوم وتكون جزء أصيل من أسلوب حياتك اليومي.',
      bullet: 'تجربة سريعة وسلسة ترتاح لها عينك',
    },
  ];

  return (
    <section id="philosophy" className="py-24 bg-[#fbfbfd] border-t border-black/[0.04]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-semibold text-[#0071e3] tracking-widest uppercase">
            فلسفة Blotx Tech
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-[#1d1d1f] tracking-tight">
            أدوات صُممت لتكون أسلوب حياة،
            <br />
            <span className="text-[#6e6e73]">مش مجرد برامج على هاتفك.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#6e6e73] leading-relaxed">
            الهدف مش إننا نعمل تطبيقات كتير؛ الهدف إن كل أداة تقدمها Blotx Tech تغير في يومك للأحسن، وتشيل عنك عبء القلق المالي والذهني.
          </p>
        </div>

        {/* Apple Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="apple-card p-8 flex flex-col justify-between text-right"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl ${card.iconBg} flex items-center justify-center mb-6`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-semibold text-[#86868b] mb-1">
                    {card.subtitle}
                  </div>
                  <h3 className="text-xl font-bold text-[#1d1d1f] mb-3">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[#6e6e73] leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-black/[0.05] flex items-center gap-2 text-xs font-medium text-[#1d1d1f]">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span>{card.bullet}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
