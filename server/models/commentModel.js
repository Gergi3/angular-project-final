const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  user: {
    type: ObjectId,
    ref: 'User'
  },
  article: {
    type: ObjectId,
    ref: 'Article'
  },
}, { timestamps: { createdAt: 'createdAt' } });

module.exports = mongoose.model('Comment', commentSchema);
