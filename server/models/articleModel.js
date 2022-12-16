const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: [5, 'Password must be between 5 and 50 characters'],
    maxlength: [150, 'Password must be between 5 and 50 characters'],
  },
  summary: {
    type: String,
    required: true,
    minlength: [3, 'Summary must be between 3 and 100 characters'],
    maxlength: [100, 'Summary must be between 3 and 100 characters']
  },
  description: {
    type: String,
    required: true,
    minlength: [5, 'Description must be between 5 and 100 000 characters'],
    maxlength: [100_000, 'Description must be between 5 and 100 000 characters'],
  },
  imageUrl: {
    type: String,
    validate: {
      validator: function (v) {
        return /^https?:\/\/.+/g.test(v);
      },
      message: props => `${props.value} must be a valid url!`
    },
  },
  user: {
    type: ObjectId,
    ref: 'User'
  },
  comments: [{
    type: ObjectId,
    ref: 'Comment'
  }],
}, { timestamps: { createdAt: 'createdAt' } });

module.exports = mongoose.model('Article', articleSchema);
