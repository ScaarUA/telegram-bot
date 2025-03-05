import mongoose, { Schema } from 'mongoose';

const ratingSchema = new mongoose.Schema({
  date: Date,
  rating: [
    {
      rank: Number,
      user: String,
    },
  ],
});

export const Rating = mongoose.model('rating', ratingSchema);
