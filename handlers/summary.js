import bot from '../bot.js';
import { makeSummaryOfTheChat } from '../services/googleGenAi.js';

let history = [];

export const chatListener = async (msg) => {
  if (history.length > 49) {
    history.shift();
  }

  history.push(`${msg.from.username}: ${msg.text}`);
};

export const summaryHandler = async (msg) => {
  const chatId = msg.chat.id;

  const res = await makeSummaryOfTheChat(history);

  history = [];

  bot.sendMessage(chatId, res);
};
