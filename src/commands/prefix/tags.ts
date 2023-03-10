import { EmbedBuilder } from "@discordjs/builders";
import { ApplicationCommandType } from "discord.js";
import path from "path";
import { QuickDB } from "quick.db";
import { PrefixCommand } from "../../interfaces/PrefixCommand";

const subcommands = ["flush"];

export const Tags: PrefixCommand = {
  name: "tags",
  commandDescription: "Show all available tags.",
  usage: `${process.env.PREFIX as string}tags`,
  type: ApplicationCommandType.Message,
  defaultMemberPermissions: ["ModerateMembers"],
  run: async (client, message) => {
    // Connect to QuickDB
    const db = new QuickDB({ filePath: "oasix.sqlite" });

    let collection = "";
    const tags = db.table("tags");
    const results = await tags.all();

    const tag_arguments = message.content.split(/ +/g);

    if (tag_arguments.length < 2) {
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
          collection += `__${result.id}__`;

          if (index !== results.length - 1) {
            collection += ", ";
          }
        });

        return message.channel.send({
          embeds: [
            new EmbedBuilder()
              .setTitle("**Available Tags**")
              .setDescription(`${collection}`)
              .setColor(0xffffff),
          ],
        });
      }
    } else {
      tag_arguments.shift();

      if (subcommands.includes(tag_arguments[0])) {
        const subcommand = tag_arguments[0];

        switch (subcommand) {
          case "flush":
            if (
              !message.member?.roles.cache.some((role) => role.name === "STAFF")
            ) {
              return message.channel.send({
                embeds: [
                  new EmbedBuilder()
                    .setColor(0xb33a3a)
                    .setDescription(
                      "❌ You have no rights to use this command."
                    ),
                ],
              });
            }

            await tags.deleteAll();

            return message.channel.send({
              embeds: [
                new EmbedBuilder()
                  .setColor(0x00ff00)
                  .setDescription("🗑️ All tags has been succesfully flushed."),
              ],
            });
        }
      }
    }
  },
};
