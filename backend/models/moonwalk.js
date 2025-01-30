const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
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
    distance: { type: Number },
    description: { type: String, required: true },
    comments: [commentSchema]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Moonwalk', moonwalkSchema);