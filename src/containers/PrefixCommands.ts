import { PrefixCommand } from "../interfaces/PrefixCommand";
import { ConfessionsBan } from "../commands/prefix/confessions-ban";
import { ConfessionsUnban } from "../commands/prefix/confessions-unban";
import { Embed } from "../commands/prefix/embed";
import { Embeds } from "../commands/prefix/embeds";

export const PrefixCommands: PrefixCommand[] = [
  ConfessionsBan,
  ConfessionsUnban,
  Embed,
  Embeds,
];
