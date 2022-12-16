const mongoose = require('mongoose');

const tokenBlacklistSchema = new mongoose.Schema({
  token: String,
}, { timestamps: { createdAt: 'createdAt' } });


module.exports = mongoose.model('TokenBlacklist', tokenBlacklistSchema);