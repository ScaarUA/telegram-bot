import bot from '../bot.js';
import { getLeftTime } from '../helpers/getLeftTime.js';
import { getMentionsString } from '../helpers/getMentionsString.js';

export const katkuHandler = async (msg, match) => {
  const chatId = msg.chat.id;

  const matchTime = match[1];
  const matchMessage = match[2];

  if (matchTime) {
    handleVote(chatId, matchTime, matchMessage);
  } else {
    const timeQuestionMessage = await bot.sendMessage(
      chatId,
      'О котрій годині?',
      { reply_to_message_id: msg.message_id }
    );

    const replyTimeId = bot.onReplyToMessage(
      chatId,
      timeQuestionMessage.message_id,
      async (replyTimeMsg) => {
        bot.removeReplyListener(replyTimeId);

        const time = replyTimeMsg.text;

        if (!time || !time.match(/^\d\d?:\d\d$/)) {
          return bot.sendMessage(
            chatId,
            'Ти що даун? Вкажи нормально час. 21:30, наприклад'
          );
        }

        handleVote(chatId, time, matchMessage);
      }
    );
  }
};

const handleVote = async (chatId, time, extraMessage) => {
  const [hours, minutes] = time.split(':');
  const targetDate = new Date().setHours(hours, minutes);

  const pollMsg = await bot.sendPoll(
    chatId,
    `Сьогодні граєм${extraMessage ? ' ' + extraMessage : ''} в ${time}?`,
    ['Так', 'Можливо', 'Буду пізніше', 'Я добровільно погоджуюсь служти в ЗСУ'],
    { is_anonymous: false }
  );
  await bot.pinChatMessage(chatId, pollMsg.message_id);

  const timerMsg = await bot.sendMessage(
    chatId,
    `До кінця голосування: ${getLeftTime(targetDate).text}`
  );

  bot.sendMessage(chatId, await getMentionsString(), {
    parse_mode: 'markdown',
  });

  const interval = setInterval(async () => {
    const { timer, text: leftTimeText } = getLeftTime(targetDate);

    bot.editMessageText(`До кінця голосування: ${leftTimeText}`, {
      message_id: timerMsg.message_id,
      chat_id: chatId,
    });

    if (timer <= 0) {
      clearInterval(interval);

      const stoppedPollMsg = await bot.stopPoll(chatId, pollMsg.message_id);
      const yesAmount = stoppedPollMsg.options[0].voter_count;
      const maybeAmount = stoppedPollMsg.options[1].voter_count;
      const laterAmount = stoppedPollMsg.options[2].voter_count;
      const noAmount = stoppedPollMsg.options[3].voter_count;
      let yesMessage =
        yesAmount < 3
          ? `Нажаль, не вистачає бійців. На ${time} їх тільки ${yesAmount}`
          : `Є бійці для катуні: ${yesAmount}`;
      let laterMessage =
        laterAmount > 0
          ? `\nПізніше зможуть під'єднатится бійців: ${laterAmount}`
          : '\nНікого на пізніше нема';
      let noMessage =
        noAmount > 0
          ? `\nНе будуть грати ${noAmount} сволот. Хай горять в пеклі ці підораси.`
          : '';
      let maybeMessage =
        maybeAmount > 0
          ? `\nЄ ${maybeAmount} невпевнених в собі уєбанів, які можливо будуть грати.`
          : 'Немає невпевнених в собі.';

      bot.sendMessage(
        chatId,
        `${yesMessage}${laterMessage}${maybeMessage}${noMessage}`,
        { reply_to_message_id: pollMsg.message_id }
      );
    }
  }, 5000);
};
