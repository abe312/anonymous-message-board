const mongoose = require('mongoose');
const { Schema } = mongoose;

const BoardSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  threads: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Thread',
    },
  ],
});

mongoose.model('Board', BoardSchema);
