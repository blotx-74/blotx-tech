import { useEffect, useState } from 'react';
import { subscribeToConfig } from './firebase';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { MaintenanceScreen } from './components/layout/MaintenanceScreen';
import { BlotxNavbar } from './components/layout/BlotxNavbar';
import { TechHero } from './components/sections/TechHero';
import { TechServices } from './components/sections/TechServices';
import { TechProjects } from './components/sections/TechProjects';
import { TechStandards } from './components/sections/TechStandards';
import { TechProcess } from './components/sections/TechProcess';
import { TechContactCta } from './components/sections/TechContactCta';
import { TechFooter } from './components/layout/TechFooter';
import { PrivacyPolicyModal } from './components/ui/PrivacyPolicyModal';
import { SupportDocsModal } from './components/ui/SupportDocsModal';
import { ProjectInquiryModal } from './components/ui/ProjectInquiryModal';
import { ZeroCookiesBanner } from './components/ui/ZeroCookiesBanner';

import { ConfigContext } from './ConfigContext';
import { LanguageProvider } from './LanguageContext';
import { ThemeProvider } from './ThemeContext';

export function App() {
  const [config, setConfig] = useState<any>(null);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [supportTab, setSupportTab] = useState<'team' | 'developer' | 'docs'>('team');

  const handleOpenSupport = (tab: 'team' | 'developer' | 'docs' = 'team') => {
    setSupportTab(tab);
    setIsSupportOpen(true);
  };

  useEffect(() => {
    const unsubscribe = subscribeToConfig((data) => {
      setConfig(data);
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

  return (
    <ThemeProvider>
      <LanguageProvider>
        <ConfigContext.Provider value={config}>
          <div className="min-h-screen relative overflow-x-clip w-full max-w-full bg-[#f8fafc] text-slate-900 selection:bg-blue-600 selection:text-white">
            {/* Dynamic Announcement & Countdown Bar if enabled */}
            {config?.announcementBar?.is_enabled && (
              <AnnouncementBar data={config.announcementBar} />
            )}

            {/* Software Studio Navbar */}
            <BlotxNavbar
              onOpenInquiry={() => setIsInquiryOpen(true)}
              onOpenSupport={handleOpenSupport}
            />

            <main>
              {/* Modern Software Studio Hero */}
              <TechHero onOpenInquiry={() => setIsInquiryOpen(true)} />

              {/* Engineering Services & Capabilities */}
              <TechServices />

              {/* Portfolio & Shipped Products (Shella Habad Game, Taht El Balata, Afteker, Master Control) */}
              <TechProjects />

              {/* Engineering Standards & Modern Tech Stack */}
              <TechStandards />

              {/* Development Process & Sprints */}
              <TechProcess />

              {/* Contact & Start a Project CTA */}
              <TechContactCta onOpenInquiry={() => setIsInquiryOpen(true)} />
            </main>

            {/* Professional Footer */}
            <TechFooter
              onOpenPrivacy={() => setIsPrivacyOpen(true)}
              onOpenSupport={handleOpenSupport}
            />

            {/* Modals */}
            <ProjectInquiryModal
              isOpen={isInquiryOpen}
              onClose={() => setIsInquiryOpen(false)}
            />

            <PrivacyPolicyModal
              isOpen={isPrivacyOpen}
              onClose={() => setIsPrivacyOpen(false)}
            />

            <SupportDocsModal
              isOpen={isSupportOpen}
              onClose={() => setIsSupportOpen(false)}
              initialTab={supportTab}
            />

            <ZeroCookiesBanner onOpenPrivacy={() => setIsPrivacyOpen(true)} />
          </div>
        </ConfigContext.Provider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
