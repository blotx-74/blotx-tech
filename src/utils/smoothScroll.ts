// Butter-smooth Apple-grade kinematic easing scroll utility
// Designed for seamless cinematic transitions between sections without jarring teleport jumps.

export function smoothScrollTo(
  target: string | HTMLElement,
  offset: number = 80,
  duration: number = 850
): void {
  if (typeof window === 'undefined') return;

  let targetElement: HTMLElement | null = null;
  if (typeof target === 'string') {
    const id = target.startsWith('#') ? target.slice(1) : target;
    targetElement = document.getElementById(id);
  } else {
    targetElement = target;
  }

  if (!targetElement) return;

  const startPosition = window.pageYOffset;
  const elementPosition = targetElement.getBoundingClientRect().top;
  const targetPosition = Math.max(0, elementPosition + startPosition - offset);
  const distance = targetPosition - startPosition;

  if (Math.abs(distance) < 5) return;

  let startTime: number | null = null;
  let isCancelled = false;

  // Cancel smooth scroll if user interacts manually
  const cancelEvents = ['wheel', 'touchstart', 'keydown'];
  const onUserInteraction = () => {
    isCancelled = true;
    cancelEvents.forEach((ev) => window.removeEventListener(ev, onUserInteraction));
  };
  cancelEvents.forEach((ev) => window.addEventListener(ev, onUserInteraction, { passive: true }));

  // Apple-grade Quintic Deceleration Easing curve (ultra-luxurious glide)
  const easeOutQuint = (t: number): number => 1 - Math.pow(1 - t, 5);

  const animationStep = (currentTime: number) => {
    if (isCancelled) return;

    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const easeProgress = easeOutQuint(progress);

    window.scrollTo(0, startPosition + distance * easeProgress);

    if (timeElapsed < duration) {
      window.requestAnimationFrame(animationStep);
    } else {
      window.scrollTo(0, targetPosition);
      cancelEvents.forEach((ev) => window.removeEventListener(ev, onUserInteraction));

      // Update URL hash smoothly without jump
      if (typeof target === 'string' && target.startsWith('#')) {
        history.pushState(null, '', target);
      }
    }
  };

  window.requestAnimationFrame(animationStep);
}

// React onClick helper for navigation links
export function handleSmoothScrollClick(
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string,
  offset: number = 85,
  duration: number = 850,
  callback?: () => void
): void {
  if (href.startsWith('#')) {
    e.preventDefault();
    smoothScrollTo(href, offset, duration);
    if (callback) callback();
  }
}
