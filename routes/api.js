/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

'use strict';

var expect = require('chai').expect;
const { catchErrors } = require('../hoc/catchErrors');
const {
  getThread,
  postThread,
  putThread,
  deleteThread,
  getAll,
} = require('../controllers/threadController');
const {
  getReplies,
  postReplies,
  putReplies,
  deleteReplies,
} = require('../controllers/replyController');

module.exports = function(app) {
  app
    .route('/api/threads/:board')

    .get(catchErrors(getThread))
    .post(catchErrors(postThread))
    .put(catchErrors(putThread))
    .delete(catchErrors(deleteThread));

  app
    .route('/api/replies/:board')

    .get(catchErrors(getReplies))
    .post(catchErrors(postReplies))
    .put(catchErrors(putReplies))
    .delete(catchErrors(deleteReplies));

  app.route('/api/boards').get(catchErrors(getAll));
};
