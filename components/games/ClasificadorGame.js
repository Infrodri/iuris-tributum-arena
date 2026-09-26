import { useRef, useState } from "react";
import { classifierItems } from "../../lib/gameData";
import { buzz, blip } from "../arena";

export default function ClasificadorGame({ onFinish }) {
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [points, setPoints] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const startRef = useRef(Date.now());

  const item = classifierItems[index];

  function classify(type) {
    if (feedback) return;
    const isCorrect = type === item.type;
    if (isCorrect) {
      setPoints((p) => p + 75);
      setCorrectCount((c) => c + 1);
      buzz(30);
      blip("good");
    } else {
      buzz([60, 40, 60]);
      blip("bad");
    }
    setFeedback({ isCorrect, article: item.article, sanction: item.sanction, type: item.type });

    setTimeout(() => {
      if (index < classifierItems.length - 1) {
        setIndex((i) => i + 1);
        setFeedback(null);
      } else {
        const totalTime = Math.round((Date.now() - startRef.current) / 1000);
        onFinish(points + (isCorrect ? 75 : 0), totalTime);
      }
    }, 1600);
  }

  return (
    <div className="glass-panel rounded-3xl p-4 sm:p-7 space-y-4 border border-royal-500/20 anim-rise">
      <div className="flex items-center gap-1.5 justify-center" aria-hidden>
        {classifierItems.map((_, i) => (
          <span key={i} className={`h-1.5 rounded-full transition-all ${i < index ? "w-4 bg-mint-400" : i === index ? "w-6 bg-gold-400 anim-glow" : "w-2.5 bg-white/15"}`} />
        ))}
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-400 font-mono">{index + 1}/{classifierItems.length}</span>
        <span className="font-black text-gold-300">★ {correctCount} aciertos</span>
      </div>

      <p className="text-[16px] sm:text-lg font-serif font-bold text-white leading-relaxed bg-white/[0.05] p-5 rounded-2xl border border-white/10">
        “{item.behavior}”
      </p>

      <div className="grid grid-cols-1 gap-3">
        <button
          disabled={!!feedback}
          onClick={() => classify("contravencion")}
          className="arena-btn p-4 rounded-2xl bg-gradient-to-r from-amber-500/25 to-gold-500/15 active:scale-[0.98] border-2 border-amber-400/50 text-amber-200 font-black text-[16px] flex items-center justify-center gap-2 transition disabled:opacity-60"
        >
          <span className="text-xl">📋</span> Contravención
          <span className="block text-[11px] font-medium opacity-80 w-full">Vía administrativa</span>
        </button>
        <button
          disabled={!!feedback}
          onClick={() => classify("delito")}
          className="arena-btn p-4 rounded-2xl bg-gradient-to-r from-coral-600/30 to-coral-500/15 active:scale-[0.98] border-2 border-coral-500/50 text-rose-100 font-black text-[16px] flex items-center justify-center gap-2 transition disabled:opacity-60"
        >
          <span className="text-xl">🚨</span> Delito
          <span className="block text-[11px] font-medium opacity-80 w-full">Vía penal</span>
        </button>
      </div>

      {feedback && (
        <div className={`p-4 rounded-2xl text-sm anim-pop ${feedback.isCorrect ? "border-2 border-mint-400 bg-mint-500/15 text-emerald-100" : "border-2 border-coral-500 bg-coral-500/15 text-rose-100 anim-shake"}`}>
          <strong className="text-base">{feedback.isCorrect ? "✓ ¡Correcto! +75" : "✗ Incorrecto"}</strong> · {feedback.type.toUpperCase()}<br />
          <span className="opacity-90">{feedback.article} — {feedback.sanction}</span>
        </div>
      )}

      <div className="text-xs text-slate-300 pt-3 border-t border-white/10 safe-bottom">
        Total <strong className="text-mint-300 font-mono text-base">{points}</strong> pts
      </div>
    </div>
  );
}
