import { PrefixCommand } from "../interfaces/PrefixCommand";
import { ConfessionsBan } from "../commands/prefix/confessions-ban";
import { ConfessionsUnban } from "../commands/prefix/confessions-unban";

export const PrefixCommands: PrefixCommand[] = [
  ConfessionsBan,
  ConfessionsUnban,
];
