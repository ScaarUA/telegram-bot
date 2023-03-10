import {makeTenorRequest} from "../services/tenor.js";
import bot from "../bot.js";

export const createGifHandler = async (msg, match) => {
    const chatId = msg.chat.id;

    const prompt = match[1];

    try {
        const res = await makeTenorRequest(prompt);

        const results = res.data.results;

        const randomIndex = Math.floor(Math.random() * results.length);

        bot.sendAnimation(chatId, results[randomIndex].media_formats.gif.url);
    } catch (e) {
        bot.sendMessage(chatId, 'Не удалось получить gif\'ку');
    }
}