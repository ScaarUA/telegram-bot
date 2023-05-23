import bot from "../bot.js";
import * as schedule from "node-schedule";

let isNacizmRegistered = false;
let job;
export const registerNacizmHandler = async (msg) => {
    const chatId = msg.chat.id;

    if (isNacizmRegistered) {
        bot.sendMessage(chatId, 'Я уже нацист. 88');
        return bot.sendPhoto(chatId, 'https://images.jpost.com/image/upload/f_auto,fl_lossy/c_fill,g_faces:center,h_537,w_822/444512');
    }

    const rule = new schedule.RecurrenceRule();
    rule.hour = 21;
    rule.tz = 'Europe/Kiev';

    job = schedule.scheduleJob(rule, async () => {
        await bot.sendMessage(chatId, 'Мы должны защитить само существование нашего народа и будущее для белых детей. Чтобы красота Белой Арийской женщины никогда не исчезла с лика земли!');
        await bot.sendMessage(chatId, 'Мы ведём борьбу за обеспечение существования и за распространение нашей расы и нашего народа. Мы ведём борьбу за обеспечение пропитания наших детей, за чистоту нашей крови, за свободу и независимость нашего отечества. Мы ведём борьбу за то, чтобы народ наш действительно мог выполнить ту историческую миссию, которая возложена на него творцом вселенной. Каждая наша мысль и каждая наша идея, вся наша наука и всё наше знание — всё должно служить только этой цели. Только с этой единственной точки зрения должны мы проверять целесообразность того или другого средства.');

        bot.sendAudio(chatId, 'https://dl.muzhub.net/files/track/2020/10/Gimn_Lyuftvaffe_Ss_-_Luftwaffe_Ss.mp3');
    });

    await bot.sendMessage(chatId, 'Я теперь нацист.');
    await bot.sendMessage(chatId, '198 Sieg Heil.');
    await bot.sendPhoto(chatId, 'https://upload.wikimedia.org/wikipedia/commons/0/03/Bundesarchiv_Bild_147-0510%2C_Berlin%2C_Lustgarten%2C_Kundgebung_der_HJ.jpg');

    isNacizmRegistered = true;
}

export const deregisterNacizmHandler = async (msg) => {
    const chatId = msg.chat.id;

    if (job) {
        job.cancel();
        isNacizmRegistered = false;

        await bot.sendMessage(chatId, 'Я больше не нацист. Слава Україні!');
        bot.sendPhoto(chatId, 'https://www.daad-ukraine.org/files/2022/08/AdobeStock_210415022_1920x900px.jpeg');
    }
}