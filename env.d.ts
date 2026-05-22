declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    OPENAI_API_KEY: string;
    MIMO_API_KEY: string;
    MIMO_BASE_URL: string;
    REDIS_HOST: string;
    REDIS_PORT: string;
    REDIS_PASSWORD?: string;
    TELEGRAM_BOT_TOKEN: string;
    TELEGRAM_CHAT_ID: string;
    FEISHU_WEBHOOK: string;
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
  }
}
