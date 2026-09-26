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
        <main className="min-h-screen flex items-center justify-center px-4 py-10">
          <div className="glass-panel max-w-md w-full rounded-3xl p-8 space-y-6 border border-deep-700/80 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-500 to-amber-600 flex items-center justify-center text-3xl mx-auto text-deep-950">
              <i className="ph-bold ph-scales"></i>
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-white">Iuris Tributum Arena</h1>
              <p className="text-xs text-slate-400 mt-1">Ley Nº 2492 · Práctica Tributaria Boliviana</p>
            </div>
            <form onSubmit={handleJoin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold uppercase text-gold-400 mb-1.5">Tu nombre</label>
                <input value={name} onChange={(e) => setName(e.target.value)} required maxLength={24}
                  className="w-full bg-deep-950 border border-deep-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Código de sala</label>
                <input value={room} onChange={(e) => setRoom(e.target.value.toUpperCase())} required maxLength={12}
                  className="w-full bg-deep-950 border border-deep-700 rounded-xl px-4 py-3 text-sm font-mono text-center uppercase tracking-widest text-gold-300 focus:outline-none focus:border-gold-500" />
              </div>
              <button type="submit" className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-gold-500 to-amber-600 text-deep-950 text-sm">
                Entrar a Competir
              </button>
            </form>
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
      <main className="min-h-screen px-4 py-6 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-4 text-xs text-slate-400">
          <span>Sala <strong className="text-gold-400 font-mono">{room}</strong> · {name}</span>
          <span>Total: <strong className="text-emeraldLaw-400">{totalPoints}</strong></span>
        </div>
        <GameComponent onFinish={submitScore} />
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-8 max-w-2xl mx-auto">
      <div className="text-center space-y-1 mb-6">
        <p className="text-xs text-slate-400">Sala <strong className="text-gold-400 font-mono">{room}</strong> · {name}</p>
        <h2 className="text-xl font-serif font-bold text-white">Elige un modo de juego</h2>
        <p className="text-xs text-slate-500">Puntaje total acumulado: <strong className="text-emeraldLaw-400">{totalPoints}</strong></p>
      </div>

      {lastResult && (
        <div className="mb-5 p-4 rounded-xl border border-emeraldLaw-500/30 bg-emeraldLaw-800/15 text-emerald-200 text-xs text-center">
          Enviaste {lastResult.points} pts en {GAME_MODES.find(m => m.id === lastResult.mode)?.label}. ¡Elige otro modo!
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {GAME_MODES.map((g) => (
          <button key={g.id} onClick={() => setMode(g.id)} disabled={sending}
            className="glass-panel p-5 rounded-2xl border border-deep-700/80 hover:border-gold-500/50 transition text-left space-y-2">
            <i className={`ph-bold ${g.icon} text-2xl text-gold-400`}></i>
            <h3 className="font-serif font-bold text-white">{g.label}</h3>
            <p className="text-xs text-slate-400">{g.points}</p>
          </button>
        ))}
      </div>
    </main>
  );
}
