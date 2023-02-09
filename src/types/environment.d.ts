export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string;
      CLIENT_ID: string;
      GUILD_ID: string;
      PREFIX: string;
      CONFESSION_CHANNEL_ID: string;
      CONFESSION_LOGS_CHANNEL_ID: string;
      CONFESSION_REPORTS_CHANNEL_ID: string;
      DB_HOST: string;
      DB_USER: string;
      DB_PASS: string;
      DB_NAME: string;
      BOT_TESTING_CHANNEL_ID: string;
      MAIN_CHAT_CHANNEL_ID: string;
      OASIX_VERIFIED_ROLE: string;
      SUBSCRIPTION_PLANS_CHANNEL_ID: string;
      OPENAI_API_KEY: string;
      PUBLIC_CHATGPT_CHANNEL: string;
      STAFF_CHATGPT_CHANNEL: string;
      OASIX_BOT_CHATGPT_ENDPOINT: string;
    }
  }
}
