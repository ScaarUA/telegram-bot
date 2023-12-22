import bot from "../bot.js";
import { Leetify } from "../services/leetify.js";

const leetify = new Leetify();

export const leaderboardHandler = async (msg) => {
  const chatId = msg.chat.id;

  const rating = await leetify.getClubStats();

  const ratingTexts = rating.map((user, index) => `<code>${index + 1}. ${user.name}</code> <b>${user.leetifyRating * 100}</b>`);

  bot.sendMessage(chatId, ratingTexts.join('\n'), { parse_mode: 'html'});
}