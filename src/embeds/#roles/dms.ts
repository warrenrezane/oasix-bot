import { ButtonBuilder, ButtonStyle, ComponentType } from "discord.js";
import { Embed } from "../../interfaces/Embed";

export const DMSRoleEmbed: Embed = {
  name: "dms-role",
  files: [
    {
      attachment:
        "https://cdn.discordapp.com/attachments/1057743418954088519/1067454291578724422/8.png",
    },
  ],
  components: [
    {
      type: ComponentType.ActionRow,
      components: [
        new ButtonBuilder()
          .setCustomId("role-1050980162927333487")
          .setLabel("Open DM")
          .setStyle(ButtonStyle.Secondary),

        new ButtonBuilder()
          .setCustomId("role-1050980166354087976")
          .setLabel("Close DM")
          .setStyle(ButtonStyle.Secondary),
      ],
    },
  ],
};
