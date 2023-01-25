import { EmbedsContainer } from "../containers/EmbedsContainer";
import { Client, CommandInteraction, Interaction } from "discord.js";
import { SlashCommands } from "../containers/SlashCommands";
import { MySQLDriver, QuickDB } from "quick.db";

export default (client: Client, mysql: MySQLDriver): void => {
  client.on("interactionCreate", async (interaction: Interaction) => {
    // Connect to MySQL
    await mysql.connect();
    const db = new QuickDB({ driver: mysql });

    if (interaction.isChatInputCommand()) {
      const slashCommand = SlashCommands.find(
        (command) => command.name === interaction.commandName
      );

      if (!slashCommand) return;

      try {
        slashCommand.run(client, interaction, db);
      } catch (error) {
        console.error(error);
      }
    }

    if (interaction.isButton()) {
      const embed = EmbedsContainer.find(
        (e) => e.name === interaction.customId
      );

      if (!embed) {
        await interaction.reply({
          content: "This embed doesn't exist.",
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
