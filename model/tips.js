const mongoose = require('mongoose');

const tipSchema = new mongoose.Schema({
    homeTeam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    awayTeam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    finish:{
      type: Boolean,
      default: false
    },
    league: {
      type: String,
      required: true
    },
    round: {
      type: String,
      required: false
    },
    tip: {
      type: String,
      required: true
    },
    isCorrect:{
      type: Boolean,
      default: false,
    },
    time: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  const Tip = mongoose.model('Tip', tipSchema);
  
  module.exports = Tip;