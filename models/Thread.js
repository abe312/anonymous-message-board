const mongoose = require('mongoose');
const { Schema } = mongoose;
const replySchema = require('./Reply');

const ThreadSchema = new Schema({
  board: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  replies: [replySchema],
  report: {
    type: Number,
    default: 0,
  },
  created_on: {
    type: Date,
    default: Date.Now,
  },
});

mongoose.model('thread', ThreadSchema);
