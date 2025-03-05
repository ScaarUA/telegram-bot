import {
  katkuHandler,
  smac10Handler,
  insultHandler,
  createGifHandler,
  registerNacizmHandler,
  deregisterNacizmHandler,
  mentionAllHandler,
  leaderboardHandler,
  recentMatchesHandler,
  isMonitoringRegistered,
  monitorNewMatches,
  getWebUrl,
  createHandler,
} from './handlers/index.js';
import { Leetify } from './services/leetify.js';
import bot from './bot.js';
import { commands } from './commandsRegistry.js';

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

  createHandler(/\/register_nacizm/, registerNacizmHandler, {
    command: '/register_nacizm',
    description: 'Бот нацист',
  });

  createHandler(/\/cancel_nacizm/, deregisterNacizmHandler, {
    command: '/cancel_nacizm',
    description: 'Бот бандера',
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

  createHandler(/\/check_monitoring/, isMonitoringRegistered, {
    command: '/check_monitoring',
    description: 'Leetify перевірити чи працює моніторінг останньої гри',
  });

  createHandler(/\/web/, getWebUrl, {
    command: '/web',
    description: 'Отримати url для web аплікейшну',
  });

  bot.setMyCommands(commands);
};

export default setupMessages;
