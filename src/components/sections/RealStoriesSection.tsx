import type { FC } from 'react';
import { Star, Quote, ShieldCheck, Brain, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../LanguageContext';

export const RealStoriesSection: FC = () => {
  const { isRTL, t } = useLanguage();

  const stories = [
    {
      name: t.story1Name,
      role: t.story1Role,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      badge: t.story1Badge,
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      icon: ShieldCheck,
      iconColor: 'text-emerald-600',
      quote: t.story1Quote,
    },
    {
      name: t.story2Name,
      role: t.story2Role,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      badge: t.story2Badge,
      badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
      icon: Brain,
      iconColor: 'text-blue-600',
      quote: t.story2Quote,
    },
    {
      name: t.story3Name,
      role: t.story3Role,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      badge: t.story3Badge,
      badgeColor: 'bg-purple-50 text-purple-800 border-purple-200',
      icon: CheckCircle2,
      iconColor: 'text-purple-600',
      quote: t.story3Quote,
    },
  ];

  return (
    <section id="stories" className="py-24 bg-white border-t border-black/[0.04] font-cairo">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neutral-100 text-[#1d1d1f] text-xs font-bold">
            <Quote className="w-3.5 h-3.5 text-[#0071e3]" />
            <span>{t.storiesBadge}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#1d1d1f] tracking-tight">
            {t.storiesTitle1}
            <br />
            <span className="text-[#6e6e73]">{t.storiesTitle2}</span>
          </h2>

          <p className="text-base sm:text-lg text-[#6e6e73]">
            {t.storiesDesc}
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, idx) => {
            const Icon = story.icon;

            return (
              <div
                key={idx}
                className="apple-card p-8 flex flex-col justify-between text-start border border-black/[0.06] hover:border-black/[0.12] transition-all"
              >
                <div>
                  {/* Stars Rating */}
                  <div className={`flex items-center gap-1 mb-6 text-amber-400 ${isRTL ? 'justify-end' : 'justify-start'}`}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  {/* Quote text */}
                  <blockquote className="text-sm sm:text-base text-[#1d1d1f] font-semibold leading-relaxed mb-8">
                    "{story.quote}"
                  </blockquote>
                </div>

                {/* User Info Footer */}
                <div className="pt-6 border-t border-black/[0.06] space-y-3">
                  <div className={`flex items-center gap-3 ${isRTL ? 'justify-end' : 'justify-start'}`}>
                    {isRTL ? (
                      <>
                        <div className="text-right">
                          <h4 className="font-bold text-sm text-[#1d1d1f]">{story.name}</h4>
                          <div className="text-[11px] text-[#86868b]">{story.role}</div>
                        </div>
                        <img
                          src={story.avatar}
                          alt={story.name}
                          className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm shrink-0"
                        />
                      </>
                    ) : (
                      <>
                        <img
                          src={story.avatar}
                          alt={story.name}
                          className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm shrink-0"
                        />
                        <div className="text-left">
                          <h4 className="font-bold text-sm text-[#1d1d1f]">{story.name}</h4>
                          <div className="text-[11px] text-[#86868b]">{story.role}</div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Badge */}
                  <div className={`flex ${isRTL ? 'justify-end' : 'justify-start'}`}>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border ${story.badgeColor}`}>
                      <Icon className={`w-3.5 h-3.5 ${story.iconColor}`} />
                      <span>{story.badge}</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

