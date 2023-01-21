import {
  Client,
  CommandInteraction,
  Message,
  MessageApplicationCommandData,
} from "discord.js";
import { QuickDB } from "quick.db";

export interface PrefixCommand extends MessageApplicationCommandData {
  usage?: string;
  additionalInfo?: string;
  commandDescription: string;
  run: (client: Client, message: Message, db: QuickDB) => void;
}
