import { PrefixCommand } from "../interfaces/PrefixCommand";
import { SlashCommand } from "../interfaces/SlashCommand";
import { PrefixCommands } from "./PrefixCommands";
import { SlashCommands } from "./SlashCommands";

export const Commands: (SlashCommand | PrefixCommand)[] = [
  ...SlashCommands,
  ...PrefixCommands,
];
