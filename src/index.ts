import "dotenv/config";
import { Client, Partials, GatewayIntentBits } from "discord.js";
import ready from "./events/ready";
import interactionCreate from "./events/interactionCreate";
import messageCreate from "./events/messageCreate";
import { MySQLDriver, QuickDB } from "quick.db";
import http from "http";

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
});

const date = new Date();

(async (client) => {
  console.log(`[${date.toUTCString()}] [MySQL Database] Connecting to DB....`);

  const mysql = new MySQLDriver({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });

  await mysql.connect();

  console.log(`[${date.toUTCString()}] [MySQL Database] Connected to DB!\n`);

  const db = new QuickDB({ driver: mysql });

  ready(client, db);
  interactionCreate(client, db);
  messageCreate(client, db);

  const AuthenticationToken = process.env.TOKEN as string;
  if (!AuthenticationToken) {
    console.warn(
      `[${date.toUTCString()}] [CRASH] Authentication Token for Discord bot is required! Use Environment Secrets.\n`
    );
    process.exit();
  }

  client.login(AuthenticationToken).catch((err) => {
    console.error(
      `[${date.toUTCString()}] [CRASH] Something went wrong while connecting to your bot...\n`
    );
    console.error(
      `[${date.toUTCString()}] [CRASH] Error from Discord API: ${err}`
    );
    return process.exit();
  });
})(client);

process.on("unhandledRejection", async (err, promise) => {
  console.error(
    `[${date.toUTCString()}] [ANTI-CRASH] Unhandled Rejection: ${err}`
  );
  console.error(`[${date.toUTCString()}] ${promise}`);
});
