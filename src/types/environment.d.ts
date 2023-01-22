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
    }
  }
}
