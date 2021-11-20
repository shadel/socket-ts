/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import { Server, Socket } from "socket.io";
import { createServer } from "http";
const tokens: string[] = [];

const app = express();
const PORT = 3000;

const httpServer = createServer(app);
const io = new Server(httpServer, {
  path: "/realtime/"
});

io.use((socket, next) => {
  const handshakeToken = socket.handshake.auth?.token;
  if (!tokens.includes(handshakeToken)) {
    return next(new Error(`Unauthentication`));
  }
  return next();
})


io.on("connection", (socket: Socket) => {
  // ...
  console.log("connection", socket.id);
  socket.on("disconnect", () => {
    console.log("disconnect", socket.id);
  })
});

app.get("/api", (req: express.Request, res: express.Response) => {
  res.send("nodejs - express + typescript");
});

function checkAllowToken() {
  const num = Math.floor(Math.random() * 100);

  return num % 3 === 0;
}

function tokenAllocation() {
  const token = `${new Date().getTime()}_${Math.random()}`;
  tokens.push(token);
  return token;
}

app.get("/api/token", (req: express.Request, res: express.Response) => {
  if (!checkAllowToken()) {
    res.send(JSON.stringify({token: ""}));
    return;
  }
  const token = tokenAllocation();
  res.send(JSON.stringify({token}));
});

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
