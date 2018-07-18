
const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const settings = require('../config/settings');
const passport = require('passport');
require('../config/passport')(passport);
const Schema = mongoose.Schema;


const RacesSchema = new Schema({
    raceName: String,
    raceDate: String,
    raceDistance: Number,
    percentBack: Number,
    userId: Schema.Types.ObjectId
});

const Race = mongoose.model('Race', RacesSchema, 'races');

router.get('/', passport.authenticate('jwt', { session: false }), function (req, res) {
    let token = getToken(req.headers);
    console.log('I like when this works,', token);

    if (token) {
        Race.find({userId: userIdWrite}).sort({ raceDate: 'asc' }).exec(function (err, foundRaces) {
            if (err) {
                res.send('error', err);
                console.log(err);
                res.sendStatus(500);
            } else {
                console.log(foundRaces);
                res.send(foundRaces);
            }
        })
    } else {
        return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
});

router.post('/delete/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
    let token = getToken(req.headers);
    console.log("This is the delete token", token);
    if (token) {
        let raceId = req.params.id;
        console.log(raceId);
        Race.findByIdAndRemove({ "_id": raceId }, function (err, data) {
            if (err) {
                console.log('error', err)
            } else {
                console.log(data)
                res.sendStatus(201);
            }
        })

    } else {
        console.log("Not authorized.")
       return res.status(403).send({success: false, msg: 'Unauthorized.'})
    }
});

router.post('/', passport.authenticate('jwt', { session: false }), function (req, res) {
    let raceToAdd = new Race({raceName: req.body.raceName, raceDate: req.body.raceDate, raceDistance: req.body.raceDistance, percentBack: req.body.percentBack, userId: userIdWrite});
    let token = getToken(req.headers);
    console.log("This is the post token", token);
    
    if (token) {

        raceToAdd.save(function (err, data) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                console.log(data);
                res.sendStatus(201);
            }
        })
    } else {
        return res.status(403).send({ success: false, msg: 'Unauthorized.' })
    }
});

getToken = function (headers) {
    if (headers && headers.authorization) {
        let parted = headers.authorization.split(' ');
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