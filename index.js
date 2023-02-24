import bot from './bot.js';
import setupMessages from "./messages.js";

const startBot = async () => {
    await bot.setMyCommands([{command: '/sosat', description: 'Смактен стикер' }, { command: '/insult', description: 'Оскорбить пайдора'}])
    const stickerSet = await bot.getStickerSet('GolubZzZi');

    setupMessages(stickerSet);
}

startBot();