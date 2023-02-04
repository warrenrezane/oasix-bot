import {
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
  EmbedBuilder,
} from "discord.js";
import { Embed } from "../../interfaces/Embed";

export const WelcomeEmbed: Embed = {
  name: "welcome",
  embeds: [
    new EmbedBuilder()
      .setColor("White")
      .setAuthor({
        name: "Oasix",
        iconURL:
          "https://media.discordapp.net/attachments/1057743418954088519/1057743581915402340/OASIX_white_badge_-_norm.gif",
      })
      .setImage(
        "https://cdn.discordapp.com/attachments/1056881496973115432/1060092441572692008/oa62023.gif"
      ),

    new EmbedBuilder()
      .setColor("White")
      .setTitle("Welcome to <a:OA6Logo:1052543755045060628> Oasix!")
      .setDescription(
        `**Oasix** is a friendly community server mainly offering to be your new safe haven! 
    Hang out and have fun, or even create friends and memories all in here! Head on to
    <#1065026792781529109> to verify and get access to the server.
    `
      )
      .setTimestamp()
      .setFooter({
        text: "Oasix",
        iconURL:
          "https://media.discordapp.net/attachments/1057743418954088519/1057743581915402340/OASIX_white_badge_-_norm.gif",
      }),
  ],
  components: [
    {
      type: ComponentType.ActionRow,
      components: [
        new ButtonBuilder()
          .setCustomId("server-rules")
          .setLabel("Server Rules")
          .setStyle(ButtonStyle.Secondary)
          .setEmoji("1061922449245081630"),

        new ButtonBuilder()
          .setCustomId("level-perks")
          .setLabel("Level Perks")
          .setStyle(ButtonStyle.Secondary)
          .setEmoji("1049863370330869843"),

        new ButtonBuilder()
          .setURL(
            `https://discord.com/channels/${process.env.GUILD_ID as string}/${
              process.env.SUBSCRIPTION_PLANS_CHANNEL_ID as string
            }`
          )
          .setLabel("Subscription Plans")
          .setEmoji("1052543755045060628")
          .setStyle(ButtonStyle.Link),
      ],
    },
  ],
};
