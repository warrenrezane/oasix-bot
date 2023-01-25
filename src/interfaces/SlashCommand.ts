import {
  CommandInteraction,
  ChatInputApplicationCommandData,
  Client,
} from "discord.js";
import { MySQLDriver } from "quick.db";

export interface SlashCommand extends ChatInputApplicationCommandData {
  usage?: string;
  run: (
    client: Client,
    interaction: CommandInteraction,
    mysql?: MySQLDriver
  ) => void;
}
