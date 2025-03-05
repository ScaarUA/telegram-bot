import bot from '../bot.js';

export const smac10Handler = (stickerSet) => (msg) => {
  const chatId = msg.chat.id;

  const sticker = stickerSet.stickers.find((sticker) => sticker.emoji === '🙏');

  bot.sendSticker(chatId, sticker.file_id);
};
