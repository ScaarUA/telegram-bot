import axios from 'axios';
import bot from '../bot.js';

export const insultHandler = async (msg, match) => {
  const chatId = msg.chat.id;

  const address = match[1];

  const res = await axios(
    'https://evilinsult.com/generate_insult.php?lang=ru&type=json'
  );

  const insult = res.data.insult[0].toLowerCase() + res.data.insult.slice(1);

  bot.sendMessage(chatId, `${address ? address + ', ' : ''}${insult}`);
};
