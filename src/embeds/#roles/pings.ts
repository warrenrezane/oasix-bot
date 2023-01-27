import { ButtonBuilder, ButtonStyle, ComponentType } from "discord.js";
import { Embed } from "../../interfaces/Embed";

export const PingsRoleEmbed: Embed = {
  name: "pings-role",
  files: [
    {
      attachment:
        "https://cdn.discordapp.com/attachments/1057743418954088519/1067454288055513179/1.png",
    },
  ],
  components: [
    {
      type: ComponentType.ActionRow,
      components: [
        new ButtonBuilder()
          .setCustomId("role-1052229356430299136")
          .setLabel("Announcements")
          .setStyle(ButtonStyle.Secondary),

        new ButtonBuilder()
          .setCustomId("role-1052229424428363896")
          .setLabel("Events")
          .setStyle(ButtonStyle.Secondary),

        new ButtonBuilder()
          .setCustomId("role-1052229390739718225")
          .setLabel("Giveaway")
          .setStyle(ButtonStyle.Secondary),
      ],
    },
  ],
};
