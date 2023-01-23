import { ApplicationCommandType, EmbedBuilder } from "discord.js";
import { PrefixCommand } from "../../interfaces/PrefixCommand";

export const ConfessionsUnban: PrefixCommand = {
  name: "confessions-unban",
  commandDescription: "Unban the user to allow the use of confessions again.",
  usage: `${(process.env.PREFIX as string) || "?"}confessions-unban [user_id]`,
  type: ApplicationCommandType.Message,
  defaultMemberPermissions: ["Administrator"],
  run: async (client, message, db) => {
    const unbanArguments = message.content.split(/ +/g);
    unbanArguments.shift();

    const user_id = unbanArguments[0];

    const confessions_banned_ids = db.table("confessions_banned_ids");
    const user = await confessions_banned_ids.get(user_id);

    // Check if user doesn't exist in the banned list.
    if (!user) {
      return await message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setTitle("Error!")
            .setDescription("This user doesn't exist in the banned list.")
            .setTimestamp(),
        ],
      });
    }

    // Check if message author id is the same with user_id
    if (user_id === message.author.id) {
      return await message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setTitle("Error!")
            .setDescription(
              "You cannot unban yourself. Please let the other staffs do it."
            )
            .setTimestamp(),
        ],
      });
    }

    await confessions_banned_ids.delete(user_id);

    return await message.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("Confessions Unban")
          .addFields(
            {
              name: "***Banned User:***",
              value: `<@${user_id}>`,
            },
            {
              name: "***Unbanned by:***",
              value: `${message.author.tag} <@${message.author.id}>`,
            }
          )
          .setColor("Green"),
        new EmbedBuilder()
          .setDescription(
            `If you think you've unbanned the wrong user, use this command instead:
            ` +
              "`?confessions-ban " +
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
