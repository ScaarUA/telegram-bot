import bot from "../bot.js";
import { getMentionsString } from "../helpers/getMentionsString.js";

export const mentionAllHandler = async (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, getMentionsString(), { parse_mode: 'markdown'});
}