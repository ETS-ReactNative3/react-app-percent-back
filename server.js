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

  app.get('/input', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

app.use(bodyParser.json());


app.use('/races', races);
app.use('/api/auth', auth);


const mongoose = require('mongoose');
// var Schema = mongoose.Schema;

let mongoURI = 'mongodb://apiuser:oAmdztZt4jXvnVBr@percent-back-app-shard-00-00.8tukl.mongodb.net:27017,percent-back-app-shard-00-01.8tukl.mongodb.net:27017,percent-back-app-shard-00-02.8tukl.mongodb.net:27017/percent-back-app?ssl=true&replicaSet=atlas-e0nzkt-shard-0&authSource=admin&retryWrites=true&w=majority';

mongoose.connection.on('connected', function () {
});

mongoose.connection.on('error', function () {
});

mongoose.connect(mongoURI);

app.listen(port, function () {
    //console.log('Listening on port: ', port)
    //Starting the server.
});