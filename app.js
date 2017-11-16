const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');


// Connect to database
mongoose.connect(config.database);

// Tell use we're connected
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
});

// If Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err.message);
});

const app = express();

const users = require('./routes/users');

const port = 8000;


// Allows other domains to "ping" this one.
app.use(cors());

app.use(bodyParser.json());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// passport
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

// Routing fix: catch all routes and send them to angular index to direct correctly.
app.get('/*', (req, res, next) => {
  // try {
    res.sendFile('index.html', {root: path.join(__dirname, 'public')});
  // } catch {
  //   res.write("The website is currently updating. Wait a few seconds and then refresh your page.");
  //   res.end();
  // }
  // response.sendfile(__dirname + '/index.html');
});

// Error handling.
app.use(function(err, req, res, next) {
  // log the error, treat it like a 500 internal server error
  // maybe also log the request so you have more debug information
  //log.error(err, req);

  // during development you may want to print the errors to your console
  //console.log(err.stack);

  // send back a 500 with a generic message
  res.status(500);
  res.send('oops! something broke.');
});


app.listen(port, () => {
  console.log('Server started on port '+port);
});
