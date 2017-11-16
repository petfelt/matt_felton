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
    res.sendFile('index.html', {root: path.join(__dirname, 'public')});
});

// Error handling.
app.use(function(err, req, res, next) {
  // This is important when updating the site via ng build.
  // send back a 205 AkA Reset Content code.
  res.status(205);
  res.send('The website is currently updating. Wait a moment and then refresh your page.');
});


app.listen(port, () => {
  console.log('Server started on port '+port);
});
