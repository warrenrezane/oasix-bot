import { EmbedsContainer } from "../../containers/EmbedsContainer";
import { ApplicationCommandType, EmbedBuilder, TextChannel } from "discord.js";
import { PrefixCommand } from "../../interfaces/PrefixCommand";

export const Embed: PrefixCommand = {
  name: "embed",
  commandDescription: "Outputs an embed message to a specific channel.",
  additionalInfo:
    (("To get a list of embeds, use `" + process.env.PREFIX) as string) ||
    "?" + "embeds`.",
  usage: `${
    (process.env.PREFIX as string) || "?"
  }embed [channel_id] [embed_name]`,
  type: ApplicationCommandType.Message,
  defaultMemberPermissions: ["Administrator"],
  run: async (client, message) => {
    const embedArguments = message.content.split(/ +/g);
    embedArguments.shift();

    const channel_id = embedArguments[0];
    const embed = EmbedsContainer.find((e) => e.name === embedArguments[1]);

    const exists = client.channels.cache.find((c) => c.id === channel_id);

    if (typeof exists === "undefined") {
      await message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setDescription("Sorry, this channel doesn't exist."),
        ],
      });
    } else {
      (client.channels.cache.get(channel_id) as TextChannel).send({
        embeds: embed!.embeds,
        components: "components" in embed! ? embed.components : undefined,
      });

      message.delete();
    }
  },
};
