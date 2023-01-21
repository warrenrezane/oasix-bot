import { Client, ComponentType, TextChannel } from "discord.js";
import { QuickDB } from "quick.db";
import { Commands } from "../containers/Commands";

export default (client: Client, db: QuickDB): void => {
  client.on("ready", async () => {
    if (!client.user || !client.application) return;

    Commands.forEach((command) => {
      console.log(
        `[Command: ${command.name}] has been loaded, and is ready to use.`
      );
    });

    await client.application.commands.set(Commands);

    console.log(`\n${client.user.tag} is online!`);
  });
};
