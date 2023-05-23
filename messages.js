import bot from "./bot.js";
import {
    katkuHandler,
    smac10Handler,
    insultHandler,
    createImageHandler,
    createGifHandler,
    registerNacizmHandler,
    deregisterNacizmHandler,
} from "./handlers/index.js";

const setupMessages = (stickerSet) => {
    bot.onText(/\/sosat/, smac10Handler(stickerSet));

    bot.onText(/\/katku/, katkuHandler);

    bot.onText(/\/insult ?(.*)?/, insultHandler);

    bot.onText(/\/image (.*)/, createImageHandler);

    bot.onText(/\/gif (.*)/, createGifHandler);

    bot.onText(/\/register_nacizm/, registerNacizmHandler);

    bot.onText(/\/cancel_nacizm/, deregisterNacizmHandler);
}

export default setupMessages;