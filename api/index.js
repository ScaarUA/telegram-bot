import express from 'express';
import usersRouter from './routes/users.js';
import ratingRouter from './routes/rating.js';
import botRouter from './routes/bot.js';

const router = express.Router();

router.use('/users', usersRouter);
router.use('/rating', ratingRouter);
router.use('/bot', botRouter);

export default router;
