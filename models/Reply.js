const mongoose = require('mongoose');
const { Schema } = mongoose;

const replySchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  report: {
    type: Number,
    default: 0,
  },
  created_on: {
    type: Date,
    default: Date.Now,
  },
});

module.exports = replySchema;
