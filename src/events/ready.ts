import { Client, ComponentType, TextChannel } from "discord.js";
import { Commands } from "../containers/Commands";

const date = new Date();

export default (client: Client): void => {
  client.on("ready", async () => {
    if (!client.user || !client.application) return;

    Commands.forEach((command) => {
      console.log(
        `[${date.toUTCString()}]\n[Command: ${
          command.name
        }] has been loaded, and is ready to use. \nUsage: ${command.usage}\n`
      );
    });

    await client.application.commands.set(Commands);

    console.log(`\n[${date.toUTCString()}] ${client.user.tag} is online!`);
  });
};
