const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    content: {
      type: String,
      required: true
    },
    isfavorite: {
      type: Boolean
    },
    creator: {
      type: String,
      required: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('todo', postSchema);
