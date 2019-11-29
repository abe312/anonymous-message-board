'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

require('./models/Thread');
// require('./models/Board');

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('mongoDb connected'))
  .catch(err => console.log(err));

var express = require('express');
var bodyParser = require('body-parser');
var expect = require('chai').expect;
var cors = require('cors');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({ origin: '*' })); //For FCC testing purposes only

var apiRoutes = require('./routes/api.js');
var fccTestingRoutes = require('./routes/fcctesting.js');
var runner = require('./test-runner');

//Sample front-end
// app.route('/b/:board/').get(function(req, res) {
//   res.sendFile(process.cwd() + '/views/board.html');
// });
// app.route('/b/:board/:threadid').get(function(req, res) {
//   res.sendFile(process.cwd() + '/views/thread.html');
// });

//Index page (static HTML)
// app.route('/').get(function(req, res) {
//   res.sendFile(process.cwd() + '/views/index.html');
// });

//For FCC testing purposes
fccTestingRoutes(app);

//Routing for API
apiRoutes(app);

//Sample Front-end

//404 Not Found Middleware
app.use(function(req, res, next) {
  res
    .status(404)
    .type('text')
    .send('Not Found');
});

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//Start our server and tests!
app.listen(process.env.PORT || 5000, function() {
  console.log('Listening on port ' + process.env.PORT);
  if (process.env.NODE_ENV === 'test') {
    console.log('Running Tests...');
    setTimeout(function() {
      try {
        runner.run();
      } catch (e) {
        var error = e;
        console.log('Tests are not valid:');
        console.log(error);
      }
    }, 1500);
  }
});

module.exports = app; //for testing
