import { useRef, useState } from "react";
import { legalCases } from "../../lib/gameData";
import { shuffled } from "../../lib/shuffle";
import { buzz, blip } from "../arena";

export default function CasosGame({ onFinish }) {
  const [deck] = useState(() =>
    shuffled(legalCases.map((c) => ({ ...c, options: shuffled(c.options) })))
  );
  const [index, setIndex] = useState(0);
  const [answeredIdx, setAnsweredIdx] = useState(null);
  const [points, setPoints] = useState(0);
  const startRef = useRef(Date.now());

  const c = deck[index];

  function choose(idx) {
    if (answeredIdx !== null) return;
    setAnsweredIdx(idx);
    if (c.options[idx].correct) {
      setPoints((p) => p + 150);
      buzz(30);
      blip("good");
    } else {
      buzz([60, 40, 60]);
      blip("bad");
    }
  }

  function next() {
    if (index < deck.length - 1) {
      setIndex((i) => i + 1);
      setAnsweredIdx(null);
    } else {
      const totalTime = Math.round((Date.now() - startRef.current) / 1000);
      onFinish(points, totalTime);
    }
  }

  return (
    <div className="glass-panel rounded-3xl p-4 sm:p-7 space-y-4 border border-royal-500/20 anim-rise">
      <div className="flex items-center gap-1.5 justify-center" aria-hidden>
        {deck.map((_, i) => (
          <span key={i} className={`h-1.5 rounded-full transition-all ${i < index ? "w-5 bg-mint-400" : i === index ? "w-7 bg-gold-400 anim-glow" : "w-3 bg-white/15"}`} />
        ))}
      </div>
      <div className="flex items-center justify-between gap-2 text-xs">
        <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-mint-500/25 to-royal-500/25 text-mint-300 border border-mint-400/25 font-bold uppercase tracking-wide truncate max-w-[70%]">
          {c.badge}
        </span>
        <span className="text-slate-400 font-mono shrink-0">{index + 1}/{deck.length}</span>
      </div>

      <h3 className="text-[17px] sm:text-xl font-serif font-bold text-white leading-snug">{c.title}</h3>
      <p className="text-[15px] text-slate-100 bg-white/[0.05] p-4 rounded-2xl border border-white/10 leading-relaxed">{c.facts}</p>
      <p className="text-[15px] font-bold text-gold-200">{c.dilemma}</p>

      <div className="grid grid-cols-1 gap-2.5">
        {c.options.map((opt, idx) => {
          let cls = "border border-white/12 bg-white/[0.06] active:bg-white/[0.12] text-slate-100";
          if (answeredIdx !== null) {
            if (opt.correct) cls = "border-2 border-mint-400 bg-mint-500/15 text-emerald-100 anim-pop";
            else if (idx === answeredIdx) cls = "border-2 border-coral-500 bg-coral-500/15 text-rose-100 anim-shake";
            else cls = "border border-white/5 bg-white/[0.02] text-slate-500";
          }
          return (
            <button key={idx} disabled={answeredIdx !== null} onClick={() => choose(idx)} className={`arena-opt w-full text-left p-4 rounded-2xl transition text-[15px] leading-snug ${cls}`}>
              <span className="font-black text-gold-300 mr-2">⚖ {idx + 1}</span> {opt.label}
            </button>
          );
        })}
      </div>

      {answeredIdx !== null && (
        <div className={`p-4 rounded-2xl text-sm anim-pop ${c.options[answeredIdx].correct ? "border border-mint-400/40 bg-mint-500/10 text-emerald-100" : "border border-coral-500/40 bg-coral-500/10 text-rose-100"}`}>
          {c.options[answeredIdx].correct && <p className="font-black text-gold-300 mb-1">+150 pts · Dictamen correcto</p>}
          {c.options.find((o) => o.correct).dictamen}
        </div>
      )}

      <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/10 safe-bottom">
        <span className="text-xs text-slate-300">Total <strong className="text-mint-300 font-mono text-base">{points}</strong></span>
        {answeredIdx !== null && (
          <button onClick={next} className="arena-btn flex-1 sm:flex-none px-6 rounded-2xl font-black bg-gradient-to-r from-gold-400 to-gold-600 text-ink-950 text-[15px] shadow-glow-gold active:scale-95 transition">
            {index === deck.length - 1 ? "Ver mi resultado →" : "Siguiente caso →"}
          </button>
        )}
      </div>
    </div>
  );
}
