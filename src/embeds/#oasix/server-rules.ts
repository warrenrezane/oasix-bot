import { EmbedBuilder } from "discord.js";
import { Embed } from "../../interfaces/Embed";

export const ServerRulesEmbed: Embed = {
  name: "server-rules",
  shouldRetain: true,
  embeds: [
    new EmbedBuilder()
      .setColor("White")
      .setTitle("**Server Rules**")
      .setAuthor({
        name: "Oasix",
        iconURL:
          "https://media.discordapp.net/attachments/1057743418954088519/1057743581915402340/OASIX_white_badge_-_norm.gif",
      })
      .setDescription(
        `<a:OA6Logo:1052543755045060628> **__1. NO OFFENSIVE PROFILES__**
    ` +
          "```If the staff notices that your server name/profile picture contains offensive language or visuals, you will be requested to change it immediately. ```" +
          `
      <a:OA6Logo:1052543755045060628> **__2. TREAT OTHERS WITH COURTESY AND CONSIDERATION__**
      ` +
          "```Outmost respect is expected to anyone inside the server. Even if you don't like a particular user, you still have to treat them with decency and respect. Treat others the way you want to be treated.```" +
          `
      <a:OA6Logo:1052543755045060628> **__3. NO INAPPROPRIATE LANGUAGE__**
      ` +
          "```Swearing and cursing should be avoided as much as possible. However, insults and other forms of user abuse are not allowed and will be punished accordingly.```" +
          `
      <a:OA6Logo:1052543755045060628> **__4. NO SPAMMING__**
      ` +
          "```Simultaneous sending of multiple short messages is discouraged. Spamming is prohibited in all of our text chat channels.```" +
          `
      <a:OA6Logo:1052543755045060628> **__5. VOICE PROTOCOL__**
      ` +
          "```Everyone is expected to have a decent voice output. Please modulate your voice settings before joining in any of the calls in our server to avoid disturbance. Turning on your NOISE SUPPRESSION will help decrease unnecessary background noises for a more pleasant experience with other members. Excessive shouting/Ear raping will not be tolerated and will be punished if done accordingly.```" +
          `
      <a:OA6Logo:1052543755045060628> **__6. NSFW & OTHER PORNOGRAPHIC/ADULT MATERIALS__**
      ` +
          "```Oasix is a community server where people can hang out and be themselves without fear of retaliation. The distribution of such materials is strictly prohibited.```" +
          `
      <a:OA6Logo:1052543755045060628> **__7. DIRECT & INDIRECT THREATS__**
      ` +
          "```Any form of harassment, including but not limited to DDoS, death, DoX, abuse, or other malicious threats, is strictly prohibited.```" +
          `
      <a:OA6Logo:1052543755045060628> **__8. SERVER RAIDING__**
      ` +
          "```The Discord TOS expressly forbids the practice of attacking other servers. Any attempt to elude them or bypass them may result in a permanent ban.```" +
          `
    ***FOLLOW THE DISCORD COMMUNITY GUIDELINES***
    **[Discord's Term of Service](https://discord.com/terms) & [Community Guidelines](https://discord.com/guidelines)**

    **NOTE:**

    All muting, kicking, and banning is done at the sole discretion of the Administrators and Moderators.

    Your continued participation in this server indicates that you acknowledge these rules, as well as any future modifications. You should check for these updates often because they could be added at any time without notice.
    `
      )
      .setFooter({
        text: "Oasix",
        iconURL:
          "https://media.discordapp.net/attachments/1057743418954088519/1057743581915402340/OASIX_white_badge_-_norm.gif",
      }),
  ],
};
