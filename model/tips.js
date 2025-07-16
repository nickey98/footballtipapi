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
    league: { type: mongoose.Schema.Types.ObjectId, 
      ref: 'League' 
    },
    finish:{
      type: Boolean,
      default: false
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
    score: {
      type: String,
      required: true,
      default: "0 : 0"
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

    tipSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.createdAt;
    return ret;
  }
});
  
  const Tip = mongoose.model('Tip', tipSchema);
  
  module.exports = Tip;