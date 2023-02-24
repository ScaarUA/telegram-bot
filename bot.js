import TelegramBot from 'node-telegram-bot-api';
import config from './config.js';

const botSettings = config.isProd ? {} : {
    polling: true,
};

const bot = new TelegramBot(config.token, botSettings);

export default bot;