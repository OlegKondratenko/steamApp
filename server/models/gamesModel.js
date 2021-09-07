const mongoose = require('mongoose');

const gamesSchema = new mongoose.Schema({
  id: {
    type: Number
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  sortName: {
    type: String,
  },
  isFullyOptimized: {
    type: Boolean,
  },
  steamUrl: {
    type: String,
  },
  store: {
    type: String
  },
  publisher: {
    type: String
  },
  genres: {
    type: [String]
  },
  status: {
    type: String,
    enum: ['AVAILABLE', 'UNAVAILABLE']
  },
});

const GameModel = mongoose.model('Games', gamesSchema);

module.exports = {
  GameModel,
};