// Pure Web Audio API synthetic sound generator for Apple-style luxury tactile feedback
// Zero external audio files, zero network latency, operates completely offline.

let audioCtx: AudioContext | null = null;
let isMuted = true;

const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export const setMuted = (muted: boolean) => {
  isMuted = muted;
};

export const getIsMuted = () => isMuted;

// 1. Apple-style tactile soft haptic click
export const playAppleClick = () => {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch {
    // Ignore audio errors gracefully
  }
};

// 2. Heavy vault lock sound (for "تحت البلاطة")
export const playVaultThud = () => {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Sub oscillator
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  } catch {
    // Ignore
  }
};

// 3. Ethereal crystal chime (for "افتكر" mental clarity)
export const playClarityChime = () => {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const freqs = [880, 1320, 1760];
    freqs.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.04);

      gain.gain.setValueAtTime(0.04, ctx.currentTime + index * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + index * 0.04 + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + index * 0.04);
      osc.stop(ctx.currentTime + index * 0.04 + 0.25);
    });
  } catch {
    // Ignore
  }
};

// 4. Harmonic symbiotic sync sweep
export const playSyncPulse = () => {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(640, ctx.currentTime + 0.18);

    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.18);
  } catch {
    // Ignore
  }
};

// 5. Authentic iOS AirDrop Chime (AirDrop Crystal Arrival Arpeggio)
export const playAirDropChime = () => {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Ascending airy tri-tone arpeggio
    const notes = [659.25, 880.0, 1318.51]; // E5, A5, E6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);

      gain.gain.setValueAtTime(0.06, ctx.currentTime + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.07 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.07);
      osc.stop(ctx.currentTime + idx * 0.07 + 0.35);
    });

    // Gentle tactile confirmation haptic ping
    const tapOsc = ctx.createOscillator();
    const tapGain = ctx.createGain();
    tapOsc.type = 'triangle';
    tapOsc.frequency.setValueAtTime(520, ctx.currentTime + 0.22);
    tapOsc.frequency.exponentialRampToValueAtTime(260, ctx.currentTime + 0.28);
    tapGain.gain.setValueAtTime(0.05, ctx.currentTime + 0.22);
    tapGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);
    tapOsc.connect(tapGain);
    tapGain.connect(ctx.destination);
    tapOsc.start(ctx.currentTime + 0.22);
    tapOsc.stop(ctx.currentTime + 0.28);
  } catch {
    // Ignore
  }
};

// 6. Futuristic OCR Laser Scan Sweep Sound
export const playScanLaser = () => {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.15);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } catch {
    // Ignore
  }
};

// 7. Cash register / Transaction Confirmation Ding
export const playCashRegister = () => {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const freqs = [1046.5, 1318.5, 1567.98, 2093.0]; // C6, E6, G6, C7
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.035);
      gain.gain.setValueAtTime(0.05, ctx.currentTime + i * 0.035);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.035 + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.035);
      osc.stop(ctx.currentTime + i * 0.035 + 0.22);
    });
  } catch {
    // Ignore
  }
};

// 8. Crisp Camera Shutter / Privacy Lock Toggle
export const playPrivacyToggle = () => {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(900, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.07, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch {
    // Ignore
  }
};

// 9. Tactile 3D Card Flip Sound (Crisp Card Swoosh & Snap)
export const playCardFlip = () => {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Fast swoosh
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.06);
    osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.14);

    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.14);

    // Subtle magnetic snap at the end of flip
    const snapOsc = ctx.createOscillator();
    const snapGain = ctx.createGain();
    snapOsc.type = 'triangle';
    snapOsc.frequency.setValueAtTime(920, ctx.currentTime + 0.12);
    snapOsc.frequency.exponentialRampToValueAtTime(450, ctx.currentTime + 0.16);

    snapGain.gain.setValueAtTime(0.04, ctx.currentTime + 0.12);
    snapGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);

    snapOsc.connect(snapGain);
    snapGain.connect(ctx.destination);

    snapOsc.start(ctx.currentTime + 0.12);
    snapOsc.stop(ctx.currentTime + 0.16);
  } catch {
    // Ignore
  }
};

