import { Confess } from "../commands/slash/confess";
import { Tag } from "../commands/slash/tag";
import { Tags } from "../commands/slash/tags";
import { SlashCommand } from "../interfaces/SlashCommand";

export const SlashCommands: SlashCommand[] = [Confess, Tag, Tags];
