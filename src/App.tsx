import { useEffect, useState } from 'react';
import { subscribeToConfig } from './firebase';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { MaintenanceScreen } from './components/layout/MaintenanceScreen';
import { AppleNavbar } from './components/layout/AppleNavbar';
import { HeroCinematic } from './components/sections/HeroCinematic';
import { InteractiveDeviceShowcase } from './components/sections/InteractiveDeviceShowcase';
import { InteractiveBalataExperience } from './components/sections/InteractiveBalataExperience';
import { InteractiveEftekerExperience } from './components/sections/InteractiveEftekerExperience';
import { TheSynergyMatrix } from './components/sections/TheSynergyMatrix';
import { PhilosophyManifesto } from './components/sections/PhilosophyManifesto';
import { SavingsCalculator } from './components/sections/SavingsCalculator';
import { RealStoriesSection } from './components/sections/RealStoriesSection';
import { TheLabSecrets } from './components/sections/TheLabSecrets';
import { FaqSection } from './components/sections/FaqSection';
import { AppleFooter } from './components/layout/AppleFooter';
import { FloatingEcosystemDock } from './components/ui/FloatingEcosystemDock';
import { PrivacyPolicyModal } from './components/ui/PrivacyPolicyModal';
import { SupportDocsModal } from './components/ui/SupportDocsModal';
import { PromoCodeModal } from './components/ui/PromoCodeModal';
import { Gift } from 'lucide-react';

import { ConfigContext } from './ConfigContext';
import { LanguageProvider } from './LanguageContext';

export function App() {
  const [config, setConfig] = useState<any>(null);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isPromoOpen, setIsPromoOpen] = useState(false);
  const [supportTab, setSupportTab] = useState<'team' | 'developer' | 'docs'>('team');

  const handleOpenSupport = (tab: 'team' | 'developer' | 'docs' = 'team') => {
    setSupportTab(tab);
    setIsSupportOpen(true);
  };

  useEffect(() => {
    const unsubscribe = subscribeToConfig((data) => {
      setConfig(data);
      if (data.colors) {
        document.documentElement.style.setProperty('--primary-color', data.colors.primary || '#1d1d1f');
        document.documentElement.style.setProperty('--secondary-color', data.colors.secondary || '#fbfbfd');
        document.documentElement.style.setProperty('--accent-color', data.colors.accent || '#0071e3');
        document.documentElement.style.setProperty('--card-bg', data.colors.cardBg || '#ffffff');
      }
      if (data.typography) {
        document.documentElement.style.setProperty('--base-font-size', data.typography.fontSize || '16px');
        document.documentElement.style.setProperty('--base-font-family', data.typography.fontFamily || 'Cairo');
      }
    });
    return () => unsubscribe();
  }, []);

  // 1. Check Maintenance Mode
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

  const sec = config?.sections || {};

  return (
    <LanguageProvider>
      <ConfigContext.Provider value={config}>
      <div className="min-h-screen relative pb-20 overflow-x-clip w-full max-w-full" style={{ backgroundColor: 'var(--secondary-color)', color: 'var(--primary-color)', fontSize: 'var(--base-font-size)', fontFamily: 'var(--base-font-family)' }}>
        {/* Dynamic Announcement & Countdown Bar */}
        <AnnouncementBar data={config?.announcementBar} />

        <AppleNavbar onOpenSupport={handleOpenSupport} />

        <main>
          {config?.images?.banner && (
            <div
              style={{
                backgroundImage: `url(${config.images.banner})`,
                height: '400px',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          )}

          {sec.hero !== false && <HeroCinematic />}
          {sec.showcase !== false && <InteractiveDeviceShowcase />}
          {sec.balata !== false && <InteractiveBalataExperience />}
          {sec.efteker !== false && <InteractiveEftekerExperience />}
          {sec.synergy !== false && <TheSynergyMatrix />}
          {sec.manifesto !== false && <PhilosophyManifesto />}
          {sec.calculator !== false && <SavingsCalculator />}
          {sec.stories !== false && <RealStoriesSection />}
          {sec.lab !== false && <TheLabSecrets />}
          {sec.faq !== false && <FaqSection />}
        </main>

        <AppleFooter
          onOpenPrivacy={() => setIsPrivacyOpen(true)}
          onOpenSupport={handleOpenSupport}
        />
        <FloatingEcosystemDock />

        {/* Floating Promo Code Badge / Button */}
        <button
          onClick={() => setIsPromoOpen(true)}
          className="fixed bottom-6 left-6 z-40 px-3.5 py-2.5 rounded-full bg-[#1d1d1f] text-white hover:bg-black shadow-xl border border-white/10 flex items-center gap-2 text-xs font-bold transition-all hover:scale-105 cursor-pointer backdrop-blur-lg"
          title="أدخل كود الخصم أو الدعوة"
        >
          <Gift className="w-4 h-4 text-amber-400" />
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
