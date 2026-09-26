import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { GAME_MODES } from "../lib/gameData";
import TriviaGame from "../components/games/TriviaGame";
import CasosGame from "../components/games/CasosGame";
import ClasificadorGame from "../components/games/ClasificadorGame";
import FlashcardsGame from "../components/games/FlashcardsGame";
import { getPusherClient, roomChannelName } from "../lib/pusherClient";

const GAME_COMPONENTS = {
  trivia: TriviaGame,
  casos: CasosGame,
  clasificador: ClasificadorGame,
  flashcards: FlashcardsGame
};

export default function Home() {
  const router = useRouter();
  const [joined, setJoined] = useState(false);
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [mode, setMode] = useState(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const [lastResult, setLastResult] = useState(null);
  const [sending, setSending] = useState(false);
  const [sessionEnded, setSessionEnded] = useState(null);

  useEffect(() => {
    if (router.query.room) setRoom(String(router.query.room).toUpperCase());
  }, [router.query.room]);

  useEffect(() => {
    if (!joined || !room) return;
    const pusher = getPusherClient();
    if (!pusher) return;
    const channel = pusher.subscribe(roomChannelName(room));
    channel.bind("session-ended", (data) => setSessionEnded(data));
    channel.bind("session-reset", () => {
      setSessionEnded(null);
      setTotalPoints(0);
    });
    return () => {
      channel.unbind_all();
      pusher.unsubscribe(roomChannelName(room));
    };
  }, [joined, room]);

  function handleJoin(e) {
    e.preventDefault();
    if (!name.trim() || !room.trim()) return;
    setRoom(room.trim().toUpperCase());
    setJoined(true);
  }

  async function submitScore(points, timeSec) {
    setSending(true);
    setTotalPoints((p) => p + points);
    setLastResult({ mode, points, timeSec });
    try {
      await fetch("/api/pusher/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ room, name, mode, points, time: timeSec })
      });
    } catch (e) {
      // si falla el envío, el estudiante sigue viendo su puntaje local igual
    }
    setSending(false);
    setMode(null);
  }

  if (!joined) {
    return (
      <>
        <Head><title>Iuris Tributum Arena</title></Head>
        <main className="min-h-[100dvh] flex items-center justify-center px-4 py-8">
          <div className="glass-panel max-w-md w-full rounded-[28px] p-6 sm:p-8 space-y-6 text-center anim-rise">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-gold-300 via-gold-500 to-royal-600 flex items-center justify-center text-4xl mx-auto text-ink-950 shadow-glow-gold anim-glow">
              ⚖️
            </div>
            <div>
              <h1 className="arena-title text-[28px] leading-tight font-serif font-black">Iuris Tributum Arena</h1>
              <p className="text-xs text-slate-300 mt-2 tracking-wide">LEY Nº 2492 · DUELO TRIBUTARIO EN VIVO</p>
              <div className="flex items-center justify-center gap-2 mt-3 text-[11px] font-bold">
                <span className="px-3 py-1 rounded-full bg-mint-500/15 text-mint-300 border border-mint-400/30">● En vivo</span>
                <span className="px-3 py-1 rounded-full bg-royal-500/20 text-royal-300 border border-royal-500/30">4 modos</span>
              </div>
            </div>
            <form onSubmit={handleJoin} className="space-y-3.5 text-left">
              <div>
                <label className="block text-[11px] font-black uppercase tracking-widest text-gold-300 mb-1.5">Tu nombre de competidor</label>
                <input value={name} onChange={(e) => setName(e.target.value)} required maxLength={24} placeholder="Ej. María ER12"
                  className="arena-btn w-full bg-white/[0.06] border-2 border-white/10 rounded-2xl px-4 text-[16px] text-white placeholder:text-slate-500 focus:outline-none focus:border-gold-400" autoComplete="nickname" />
              </div>
              <div>
                <label className="block text-[11px] font-black uppercase tracking-widest text-slate-300 mb-1.5">Código de sala</label>
                <input value={room} onChange={(e) => setRoom(e.target.value.toUpperCase())} required maxLength={12} placeholder="LEY2492XXX" inputMode="text" autoCapitalize="characters"
                  className="arena-btn w-full bg-white/[0.06] border-2 border-white/10 rounded-2xl px-4 text-[17px] font-mono text-center uppercase tracking-[0.25em] text-gold-200 placeholder:text-slate-600 placeholder:tracking-normal focus:outline-none focus:border-gold-400" />
              </div>
              <button type="submit" className="arena-btn w-full rounded-2xl font-black bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 text-ink-950 text-[17px] shadow-glow-gold active:scale-[0.98] transition">
                Entrar a competir →
              </button>
            </form>
            <p className="text-[10px] text-slate-500">Fondo: Temis de bronce con balanza y espada</p>
          </div>
        </main>
      </>
    );
  }

  if (sessionEnded) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 py-10">
        <div className="glass-panel max-w-md w-full rounded-3xl p-8 space-y-4 border border-gold-500/40 text-center">
          <i className="ph-fill ph-trophy text-5xl text-gold-400"></i>
          <h2 className="text-2xl font-serif font-bold text-white">Sesión Finalizada</h2>
          {sessionEnded.winner && (
            <p className="text-sm text-slate-300">Ganador(a) de la sala: <strong className="text-gold-400">{sessionEnded.winner}</strong></p>
          )}
          <p className="text-xs text-slate-500">Tu puntaje total en esta sesión: <strong className="text-emeraldLaw-400">{totalPoints}</strong></p>
        </div>
      </main>
    );
  }

  if (mode) {
    const GameComponent = GAME_COMPONENTS[mode];
    return (
      <main className="min-h-[100dvh] px-3 sm:px-4 py-4 max-w-xl mx-auto w-full">
        <div className="flex items-center justify-between gap-2 mb-3 px-1">
          <button onClick={() => setMode(null)} className="text-xs font-bold text-slate-300 bg-white/[0.07] border border-white/15 rounded-full px-4 py-2.5 active:scale-95 transition" aria-label="Volver">← Modos</button>
          <span className="text-[11px] font-mono text-gold-300 bg-white/[0.06] px-3 py-2 rounded-full border border-white/10 truncate max-w-[40%]">{room} · {name}</span>
          <span className="text-xs font-black text-ink-950 bg-gradient-to-r from-gold-300 to-gold-500 px-3.5 py-2 rounded-full shrink-0">★ {totalPoints}</span>
        </div>
        <GameComponent onFinish={submitScore} />
      </main>
    );
  }

  const modeArt = { trivia: "🎯", casos: "💼", clasificador: "⚖️", flashcards: "🃏" };
  return (
    <main className="min-h-[100dvh] px-4 py-6 max-w-xl mx-auto w-full">
      <div className="text-center space-y-2 mb-5 anim-rise">
        <p className="text-[11px] font-mono text-gold-300 bg-white/[0.06] inline-block px-4 py-1.5 rounded-full border border-white/10">{room} · {name}</p>
        <h2 className="arena-title text-2xl font-serif font-black">Elige tu duelo</h2>
        <p className="text-xs text-slate-300">Total <strong className="text-mint-300 font-mono text-sm">★ {totalPoints} pts</strong> · suma en cada modo</p>
      </div>

      {lastResult && (
        <div className="mb-4 p-4 rounded-2xl border-2 border-mint-400/40 bg-mint-500/10 text-emerald-100 text-sm text-center anim-pop">
          ¡+{lastResult.points} pts en {GAME_MODES.find(m => m.id === lastResult.mode)?.label}! Elige otro modo para seguir sumando.
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 safe-bottom">
        {GAME_MODES.map((g) => (
          <button key={g.id} onClick={() => setMode(g.id)} disabled={sending}
            className="glass-panel p-4 rounded-3xl active:scale-[0.98] transition text-left flex items-center gap-4 arena-btn disabled:opacity-60">
            <span className="w-14 h-14 rounded-2xl bg-gradient-to-br from-royal-500/40 to-gold-500/30 border border-gold-500/25 flex items-center justify-center text-3xl shrink-0">{modeArt[g.id] || "🎮"}</span>
            <span className="flex-1">
              <span className="block font-serif font-black text-white text-[16px] leading-tight">{g.label}</span>
              <span className="block text-xs text-gold-300 font-bold mt-0.5">{g.points}</span>
            </span>
            <span className="text-gold-400 text-xl font-black shrink-0">→</span>
          </button>
        ))}
      </div>
    </main>
  );
}
