import { Client, ComponentType, TextChannel } from "discord.js";
import { QuickDB } from "quick.db";
import { Commands } from "../containers/Commands";

export default (client: Client, db: QuickDB): void => {
  client.on("ready", async () => {
    if (!client.user || !client.application) return;

    await client.application.commands.set(Commands);

    Commands.forEach((command) => {
      console.log(
        `[Command: ${command.name}] has been loaded, and is ready to use.`
      );
    });

    console.log(`${client.user.username} is online!`);
  });
};
