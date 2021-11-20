import { SERVER_URL } from "./config";
import { wait } from "./wait";
import fetch from "node-fetch-commonjs";


async function getToken(): Promise<string | undefined> {
  return fetch(`${SERVER_URL}/api/token`).then(res => res.json()).then(json => (json as { token: string | undefined; }).token);
}
export async function pullToken(): Promise<string> {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error(`Token empty`);
    }
    return token;
  } catch (error) {
    console.log(`No token, retry`, error);
    await wait(1000);
    return await pullToken();
  }
}
