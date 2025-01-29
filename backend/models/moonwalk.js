const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stepSchema = new Schema(
  {
    stepCount: { type: Number, min: 0, max: 50000, required: true },
    date: { type: Date, required: true },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
  },
  {
    timestamps: true,
  }
);

const moonwalkSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    steps: [stepSchema],
    distance: { type: Number },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Moonwalk', moonwalkSchema);