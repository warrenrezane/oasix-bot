import { EmbedsContainer } from "../containers/EmbedsContainer";
import { Client, EmbedBuilder, Interaction } from "discord.js";
import { SlashCommands } from "../containers/SlashCommands";

export default (client: Client): void => {
  client.on("interactionCreate", async (interaction: Interaction) => {
    if (interaction.isChatInputCommand()) {
      const slashCommand = SlashCommands.find(
        (command) => command.name === interaction.commandName
      );

      if (!slashCommand) return;

      try {
        slashCommand.run(client, interaction);
      } catch (error) {
        console.error(error);
      }
    }

    if (interaction.isButton()) {
      if (interaction.customId.includes("role")) {
        await interaction.deferReply({ ephemeral: true });

        let selectedRole = interaction.customId.split("-")[1];
        let guild = client.guilds.cache.get(process.env.GUILD_ID as string);
        let role = guild?.roles.cache.find((r) => r.id === selectedRole);

        if (typeof role === "undefined") {
          await interaction.editReply({
            embeds: [
              new EmbedBuilder()
                .setColor("Red")
                .setDescription("❌ Sorry, this role does not exist."),
            ],
          });
          return;
        }

        if (
          guild?.members.cache
            .get(interaction.user.id)
            ?.roles.cache.some((ExistingRole) => ExistingRole.id === role?.id)
        ) {
          guild?.members.cache.get(interaction.user.id)?.roles.remove(role.id);

          await interaction.editReply({
            embeds: [
              new EmbedBuilder()
                .setColor("Green")
                .setDescription(
                  `🗑️ ${role!.name} has been removed to your profile.`
                ),
            ],
          });

          return;
        } else {
          guild?.members.cache.get(interaction.user.id)?.roles.add(role!.id);

          await interaction.editReply({
            embeds: [
              new EmbedBuilder()
                .setColor("Green")
                .setDescription(
                  `✅ ${role!.name} has been added to your profile.`
                ),
            ],
          });

          return;
        }
      }

      const embed = EmbedsContainer.find(
        (e) => e.name === interaction.customId
      );

      if (!embed) {
        await interaction.reply({
          content: "❌ This embed doesn't exist.",
        });

        return;
      }

      await interaction.reply({
        embeds: embed.embeds,
        components: "components" in embed ? embed.components : undefined,
        ephemeral: "shouldRetain" in embed ? true : false,
      });
    }
  });
};
