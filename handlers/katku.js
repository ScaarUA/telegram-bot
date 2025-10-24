import bot from '../bot.js';
import { getMentionsString } from '../helpers/getMentionsString.js';
import * as schedule from 'node-schedule';
import { User } from '../db/schemas/index.js';
import { pollHistory } from '../helpers/history.js';

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
  pollHistory.clear();

  const [hours, minutes] = time.split(':');
  let votes = {};
  let gameChance = '0%';

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

  pollHistory.add(
    `Голосування: Чи буде гра в CS2 о ${time}. Варіанти відповідей: ${POLL_OPTIONS.join(', ')}`
  );

  const pollHandler = async (event) => {
    if (event.poll_id !== pollMsg.poll.id) {
      return;
    }

    const selectedVote = POLL_OPTIONS[event.option_ids[0]];

    votes[event.user.id] = event.option_ids[0];
    gameChance = await getGameChance(votes);

    const gamerName = event.user.username || event.user.first_name;
    const probabilityMessage = `\nШанс на катку: ${gameChance}`;
    const message = selectedVote
      ? `*${gamerName}* проголосував '${selectedVote}'${probabilityMessage}`
      : `*${gamerName}* скасував свій вибір${probabilityMessage}`;

    pollHistory.add(message);

    bot.sendMessage(chatId, message, {
      reply_to_message_id: pollMsg.message_id,
      parse_mode: 'markdown',
    });
  };

  bot.on('poll_answer', pollHandler);

  const rule = new schedule.RecurrenceRule();
  rule.hour = hours;
  rule.minute = minutes;
  rule.tz = 'Europe/Kiev';

  const job = schedule.scheduleJob(rule, async () => {
    bot.removeListener('poll_answer', pollHandler);

    try {
      const stoppedPollMsg = await bot.stopPoll(chatId, pollMsg.message_id);
      const yesAmount = stoppedPollMsg.options[0].voter_count;
      const maybeAmount = stoppedPollMsg.options[1].voter_count;
      const laterAmount = stoppedPollMsg.options[2].voter_count;
      const noAmount = stoppedPollMsg.options[3].voter_count;
      const totalAmount = yesAmount + maybeAmount + laterAmount + noAmount;
      const positiveAmount = yesAmount + maybeAmount;

      const mainMsg =
        positiveAmount >= 3
          ? positiveAmount === 5
            ? 'Катці бути!'
            : `Можливо буде катуня`
          : `Катки скоріше за все не буде. ${maybeAmount > 1 ? 'Може на пізніше час?' : ''}`;
      const statMsg = `*Проголосувало*: ${totalAmount} (${yesAmount}y, ${maybeAmount}m, ${laterAmount}l, ${noAmount}n)`;
      const chanceMsg = `*Вірогідність*: ${gameChance}`;

      bot.sendMessage(chatId, `${mainMsg}\n${statMsg}\n${chanceMsg}`, {
        reply_to_message_id: pollMsg.message_id,
        parse_mode: 'markdown',
      });
    } catch (e) {
      bot.sendMessage(
        chatId,
        'Щось відсмоктало в голосуванні. Перевіряйте результати самостійно.'
      );
    }

    pollHistory.clear();
  });
};

const getGameChance = async (votes) => {
  const positiveVotes = Object.values(votes).filter(
    (val) => val === 0 || val === 1
  );

  switch (positiveVotes.length) {
    case 5:
      return '100%';
    case 4:
      return '90%';
    case 3:
      const users = await User.find({}).exec();

      const mappedUsers = users.map((user, idx) => {
        let probabilityChange = 0;
        const name = user.name || user.nickname;

        switch (name) {
          case '@scaar':
          case '@andriiVit':
          case 'Spok':
            probabilityChange = 10;
            break;
          case 'Ivan':
            probabilityChange = -20;
            break;
          case '@yarisheo':
            probabilityChange = -10;
            break;
        }

        return {
          id: user.tgId,
          probabilityChange,
        };
      });

      const probability = Object.keys(votes).reduce((acc, curr) => {
        if (votes[curr] > 1) {
          return acc;
        }

        const probabilityChange = mappedUsers.find(
          (user) => String(user.id) === curr
        ).probabilityChange;

        return acc + probabilityChange;
      }, 50);

      return `${probability}%`;
    default:
      return '0%';
  }
};
