const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const races = require('./routes/racesRouter.js');
const router = express.Router();
const auth = require('./routes/usersRouter');
require('dotenv').config()

app.use(express.static(path.join(__dirname, 'build')));

app.get('/chart', function (req, res) {
   res.sendFile(path.join(__dirname, 'build', 'index.html'));
 });

 app.get('/table', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

  app.get('/input', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

app.use(bodyParser.json());


app.use('/races', races);
app.use('/api/auth', auth);


const mongoose = require('mongoose');
// var Schema = mongoose.Schema;

let mongoURI = process.env.DB_CONNECTION;

mongoose.connection.on('connected', function () {
});

mongoose.connection.on('error', function () {
});

mongoose.connect(mongoURI);

app.listen(port, function () {
    //console.log('Listening on port: ', port)
    //Starting the server.
});