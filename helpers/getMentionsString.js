import config from '../config.js';

export const getMentionsString = () =>
  config.nativeUsers.reduce((acc, curr) => {
    const mention = curr.nickname ? curr.nickname : `[${curr.name}](tg://user?id=${curr.id})`

    return acc + ' ' + mention;
  }, '')