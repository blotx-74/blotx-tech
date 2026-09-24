import { useEffect } from 'react';
import Lenis from 'lenis';

export const useSmoothScroll = () => {
  useEffect(() => {
    // Only initialize smooth scroll on desktop or non-reduced motion devices
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const animationFrameId = requestAnimationFrame(raf);

    // Make lenis globally accessible for programmatic scrollTo
    (window as any).__lenis = lenis;

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      delete (window as any).__lenis;
    };
  }, []);
};

export const scrollToSection = (sectionId: string, offset = -80) => {
  const element = document.getElementById(sectionId);
  if (!element) return;

  const lenis = (window as any).__lenis;
  if (lenis) {
    lenis.scrollTo(element, { offset, duration: 1.4 });
  } else {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
