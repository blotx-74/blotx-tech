import { useEffect, useState } from 'react';
import { subscribeToConfig } from './firebase';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { MaintenanceScreen } from './components/layout/MaintenanceScreen';
import { EditorialNavbar } from './components/layout/EditorialNavbar';
import { EditorialHero } from './components/sections/EditorialHero';
import { EditorialServices } from './components/sections/EditorialServices';
import { EditorialWorks } from './components/sections/EditorialWorks';
import { EditorialAboutBento } from './components/sections/EditorialAboutBento';
import { EditorialRoadmaps } from './components/sections/EditorialRoadmaps';
import { EditorialContact } from './components/sections/EditorialContact';
import { EditorialFooter } from './components/layout/EditorialFooter';
import { PrivacyPolicyModal } from './components/ui/PrivacyPolicyModal';
import { SupportDocsModal } from './components/ui/SupportDocsModal';
import { PromoCodeModal } from './components/ui/PromoCodeModal';
import { Gift } from 'lucide-react';

import { ConfigContext } from './ConfigContext';
import { LanguageProvider } from './LanguageContext';
import { useSmoothScroll } from './utils/useSmoothScroll';

export function App() {
  const [config, setConfig] = useState<any>(null);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isPromoOpen, setIsPromoOpen] = useState(false);
  const [supportTab, setSupportTab] = useState<'team' | 'developer' | 'docs'>('team');

  // Initialize Lenis Smooth Scroll per DESIGN.md
  useSmoothScroll();

  const handleOpenSupport = (tab: 'team' | 'developer' | 'docs' = 'team') => {
    setSupportTab(tab);
    setIsSupportOpen(true);
  };

  useEffect(() => {
    const unsubscribe = subscribeToConfig((data) => {
      setConfig(data);
    });
    return () => unsubscribe();
  }, []);

  // Check Maintenance Mode
  if (config?.maintenanceMode?.is_enabled) {
    return (
      <MaintenanceScreen
        title={config.maintenanceMode.title}
        message={config.maintenanceMode.message}
        estimatedReturn={config.maintenanceMode.estimatedReturn}
        supportEmail={config.socialLinks?.supportEmail}
        whatsapp={config.socialLinks?.whatsapp}
      />
    );
  }

  return (
    <LanguageProvider>
      <ConfigContext.Provider value={config}>
        {/* Subtle Organic Grain Noise Texture Overlay (DESIGN.md) */}
        <div className="noise-overlay" />

        <div className="min-h-screen relative bg-[#FAF9F6] text-[#1A1A1A] font-cairo overflow-x-clip w-full max-w-full selection:bg-[#8C7A54] selection:text-white">
          {/* Dynamic Announcement Bar if configured */}
          <AnnouncementBar data={config?.announcementBar} />

          {/* Luxury Editorial Header with Live Cairo Time & Developer Mention */}
          <EditorialNavbar onOpenSupport={handleOpenSupport} />

          <main className="w-full">
            {/* 1. Hero & Manifesto Section */}
            <EditorialHero />

            {/* 2. Services & Expertise ("ماذا أقدم؟") */}
            <EditorialServices />

            {/* 3. Selected Works - Flagship Products (افتكر & تحت البلاطة) */}
            <EditorialWorks />

            {/* 4. About & Tech Bento Grid (رحلة التطور والمطور والتقنيات) */}
            <EditorialAboutBento />

            {/* 5. Editorial & Roadmaps (المدونة ومسارات التعلم مع التوسيع الذكي) */}
            <EditorialRoadmaps />

            {/* 6. Direct Contact Suite (منصة التواصل المباشر وموقع المطور) */}
            <EditorialContact />
          </main>

          {/* Luxury Editorial Footer */}
          <EditorialFooter
            onOpenPrivacy={() => setIsPrivacyOpen(true)}
            onOpenSupport={handleOpenSupport}
          />

          {/* Floating Promo Code Badge / Button */}
          <button
            onClick={() => setIsPromoOpen(true)}
            className="fixed bottom-6 left-6 z-40 px-3.5 py-2.5 rounded-full bg-[#1A1A1A] text-white hover:bg-[#8C7A54] shadow-xl border border-white/10 flex items-center gap-2 text-xs font-bold transition-all hover:scale-105 cursor-pointer backdrop-blur-lg"
            title="كود العرض أو الدعوة"
          >
            <Gift className="w-4 h-4 text-[#8C7A54]" />
            <span className="hidden sm:inline">كود العرض</span>
          </button>

          {/* Global Legal, Support, and Promo Modals */}
          <PrivacyPolicyModal
            isOpen={isPrivacyOpen}
            onClose={() => setIsPrivacyOpen(false)}
          />
          <SupportDocsModal
            isOpen={isSupportOpen}
            onClose={() => setIsSupportOpen(false)}
            initialTab={supportTab}
          />
          <PromoCodeModal
            isOpen={isPromoOpen}
            onClose={() => setIsPromoOpen(false)}
            promoCodes={config?.promoCodes}
          />
        </div>
      </ConfigContext.Provider>
    </LanguageProvider>
  );
}

export default App;
