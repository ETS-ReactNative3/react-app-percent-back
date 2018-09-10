const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const races = require('./routes/racesRouter.js');
const router = express.Router();
const auth = require('./routes/usersRouter');

app.use(express.static(path.join(__dirname, 'build')));

app.get('/chart', function (req, res) {
   res.sendFile(path.join(__dirname, 'build', 'index.html'));
 });

 app.get('/table', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

app.use(bodyParser.json());


app.use('/races', races);
app.use('/api/auth', auth);


const mongoose = require('mongoose');
// var Schema = mongoose.Schema;

let mongoURI = '';

if (process.env.MONGODB_URI !== undefined) {
    // use the string value of the environment variable
    mongoURI = process.env.MONGODB_URI;
} else {
    // use the local database server
    mongoURI = 'mongodb://localhost:27017/percent-back';
}

mongoose.connection.on('connected', function () {
});

mongoose.connection.on('error', function () {
});

mongoose.connect(mongoURI);

app.listen(port, function () {
    //console.log('Listening on port: ', port)
    //Starting the server.
});