import { Client } from "discord.js";
import { Commands } from "../containers/Commands";
import Time from "../functions/Time";

export default (client: Client): void => {
  client.on("ready", async () => {
    if (!client.user || !client.application) return;

    Commands.forEach((command) => {
      console.log(
        `[${Time()}]\n[Command: ${
          command.name
        }] has been loaded, and is ready to use. \nUsage: ${command.usage}\n`
      );
    });

    await client.application.commands.set(Commands);

    console.log(`[${Time()}]\n${client.user.tag} is online!`);
  });
};
