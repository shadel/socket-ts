import { setupSocket } from "./socket";
import { pullToken } from "./token";


async function main() {
  const token = await pullToken();
  setupSocket({token}, () => {
    console.log(`Realtime is teminated!`)
    run();
  });
}

function run() {
  main().then(() => {
    console.log(`Client start success!`);
  }).catch((err) => {
    console.log(`Client start failed!`, err);
  });
  
}

run();