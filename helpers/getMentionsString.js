import { User } from "../db/schemas/index.js";

export const getMentionsString = async () => {
  const users = await User.find({}).exec();

  return users.reduce((acc, curr) => {
    const mention = curr.nickname ? curr.nickname : `[${curr.name}](tg://user?id=${curr.tgId})`

    return acc + ' ' + mention;
  }, '')
}