const mongoose = require('mongoose');

const predictSchema = new mongoose.Schema({
    tip: {
        type: String,
        required: true,
    },
    userId: {   
        type: String,
        required: true,
    },
    predict_score: {   
        type: String,
        required: true,
    },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
  predictSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.createdAt;
    return ret;
  }
});

const Predict = mongoose.model('Predict', predictSchema);
module.exports = Predict;