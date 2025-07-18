const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    league: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'League', // Reference to the League model
    required: true
  },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

  teamSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.createdAt;
    return ret;
  }
});
  
  const Team = mongoose.model('Team', teamSchema);
  
  module.exports = Team;