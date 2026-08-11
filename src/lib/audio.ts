/**
 * Web Audio API Engine for Solfeggio Frequencies
 */

const SolfeggioMap: Record<number, number> = {
  1: 528, // Sun: Transformation & Miracles
  2: 432, // Moon: Universal Harmony
  3: 639, // Jupiter: Connecting Relationships
  4: 174, // Rahu: Grounding
  5: 741, // Mercury: Awakening Intuition
  6: 285, // Venus: Healing & Energy
  7: 852, // Ketu: Spiritual Order
  8: 396, // Saturn: Liberating Guilt & Fear
  9: 963, // Mars: Divine Consciousness
};

let audioCtx: AudioContext | null = null;
let activeOscillator: OscillatorNode | null = null;
let activeGain: GainNode | null = null;

const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
};

/**
 * Plays a Solfeggio frequency mapped to the given Mulank number.
 * Fades in, sustains, and fades out over duration (default 5s).
 */
export const playSolfeggio = (mulank: number, durationSeconds = 5) => {
  initAudio();
  if (!audioCtx) return;

  const frequency = SolfeggioMap[mulank] || 432;
  
  stopAudio(); // Stop any currently playing tone

  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);

  // Envelope: Fade in, sustain, fade out
  gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 1); // Fade in 1s
  gainNode.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + durationSeconds - 1); // Sustain
  gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + durationSeconds); // Fade out 1s

  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + durationSeconds);

  activeOscillator = osc;
  activeGain = gainNode;
};

export const stopAudio = () => {
  if (activeGain && audioCtx) {
    activeGain.gain.cancelScheduledValues(audioCtx.currentTime);
    activeGain.gain.setValueAtTime(activeGain.gain.value, audioCtx.currentTime);
    activeGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.5);
    setTimeout(() => {
      if (activeOscillator) {
        try { activeOscillator.stop(); } catch(e){}
      }
    }, 500);
  }
};

/**
 * Plays a quick UI micro-interaction click/chime.
 */
export const playMicroFeedback = (type: 'click' | 'success' | 'toggle' = 'click') => {
  initAudio();
  if (!audioCtx) return;

  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  
  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  if (type === 'click') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.1);
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
  } else if (type === 'success') {
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, audioCtx.currentTime);
    osc.frequency.setValueAtTime(554.37, audioCtx.currentTime + 0.1);
    osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.2);
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.4);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.4);
  } else if (type === 'toggle') {
    osc.type = 'square';
    osc.frequency.setValueAtTime(300, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.15);
  }
};
