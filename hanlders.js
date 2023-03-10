import axios from 'axios';
import bot from "./bot.js";
import openai from "./openAi.js";
import {makeTenorRequest} from "./tenor.js";
import {getLeftTime} from "./helpers.js";

export const katkuHandler = async (msg) => {
    const chatId = msg.chat.id;

    const gameQuestionMessage = await bot.sendMessage(chatId, 'Укажи название игры', { reply_to_message_id: msg.message_id });

    const replyGameId = bot.onReplyToMessage(chatId, gameQuestionMessage.message_id, async (replyGameMsg) => {
        bot.removeReplyListener(replyGameId)

        const game = replyGameMsg.text;

        const timeQuestionMessage = await bot.sendMessage(chatId, 'В котором часу?', { reply_to_message_id: gameQuestionMessage.message_id });

        const replyTimeId = bot.onReplyToMessage(chatId, timeQuestionMessage.message_id, async (replyTimeMsg) => {
            bot.removeReplyListener(replyTimeId);

            const time = replyTimeMsg.text;

            if (!time || !time.match(/^\d\d?[:\-\s]\d\d$/)) {
                return bot.sendMessage(chatId, 'Ты шо даун? укажи нормально время. 21:30, например');
            }

            const [hours, minutes] = time.split(':');
            const targetDate = new Date().setHours(hours, minutes);

            const pollMsg = await bot.sendPoll(chatId,`Сегодня граем ${game} в ${time}?`, ['Да', 'Позже буду', 'Я пайдор'] , { is_anonymous: false });

            const timerMsg = await bot.sendMessage(chatId, `До конца голосования: ${getLeftTime(targetDate).text}`);

            const interval = setInterval(async () => {
                const { timer, text: leftTimeText } = getLeftTime(targetDate);

                bot.editMessageText(`До конца голосования: ${leftTimeText}`, { message_id: timerMsg.message_id, chat_id: chatId });

                if (timer <= 0) {
                    clearInterval(interval);

                    const stoppedPollMsg = await bot.stopPoll(chatId, pollMsg.message_id);
                    const yesAmount = stoppedPollMsg.options[0].voter_count;
                    const laterAmount = stoppedPollMsg.options[1].voter_count;
                    const noAmount = stoppedPollMsg.options[2].voter_count;
                    let yesMessage = `Есть бойцы для катки: ${yesAmount}`;
                    let laterMessage = 'Никого на позже нету';
                    let noMessage;

                    if (yesAmount < 3) {
                        yesMessage = `К сожалению, не хватает бойцов. На ${time} их только ${yesAmount}`;
                    }

                    if (laterAmount > 0) {
                        laterMessage = `Позже смогут подключиться бойцов: ${laterAmount}`;
                    }

                    if (noAmount > 0) {
                        noMessage = `Кстати среди нас есть пайдоры`;
                    }

                    bot.sendMessage(chatId, `${yesMessage}\n${laterMessage}${noMessage ? `\n${noMessage}` : ''}`);
                }
            }, 5000);
        });
    });
}

export const smac10Handler = stickerSet => msg => {
    const chatId = msg.chat.id;

    const sticker = stickerSet.stickers.find(sticker => sticker.emoji === '🙏');

    bot.sendSticker(chatId, sticker.file_id);
}

export const insultHandler = async (msg, match) => {
    const chatId = msg.chat.id;

    const address = match[1];

    const res = await axios('https://evilinsult.com/generate_insult.php?lang=ru&type=json');

    const insult = res.data.insult[0].toLowerCase() + res.data.insult.slice(1);

    bot.sendMessage(chatId, `${address ? address + ', ' : ''}${insult}`);
}

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