import { ButtonBuilder, ButtonStyle, ComponentType } from "discord.js";
import { Embed } from "../../interfaces/Embed";

export const GamesRoleEmbed: Embed = {
  name: "games-role",
  files: [
    {
      attachment:
        "https://cdn.discordapp.com/attachments/1057743418954088519/1067454290542727189/6.png",
    },
  ],
  components: [
    {
      type: ComponentType.ActionRow,
      components: [
        new ButtonBuilder()
          .setCustomId("role-1052246328312352809")
          .setLabel("Valorant")
          .setStyle(ButtonStyle.Secondary),

        new ButtonBuilder()
          .setCustomId("role-1052246493781839934")
          .setLabel("CSGO")
          .setStyle(ButtonStyle.Secondary),

        new ButtonBuilder()
          .setCustomId("role-1052246515709661294")
          .setLabel("DOTA 2")
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId("role-1052246531752865882")
          .setLabel("League of Legends")
          .setStyle(ButtonStyle.Secondary),
      ],
    },
    {
      type: ComponentType.ActionRow,
      components: [
        new ButtonBuilder()
          .setCustomId("role-1052246631224967178")
          .setLabel("Mobile Legends")
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId("role-1052246682848464929")
          .setLabel("LoL Wildrift")
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId("role-1052246692730241174")
          .setLabel("CODM")
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId("role-1062017936522493952")
          .setLabel("Apex Legends")
          .setStyle(ButtonStyle.Secondary),
      ],
    },
    {
      type: ComponentType.ActionRow,
      components: [
        new ButtonBuilder()
          .setCustomId("role-1055673372211675228")
          .setLabel("Genshin Impact")
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId("role-1062018516338876456")
          .setLabel("Roblox")
          .setStyle(ButtonStyle.Secondary),
      ],
    },
  ],
};
