import { monitorNewMatches } from "./monitorNewMatches.js";


export const globalListener = (leetify) => (msg) => {
  const chatId = msg.chat.id;

  monitorNewMatches(leetify, chatId);

  leetify.setChatId(msg.chat.id);
}