import { Client, ComponentType, TextChannel } from "discord.js";
import { Commands } from "../containers/Commands";
import https from "https";
import * as schedule from "node-schedule";

const date = new Date();

export default (client: Client): void => {
  client.on("ready", async () => {
    if (!client.user || !client.application) return;

    Commands.forEach((command) => {
      console.log(
        `[${date.toUTCString()}]\n[Command: ${
          command.name
        }] has been loaded, and is ready to use. \nUsage: ${command.usage}\n`
      );
    });

    await client.application.commands.set(Commands);

    console.log(`[${date.toUTCString()}] ${client.user.tag} is online!`);

    const rule = new schedule.RecurrenceRule();
    rule.hour = 9;
    rule.tz = "Asia/Manila";

    schedule.scheduleJob(rule, function () {
      https
        .get("https://api.quotable.io/random?limit=1", (response) => {
          let data = "";

          response.on("data", (chunk) => {
            data += chunk;
          });

          response.on("end", () => {
            const { content, author } = JSON.parse(data);
            (
              client.channels.cache.get(
                process.env.BOT_TESTING_CHANNEL_ID as string
              ) as TextChannel
            ).send({
              content: `**QOUTE OF THE DAY:**\n\n*"${content}"*\n- ${author}\n\nGood Morning, <@&${
                process.env.OASIX_VERIFIED_ROLE as string
              }>.`,
            });
          });
        })
        .on("error", (error) => {
          console.error(error);
        });
    });
  });
};
