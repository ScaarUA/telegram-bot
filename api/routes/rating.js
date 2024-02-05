import express from "express";
import { Rating } from "../../db/schemas/index.js";

const ratingRouter = express.Router();

ratingRouter.get('/', async (req, res) => {
  const rating = await Rating.find({}).exec();

  res.json(rating);
});

export default ratingRouter;