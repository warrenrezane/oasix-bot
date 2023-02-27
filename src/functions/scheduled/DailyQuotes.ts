import { Client, TextChannel } from "discord.js";
import * as schedule from "node-schedule";
import HttpGet from "../HttpGet";

const rule = new schedule.RecurrenceRule();
rule.hour = 9;
rule.minute = 1;
rule.tz = "Asia/Manila";

export default async function DailyQuotes(client: Client) {
  schedule.scheduleJob(rule, async function () {
    try {
      const quote = await HttpGet("https://api.quotable.io/random?limit=1");
      const { content, author } = quote;

      (
        client.channels.cache.get(
          process.env.MAIN_CHAT_CHANNEL_ID as string
        ) as TextChannel
      ).send({
        content: `**QUOTE OF THE DAY:**\n\n*"${content}"*\n- ${author}\n\nGood morning, <@&${
          process.env.OASIX_VERIFIED_ROLE as string
        }>.`,
      });
    } catch (error) {
      console.error(error);
    }
  });
}
