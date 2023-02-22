import {
  CommandInteraction,
  ChatInputApplicationCommandData,
  Client,
} from "discord.js";

export interface SlashCommand extends ChatInputApplicationCommandData {
  usage?: string;
  run: (client: Client, interaction: CommandInteraction) => void;
}
