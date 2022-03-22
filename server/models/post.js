const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Types.ObjectId },
    title: { type: String },
    content: { type: String },
    likes: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Post || mongoose.model('Post', postSchema);
