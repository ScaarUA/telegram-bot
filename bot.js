import TelegramBot from 'node-telegram-bot-api';
import config from './config.js';

const botSettings = config.isProd ? {
    webHook: {
        port: config.webhookPort,
        host: config.envUrl,
        key: './key.pem',
        cert: './server.crt',
    }
} : {
    polling: true,
};

const bot = new TelegramBot(config.token, botSettings);

export default bot;