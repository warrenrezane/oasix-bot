import { ButtonBuilder, ButtonStyle, ComponentType } from "discord.js";
import { Embed } from "../../interfaces/Embed";

export const GenderRoleEmbed: Embed = {
  name: "gender-role",
  files: [
    {
      attachment:
        "https://cdn.discordapp.com/attachments/1057743418954088519/1067454289032785980/3.png",
    },
  ],
  components: [
    {
      type: ComponentType.ActionRow,
      components: [
        new ButtonBuilder()
          .setCustomId("role-1050980150520598558")
          .setLabel("Male")
          .setStyle(ButtonStyle.Secondary),

        new ButtonBuilder()
          .setCustomId("role-1050980155918647346")
          .setLabel("Female")
          .setStyle(ButtonStyle.Secondary),

        new ButtonBuilder()
          .setCustomId("role-1050980159613845504")
          .setLabel("LGBTQIA+")
          .setStyle(ButtonStyle.Secondary),
      ],
    },
  ],
};
