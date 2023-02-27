import { EmbedBuilder } from "discord.js";
import { Embed } from "../../interfaces/Embed";

export const LevelPerksEmbed: Embed = {
  name: "level-perks",
  shouldRetain: true,
  embeds: [
    new EmbedBuilder()
      .setAuthor({
        name: "Oasix",
        iconURL:
          "https://media.discordapp.net/attachments/1057743418954088519/1057743581915402340/OASIX_white_badge_-_norm.gif",
      })
      .setTitle("**LEVEL REWARDS**")
      .setDescription(
        `You will earn points known as XP whenever you participate in any activity within the server, whether it be through text or voice channels. The more points you earn, the higher level you achieve, and each level grants you access to a new set of perks that you may take advantage of while participating on the server.
        
        <a:blackboost:1073655993713573949> <@&1073655993713573949> **- 10,000 Casino Role income (every 3 days); Fishing**
        <a:blackboost:1049863370330869843> <@&1050840021546057799> **- Can add reaction**
        <a:blackboost:1049863370330869843> <@&1050840018442268733> **- Can use external emoji**
        <a:blackboost:1049863370330869843> <@&1050840014260551780> **- Can access nickname**
        <a:blackboost:1049863370330869843> <@&1050839932257718282> **- Can send sticker & GIF**
        <a:blackboost:1049863370330869843> <@&1050841690140848128> **- 8% role income (based on bank's amount; weekly)**
        <a:blackboost:1049863370330869843> <@&1050971436484919376> **- Custom casino reply (work, slut, crime, or fail)**
        <a:blackboost:1049863370330869843> <@&1050971470672703579> **- Can send files & link with attachment**
        <a:blackboost:1049863370330869843> <@&1050971490545303622> **- Custom sticker OR emoji (to be removed after the season ends)**
        <a:blackboost:1049863370330869843> <@&1050971509549715510> **- Additional XP**
        <a:blackboost:1049863370330869843> <@&1056905844912029766> **- Nitro Boost for first 10 members**
        <a:blackboost:1049863370330869843> <@&1056905865719980114> **- Exclusive role (OASIX PATRON), Entry to ultimate giveaway**
        `
      )
      .setFooter({
        text: "Oasix",
        iconURL:
          "https://media.discordapp.net/attachments/1057743418954088519/1057743581915402340/OASIX_white_badge_-_norm.gif",
      }),
  ],
};
