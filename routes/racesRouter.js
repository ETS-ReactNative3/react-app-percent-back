
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var settings = require('../config/settings');
var passport = require('passport');
require('../config/passport')(passport);
var Schema = mongoose.Schema;

var RacesSchema = new Schema({
    raceName: String,
    raceDate: String,
    raceDistance: Number,
    percentBack: Number,
    userId: Schema.Types.ObjectId
});

var Race = mongoose.model('Race', RacesSchema, 'races');

router.get('/', passport.authenticate('jwt', { session: false }), function (req, res) {
    var token = getToken(req.headers);
    //var payload = token.getPayload();
    //var userIdIn = payload['sub'];
    //console.log('id', userIdIn);
    if (token) {
        Race.find().sort({ raceDate: 'asc' }).exec(function (err, foundRaces) {
            if (err) {
                res.send('error', err);
                console.log(err)
                res.sendStatus(500);
            } else {
                // console.log(foundRaces);
                res.send(foundRaces);
            }
        })
    } else {
        return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
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

router.post('/', passport.authenticate('jwt', { session: false }), function (req, res) {
    var raceToAdd = new Race(req.body);

    
    if (token) {

        raceToAdd.save(function (err, data) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                res.sendStatus(201);
            }
        })
    } else {
        return res.status(403).send({ success: false, msg: 'Unauthorized.' })
    }
});

getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

module.exports = router;