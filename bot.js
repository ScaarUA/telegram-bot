import TelegramBot from 'node-telegram-bot-api';
import config from './config.js';

const bot = new TelegramBot(config.token, {polling: !config.isProd});

export default bot;