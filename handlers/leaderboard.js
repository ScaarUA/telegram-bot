import bot from '../bot.js';

import { formatLeetifyRating } from '../helpers/formatters.js';

export const leaderboardHandler = (leetify) => async (msg) => {
  const chatId = msg.chat.id;

  const rating = await leetify.getClubLeaderboard();
  const getAvgLeetify = (ctLeetify, tLeetify) => (ctLeetify + tLeetify) / 2;

  const playersMapped = rating.players
    .map((player) => ({
      name: player.steamNickname,
      ctLeetify: rating.skills.ctLeetifyRating[player.steam64Id],
      tLeetify: rating.skills.tLeetifyRating[player.steam64Id],
    }))
    .sort(
      (a, b) =>
        getAvgLeetify(b.ctLeetify, b.tLeetify) -
        getAvgLeetify(a.ctLeetify, a.tLeetify)
    );

  const ratingTexts = playersMapped.map(
    (player, index) =>
      `<code>${index + 1}. ${player.name}</code> <b>${formatLeetifyRating(getAvgLeetify(player.ctLeetify, player.tLeetify), 1)}</b> (ct: ${formatLeetifyRating(player.ctLeetify, 1)}, t: ${formatLeetifyRating(player.tLeetify, 1)})`
  );

  bot.sendMessage(chatId, ratingTexts.join('\n'), { parse_mode: 'html' });
};
