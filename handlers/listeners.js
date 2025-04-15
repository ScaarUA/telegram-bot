import { chatHistory } from '../helpers/history.js';
import bot from '../bot.js';

export const listeners = () => {
  bot.on('message', async (msg) => {
    if (msg.text) {
      await textListener(msg);
    }

    // if (msg.photo) {
    //   const link = await bot.getFileLink(msg.photo.file_id);
    // }
  });
};

export const textListener = async (msg) => {
  chatHistory.add(msg.from.username, msg.text);
};
