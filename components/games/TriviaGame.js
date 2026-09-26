import { useEffect, useRef, useState } from "react";
import { triviaDatabase } from "../../lib/gameData";
import { buzz, blip, streakMsg } from "../arena";

export default function TriviaGame({ onFinish }) {
  const [index, setIndex] = useState(0);
  const [locked, setLocked] = useState(false);
  const [selected, setSelected] = useState(null);
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [lastBonus, setLastBonus] = useState(0);
  const startRef = useRef(Date.now());
  const timerRef = useRef(null);

  const q = triviaDatabase[index];
  const msg = streakMsg(streak);

  useEffect(() => {
    setTimeLeft(20);
    setLocked(false);
    setSelected(null);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 0.1) {
          clearInterval(timerRef.current);
          handleAnswer(-1);
          return 0;
        }
        return +(t - 0.1).toFixed(1);
      });
    }, 100);
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  function handleAnswer(idx) {
    if (locked) return;
    setLocked(true);
    setSelected(idx);
    clearInterval(timerRef.current);

    if (idx >= 0 && q.options[idx].correct) {
      const bonus = Math.round(timeLeft * 5);
      const streakBonus = streak >= 2 ? streak * 10 : 0;
      setLastBonus(bonus + streakBonus);
      setPoints((p) => p + 100 + bonus + streakBonus);
      setStreak((s) => s + 1);
      buzz(30);
      blip("good");
    } else {
      setLastBonus(0);
      setStreak(0);
      buzz([60, 40, 60]);
      blip("bad");
    }
  }

  function next() {
    if (index < triviaDatabase.length - 1) {
      setIndex((i) => i + 1);
    } else {
      const totalTime = Math.round((Date.now() - startRef.current) / 1000);
      onFinish(points, totalTime);
    }
  }

  const answered = selected !== null;

  return (
    <div className="glass-panel rounded-3xl p-4 sm:p-7 space-y-4 border border-royal-500/20 anim-rise">
      <div className="flex items-center gap-1.5 justify-center" aria-hidden>
        {triviaDatabase.map((_, i) => (
          <span key={i} className={`h-1.5 rounded-full transition-all ${i < index ? "w-5 bg-mint-400" : i === index ? "w-7 bg-gold-400 anim-glow" : "w-3 bg-white/15"}`} />
        ))}
      </div>

      <div className="flex items-center justify-between gap-2 text-xs">
        <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-royal-500/25 to-gold-500/20 text-gold-200 border border-gold-500/25 font-bold uppercase tracking-wide truncate max-w-[45%]">
          {q.tag}
        </span>
        <span className="text-slate-400 font-mono shrink-0">{index + 1}/{triviaDatabase.length}</span>
        <span className={`px-3 py-1.5 rounded-full font-mono font-black shrink-0 ${timeLeft <= 5 ? "bg-coral-500/20 text-coral-400 border border-coral-500/40" : "bg-gold-500/15 text-gold-300 border border-gold-500/25"}`}>{Math.ceil(timeLeft)}s</span>
      </div>

      {msg && locked === false && (
        <p className="text-center text-xs font-black uppercase tracking-widest text-royal-300">{msg} · x{streak}</p>
      )}

      <h3 className="text-[17px] sm:text-xl font-serif font-bold text-white leading-relaxed">{q.question}</h3>
      <p className="text-[11px] font-mono text-royal-300/90">{q.article}</p>

      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
        <div className={`h-full rounded-full transition-all ${timeLeft <= 5 ? "bg-gradient-to-r from-coral-500 to-coral-400" : "bg-gradient-to-r from-gold-500 via-gold-400 to-mint-400"}`} style={{ width: `${(timeLeft / 20) * 100}%` }} />
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        {q.options.map((opt, idx) => {
          let cls = "border border-white/12 bg-white/[0.06] active:bg-white/[0.12] text-slate-100 shadow-card";
          let badge = "bg-white/10 border-white/15 text-gold-200";
          if (answered) {
            if (opt.correct) {
              cls = "border-2 border-mint-400 bg-mint-500/15 text-emerald-100 shadow-glow-mint anim-pop";
              badge = "bg-mint-400 text-ink-950 border-mint-400";
            } else if (idx === selected) {
              cls = "border-2 border-coral-500 bg-coral-500/15 text-rose-100 anim-shake";
              badge = "bg-coral-500 text-white border-coral-500";
            } else cls = "border border-white/5 bg-white/[0.02] text-slate-500";
          }
          return (
            <button
              key={idx}
              disabled={answered}
              onClick={() => handleAnswer(idx)}
              className={`arena-opt w-full text-left p-4 rounded-2xl transition flex items-start gap-3 text-[15px] leading-snug ${cls}`}
            >
              <span className={`w-8 h-8 rounded-xl border flex items-center justify-center text-sm font-black shrink-0 ${badge}`}>
                {answered && opt.correct ? "✓" : String.fromCharCode(65 + idx)}
              </span>
              <span>{opt.text}</span>
            </button>
          );
        })}
      </div>

      {answered && (
        <div className={`p-4 rounded-2xl border text-sm anim-pop ${selected >= 0 && q.options[selected].correct ? "border-mint-400/40 bg-mint-500/10 text-emerald-100" : "border-coral-500/40 bg-coral-500/10 text-rose-100"}`}>
          {selected >= 0 && q.options[selected].correct && lastBonus > 0 && (
            <p className="font-black text-gold-300 mb-1">+100 pts +{lastBonus} bono{streak >= 3 ? " de racha" : " rapidez"}</p>
          )}
          <p className="text-slate-200/90 leading-relaxed">{q.options.find((o) => o.correct).why}</p>
        </div>
      )}

      <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/10 safe-bottom sticky bottom-0 bg-transparent">
        <span className="text-xs text-slate-300">Total <strong className="text-mint-300 font-mono text-base">{points}</strong></span>
        {answered && (
          <button onClick={next} className="arena-btn flex-1 sm:flex-none px-6 rounded-2xl font-black bg-gradient-to-r from-gold-400 to-gold-600 text-ink-950 text-[15px] shadow-glow-gold active:scale-95 transition">
            {index === triviaDatabase.length - 1 ? "Ver mi resultado →" : "Siguiente →"}
          </button>
        )}
      </div>
    </div>
  );
}
