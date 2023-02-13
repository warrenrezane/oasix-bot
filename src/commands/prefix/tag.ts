import { EmbedBuilder } from "@discordjs/builders";
import { ApplicationCommandType } from "discord.js";
import { QuickDB } from "quick.db";
import { PrefixCommand } from "../../interfaces/PrefixCommand";

const subcommands = ["create", "delete", "guides"];

export const Tag: PrefixCommand = {
  name: "tag",
  commandDescription: "This command allows to create, edit, or delete tags.",
  usage: `${process.env.PREFIX as string}tag ...[subcommand]`,
  type: ApplicationCommandType.Message,
  defaultMemberPermissions: ["SendMessages"],
  run: async (client, message, mysql) => {
    await mysql!.connect();
    const db = new QuickDB({ driver: mysql });
    const tags = db.table("tags");

    const tag_arguments = message.content.split(/ +/g);
    tag_arguments.shift();

    if (subcommands.includes(tag_arguments[0])) {
      const subcommand = tag_arguments[0];

      switch (subcommand) {
        case "create":
          // Check array length (should be 3, [index_1 = tag_name, index_2 = content])
          if (tag_arguments.length < 3) {
            return message.channel.send({
              embeds: [
                new EmbedBuilder()
                  .setColor(0xb33a3a)
                  .setDescription(
                    (("❌ Missing `alias` or `content`.\nCommand usage: `" +
                      process.env.PREFIX) as string) +
                      "tag create <alias> <content>`"
                  ),
              ],
            });
          }

          // Check if tag already exists
          if (await tags.get(tag_arguments[1])) {
            return message.channel.send({
              embeds: [
                new EmbedBuilder()
                  .setColor(0xb33a3a)
                  .setDescription(`❌ This tag already exists.`),
              ],
            });
          }

          // Create the tag
          await tags.set(`${tag_arguments[1]}`, {
            message: tag_arguments.slice(2).join(" "),
            createdBy: message.author.id,
          });

          return await message.channel.send({
            embeds: [
              new EmbedBuilder()
                .setColor(0x00ff00)
                .setDescription(
                  "✅ Tag `" +
                    tag_arguments[1] +
                    "` has been successfully created."
                ),
            ],
          });

        case "delete":
          // Check array length (should be 2, [index_1 = tag_name])
          if (tag_arguments.length < 2) {
            return message.channel.send({
              embeds: [
                new EmbedBuilder()
                  .setColor(0xb33a3a)
                  .setDescription(
                    (("❌ Missing `alias`. \nCommand usage: `" +
                      process.env.PREFIX) as string) + "tag delete <alias>`"
                  ),
              ],
            });
          }

          // Limit: Too much arguments
          if (tag_arguments.length >= 3) {
            return message.channel.send({
              embeds: [
                new EmbedBuilder()
                  .setColor(0xb33a3a)
                  .setDescription(
                    (("❌ Too much arguments. \nCommand usage: `" +
                      process.env.PREFIX) as string) + "tag delete <alias>`"
                  ),
              ],
            });
          }

          const res: { message: string; createdBy: string } | null =
            await tags.get(tag_arguments[1]);

          // Check if tag exists
          if (!res) {
            return message.channel.send({
              embeds: [
                new EmbedBuilder()
                  .setColor(0xb33a3a)
                  .setDescription("❌ This tag doesn't exist."),
              ],
            });
          }

          // Check if tag creator is same with the message author's ID
          if (res.createdBy !== message.author.id) {
            return message.channel.send({
              embeds: [
                new EmbedBuilder()
                  .setColor(0xb33a3a)
                  .setDescription(
                    "❌ You don't own this tag, so you cannot delete it."
                  ),
              ],
            });
          }

          // Delete the tag
          await tags.delete(tag_arguments[1]);
          return message.channel.send({
            embeds: [
              new EmbedBuilder()
                .setColor(0x00ff00)
                .setDescription(
                  "🗑️ Tag `" +
                    tag_arguments[1] +
                    "` has been successfully deleted."
                ),
            ],
          });

        case "guides":
          return message.channel.send({
            embeds: [
              new EmbedBuilder()
                .setTitle("**Tags Command Guides v1.0**")
                .setColor(0xffffff)
                .setDescription(
                  `__**Get a tag**__
							Command: ` +
                    "`?tag <alias>`" +
                    `\n
							__**Create a new tag**__
							Command: ` +
                    "`?tag create <alias> <content>`" +
                    `\n
              __**Show command guides**__
							Command: ` +
                    "`?tag guides`" +
                    `\n
							`
                )
                .setTimestamp(),
            ],
          });
      }
    } else if (typeof tag_arguments[0] === "undefined") {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(0xb33a3a)
            .setDescription("Missing <alias> or <subcommand>"),
          new EmbedBuilder()
            .setTitle("**Tags Command Guides v1.0**")
            .setColor(0xffffff)
            .setDescription(
              `__**Get a tag**__
							Command: ` +
                "`?tag <alias>`" +
                `\n
							__**Create a new tag**__
							Command: ` +
                "`?tag create <alias> <content>`" +
                `\n
              __**Show command guides**__
              Command: ` +
                "`?tag guides`" +
                `\n
							`
            )
            .setTimestamp(),
        ],
      });
    } else {
      const res: { message: string } | null = await tags.get(tag_arguments[0]);

      if (!res) {
        return message.channel.send({
          embeds: [
            new EmbedBuilder()
              .setColor(0xb33a3a)
              .setDescription("❌ This tag doesn't exist."),
          ],
        });
      } else {
        return message.channel.send({
          content: res.message,
        });
      }
    }
  },
};
