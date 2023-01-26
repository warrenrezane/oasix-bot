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
  }embed [channel_id] [...embed_names (separated with "|")]`,
  type: ApplicationCommandType.Message,
  defaultMemberPermissions: ["Administrator"],
  run: async (client, message) => {
    const embedArguments = message.content.split(/ +/g);
    embedArguments.shift();

    const channel_id = embedArguments[0];
    const embedArray = embedArguments[1].split("|");

    const exists = client.channels.cache.find((c) => c.id === channel_id);

    if (typeof exists === "undefined") {
      await message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setTitle("Error!")
            .setDescription("Sorry, this channel does not exist."),
        ],
      });
    } else {
      embedArray.forEach(async (data) => {
        const embed = EmbedsContainer.find((e) => e.name === data);

        if (!embed) {
          await message.reply({
            embeds: [
              new EmbedBuilder()
                .setColor("Red")
                .setTitle("Error!")
                .setDescription(`Sorry, ${data} embed does not exist.`),
            ],
          });
        }

        (client.channels.cache.get(channel_id) as TextChannel).send({
          embeds: embed!.embeds,
          files: "files" in embed! ? embed.files : undefined,
          components: "components" in embed! ? embed.components : undefined,
        });
      });
    }
  },
};
