import bot from '../bot.js';
import { getLeftTime } from '../helpers/getLeftTime.js';
import { getMentionsString } from '../helpers/getMentionsString.js';

const POLL_OPTIONS = [
  'Так',
  'Можливо',
  'Буду пізніше',
  'Я добровільно погоджуюсь служти в ЗСУ',
];

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
    POLL_OPTIONS,
    { is_anonymous: false }
  );
  await bot.pinChatMessage(chatId, pollMsg.message_id);

  bot.sendMessage(chatId, await getMentionsString(), {
    parse_mode: 'markdown',
  });

  const pollHandler = (event) => {
    if (event.poll_id !== pollMsg.poll.id) {
      return;
    }
    const selectedVote = POLL_OPTIONS[event.option_ids[0]];
    const message = selectedVote
      ? `*${event.user.username}* проголосув '${selectedVote}'`
      : `*${event.user.username}* скасував свій вибір`;

    bot.sendMessage(chatId, message, {
      reply_to_message_id: pollMsg.message_id,
      parse_mode: 'markdown',
    });
  };

  bot.on('poll_answer', pollHandler);

  const interval = setInterval(async () => {
    const { timer, text: leftTimeText } = getLeftTime(targetDate);

    if (timer <= 0) {
      clearInterval(interval);

      bot.removeListener('poll_answer', pollHandler);

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
