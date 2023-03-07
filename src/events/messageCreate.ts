import { PrefixCommands } from "../containers/PrefixCommands";
import { Client, Message, PermissionsBitField } from "discord.js";
import ChatGPTOfficial from "../functions/ChatGPTOfficial";
import DALLE from "../functions/DALLE";

export default (client: Client): void => {
  client.on("messageCreate", async (message: Message) => {
    if (message.channel.type === 1) return;
    if (message.author.bot) return;

    // ChatGPT
    if (
      message.channel.id === process.env.PUBLIC_CHATGPT_CHANNEL ||
      message.channel.id === process.env.STAFF_CHATGPT_CHANNEL
    )
      ChatGPTOfficial(message);

    // DALL-E
    // if (message.channel.id === process.env.DALL_E_CHANNEL) DALLE(message);

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
        prefixCommand?.run(client, message);
      } catch (error) {
        console.error(error);
      }
    }
  });
};
