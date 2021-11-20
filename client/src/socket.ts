import { io, Socket } from "socket.io-client";
import { SERVER_URL } from "./config";

function emitMessage(socket: Socket) {
  return setInterval(() => {
    if (socket.connected) {
      const message = Date.now();
      console.log("emit", ["test", message]);
      socket.emit("test", message);
    }
  }, 10 * 1000)
}

export function setupSocket({ token }: { token: string; }, error: (err: Error) => void): void {
  const socket = io(`${SERVER_URL}`, {
    path: "/realtime/",
    auth: {
      token
    }
  });

  // const socketHeath = {live: false}
  const timer = emitMessage(socket);

  socket.on("connect_error", (errs) => {
    // revert to classic upgrade
    console.log("connect_error", { errs });
    if (errs.message === "Unauthentication") {
      clearInterval(timer);
      error(errs);
      socket.removeAllListeners();
      socket.close();
    }
  });
  socket.on("connect", () => {
    // revert to classic upgrade
    console.log("connected");
  });
}


