import { Client } from "discord.js";
import { Commands } from "../containers/Commands";
import Time from "../functions/Time";

export default (client: Client): void => {
  client.once("ready", async () => {
    console.log(`[${Time()}]\n${client.user!.tag} is online!`);
  });
};
