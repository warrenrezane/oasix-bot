import { EmbedBuilder } from "discord.js";
import { Embed } from "../../interfaces/Embed";

export const ConfessionsInstructionsEmbed: Embed = {
  name: "confessions-instructions",
  shouldRetain: true,
  embeds: [
    new EmbedBuilder()
      .setAuthor({
        name: "Oasix",
        iconURL:
          "https://media.discordapp.net/attachments/1057743418954088519/1057743581915402340/OASIX_white_badge_-_norm.gif",
      })
      .setTitle("Confession Instructions")
      .setDescription(
        `
        __**TO CREATE A CONFESSION**__
        **Direct Message** the <@${
          process.env.CLIENT_ID as string
        }> bot, and run the following command:
        ` +
          "```/confess submit [confession]```" +
          `
        __**TO REPLY TO A CONFESSION**__
        **Direct Message** the <@${
          process.env.CLIENT_ID as string
        }> bot, and run the following command:
        ` +
          "```/confess reply [The ID of confession] [Reply]```" +
          `
        __**TO REPORT A CONFESSION**__
        **Direct Message** the <@${
          process.env.CLIENT_ID as string
        }> bot, and run the following command:
        ` +
          "```/confess report [The ID of confession] [Reason]```" +
          `
        `
      )
      .setTimestamp(),
  ],
};
