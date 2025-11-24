import {
  katkuHandler,
  smac10Handler,
  insultHandler,
  createGifHandler,
  mentionAllHandler,
  leaderboardHandler,
  recentMatchesHandler,
  isHighlightsMonitoringRegistered,
  monitorNewMatches,
  getWebUrl,
  createHandler,
  monitorNewHighlights,
  isMatchesMonitoringRegistered,
  listeners,
  pollSummaryHandler,
} from './handlers/index.js';
import { Leetify } from './services/leetify.js';
import bot from './bot.js';
import { commands } from './commandsRegistry.js';
import { svitloHandler } from './handlers/svitloHandler.js';

const leetify = new Leetify();

const setupMessages = (stickerSet) => {
  createHandler(/\/sosat/, smac10Handler(stickerSet), {
    command: '/sosat',
    description: 'Смактен стікер',
  });

  createHandler(/\/katku\s?(\d\d?:\d\d)?\s?(.*)?/, katkuHandler, {
    command: '/katku',
    description: 'Голосувалка для ігор',
  });

  createHandler(/\/insult ?(.*)?/, insultHandler, {
    command: '/insult',
    description: 'Оскорбить пайдора',
  });

  createHandler(/\/gif (.*)/, createGifHandler, {
    command: '/gif',
    description: 'Знайти гіфку',
  });

  createHandler(/\/mention_all/, mentionAllHandler, {
    command: '/mention_all',
    description: 'Згадати всіх',
  });

  createHandler(/\/leaderboard/, leaderboardHandler(leetify), {
    command: '/leaderboard',
    description: 'Leetify рейтинг цієї групи',
  });

  createHandler(/\/recent/, recentMatchesHandler(leetify), {
    command: '/recent',
    description: 'Leetify деталі останньої сесії',
  });

  monitorNewMatches(leetify);

  monitorNewHighlights(leetify);

  createHandler(/\/check_monitoring_matches/, isMatchesMonitoringRegistered, {
    command: '/check_monitoring_matches',
    description: 'Leetify перевірити чи працює моніторінг останньої гри',
  });

  createHandler(
    /\/check_monitoring_highlights/,
    isHighlightsMonitoringRegistered,
    {
      command: '/check_monitoring_highlights',
      description: 'Leetify перевірити чи працює моніторінг останніх хайлайтів',
    }
  );

  createHandler(/\/web/, getWebUrl, {
    command: '/web',
    description: 'Отримати url для web аплікейшну',
  });

  createHandler(/\/svitlo ?(.*)/, svitloHandler, {
    command: '/svitlo',
    description: 'Отримати інфу по світлу',
  });

  createHandler(/\/poll_summary/, pollSummaryHandler, {
    command: '/poll_summary',
    description: 'Підсумувати голосування',
  });

  listeners();

  bot.setMyCommands(commands);
};

export default setupMessages;
