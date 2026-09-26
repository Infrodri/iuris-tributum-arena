export function buzz(pattern) {
  try {
    if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(pattern);
  } catch (e) {}
}

let audioCtx = null;
export function blip(kind) {
  try {
    if (typeof window === "undefined") return;
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const ctx = audioCtx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    const now = ctx.currentTime;
    if (kind === "good") {
      osc.frequency.setValueAtTime(660, now);
      osc.frequency.setValueAtTime(880, now + 0.08);
    } else if (kind === "bad") {
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.setValueAtTime(160, now + 0.12);
    } else {
      osc.frequency.setValueAtTime(520, now);
    }
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    osc.start(now);
    osc.stop(now + 0.24);
  } catch (e) {}
}

export function streakMsg(streak) {
  if (streak >= 5) return "Racha legendaria";
  if (streak >= 3) return "En racha";
  if (streak === 2) return "Doble acierto";
  return null;
}
