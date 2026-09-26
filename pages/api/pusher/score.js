import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
  useTLS: true
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }
  const { room, name, mode, points, time } = req.body || {};
  if (!room || !name) {
    return res.status(400).json({ error: "room y name son requeridos" });
  }

  try {
    const channel = `room-${String(room).toUpperCase().trim()}`;
    await pusher.trigger(channel, "new-score", {
      name: String(name).slice(0, 40),
      mode: mode || "desconocido",
      points: Number(points) || 0,
      time: Number(time) || 0,
      ts: Date.now()
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: "No se pudo enviar el puntaje" });
  }
}
