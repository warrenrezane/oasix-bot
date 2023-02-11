import { ApplicationCommandType, EmbedBuilder } from "discord.js";
import { QuickDB } from "quick.db";
import { SlashCommand } from "../../interfaces/SlashCommand";

export const Tags: SlashCommand = {
  name: "tags",
  usage: `/tags`,
  description: "Display all the registered tags.",
  type: ApplicationCommandType.ChatInput,
  defaultMemberPermissions: ["SendMessages"],
  run: async (client, interaction, mysql) => {
    await mysql!.connect();
    const db = new QuickDB({ driver: mysql });

    let availableTags = "";

    const tags = db.table("tags");
    const results = await tags.all();

    results.forEach((result, index) => {
      if (index == results.length - 1) {
        availableTags += result.id;
      } else {
        availableTags += result.id + ", ";
      }
    });

    return await interaction.reply({
      embeds: [
        new EmbedBuilder().setFields({
          name: "**Available Tags**",
          value: availableTags,
        }),
      ],
    });
  },
};
