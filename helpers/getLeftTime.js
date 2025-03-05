export const getLeftTime = (targetDate) => {
  const currentDate = Date.now();
  const timer = targetDate - currentDate;
  const leftInHours = (timer <= 0 ? 0 : timer) / 1000 / 60 / 60;
  const leftHours = Math.floor(leftInHours);
  const leftTotalMinutes = (leftInHours - leftHours) * 60;
  const leftMinutes = Math.floor(leftTotalMinutes);
  const leftSeconds = Math.floor((leftTotalMinutes - leftMinutes) * 60);

  return {
    timer,
    text: `${leftHours}г. ${leftMinutes}хв. ${leftSeconds}сек.`,
  };
};
