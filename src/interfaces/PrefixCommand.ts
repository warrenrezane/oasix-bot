import { Client, Message, MessageApplicationCommandData } from "discord.js";
import { MySQLDriver } from "quick.db";

export interface PrefixCommand extends MessageApplicationCommandData {
  usage?: string;
  additionalInfo?: string;
  commandDescription: string;
  run: (client: Client, message: Message, mysql?: MySQLDriver) => void;
}
