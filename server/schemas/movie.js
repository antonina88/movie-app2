const { Schema } = require("mongoose");

const movie = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  url: {
    type: String
  },
  date : { type: Date },
  likes: [{ type: Schema.Types.ObjectId, ref: 'Like' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});

module.exports = movie;