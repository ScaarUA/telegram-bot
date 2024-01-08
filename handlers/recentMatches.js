import bot from "../bot.js";
import { getMatchesText } from "../helpers/getMatchesText.js";

const formatLeetifyRating = (rating) => rating > 0 ? '+' + (rating * 100).toFixed(2) : (rating * 100).toFixed(2);
const formatEloChange = (eloChange) => eloChange > 0 ? '+' + eloChange : eloChange;

export const recentMatchesHandler = (leetify) => async (msg) => {
  const chatId = msg.chat.id;

  const sessions = await leetify.getClubSessions();
  const lastSession = sessions[0];
  const orderedGames = lastSession.games.reverse();
  const firstGame = orderedGames[0];

  const matchesTexts = getMatchesText(orderedGames);

  const leetifyOrderedPlayers = lastSession.players.sort((a,b) => b.totalLeetifyRating.value - a.totalLeetifyRating.value);

  const playersTexts = leetifyOrderedPlayers.map((player, index) => {
    const leetifyRating = formatLeetifyRating(player.totalLeetifyRating.value);
    const firstGamePlayerMatchmakingStats = firstGame.matchmakingGameStats.find(stat => stat.steam64Id === player.steam64Id);
    const eloChange = formatEloChange(player.rank - firstGamePlayerMatchmakingStats?.oldRank);

    const mvpSign = player.awards.toString().includes('mvp') ? '⭐' : '';
    const looserSign = index === (leetifyOrderedPlayers.length - 1) ? '😭' : '';

    return `
${index + 1}. <b>${player.name}</b> ${mvpSign}${looserSign} ${leetifyRating} | elo: ${player.rank} (${eloChange})
`
  });

  bot.sendMessage(chatId, matchesTexts.join('\n'), { parse_mode: 'html', disable_web_page_preview: true });
  const playersMessage = await bot.sendMessage(chatId, playersTexts.join(''), { parse_mode: 'html'});

  bot.onReplyToMessage(chatId, playersMessage.message_id, async (replyPlayersMessage) => {
    const id = replyPlayersMessage.text;
    const player = leetifyOrderedPlayers[Number(id) - 1];

    if (!player) {
      return bot.sendMessage(chatId, `Немає гравця з таким порядковим номером. Можливі значення 1-${leetifyOrderedPlayers.length}`);
    }

    const firstGamePlayerMatchmakingStats = firstGame.matchmakingGameStats.find(stat => stat.steam64Id === player.steam64Id);
    const eloChange = formatEloChange(player.rank - firstGamePlayerMatchmakingStats?.oldRank);

    const playerGamesStats = orderedGames.map(game => {
      const playerCsStats = game.matchmakingGameStats.find(stat => stat.steam64Id === player.steam64Id);
      const playerLeetifyStats = game.playerStats.find(stat => stat.steam64Id === player.steam64Id);
      const gameEloChange = formatEloChange(playerCsStats.rank - playerCsStats.oldRank);
      const gameLeetifyRating = formatLeetifyRating(playerLeetifyStats.leetifyRating);

      return `<b>${game.mapName}</b>
elo: <i>${gameEloChange}</i> | leetify: <i>${gameLeetifyRating}</i>
Dmg: ${playerLeetifyStats.totalDamage} | K: ${playerLeetifyStats.totalKills} D: ${playerLeetifyStats.totalDeaths} A: ${playerLeetifyStats.totalAssists}
K/D: ${playerLeetifyStats.kdRatio}`
    });

    const playerText = `
<b><a href="${player.steamAvatarUrl}">${player.name}</a></b>
leetify: T ${formatLeetifyRating(player.tLeetifyRating.value)}, CT ${formatLeetifyRating(player.ctLeetifyRating.value)}, total: ${formatLeetifyRating(player.totalLeetifyRating.value)}
elo: ${player.rank} (${eloChange})

${playerGamesStats.join('\n')}
    `;

    bot.sendMessage(chatId, playerText, { parse_mode: 'html'});
  });
}