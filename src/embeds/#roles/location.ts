import { ButtonBuilder, ButtonStyle, ComponentType } from "discord.js";
import { Embed } from "../../interfaces/Embed";

export const LocationRoleEmbed: Embed = {
  name: "location-role",
  files: [
    {
      attachment:
        "https://cdn.discordapp.com/attachments/1057743418954088519/1067454290005864500/5.png",
    },
  ],
  components: [
    {
      type: ComponentType.ActionRow,
      components: [
        new ButtonBuilder()
          .setCustomId("role-1050980170112172143")
          .setLabel("Luzon")
          .setStyle(ButtonStyle.Secondary),

        new ButtonBuilder()
          .setCustomId("role-1050980175120179230")
          .setLabel("Visayas")
          .setStyle(ButtonStyle.Secondary),

        new ButtonBuilder()
          .setCustomId("role-1050980187484983307")
          .setLabel("Mindanao")
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId("role-1050980464585867325")
          .setLabel("International")
          .setStyle(ButtonStyle.Secondary),
      ],
    },
  ],
};
