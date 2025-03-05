import bot from '../bot.js';

export const getWebUrl = async (msg) => {
  const chatId = msg.chat.id;

  const url = `${process.env.RENDER_EXTERNAL_URL}/app`;

  bot.sendMessage(chatId, `<a href="${url}">${url}</a>`, {
    parse_mode: 'html',
  });
};
