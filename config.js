const isProd = !!process.env.PRODUCTION;

export default {
    token: isProd ? process.env.TELEGRAM_TOKEN : '6120150005:AAELSeXUse4DHdPN6oql7PnjTRIxD3CIAq0',
    isProd,
    envUrl: process.env.ENV_URL,
    webhookPort: process.env.WEBHOOK_PORT,
    minsToPing: 5,
    openaiApiKey: process.env.OPENAI_API_KEY,
}