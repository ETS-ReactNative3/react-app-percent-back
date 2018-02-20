var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(express.static('server/public'));

var mongoose = require('mongoose');

var mongoURI= '';

if(process.env.MONGODB_URI != undefined) {
    // use the string value of the environment variable
    mongoURI = process.env.MONGODB_URI;
} else {
    // use the local database server
    mongoURI = 'mongodb://localhost:27017/kiosk';
}

mongoose.connection.on('connected', function(){
});

mongoose.connection.on('error', function(){
});

mongoose.connect(mongoURI);


app.listen(port, function(){
    console.log('Listening on port: ', port)
    //Starting the server.
});