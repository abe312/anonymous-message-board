/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *       (if additional are added, keep them at the very end!)
 */

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

let replyId,
  threadId,
  threadText = 'Testing #1',
  replyText = 'Reply Testing #1',
  deletePassword = 'testingPassword';
suite('Functional Tests', function() {
  suite('API ROUTING FOR /api/threads/:board', function() {
    // body text, delete_password
    test('Post dummy values and check results', function(done) {
      this.timeout(15000);
      chai
        .request(server)
        .post('/api/threads/test')
        .send({
          text: threadText,
          delete_password: deletePassword,
        })
        .end(function(err, res) {
          console.log('dummy', res.body);
          let { report, _id, board, text, replies } = res.body;
          threadId = _id;
          assert.equal(res.status, 200);

          assert.property(res.body, 'created_on');
          assert.equal(report, 0);
          assert.equal(text, threadText);
          assert.equal(board, 'test');
          assert.isArray(replies);
          // assert.equal(replies, []);

          done();
        });
    });

    suite('GET thread by id /api/threads/test?thread_id=', function() {
      test('Test whether the previous test is updated in the database', function(done) {
        this.timeout(15000);
        chai
          .request(server)
          .get('/api/threads/test')
          .query({
            thread_id: threadId,
          })
          .end(function(err, res) {
            let { _id, report, board, text, created_on, replies } = res.body;
            assert.equal(_id, threadId);
            assert.equal(report, 0);
            assert.equal(board, 'test');
            assert.equal(text, threadText);
            assert.property(res.body, 'created_on');
            assert.isArray(replies);
            // assert.equal(replies, []);

            done();
          });
      });
    });

    suite('GET ALL threads /api/threads/test', function() {
      test('test whether the all array has the above POST thread on the top', function(done) {
        this.timeout(15000);
        chai
          .request(server)
          .get('/api/threads/test')
          .send()
          .end(function(err, res) {
            let {
              report,
              _id,
              board,
              text,
              count_replies,
              replies,
              created_on,
            } = res.body[0];
            assert.isArray(res.body);
            assert.isArray(replies);
            assert.equal(report, 0);
            assert.equal(_id, threadId);
            assert.equal(board, 'test');
            assert.equal(text, threadText);
            assert.equal(count_replies, 0);

            done();
          });
      });
    });

    suite('PUT  report thread /api/threads/test', function() {
      // body thread_id

      test('report thread', function(done) {
        this.timeout(15000);
        chai
          .request(server)
          .put('/api/threads/test')
          .send({
            thread_id: threadId,
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'success');

            done();
          });
      });

      test('Test whether the threadId has been reported', function(done) {
        this.timeout(15000);
        chai
          .request(server)
          .get('/api/threads/test')
          .query({
            thread_id: threadId,
          })
          .end(function(err, res) {
            let { _id, report, board, text, created_on, replies } = res.body;
            assert.equal(_id, threadId);
            assert.equal(report, 1);
            assert.equal(board, 'test');
            assert.equal(text, threadText);
            assert.property(res.body, 'created_on');
            assert.isArray(replies);
            // assert.equal(replies, []);

            done();
          });
      });
    });

    suite('DELETE thread by id and password /api/threads/test', function() {
      // body thread_id, delete_password

      test('Delete thread', function(done) {
        this.timeout(15000);
        chai
          .request(server)
          .delete('/api/threads/test')
          .send({
            thread_id: threadId,
            delete_password: deletePassword,
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'success');

            done();
          });
      });

      // not working; fix this (same with posting a reply to weird threadId)
      // test('Delete thread test', function(done) {
      //   chai
      //     .request(server)
      //     .get('/api/threads/test')
      //     .query({
      //       thread_id: threadId,
      //     })
      //     .end(function(err, res) {
      //       let { _id, report, board, text, created_on, replies } = res.body;
      //       assert.equal(_id, threadId);
      //       assert.equal(report, 1);
      //       assert.equal(board, 'test');
      //       assert.equal(text, threadText);
      //       assert.property(res.body, 'created_on');
      //       assert.isArray(replies);
      //       assert.equal(replies, []);

      //       done();
      //     });
      // });
    });
  });
  /*
  suite('API ROUTING FOR /api/replies/:board', function() {
    suite('POST /api/replies/test', function() {
      // body thread_id, text, delete_password
    });

    suite('PUT report replies /api/replies/test', function() {
      // body thread_id, reply_id
    });


    suite('GET /api/replies/test?thread_id=', function() {});

    suite('DELETE replies /api/replies/test', function() {
      // body thread_id, delete_password, reply_id
    });


  });
  */
});
