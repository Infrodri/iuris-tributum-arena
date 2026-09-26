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
    <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-5 border border-deep-700/80 text-center">
      <p className="text-xs text-slate-400">Modo estudio · toca la tarjeta para revelar la respuesta (10 pts/tarjeta vista)</p>

      <div className="flex justify-center py-2">
        <div
          onClick={flip}
          className="cursor-pointer w-full max-w-md min-h-[220px] rounded-3xl p-6 flex flex-col justify-between items-center text-center border-2 transition-colors"
          style={{
            background: flipped
              ? "linear-gradient(135deg, rgba(20,29,51,0.9), rgba(6,20,15,0.9))"
              : "linear-gradient(135deg, rgba(20,29,51,0.85), rgba(14,20,36,0.95))",
            borderColor: flipped ? "rgba(16,185,129,0.5)" : "rgba(245,158,11,0.35)"
          }}
        >
          {!flipped ? (
            <>
              <span className="text-xs font-bold uppercase tracking-wider bg-gold-500/20 text-gold-300 border border-gold-500/30 px-3 py-1 rounded-full">
                {card.category}
              </span>
              <h4 className="text-lg font-serif font-bold text-white leading-snug px-2">{card.question}</h4>
              <span className="text-xs text-slate-400">Toca para ver el dictamen</span>
            </>
          ) : (
            <>
              <span className="text-xs font-bold uppercase tracking-wider bg-emeraldLaw-500/20 text-emeraldLaw-400 border border-emeraldLaw-500/30 px-3 py-1 rounded-full">
                {card.article}
              </span>
              <p className="text-sm text-slate-200 leading-relaxed px-2">{card.answer}</p>
              <span className="text-xs text-slate-400">Toca para volver</span>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <button onClick={prev} disabled={index === 0} className="p-3 rounded-xl bg-deep-900 border border-deep-800 text-slate-300 disabled:opacity-30">
          <i className="ph-bold ph-caret-left text-xl"></i>
        </button>
        <span className="text-xs font-bold font-mono text-gold-400 bg-deep-900 px-4 py-2 rounded-xl border border-deep-800">
          {index + 1} / {flashcardsData.length}
        </span>
        <button onClick={next} className="px-5 py-2.5 rounded-xl font-bold bg-gradient-to-r from-gold-500 to-amber-600 text-deep-950 text-sm">
          {isLast ? "Finalizar" : "Siguiente"}
        </button>
      </div>
    </div>
  );
}
