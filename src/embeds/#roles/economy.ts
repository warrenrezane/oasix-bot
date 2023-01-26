import { ButtonBuilder, ButtonStyle, ComponentType } from "discord.js";
import { Embed } from "../../interfaces/Embed";

export const EconomyRoleEmbed: Embed = {
  name: "economy-role",
  files: [
    {
      attachment:
        "https://cdn.discordapp.com/attachments/1057743418954088519/1067454291079606422/7.png",
    },
  ],
  components: [
    {
      type: ComponentType.ActionRow,
      components: [
        new ButtonBuilder()
          .setCustomId("role-1055453182601461780")
          .setLabel("Fishing")
          .setStyle(ButtonStyle.Secondary),

        new ButtonBuilder()
          .setCustomId("role-1055450395570356297")
          .setLabel("Casino")
          .setStyle(ButtonStyle.Secondary),
      ],
    },
  ],
};
