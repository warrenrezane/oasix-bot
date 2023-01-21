import { BaseMessageOptions, ButtonBuilder, EmbedBuilder } from "discord.js";

export interface Embed extends BaseMessageOptions {
  name: string;
  shouldRetain?: boolean;
}
