import bot from '../bot.js';
import {
  makeSummaryOfPoll,
  makeSummaryOfTheChat,
} from '../services/googleGenAi.js';
import { chatHistory, pollHistory } from '../helpers/history.js';

export const summaryHandler = async (msg) => {
  const chatId = msg.chat.id;
  const history = chatHistory.get();

  if (history.length > 0) {
    const res = await makeSummaryOfTheChat(history);

    chatHistory.clear();

    bot.sendMessage(chatId, res);
  } else {
    bot.sendMessage(chatId, 'Нічого нового не обговорювалося');
  }
};

export const pollSummaryHandler = async (msg) => {
  const chatId = msg.chat.id;
  const history = pollHistory.get();

  if (history.length > 0) {
    const res = await makeSummaryOfPoll(history);

    bot.sendMessage(chatId, res);
  } else {
    bot.sendMessage(chatId, 'Немає активного голосування');
  }
};
