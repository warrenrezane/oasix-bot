import { PrefixCommands } from "../containers/PrefixCommands";
import { Client, Message, PermissionsBitField } from "discord.js";
import { MySQLDriver } from "quick.db";
import ChatGPT from "../functions/ChatGPT";

export default (client: Client, mysql: MySQLDriver): void => {
  client.on("messageCreate", async (message: Message) => {
    if (message.channel.type !== 0) return;
    if (message.author.bot) return;

    // ChatGPT
    if (
      message.channel.id === process.env.CHATGPT_CHANNEL ||
      message.channel.id === process.env.STAFF_CHATGPT_CHANNEL
    )
      ChatGPT(message, mysql);

    const prefix = process.env.PREFIX || "?";

    if (!message.content.startsWith(prefix)) return;
    if (!message.guild) return;

    const args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g)
      .shift()
      ?.toLowerCase();
    if (args?.length == 0) return;

    let prefixCommand = PrefixCommands.find((command) => command.name === args);

    if (!prefixCommand) return;

    if (prefixCommand) {
      if (prefixCommand.defaultMemberPermissions) {
        if (
          !message.member?.permissions.has(
            PermissionsBitField.resolve(
              prefixCommand.defaultMemberPermissions || []
            )
          )
        ) {
          return;
        }
      }

      try {
        prefixCommand?.run(client, message, mysql);
      } catch (error) {
        console.error(error);
      }
    }
  });
};
