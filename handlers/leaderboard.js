import bot from "../bot.js";

import { formatLeetifyRating } from "../helpers/formatters.js";

export const leaderboardHandler = (leetify) => async (msg) => {
  const chatId = msg.chat.id;

  const rating = await leetify.getClubLeaderboard();

  const ratingTexts = rating.map((user, index) => `<code>${index + 1}. ${user.name}</code> <b>${formatLeetifyRating(user.leetifyRating)}</b>`);

  bot.sendMessage(chatId, ratingTexts.join('\n'), { parse_mode: 'html'});
}