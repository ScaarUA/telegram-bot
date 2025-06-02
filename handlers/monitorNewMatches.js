import bot from '../bot.js';
import { getMatchesText } from '../helpers/getMatchesText.js';
import config from '../config.js';
import { withErrorHandling } from '../helpers/withErrorHandling.js';

let isRegistered = false;
let lastMatch = null;

export const monitorNewMatches = withErrorHandling((leetify) => {
  if (isRegistered) {
    return;
  }

  bot.sendMessage(
    config.chatId,
    `Ініціалізую моніторинг матчів. Chat ID: ${config.chatId}`
  );

  isRegistered = true;

  setInterval(
    async () => {
      const sessions = await leetify.getClubSessions();
      const newLastMatch = sessions[0].games[0];

      if (lastMatch && lastMatch.id === newLastMatch.id) {
        return;
      }

      lastMatch = newLastMatch;

      const matchText = getMatchesText([newLastMatch]);

      bot.sendMessage(config.chatId, matchText[0], { parse_mode: 'html' });
    },
    60 * 2 * 1000
  );
});

export const isMatchesMonitoringRegistered = (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, isRegistered ? 'Все чікі-пукі' : 'Я відсмоктав');
};
