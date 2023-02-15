import { ApplicationCommandType, EmbedBuilder } from "discord.js";
import { QuickDB } from "quick.db";
import { PrefixCommand } from "../../interfaces/PrefixCommand";

export const ConfessionsBan: PrefixCommand = {
  name: "confessions-ban",
  commandDescription: "Ban the user from using command.",
  usage: `${(process.env.PREFIX as string) || "?"}confessions-ban [user_id]`,
  type: ApplicationCommandType.Message,
  defaultMemberPermissions: ["Administrator"],
  run: async (client, message) => {
    // Connect to QuickDB
    const db = new QuickDB({ filePath: "oasix.sqlite" });

    const banArguments = message.content.split(/ +/g);
    banArguments.shift();

    const user_id = banArguments[0];

    // Check if message author id is the same with user_id
    if (user_id === message.author.id) {
      return await message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setTitle("Error!")
            .setDescription(
              "You cannot ban yourself. Please let the other staffs do it."
            )
            .setTimestamp(),
        ],
      });
    }

    client.guilds.cache
      .get(process.env.GUILD_ID as string)
      ?.members.fetch(user_id)
      .catch(async (err) => {
        await message.reply({
          embeds: [
            new EmbedBuilder()
              .setColor("Red")
              .setTitle("Error!")
              .setDescription("This user is not a member of this server.")
              .setTimestamp(),
          ],
        });
      });

    const confessions_banned_ids = db.table("confessions_banned_ids");

    // Check if user has already existed in the banned list.
    const user = await confessions_banned_ids.get(user_id);

    if (user) {
      return await message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setTitle("Error!")
            .setDescription("This user has already existed in the banned list.")
            .setTimestamp(),
        ],
      });
    }

    await confessions_banned_ids.set(user_id, { user_id });

    const banned_user = client.guilds.cache
      .get(process.env.GUILD_ID as string)
      ?.members.cache.get(user_id);

    if (typeof banned_user === "undefined") return; // There should be a message here.

    banned_user!.send({
      embeds: [
        new EmbedBuilder()
          .setColor("Red")
          .setTitle("Confessions Banned!")
          .setDescription(
            "You've been banned for using the confession commands. Please contact the staff to process your appeal."
          ),
      ],
    });

    return await message.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("Confessions Ban Request Approved!")
          .addFields({
            name: "***Banned by:***",
            value: `${message.author.tag} <@${message.author.id}>`,
          })
          .setColor("Green"),
        new EmbedBuilder()
          .setDescription(
            `If you think you've banned the wrong user, use this command instead:
            ` +
              "`?confessions-unban " +
              user_id +
              "`" +
              `, and re-run the command with the correct details.
            `
          )
          .setColor("Green")
          .setTimestamp(),
      ],
    });
  },
};
