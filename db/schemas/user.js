import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  tgId: Number,
  name: String,
  nickname: String,
});

export const User = mongoose.model('user', userSchema);
