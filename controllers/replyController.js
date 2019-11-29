const mongoose = require('mongoose');
const Validator = require('validator');
const Thread = mongoose.model('thread');
const bcrypt = require('bcrypt');

exports.getReplies = async (req, res) => {
  const board = req.params.board;
  const { thread_id } = req.query;

  const thread = await Thread.findById(thread_id);
  // const replies = thread.replies;
  res.json(thread);
};
exports.postReplies = async (req, res) => {
  const board = req.params.board;
  const { thread_id, text, delete_password } = req.body;

  if (!delete_password) return res.send('passsword should be provided');
  if (!text) return res.send('text should be provided');
  bcrypt.genSalt(10, async (err, salt) => {
    bcrypt.hash(delete_password, salt, async (err, hash) => {
      if (err) throw err;
      password = hash;
      try {
        const thread = await Thread.findOneAndUpdate(
          { board, _id: thread_id },
          {
            $push: {
              replies: { text, password, created_on: Date.now(), report: 0 },
            },
          },
          { new: true }
        );
        res.json(thread);
      } catch (err) {
        console.log(err);
      }
    });
  });
};

exports.putReplies = async (req, res) => {
  const board = req.params.board;
  // console.log(req.body);
  // console.log(req.query);
  const { thread_id, reply_id } = req.body;
  const thread = await Thread.findOneAndUpdate(
    { board, _id: thread_id, 'replies._id': reply_id },
    { $inc: { 'replies.$.report': 1 } },
    { new: true }
  );
  // console.log(thread);
  return res.send('success');
};
exports.deleteReplies = async (req, res) => {
  const board = req.params.board;

  const { thread_id, delete_password, reply_id } = req.body;
  console.log(req.body);
  console.log(req.params);
  console.log(req.query);
  let thread = await Thread.find({
    board,
    _id: thread_id,
    'replies._id': reply_id,
  });
  // console.log(reply);
  // return res.send(reply);
  if (thread) {
    const reply = thread[0].replies.filter(item => item._id == reply_id);
    const delete_password_reply = reply[0].password;
    console.log(delete_password_reply);
    // return res.send(reply);
    bcrypt.compare(
      delete_password,
      delete_password_reply,
      async (err, isMatch) => {
        if (isMatch) {
          thread = await Thread.findOneAndUpdate(
            { board, _id: thread_id, 'replies._id': reply_id },
            // { $pull: { replies: { _id: reply_id } } },
            { $set: { 'replies.$.text': '[deleted]' } },
            { new: true }
          );
          // console.log(thread)
          res.json('success');
        } else {
          return res.send('password incorrect');
        }
      }
    );
  } else {
    res.send('thread not found');
  }
};
