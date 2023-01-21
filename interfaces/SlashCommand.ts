import {
  CommandInteraction,
  ChatInputApplicationCommandData,
  Client,
} from "discord.js";
import { QuickDB } from "quick.db";

export interface SlashCommand extends ChatInputApplicationCommandData {
  usage?: string;
  run: (client: Client, interaction: CommandInteraction, db: QuickDB) => void;
}
