export const getMatchesText = (games) => {
  try {
  return games.map((match) => {
    if (!match) {
      return;
    }

    const date = new Date(match.finishedAt).toLocaleString();
    const isWin =
      match.matchmakingGameStats[0].rank -
        match.matchmakingGameStats[0].oldRank >
      0;
    const score1 = isWin
      ? Math.max(match.teamScores[0], match.teamScores[1])
      : Math.min(match.teamScores[0], match.teamScores[1]);
    const score2 = !isWin
      ? Math.max(match.teamScores[0], match.teamScores[1])
      : Math.min(match.teamScores[0], match.teamScores[1]);

    return `
<i>${date}</i>
<a href="https://leetify.com/app/match-details/${match.id}/overview">Посилання на гру</a>
<b>${match.mapName}</b> ${score1}:${score2} ${isWin ? '👍' : '👎'}
`;
  });

  } catch (e) {
    console.log('leetify туйня. апі інше');
  }
};
