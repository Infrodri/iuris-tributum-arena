import Pusher from "pusher-js";

let instance = null;

export function getPusherClient() {
  if (typeof window === "undefined") return null;
  if (!instance) {
    instance = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER
    });
  }
  return instance;
}

export function roomChannelName(room) {
  return `room-${String(room).toUpperCase().trim()}`;
}
