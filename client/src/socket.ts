import { io } from "socket.io-client";
import { SERVER_URL } from "./config";

export function setupSocket({ token }: { token: string; }): void {
  const socket = io(`${SERVER_URL}`, {
    path: "/realtime/",
    auth: {
      token
    }
  });

  socket.on("connect_error", (errs) => {
    // revert to classic upgrade
    console.log("connect_error", { errs });
  });
  socket.on("connect", () => {
    // revert to classic upgrade
    console.log("connected");
  });
}
