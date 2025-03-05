import { connectDb } from './db/mongo.js';

process.env.TZ = 'Europe/Kiev';

import express from 'express';
import bot from './bot.js';
import setupMessages from './messages.js';
import config from './config.js';
import { keepAwake } from './helpers/keepAwake.js';
import api from './api/index.js';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const startBot = async () => {
  if (config.isProd) {
    await bot.setWebHook(`${config.envUrl}/bot${config.token}`);
    keepAwake();
  }
  const stickerSet = await bot.getStickerSet('GolubZzZi');

  setupMessages(stickerSet);
};
connectDb().then(async () => {
  startBot();
});

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('bot running');
});

app.post(`/bot${config.token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.get('/health', (req, res) => {
  res.sendStatus(200);
});

app.use('/api', api);

app.get('/app*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './app/build/index.html'));
});

app.use(express.static(__dirname + '/app/build'));

app.listen(process.env.PORT || 3001, () => {
  console.log('Server is running now');
});
