export const formatLeetifyRating = (rating, multiplier = 100) =>
  rating > 0
    ? '+' + (rating * multiplier).toFixed(2)
    : (rating * multiplier).toFixed(2);

export const formatEloChange = (eloChange) =>
  eloChange > 0 ? '+' + eloChange : eloChange;
