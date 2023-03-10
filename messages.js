import bot from "./bot.js";
import {katkuHandler, smac10Handler, insultHandler, createImageHandler, createGifHandler} from "./hanlders.js";

const setupMessages = (stickerSet) => {
    bot.onText(/\/sosat/, smac10Handler(stickerSet));

    bot.onText(/\/katku/, katkuHandler);

    bot.onText(/\/insult ?(.*)?/, insultHandler);

    bot.onText(/\/image (.*)/, createImageHandler);

    bot.onText(/\/gif (.*)/, createGifHandler);
}

export default setupMessages;