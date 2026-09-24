// Sound effects disabled per user design requirement: "وتلغي ال ساوند افكت علي الضغط علي الازرار وما شبهه"
// All functions are preserved as silent safe no-ops to maintain API compatibility.

export const setMuted = (_muted: boolean) => {};
export const getIsMuted = () => true;

export const playAppleClick = () => {};
export const playVaultThud = () => {};
export const playClarityChime = () => {};
export const playAirDropChirp = () => {};
export const playAirDropChime = () => {};
export const playTabSwitch = () => {};
export const playSuccessChime = () => {};
export const playErrorBuzz = () => {};
export const playHoverPop = () => {};
export const playSyncPulse = () => {};
export const playScanLaser = () => {};
export const playCardFlip = () => {};
export const playCashRegister = () => {};
export const playPrivacyToggle = () => {};
