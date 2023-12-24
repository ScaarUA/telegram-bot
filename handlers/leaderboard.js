import bot from "../bot.js";

export const leaderboardHandler = (leetify) => async (msg) => {
  const chatId = msg.chat.id;

  const rating = await leetify.getClubLeaderboard();

  const ratingTexts = rating.map((user, index) => `<code>${index + 1}. ${user.name}</code> <b>${user.leetifyRating * 100}</b>`);

  bot.sendMessage(chatId, ratingTexts.join('\n'), { parse_mode: 'html'});
}