const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    logo: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  const Team = mongoose.model('Team', teamSchema);
  
  module.exports = Team;