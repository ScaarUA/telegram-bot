import bot from '../bot.js';
import { addCommand } from '../commandsRegistry.js';

export * from './createGif.js';
export * from './insult.js';
export * from './katku.js';
export * from './smac10.js';
export * from './registerNacizm.js';
export * from './mentionAllHandler.js';
export * from './leaderboard.js';
export * from './recentMatches.js';
export * from './monitorNewMatches.js';
export * from './getWebUrl.js';
export * from './monitorHighlights.js';
export * from './ai.js';
export * from './summary.js';

export const createHandler = (pattern, handler, commandDoc) => {
  bot.onText(pattern, handler);
  addCommand(commandDoc.command, commandDoc.description);
};
