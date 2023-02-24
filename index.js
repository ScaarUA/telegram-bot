import express from 'express';
import bot from './bot.js';
import setupMessages from "./messages.js";
import config from './config.js';

const startBot = async () => {
    if (config.isProd) {
        await bot.setWebHook(`${config.envUrl}/bot${config.token}`);
    }
    await bot.setMyCommands([{command: '/sosat', description: 'Смактен стикер' }, { command: '/insult', description: 'Оскорбить пайдора'}])
    const stickerSet = await bot.getStickerSet('GolubZzZi');

    setupMessages(stickerSet);
}

startBot();

const app = express();

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

app.listen(process.env.PORT || 3001, () => {
    console.log('Server is running now');
});