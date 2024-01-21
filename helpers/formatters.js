export const formatLeetifyRating = (rating) => rating > 0 ? '+' + (rating * 100).toFixed(2) : (rating * 100).toFixed(2);

export const formatEloChange = (eloChange) => eloChange > 0 ? '+' + eloChange : eloChange;