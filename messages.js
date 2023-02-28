import bot from "./bot.js";
import {katkuHandler, smac10Handler, insultHandler, createImageHandler, createGifHandler} from "./hanlders.js";

const setupMessages = (stickerSet) => {
    bot.onText(/\/sosat/, smac10Handler(stickerSet));

    bot.onText(/^\/(katku_csgo)|(katku_hunt)$/, (msg) => {
        const chatId = msg.chat.id;

        bot.sendMessage(chatId, 'Идиот! укажи игру, время и опцианально длительность голосования в секундах. /katku-csgo 21:30 60');
    });

    bot.onText(/\/katku_csgo (\S*)( .*)?/, katkuHandler('csgo'));

    bot.onText(/\/katku_hunt (\S*)( .*)?/, katkuHandler('hunt'));

    bot.onText(/\/insult ?(.*)?/, insultHandler);

    bot.onText(/\/image (.*)/, createImageHandler);

    bot.onText(/\/gif (.*)/, createGifHandler);
}

export default setupMessages;