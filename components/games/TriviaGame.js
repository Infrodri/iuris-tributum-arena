import { useEffect, useRef, useState } from "react";
import { triviaDatabase } from "../../lib/gameData";

export default function TriviaGame({ onFinish }) {
  const [index, setIndex] = useState(0);
  const [locked, setLocked] = useState(false);
  const [selected, setSelected] = useState(null);
  const [points, setPoints] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const startRef = useRef(Date.now());
  const timerRef = useRef(null);

  const q = triviaDatabase[index];

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
      setPoints((p) => p + 100 + bonus);
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
    <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-5 border border-deep-700/80">
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span className="px-2.5 py-1 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/20 font-bold uppercase">
          {q.tag}
        </span>
        <span>Pregunta {index + 1} de {triviaDatabase.length}</span>
        <span className={`font-mono font-bold ${timeLeft <= 5 ? "text-rose-400" : "text-gold-400"}`}>{Math.ceil(timeLeft)}s</span>
      </div>

      <h3 className="text-lg sm:text-xl font-serif font-bold text-white leading-relaxed">{q.question}</h3>

      <div className="w-full bg-deep-950 rounded-full h-1.5 overflow-hidden">
        <div className={`h-full ${timeLeft <= 5 ? "bg-rose-500" : "bg-gold-400"}`} style={{ width: `${(timeLeft / 20) * 100}%` }} />
      </div>

      <div className="grid grid-cols-1 gap-3">
        {q.options.map((opt, idx) => {
          let cls = "border border-deep-700 bg-deep-900/80 hover:bg-deep-850 hover:border-gold-500/50 text-slate-200";
          if (answered) {
            if (opt.correct) cls = "border-2 border-emeraldLaw-500 bg-emeraldLaw-500/15 text-emerald-200";
            else if (idx === selected) cls = "border-2 border-rose-500 bg-rose-500/15 text-rose-200";
            else cls = "border border-deep-800/40 bg-deep-950/40 text-slate-600";
          }
          return (
            <button
              key={idx}
              disabled={answered}
              onClick={() => handleAnswer(idx)}
              className={`w-full text-left p-4 rounded-2xl transition flex items-start gap-3 text-sm ${cls}`}
            >
              <span className="w-7 h-7 rounded-xl bg-deep-850 border border-deep-700 flex items-center justify-center text-xs font-bold shrink-0">
                {String.fromCharCode(65 + idx)}
              </span>
              <span>{opt.text}</span>
            </button>
          );
        })}
      </div>

      {answered && (
        <div className={`p-4 rounded-2xl border text-sm ${selected >= 0 && q.options[selected].correct ? "border-emeraldLaw-500/40 bg-emeraldLaw-800/20 text-emerald-200" : "border-rose-500/40 bg-rose-950/30 text-rose-200"}`}>
          <p className="text-slate-300">{q.options.find((o) => o.correct).why}</p>
        </div>
      )}

      <div className="flex items-center justify-between pt-2 border-t border-deep-800/80">
        <span className="text-xs text-slate-500">Puntaje acumulado: <strong className="text-emeraldLaw-400">{points}</strong></span>
        {answered && (
          <button onClick={next} className="px-5 py-2.5 rounded-xl font-bold bg-gradient-to-r from-gold-500 to-amber-600 text-deep-950 text-sm">
            {index === triviaDatabase.length - 1 ? "Finalizar" : "Siguiente"}
          </button>
        )}
      </div>
    </div>
  );
}
