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
      required: true,
      ref: 'User'
    },
    parent: {
      id: { type: Schema.Types.ObjectId, required: true },
      model: { type: String, required: true },
    },
    moonwalk: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Moonwalk',
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Comment', commentSchema);