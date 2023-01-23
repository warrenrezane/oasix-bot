import { EmbedsContainer } from "../../containers/EmbedsContainer";
import { ApplicationCommandType, EmbedBuilder } from "discord.js";
import { PrefixCommand } from "../../interfaces/PrefixCommand";

export const Embeds: PrefixCommand = {
  name: "embeds",
  usage: `${(process.env.PREFIX as string) || "?"}embeds`,
  commandDescription: "Lists all of the available embeds.",
  type: ApplicationCommandType.Message,
  defaultMemberPermissions: ["Administrator"],
  run: async (client, message, db) => {
    let data: string = "";

    EmbedsContainer.forEach((e, index) => {
      data += `${index + 1}. __**${e.name}**__\n`;
    });

    await message.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("Available Embeds")
          .setDescription(data)
          .setColor("White"),
      ],
    });
  },
};
