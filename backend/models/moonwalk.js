const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moonwalkSchema = new Schema(
  {
    content: { type: String, required: true },
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

module.exports = mongoose.model('Moonwalk', moonwalkSchema);