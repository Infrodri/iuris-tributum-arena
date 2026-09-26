import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { getPusherClient, roomChannelName } from "../lib/pusherClient";

function randomRoomCode() {
  const words = ["LEY2492", "TRIBUTO", "FISCO", "AUDITORIA", "CONSULTA", "REPETICION", "BOLIVIA"];
  const w = words[Math.floor(Math.random() * words.length)];
  const n = Math.floor(100 + Math.random() * 900);
  return `${w}${n}`;
}

export default function Docente() {
  const [room, setRoom] = useState("");
  const [board, setBoard] = useState({}); // { name: { points, time, modes:Set } }
  const [ended, setEnded] = useState(false);
  const [origin, setOrigin] = useState("");
  const channelRef = useRef(null);

  useEffect(() => {
    setOrigin(window.location.origin);
    setRoom(randomRoomCode());
  }, []);

  useEffect(() => {
    if (!room) return;
    const pusher = getPusherClient();
    if (!pusher) return;

    if (channelRef.current) {
      channelRef.current.unbind_all();
      pusher.unsubscribe(channelRef.current.name);
    }

    const channel = pusher.subscribe(roomChannelName(room));
    channelRef.current = channel;

    channel.bind("new-score", (data) => {
      setBoard((prev) => {
        const existing = prev[data.name] || { points: 0, time: 0, modes: [] };
        return {
          ...prev,
          [data.name]: {
            points: existing.points + (data.points || 0),
            time: existing.time + (data.time || 0),
            modes: [...existing.modes, data.mode]
          }
        };
      });
    });

    return () => {
      channel.unbind_all();
      pusher.unsubscribe(roomChannelName(room));
    };
  }, [room]);

  const ranking = Object.entries(board)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => (b.points !== a.points ? b.points - a.points : a.time - b.time));

  function newRoom() {
    setBoard({});
    setEnded(false);
    setRoom(randomRoomCode());
  }

  async function finishSession() {
    const winner = ranking[0]?.name || null;
    setEnded(true);
    try {
      await fetch("/api/pusher/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ room, action: "end", payload: { winner } })
      });
      if (typeof confetti === "function") {
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      }
    } catch (e) {}
  }

  async function resetRoom() {
    setBoard({});
    setEnded(false);
    try {
      await fetch("/api/pusher/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ room, action: "reset" })
      });
    } catch (e) {}
  }

  const joinUrl = origin && room ? `${origin}/?room=${encodeURIComponent(room)}` : "";
  const qrSrc = joinUrl ? `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(joinUrl)}` : "";

  return (
    <>
      <Head><title>Iuris Tributum Arena · Docente</title></Head>
      <main className="min-h-screen px-4 py-8 max-w-5xl mx-auto space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-serif font-bold text-white">Panel del Docente</h1>
            <p className="text-xs text-slate-400">Proyecta esta pantalla — el ranking se actualiza solo.</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={newRoom} className="px-4 py-2 rounded-xl bg-deep-850 hover:bg-deep-800 border border-deep-700 text-slate-200 text-xs font-bold">
              Nueva Sala
            </button>
            <button onClick={resetRoom} className="px-4 py-2 rounded-xl bg-deep-850 hover:bg-deep-800 border border-rose-500/40 text-rose-300 text-xs font-bold">
              Reiniciar Sala
            </button>
            <button onClick={finishSession} className="px-4 py-2 rounded-xl bg-gradient-to-r from-gold-500 to-amber-600 text-deep-950 text-xs font-bold">
              Finalizar Sesión
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel rounded-3xl p-6 border border-gold-500/30 text-center space-y-4">
            <div className="bg-white p-3 rounded-2xl inline-block">
              {qrSrc && <img src={qrSrc} alt="QR de la sala" className="w-44 h-44" />}
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Código de sala</span>
              <span className="font-mono text-2xl font-black text-gold-400 tracking-widest">{room}</span>
            </div>
            <p className="text-[11px] text-slate-500 break-all">{joinUrl}</p>
          </div>

          <div className="md:col-span-2 glass-panel rounded-3xl border border-deep-700/80 overflow-hidden">
            <div className="grid grid-cols-12 bg-deep-900 px-4 py-3 text-[11px] font-bold uppercase text-slate-400 border-b border-deep-800">
              <div className="col-span-2 text-center">Puesto</div>
              <div className="col-span-6">Estudiante</div>
              <div className="col-span-2 text-center">Tiempo</div>
              <div className="col-span-2 text-right">Puntos</div>
            </div>
            <div className="divide-y divide-deep-900 max-h-[420px] overflow-y-auto">
              {ranking.length === 0 && (
                <div className="p-8 text-center text-sm text-slate-500">Esperando a que los estudiantes se unan y jueguen...</div>
              )}
              {ranking.map((p, idx) => (
                <div key={p.name} className="grid grid-cols-12 px-4 py-3 text-sm items-center text-slate-200">
                  <div className="col-span-2 text-center font-bold">
                    {idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : `#${idx + 1}`}
                  </div>
                  <div className="col-span-6 truncate">{p.name}</div>
                  <div className="col-span-2 text-center font-mono text-slate-400">{p.time}s</div>
                  <div className="col-span-2 text-right font-serif font-bold text-emeraldLaw-400">{p.points}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {ended && ranking[0] && (
          <div className="glass-panel p-6 rounded-3xl border border-gold-500/40 text-center">
            <p className="text-sm text-slate-300">Sesión finalizada. Ganador(a):</p>
            <p className="text-2xl font-serif font-bold text-gold-400">{ranking[0].name}</p>
          </div>
        )}
      </main>
    </>
  );
}
