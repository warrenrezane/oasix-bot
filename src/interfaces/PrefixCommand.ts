import { Client, Message, MessageApplicationCommandData } from "discord.js";

export interface PrefixCommand extends MessageApplicationCommandData {
  usage?: string;
  additionalInfo?: string;
  commandDescription: string;
  run: (client: Client, message: Message) => void;
}
