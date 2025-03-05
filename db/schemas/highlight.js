import mongoose from 'mongoose';

const highlightSchema = new mongoose.Schema({
  hgId: String,
});

export const Highlight = mongoose.model('highlight', highlightSchema);
