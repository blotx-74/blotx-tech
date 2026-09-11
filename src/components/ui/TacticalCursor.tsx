import { useEffect, useState, type FC } from 'react';

export const TacticalCursor: FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const clickable = target.closest('button, a, input, [role="button"]');
        setIsPointer(!!clickable);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-[9999] transition-transform duration-75 ease-out"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Precision Crosshair Center Point */}
      <div
        className={`w-2 h-2 rounded-full transition-all duration-150 ${
          isPointer
            ? 'bg-[#ff5500] scale-150'
            : isClicking
            ? 'bg-white scale-75'
            : 'bg-[#ff5500]'
        }`}
      />

      {/* Outer Tactical Reticle Ring */}
      <div
        className={`absolute -inset-2.5 rounded-full border border-[#ff5500]/40 transition-all duration-200 ${
          isPointer
            ? 'scale-125 border-[#ff5500] opacity-80'
            : isClicking
            ? 'scale-90 border-white'
            : 'scale-100 opacity-30'
        }`}
      />

      {/* Tiny live coordinate display on hover */}
      {isPointer && (
        <div className="absolute top-4 left-4 font-mono text-[9px] text-[#ff5500] bg-black/90 px-1.5 py-0.5 rounded border border-[#ff5500]/40 whitespace-nowrap shadow-lg">
          TARGET_LOCK [{pos.x}, {pos.y}]
        </div>
      )}
    </div>
  );
};
