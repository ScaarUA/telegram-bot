import express from "express";
import bot from "../../bot.js";
import config from "../../config.js";

const botRouter = express.Router();

botRouter.post('/sendMessage', async (req, res) => {
  bot.sendMessage(config.chatId, req.body.message);

  res.sendStatus(200);
});

export default botRouter;