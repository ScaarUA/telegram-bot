import express from 'express';
import { User } from '../../db/schemas/index.js';

const usersRouter = express.Router();

const preventToxicity = (req, res, next) => {
  const headers = req.headers;

  if (!headers.host || !headers.origin || !headers.referer) {
    return res
      .status(400)
      .send(`Пішов нахуй, твій айпі збережено ${req.ip}. Чекай ddos'а підор`);
  }

  next();
};

usersRouter.use(preventToxicity);

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).exec();

  res.json(users);
});

usersRouter.put('/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId).exec();

  user.name = req.body.name;
  user.nickname = req.body.nickname;
  user.tgId = req.body.tgId;

  await user.save();

  res.json(user);
});

usersRouter.post('/', async (req, res) => {
  const user = new User({
    name: req.body.name,
    nickname: req.body.nickname,
    tgId: req.body.tgId,
  });

  await user.save();

  res.json(user);
});

usersRouter.delete('/:userId', async (req, res) => {
  await User.deleteOne({ _id: req.params.userId }).exec();

  res.sendStatus(200);
});

export default usersRouter;
