import bot from "./bot.js";
import {
    katkuHandler,
    smac10Handler,
    insultHandler,
    createImageHandler,
    createGifHandler,
    registerNacizmHandler,
    deregisterNacizmHandler,
    mentionAllHandler,
    leaderboardHandler,
    recentMatchesHandler,
} from "./handlers/index.js";
import { Leetify } from "./services/leetify.js";

const leetify = new Leetify();

const setupMessages = (stickerSet) => {
    bot.onText(/\/sosat/, smac10Handler(stickerSet));

    bot.onText(/\/katku\s?(\d\d?:\d\d)?\s?(.*)?/, katkuHandler);

    bot.onText(/\/insult ?(.*)?/, insultHandler);

    bot.onText(/\/image (.*)/, createImageHandler);

    bot.onText(/\/gif (.*)/, createGifHandler);

    bot.onText(/\/register_nacizm/, registerNacizmHandler);

    bot.onText(/\/cancel_nacizm/, deregisterNacizmHandler);

    bot.onText(/\/mention_all/, mentionAllHandler);

    bot.onText(/\/leaderboard/, leaderboardHandler(leetify));

    bot.onText(/\/recent/, recentMatchesHandler(leetify));
}

export default setupMessages;