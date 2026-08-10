// Audio Manager with Mac OS Startup Chime & Background Audio Controls

let audioCtx: AudioContext | null = null;

export const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch((err) => console.log("AudioContext resume postponed:", err));
  }
  return audioCtx;
};

// Mac OS Startup Chime (Synthesized F# Major Chord with harmonics)
export const playBootChime = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  
  // F# Major Chord Frequencies (F#2, C#3, F#3, A#3, C#4, F#4)
  const frequencies = [92.50, 138.59, 185.00, 233.08, 277.18, 369.99];
  const gains = [0.3, 0.25, 0.2, 0.18, 0.15, 0.12];

  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.001, now);
  masterGain.gain.exponentialRampToValueAtTime(0.35, now + 0.1);
  masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);

  // Warm Lowpass Filter for classic Mac resonance
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(800, now);
  filter.frequency.exponentialRampToValueAtTime(3200, now + 0.4);
  filter.frequency.exponentialRampToValueAtTime(1000, now + 3.8);

  masterGain.connect(filter);
  filter.connect(ctx.destination);

  frequencies.forEach((freq, i) => {
    // Primary Tone (Sine)
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Subtle Harmonic (Triangle) for richness
    const oscHarmonic = ctx.createOscillator();
    oscHarmonic.type = 'triangle';
    oscHarmonic.frequency.setValueAtTime(freq * 1.002, now); // Micro-detune for warmth

    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(gains[i] || 0.1, now);

    osc.connect(oscGain);
    oscHarmonic.connect(oscGain);
    oscGain.connect(masterGain);

    osc.start(now);
    oscHarmonic.start(now);

    osc.stop(now + 4.0);
    oscHarmonic.stop(now + 4.0);
  });
};

// UI Click Sound Effect
export const playClick = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, now);
  osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);

  gain.gain.setValueAtTime(0.15, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.05);
};

// Background Music Audio Element
const getAudioPath = () => {
  const base = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.BASE_URL || '/' : '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  return `${cleanBase}bg.mp3`;
};

export const bgAudio = typeof window !== 'undefined' ? new Audio(getAudioPath()) : null;
if (bgAudio) {
  bgAudio.loop = true;
  bgAudio.volume = 0.4;
  bgAudio.preload = 'auto';
  bgAudio.setAttribute('playsinline', 'true');
  bgAudio.setAttribute('webkit-playsinline', 'true');
}

export const playBgAudio = () => {
  if (!bgAudio) return;
  getAudioContext(); // Resume AudioContext if suspended
  if (bgAudio.paused) {
    bgAudio.play().catch((err) => {
      console.log("BgAudio play waiting for user gesture:", err);
    });
  }
};

export const pauseBgAudio = () => {
  if (!bgAudio) return;
  bgAudio.pause();
};

export const toggleBgAudio = () => {
  if (!bgAudio) return;
  if (bgAudio.paused) {
    playBgAudio();
  } else {
    pauseBgAudio();
  }
};

export const setBgAudioVolume = (vol: number) => {
  if (!bgAudio) return;
  bgAudio.volume = Math.max(0, Math.min(1, vol));
};

// Universal listener to unlock audio on first user touch/click/keypress anywhere on site
export const initAudioUnlock = () => {
  if (typeof window === 'undefined') return () => {};

  const handleUnlock = () => {
    getAudioContext();
    playBgAudio();
  };

  window.addEventListener('click', handleUnlock, { capture: true });
  window.addEventListener('touchstart', handleUnlock, { capture: true });
  window.addEventListener('pointerdown', handleUnlock, { capture: true });
  window.addEventListener('keydown', handleUnlock, { capture: true });

  return () => {
    window.removeEventListener('click', handleUnlock, { capture: true });
    window.removeEventListener('touchstart', handleUnlock, { capture: true });
    window.removeEventListener('pointerdown', handleUnlock, { capture: true });
    window.removeEventListener('keydown', handleUnlock, { capture: true });
  };
};
