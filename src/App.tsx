import { useEffect, useState } from 'react';
import { subscribeToConfig } from './firebase';
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

import { ConfigContext } from './ConfigContext';
import { LanguageProvider } from './LanguageContext';

export function App() {
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = subscribeToConfig((data) => {
      setConfig(data);
      if (data.colors) {
        document.documentElement.style.setProperty('--primary-color', data.colors.primary || '#1d1d1f');
        document.documentElement.style.setProperty('--secondary-color', data.colors.secondary || '#fbfbfd');
        document.documentElement.style.setProperty('--accent-color', data.colors.accent || '#0071e3');
      }
      if (data.typography) {
        document.documentElement.style.setProperty('--base-font-size', data.typography.fontSize || '16px');
        document.documentElement.style.setProperty('--base-font-family', data.typography.fontFamily || 'Cairo');
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <LanguageProvider>
      <ConfigContext.Provider value={config}>
      <div className="min-h-screen relative pb-20" style={{ backgroundColor: 'var(--secondary-color)', color: 'var(--primary-color)', fontSize: 'var(--base-font-size)', fontFamily: 'var(--base-font-family)' }}>
        <AppleNavbar />
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
          <HeroCinematic />
          <InteractiveDeviceShowcase />
          <InteractiveBalataExperience />
          <InteractiveEftekerExperience />
          <TheSynergyMatrix />
          <PhilosophyManifesto />
          <SavingsCalculator />
          <RealStoriesSection />
          <TheLabSecrets />
          <FaqSection />
        </main>
        <AppleFooter />
        <FloatingEcosystemDock />
      </div>
      </ConfigContext.Provider>
    </LanguageProvider>
  );
}

export default App;
