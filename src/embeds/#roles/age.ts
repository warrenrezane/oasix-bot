import { ButtonBuilder, ButtonStyle, ComponentType } from "discord.js";
import { Embed } from "../../interfaces/Embed";

export const AgeRoleEmbed: Embed = {
  name: "age-role",
  files: [
    {
      attachment:
        "https://cdn.discordapp.com/attachments/1057743418954088519/1067454288474939412/2.png",
    },
  ],
  components: [
    {
      type: ComponentType.ActionRow,
      components: [
        new ButtonBuilder()
          .setCustomId("role-1050980001643765840")
          .setLabel("-17")
          .setStyle(ButtonStyle.Secondary),

        new ButtonBuilder()
          .setCustomId("role-1050979969364394004")
          .setLabel("18+")
          .setStyle(ButtonStyle.Secondary),
      ],
    },
  ],
};
