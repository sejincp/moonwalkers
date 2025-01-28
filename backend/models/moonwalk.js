const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moonwalkSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    steps: { type: Number, required: true },
    usercomment: { type: String, required: true },
    comments: { type: String, required: true }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Moonwalk', moonwalkSchema);