import { useRef, useState } from "react";
import { legalCases } from "../../lib/gameData";

export default function CasosGame({ onFinish }) {
  const [index, setIndex] = useState(0);
  const [answeredIdx, setAnsweredIdx] = useState(null);
  const [points, setPoints] = useState(0);
  const startRef = useRef(Date.now());

  const c = legalCases[index];

  function choose(idx) {
    if (answeredIdx !== null) return;
    setAnsweredIdx(idx);
    if (c.options[idx].correct) setPoints((p) => p + 150);
  }

  function next() {
    if (index < legalCases.length - 1) {
      setIndex((i) => i + 1);
      setAnsweredIdx(null);
    } else {
      const totalTime = Math.round((Date.now() - startRef.current) / 1000);
      onFinish(points, totalTime);
    }
  }

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-5 border border-deep-700/80">
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span className="px-2.5 py-1 rounded-full bg-emeraldLaw-400/10 text-emeraldLaw-400 border border-emeraldLaw-400/20 font-bold uppercase">
          {c.badge}
        </span>
        <span>Caso {index + 1} de {legalCases.length}</span>
      </div>

      <h3 className="text-lg sm:text-xl font-serif font-bold text-white">{c.title}</h3>
      <p className="text-sm text-slate-300 bg-deep-950/70 p-4 rounded-xl border border-deep-800 leading-relaxed">{c.facts}</p>
      <p className="text-sm font-semibold text-white">{c.dilemma}</p>

      <div className="grid grid-cols-1 gap-2.5">
        {c.options.map((opt, idx) => {
          let cls = "border border-deep-800 bg-deep-900/60 hover:bg-deep-850 hover:border-gold-500/40 text-slate-200";
          if (answeredIdx !== null) {
            if (opt.correct) cls = "border-2 border-emeraldLaw-500 bg-emeraldLaw-500/15 text-emerald-200";
            else if (idx === answeredIdx) cls = "border-2 border-rose-500 bg-rose-500/15 text-rose-200";
            else cls = "border border-deep-800/40 bg-deep-950/30 text-slate-600";
          }
          return (
            <button key={idx} disabled={answeredIdx !== null} onClick={() => choose(idx)} className={`w-full text-left p-4 rounded-xl transition text-sm ${cls}`}>
              <span className="font-bold text-gold-400 mr-2">[Dictamen {idx + 1}]</span> {opt.label}
            </button>
          );
        })}
      </div>

      {answeredIdx !== null && (
        <div className={`p-4 rounded-xl text-sm ${c.options[answeredIdx].correct ? "border border-emeraldLaw-500/40 bg-emeraldLaw-800/20 text-emerald-200" : "border border-rose-500/40 bg-rose-950/30 text-rose-200"}`}>
          {c.options.find((o) => o.correct).dictamen}
        </div>
      )}

      <div className="flex items-center justify-between pt-2 border-t border-deep-800/80">
        <span className="text-xs text-slate-500">Puntaje acumulado: <strong className="text-emeraldLaw-400">{points}</strong></span>
        {answeredIdx !== null && (
          <button onClick={next} className="px-5 py-2.5 rounded-xl font-bold bg-gradient-to-r from-gold-500 to-amber-600 text-deep-950 text-sm">
            {index === legalCases.length - 1 ? "Finalizar" : "Siguiente Caso"}
          </button>
        )}
      </div>
    </div>
  );
}
