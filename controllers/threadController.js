const mongoose = require('mongoose');
const Validator = require('validator');
const Thread = mongoose.model('thread');
const bcrypt = require('bcrypt');

exports.getAll = async (req, res) => {
  let threads = await Thread.find({}).sort('-created_on board');

  const boards = [...new Set(threads.map(thread => thread.board))];
  // todos: total threads in each board

  res.json(boards);
};

exports.getThread = async (req, res) => {
  const board = req.params.board;

  const { thread_id } = req.query;
  // console.log(thread_id);
  if (thread_id) {
    // console.log('here');
    let thread = await Thread.findById(thread_id).lean();
    delete thread.password;
    delete thread.__v;
    thread.replies.map(reply => delete reply.password);

    console.log('here');
    res.json(thread);
  } else {
    let threads = await Thread.find({ board })
      .sort('-created_on')
      .limit(10);

    // root of all errors :|
    threads = threads.map(thread => thread.toObject());

    threads.map(thread => {
      delete thread.password;
      delete thread.__v;
      thread.count_replies = thread.replies.length;

      thread.replies = thread.replies.filter(
        reply => reply.text !== '[deleted]'
      );
      if (thread.replies.length > 0) {
        thread.replies.map(reply => delete reply.password);
        thread.hidden_replies = thread.count_replies - thread.replies.length;

        thread.replies = thread.replies.sort(function(a, b) {
          let c = new Date(a.created_on);
          let d = new Date(b.created_on);
          return d - c;
        });
        // thread.count_replies = thread.replies.length;
        thread.replies.splice(3);
      }
    });
    res.json(threads);
  }
};
exports.postThread = async (req, res) => {
  const board = req.params.board;
  const { text, delete_password } = req.body;
  // console.log(req.body);
  bcrypt.genSalt(10, async (err, salt) => {
    bcrypt.hash(delete_password, salt, async (err, hash) => {
      if (err) throw err;
      password = hash;
      try {
        const thread = new Thread({
          board,
          text,
          password,
          created_on: Date.now(),
        });
        await thread.save();
        res.json(thread);
      } catch (err) {
        console.log(err);
      }
    });
  });
};
exports.putThread = async (req, res) => {
  const board = req.params.board;
  const { thread_id } = req.body;

  console.log(board, thread_id);
  const thread = await Thread.findOneAndUpdate(
    { board, _id: thread_id },
    {
      $inc: {
        report: 1,
      },
    },
    { new: true }
  );
  // console.log('thread,', thread);
  // res.json(thread);
  res.send('success');
};
exports.deleteThread = async (req, res) => {
  const board = req.params.board;

  const { thread_id, delete_password } = req.body;
  console.log(req.body, req.params.board, req.query);
  const thread = await Thread.findOne({ board, _id: thread_id });
  if (thread) {
    // console.log('here');
    // console.log(thread);
    console.log('thread password', thread.password);
    bcrypt.compare(delete_password, thread.password, async (err, isMatch) => {
      if (isMatch) {
        await Thread.deleteOne({ board, _id: thread_id });
        return res.send('success');
      } else {
        return res.send('password incorrect');
      }
    });
  } else {
    res.send('thread not found');
  }
};
