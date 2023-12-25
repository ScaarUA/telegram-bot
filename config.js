const isProd = !!process.env.PRODUCTION;

export default {
  token: isProd ? process.env.TELEGRAM_TOKEN : "6120150005:AAELSeXUse4DHdPN6oql7PnjTRIxD3CIAq0",
  isProd,
  envUrl: process.env.ENV_URL,
  webhookPort: process.env.WEBHOOK_PORT,
  minsToPing: 5,
  openaiApiKey: process.env.OPENAI_API_KEY,
  tenorApiKey: process.env.TENOR_API_KEY,
  nativeUsers: [
    { id: 419869301, name: "Scaar" },
    { id: 699419584, name: "Yarish" },
    { id: 442098861, name: "Ivan" },
    { id: 96716911, name: "Roman" },
    { id: 494642016, name: "Andrii" },
    { nickname: "@SpokKirk" }],
  leetify: {
    clubId: '07f94376-e2c9-4eca-989e-edad2602a97a'
  },
  chatId: -1001918746746,
};