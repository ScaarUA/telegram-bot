import bot from '../bot.js';
import { askGoogleGenAi } from '../services/googleGenAi.js';

export const aiHandler = async (msg, match) => {
  const chatId = msg.chat.id;

  const question = match[1];

  const res = await askGoogleGenAi(question);

  bot.sendMessage(chatId, res);
};
