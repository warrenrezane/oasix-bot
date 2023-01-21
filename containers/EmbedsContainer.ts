import { Embed } from "../interfaces/Embed";
import { ServerRulesEmbed } from "../embeds/#oasix/server-rules";
import { WelcomeEmbed } from "../embeds/#oasix/welcome";
import { LevelPerksEmbed } from "../embeds/#oasix/level-perks";
import { ConfessionsInstructionsEmbed } from "../embeds/#how-to-confess/confessions-instructions";

export const EmbedsContainer: Embed[] = [
  WelcomeEmbed,
  ServerRulesEmbed,
  LevelPerksEmbed,
  ConfessionsInstructionsEmbed,
];
