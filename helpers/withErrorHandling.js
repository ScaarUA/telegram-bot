import bot from '../bot.js';
import config from '../config.js';

export const withErrorHandling = (cb) => {
  return async function (...params) {
    try {
      await cb(...params);
    } catch (e) {
      bot.sendMessage(config.chatId, 'Uh oh! Something vidsmoktano v API');
      console.error(e);
    }
  };
};
