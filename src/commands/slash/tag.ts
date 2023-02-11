import { EmbedBuilder } from "@discordjs/builders";
import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  CommandInteractionOptionResolver,
} from "discord.js";
import { QuickDB } from "quick.db";
import { SlashCommand } from "../../interfaces/SlashCommand";

export const Tag: SlashCommand = {
  name: "tag",
  description: "Display the text registered to the given tag.",
  usage: `/tag set [alias] [message]`,
  options: [
    {
      name: "set",
      description: "Set a tag. ",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "alias",
          description: "The alias of the tag.",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
        {
          name: "message",
          description: "The message of the tag",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    },
    {
      name: "view",
      description: "Retrieve the tag message.",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "alias",
          description: "Retrieve the tag message.",
          type: ApplicationCommandOptionType.String,
        },
      ],
    },
  ],
  type: ApplicationCommandType.ChatInput,
  defaultMemberPermissions: ["SendMessages"],
  run: async (client, interaction, mysql) => {
    await mysql!.connect();
    const db = new QuickDB({ driver: mysql });
    const tags = db.table("tags");

    if (
      (
        interaction.options as CommandInteractionOptionResolver
      ).getSubcommand() === "set"
    ) {
      const alias = (
        interaction.options as CommandInteractionOptionResolver
      ).getString("alias");
      const message = (
        interaction.options as CommandInteractionOptionResolver
      ).getString("alias");

      if (await tags.get(`${message}`)) {
        return await interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setColor(0xb33a3a)
              .setTitle("Error!")
              .setDescription(`This tag already exists.`),
          ],
        });
      }

      await tags.set(`${alias}`, {
        message: message,
        createdBy: interaction.user.id,
      });

      return await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(0x00ff00)
            .setDescription(`Tag [${alias}]has been successfully created.`)
            .setFooter({
              text: `Usage: /tag [alias]`,
            }),
        ],
      });
    }

    const alias = (
      interaction.options as CommandInteractionOptionResolver
    ).getString("alias");

    const tag: { message: string; createdBy: string } | null = await tags.get(
      `${alias}`
    );

    if (!tag) {
      return await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(0xb33a3a)
            .setTitle("Error!")
            .setDescription(`This tag doesn't exist.`),
        ],
      });
    }

    return await interaction.reply({
      content: tag!.message,
    });
  },
};
