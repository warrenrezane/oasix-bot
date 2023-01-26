import { Embed } from "../interfaces/Embed";
import { ServerRulesEmbed } from "../embeds/#oasix/server-rules";
import { WelcomeEmbed } from "../embeds/#oasix/welcome";
import { LevelPerksEmbed } from "../embeds/#oasix/level-perks";
import { ConfessionsInstructionsEmbed } from "../embeds/#how-to-confess/confessions-instructions";
import { AgeRoleEmbed } from "../embeds/#roles/age";
import { GenderRoleEmbed } from "../embeds/#roles/gender";
import { PingsRoleEmbed } from "../embeds/#roles/pings";
import { StatusRoleEmbed } from "../embeds/#roles/status";
import { LocationRoleEmbed } from "../embeds/#roles/location";
import { GamesRoleEmbed } from "../embeds/#roles/games";
import { EconomyRoleEmbed } from "../embeds/#roles/economy";
import { DMSRoleEmbed } from "../embeds/#roles/dms";

export const EmbedsContainer: Embed[] = [
  WelcomeEmbed,
  ServerRulesEmbed,
  LevelPerksEmbed,
  ConfessionsInstructionsEmbed,

  // Roles
  PingsRoleEmbed,
  AgeRoleEmbed,
  GenderRoleEmbed,
  StatusRoleEmbed,
  LocationRoleEmbed,
  GamesRoleEmbed,
  EconomyRoleEmbed,
  DMSRoleEmbed,
];
