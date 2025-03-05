import bot from '../bot.js';
import { getMatchesText } from '../helpers/getMatchesText.js';
import config from '../config.js';
// import { Rating } from "../db/schemas/index.js";

let isRegistered = false;
let lastMatch = null;

export const monitorNewMatches = (leetify) => {
  if (isRegistered) {
    return;
  }

  bot.sendMessage(config.chatId, `Ініціалізуюсь. Chat ID: ${config.chatId}`);

  isRegistered = true;

  // const rating = new Rating({
  //   date: new Date(),
  //   rating: [{
  //     user: 'Scaar',
  //     rank: 3
  //   }, {
  //     user: 'Zapadenec',
  //     rank: 10.2
  //   }]
  // });
  //
  // rating.save();

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
};

export const isMonitoringRegistered = (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, isRegistered ? 'Все чікі-пукі' : 'Я відсмоктав');
};
