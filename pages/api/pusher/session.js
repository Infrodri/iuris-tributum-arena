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
  const { room, action, payload } = req.body || {};
  if (!room || !action) {
    return res.status(400).json({ error: "room y action son requeridos" });
  }

  const eventName =
    action === "end" ? "session-ended" :
    action === "reset" ? "session-reset" : null;

  if (!eventName) {
    return res.status(400).json({ error: "action debe ser 'end' o 'reset'" });
  }

  try {
    const channel = `room-${String(room).toUpperCase().trim()}`;
    await pusher.trigger(channel, eventName, payload || {});
    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: "No se pudo notificar a la sala" });
  }
}
