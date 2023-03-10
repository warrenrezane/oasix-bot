import { EmbedBuilder } from "@discordjs/builders";
import { ApplicationCommandType } from "discord.js";
import path from "path";
import { QuickDB } from "quick.db";
import { PrefixCommand } from "../../interfaces/PrefixCommand";

export const Tags: PrefixCommand = {
  name: "tags",
  commandDescription: "Show all available tags.",
  usage: `${process.env.PREFIX as string}tags`,
  type: ApplicationCommandType.Message,
  defaultMemberPermissions: ["ModerateMembers"],
  run: async (client, message) => {
    // Connect to QuickDB
    const db = new QuickDB({ filePath: "oasix.sqlite" });

    let tags = "";
    const results = await db.table("tags").all();

    if (!results.length) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(0xb33a3a)
            .setDescription("❌ There are no tags available."),
        ],
      });
    } else {
      results.forEach((result, index) => {
        tags += `__${result.id}__`;

        if (index !== results.length - 1) {
          tags += ", ";
        }
      });

      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setTitle("**Available Tags**")
            .setDescription(`${tags}`)
            .setColor(0xffffff),
        ],
      });
    }
  },
};
