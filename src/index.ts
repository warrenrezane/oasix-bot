import "dotenv/config";
import {
  Client,
  Partials,
  GatewayIntentBits,
  ActivityType,
  TextChannel,
} from "discord.js";
import ready from "./events/ready";
import interactionCreate from "./events/interactionCreate";
import messageCreate from "./events/messageCreate";
import { MySQLDriver } from "quick.db";
import http from "http";
import * as schedule from "node-schedule";
import Time from "./functions/Time";
import HttpGet from "./functions/HttpGet";

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [
    Partials.Channel,
    Partials.GuildMember,
    Partials.GuildScheduledEvent,
    Partials.Message,
    Partials.Reaction,
    Partials.ThreadMember,
    Partials.User,
  ],
  presence: {
    status: "online",
    activities: [
      {
        name: ".gg/oasix",
        type: ActivityType.Watching,
        url: "https://discord.gg/oasix",
      },
    ],
  },
});

const mysql = new MySQLDriver({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

ready(client);
interactionCreate(client, mysql);
messageCreate(client, mysql);

http
  .createServer((request, response) => {
    response.end();
  })
  .listen(8080);

const AuthenticationToken = process.env.TOKEN as string;
if (!AuthenticationToken) {
  console.warn(
    `[${Time()}] [CRASH] Authentication Token for Discord bot is required! Use Environment Secrets.\n`
  );
  process.exit();
}

client.login(AuthenticationToken).catch((err) => {
  console.error(
    `[${Time()}] [CRASH] Something went wrong while connecting to your bot...\n`
  );
  console.error(`[${Time()}] [CRASH] Error from Discord API: ${err}`);
  return process.exit();
});

const rule = new schedule.RecurrenceRule();
rule.hour = 9;
rule.minute = 1;
rule.tz = "Asia/Manila";

schedule.scheduleJob(rule, async function() {
  try {
    const quote = await HttpGet("https://api.quotable.io/random?limit=1");
    const { content, author } = quote;

    (
      client.channels.cache.get(
        process.env.MAIN_CHAT_CHANNEL_ID as string
      ) as TextChannel
    ).send({
      content: `**QOUTE OF THE DAY:**\n\n*"${content}"*\n- ${author}\n\nGood Morning, <@&${process.env.OASIX_VERIFIED_ROLE as string
        }>.`,
    });
  } catch (error) {
    console.error(error);
  }
});

process.on("unhandledRejection", async (err, promise) => {
  console.error(`\n[${Time()}] [ANTI-CRASH] Unhandled Rejection: ${err}`);
  console.error(promise);
});
