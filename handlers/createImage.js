import openai from "../services/openAi.js";
import bot from "../bot.js";

export const createImageHandler = async (msg, match) => {
    const chatId = msg.chat.id;

    const prompt = match[1];

    try {
        const res = await openai.createImage({
            prompt,
            size: '256x256',
        });

        bot.sendPhoto(chatId, res.data.data[0].url);
    } catch (e) {
        bot.sendMessage(chatId, "Не удалось сгенерировать картинку");
    }
}