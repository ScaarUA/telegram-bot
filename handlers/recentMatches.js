import bot from "../bot.js";

export const recentMatchesHandler = (leetify) => async (msg) => {
  const chatId = msg.chat.id;

  const sessions = await leetify.getClubSessions();
  const lastSession = sessions[0];

  const matchesTexts = lastSession.games.reverse().map((match) => {
    const date = new Date(match.finishedAt).toLocaleString();
    const isWin = (match.matchmakingGameStats[0].rank - match.matchmakingGameStats[0].oldRank) > 0;
    const score1 = isWin ? Math.max(match.teamScores[0], match.teamScores[1]) : Math.min(match.teamScores[0], match.teamScores[1]);
    const score2 = !isWin ? Math.max(match.teamScores[0], match.teamScores[1]) : Math.min(match.teamScores[0], match.teamScores[1]);

    return `
<i>${date}</i>
<a href="https://leetify.com/app/match-details/${match.id}/overview">Посилання на гру</a>
<b>${match.mapName}</b> ${score1}:${score2} ${isWin ? '👍' : '👎'}
`
  });

  const leetifyOrderedPlayers = lastSession.players.sort((a,b) => b.totalLeetifyRating.value - a.totalLeetifyRating.value);

  const playersTexts = leetifyOrderedPlayers.map((player, index) => {
    const leetifyRating = player.totalLeetifyRating.value > 0 ? '+' + (player.totalLeetifyRating.value * 100).toFixed(2) : (player.totalLeetifyRating.value * 100).toFixed(2);
    const eloChange = player.rankChange > 0 ? '+' + player.rankChange : player.rankChange;
    const mvpSign = player.awards.toString().includes('mvp') ? '⭐' : '';
    const looserSign = index === (leetifyOrderedPlayers.length - 1) ? '😭' : '';

    return `
${index + 1}. <b>${player.name}</b> ${mvpSign}${looserSign} ${leetifyRating} | elo: ${player.rank} (${eloChange})
`
  });

  bot.sendMessage(chatId, matchesTexts.join('\n'), { parse_mode: 'html', disable_web_page_preview: true });
  bot.sendMessage(chatId, playersTexts.join(''), { parse_mode: 'html'});
}