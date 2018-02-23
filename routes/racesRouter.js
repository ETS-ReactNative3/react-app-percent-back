
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RacesSchema = new Schema({
    raceName: String,
    raceDate: String,
    raceDistance: Number,
    percentBack: Number
});

var Race = mongoose.model('Race', RacesSchema, 'races');

router.get('/', function (req, res) {
    Race.find({}, function (err, foundRaces) {
        if (err) {
            res.send('error', err);
            console.log(err)
            res.sendStatus(500);
        } else {
            res.send(foundRaces);
        }
    })
})

router.delete('/:id', function (req, res) {
    var raceId = req.params.id;
    Race.findByIdAndRemove({ "_id": raceId }, function (err, data) {
        if (err) {
            console.log('error', err)
        } else {
            res.sendStatus(201);
        }
    })
})

router.post('/', function(req, res){
    var raceToAdd = new Race(req.body);

    raceToAdd.save(function(err, data){
        if(err){
            console.log(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }
    })
})

module.exports = router;