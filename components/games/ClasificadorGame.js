import { useRef, useState } from "react";
import { classifierItems } from "../../lib/gameData";

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
    <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-5 border border-deep-700/80">
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>Conducta {index + 1} de {classifierItems.length}</span>
        <span className="font-bold text-gold-400">Aciertos: {correctCount} / {classifierItems.length}</span>
      </div>

      <p className="text-base sm:text-lg font-serif font-bold text-white leading-relaxed bg-deep-950 p-5 rounded-2xl border border-deep-800">
        "{item.behavior}"
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          disabled={!!feedback}
          onClick={() => classify("contravencion")}
          className="p-4 rounded-2xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 font-bold text-sm"
        >
          Contravención Tributaria
        </button>
        <button
          disabled={!!feedback}
          onClick={() => classify("delito")}
          className="p-4 rounded-2xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/40 text-rose-300 font-bold text-sm"
        >
          Delito Tributario
        </button>
      </div>

      {feedback && (
        <div className={`p-4 rounded-xl text-sm ${feedback.isCorrect ? "border border-emeraldLaw-500/40 bg-emeraldLaw-800/20 text-emerald-200" : "border border-rose-500/40 bg-rose-950/30 text-rose-200"}`}>
          <strong>{feedback.isCorrect ? "¡Correcto!" : "Incorrecto."}</strong> Es un(a) <strong>{feedback.type.toUpperCase()}</strong>.<br />
          <span className="text-slate-300">{feedback.article} — {feedback.sanction}</span>
        </div>
      )}

      <div className="text-xs text-slate-500 pt-2 border-t border-deep-800/80">
        Puntaje acumulado: <strong className="text-emeraldLaw-400">{points}</strong>
      </div>
    </div>
  );
}
