import { setupSocket } from "./socket";
import { pullToken } from "./token";


async function main() {
  const token = await pullToken();
  setupSocket({token});
}

main().then(() => {
  console.log(`Client start success!`);
}).catch((err) => {
  console.log(`Client start failed!`, err);
});