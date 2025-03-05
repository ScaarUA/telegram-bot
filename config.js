const isProd = !!process.env.PRODUCTION;

export default {
  token: isProd
    ? process.env.TELEGRAM_TOKEN
    : '6120150005:AAELSeXUse4DHdPN6oql7PnjTRIxD3CIAq0',
  isProd,
  envUrl: process.env.ENV_URL,
  webhookPort: process.env.WEBHOOK_PORT,
  minsToPing: 5,
  tenorApiKey: process.env.TENOR_API_KEY,
  leetify: {
    clubId: '07f94376-e2c9-4eca-989e-edad2602a97a',
  },
  chatId: isProd ? -1001918746746 : 419869301,
};
