import express from "express";
import { User } from "../../db/schemas/index.js";

const usersRouter = express.Router();

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

  res.sendStatus(200);
});

export default usersRouter;