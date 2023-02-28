import express from 'express';
import bot from './bot.js';
import setupMessages from "./messages.js";
import config from './config.js';
import { keepAwake } from "./keepAwake.js";

const startBot = async () => {
    if (config.isProd) {
        await bot.setWebHook(`${config.envUrl}/bot${config.token}`);
        keepAwake();
    }
    await bot.setMyCommands([{
        command: '/sosat', description: 'Смактен стикер'
    }, {
        command: '/insult', description: 'Оскорбить пайдора'
    }, {
        command: '/image', description: 'Сгенерировать openAi картинку по тексту'
    }, {
        command: '/gif', description: 'Найти гифку',
    }])
    const stickerSet = await bot.getStickerSet('GolubZzZi');

    setupMessages(stickerSet);
}

startBot();

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

app.listen(process.env.PORT || 3001, () => {
    console.log('Server is running now');
});