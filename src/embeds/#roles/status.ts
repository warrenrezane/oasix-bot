import { ButtonBuilder, ButtonStyle, ComponentType } from "discord.js";
import { Embed } from "../../interfaces/Embed";

export const StatusRoleEmbed: Embed = {
  name: "status-role",
  files: [
    {
      attachment:
        "https://cdn.discordapp.com/attachments/1057743418954088519/1067454289448013855/4.png",
    },
  ],
  components: [
    {
      type: ComponentType.ActionRow,
      components: [
        new ButtonBuilder()
          .setCustomId("role-1050980866848981113")
          .setLabel("Single")
          .setStyle(ButtonStyle.Secondary),

        new ButtonBuilder()
          .setCustomId("role-1050980886625128498")
          .setLabel("In a relationship")
          .setStyle(ButtonStyle.Secondary),
      ],
    },
  ],
};
