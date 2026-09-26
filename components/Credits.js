import { courseCredits } from "../lib/gameData";

export default function Credits() {
  return (
    <section className="glass-panel rounded-3xl p-5 text-center space-y-3">
      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-gold-300">Créditos</p>
      <p className="text-xs text-slate-200 font-bold">{courseCredits.course}</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-3 text-left">
        {courseCredits.columns.map((col, i) => (
          <ol key={i} className="space-y-1.5">
            {col.map((n) => (
              <li key={n} className="text-[11px] text-slate-300 leading-snug flex gap-1.5">
                <span className="text-gold-400 shrink-0">•</span> {n}
              </li>
            ))}
          </ol>
        ))}
      </div>
    </section>
  );
}
