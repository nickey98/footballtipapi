const mongoose = require('mongoose');

const leagueSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

  leagueSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.createdAt;
    return ret;
  }
});
  
  const League = mongoose.model('League', leagueSchema);
  
  module.exports = League;