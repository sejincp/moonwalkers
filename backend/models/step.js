const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stepSchema = new Schema(
  {
    stepCount: {
      type: Number,
      required: true,
      ref: 'Moonwalk'
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Step', stepSchema);