import { useRef, useState } from "react";
import { flashcardsData } from "../../lib/gameData";

export default function FlashcardsGame({ onFinish }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [seen, setSeen] = useState(() => new Set());
  const startRef = useRef(Date.now());

  const card = flashcardsData[index];
  const isLast = index === flashcardsData.length - 1;

  function flip() {
    setFlipped((f) => !f);
    setSeen((s) => new Set(s).add(index));
  }

  function next() {
    if (!isLast) {
      setIndex((i) => i + 1);
      setFlipped(false);
    } else {
      const finalSeen = new Set(seen).add(index);
      const totalTime = Math.round((Date.now() - startRef.current) / 1000);
      onFinish(finalSeen.size * 10, totalTime);
    }
  }

  function prev() {
    if (index > 0) {
      setIndex((i) => i - 1);
      setFlipped(false);
    }
  }

  return (
    <div className="glass-panel rounded-3xl p-4 sm:p-7 space-y-4 border border-royal-500/20 text-center anim-rise">
      <p className="text-xs text-slate-300">Modo estudio · toca la tarjeta para girarla</p>

      <div className="flex justify-center py-1 flip-scene">
        <div className="w-full max-w-md">
          <div onClick={flip} className={`flip-inner relative w-full min-h-[260px] cursor-pointer ${flipped ? "flipped" : ""}`}>
            <div className="flip-face absolute inset-0 rounded-3xl p-6 flex flex-col justify-between items-center text-center border-2 border-gold-500/40 bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950 shadow-card">
              <span className="text-[11px] font-black uppercase tracking-widest bg-gold-500/20 text-gold-200 border border-gold-500/30 px-3 py-1 rounded-full">
                {card.category}
              </span>
              <h4 className="text-[17px] font-serif font-bold text-white leading-snug px-1">{card.question}</h4>
              <span className="arena-btn px-5 py-2 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-200 text-xs font-black">👆 Toca para revelar</span>
            </div>
            <div className="flip-face flip-back absolute inset-0 rounded-3xl p-6 flex flex-col justify-between items-center text-center border-2 border-mint-400/50 bg-gradient-to-br from-emerald-950 via-ink-900 to-ink-950 shadow-glow-mint">
              <span className="text-[11px] font-black uppercase tracking-widest bg-mint-500/20 text-mint-300 border border-mint-400/30 px-3 py-1 rounded-full">
                {card.article}
              </span>
              <p className="text-[15px] text-emerald-50 leading-relaxed px-1">{card.answer}</p>
              <span className="text-[11px] text-slate-400">Toca para volver · +10 pts por tarjeta vista</span>
            </div>
          </div>
          <div className="h-[260px]" aria-hidden />
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 safe-bottom">
        <button onClick={prev} disabled={index === 0} className="arena-btn w-14 rounded-2xl bg-white/[0.07] border border-white/15 text-slate-100 disabled:opacity-30 text-xl active:scale-95 transition" aria-label="Anterior">
          ←
        </button>
        <span className="text-xs font-black font-mono text-gold-300 bg-white/[0.06] px-4 py-2.5 rounded-xl border border-white/10">
          {index + 1} / {flashcardsData.length} · {seen.size} vistas
        </span>
        <button onClick={next} className="arena-btn flex-1 max-w-[180px] rounded-2xl font-black bg-gradient-to-r from-gold-400 to-gold-600 text-ink-950 text-[15px] shadow-glow-gold active:scale-95 transition">
          {isLast ? "Finalizar ✓" : "Siguiente →"}
        </button>
      </div>
    </div>
  );
}
