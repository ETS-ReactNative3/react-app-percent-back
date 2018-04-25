var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');
var settings = require('../config/settings');
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../models/user");

// var UserSchema = new Schema({
//     username: {
//         type: String,
//         unique: true,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     }
// });


// UserSchema.pre('save', function (next) {
//     var user = this;
//     if (this.isModified('password') || this.isNew) {
//         bcrypt.genSalt(10, function (err, salt) {
//             if (err) {
//                 return next(err);
//             }
//             bcrypt.hash(user.password, salt, null, function (err, hash) {
//                 if (err) {
//                     return next(err);
//                 }
//                 user.password = hash;
//                 next();
//             });
//         });
//     } else {
//         return next();
//     }
// });

// UserSchema.methods.comparePassword = function (passw, cb) {
//     bcrypt.compare(passw, this.password, function (err, isMatch) {
//         if (err) {
//             return cb(err);
//         }
//         cb(null, isMatch);
//     });
// };
// var User = mongoose.model('User', UserSchema, 'users');

// // load up the user model
// var settings = require('../config/settings'); // get settings file

router.post('/register', function(req, res) {
    if(!req.body.username || !req.body.password) {
        res.json({success: false, msg: 'Please pass username and password.'});
    } else {
        var newUser = new User({
            username: req.body.username,
            password: req.body.password
        });
        //Save the user
        newUser.save(function(err) {
            if(err) {
                return res.json({success: false, msg: 'Username already exists.'});
            }
            res.json({success: true, msg: 'Successfully created new user.'})
        });
    }
});

router.post('/login', function(req, res) {
    console.log(req.body)
    User.findOne({
        username: req.body.username
    }, function(err, user) {
        if(err) throw err;
        if (!user) {
            res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
            //check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign(user.toJSON(), settings.secret);
          // return the information including token as JSON
          
          res.json({success: true, token: 'JWT ' + token, sub: user._id});
                } else {
                res.status(403).send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
            });
        }
    });
});

module.exports = router;

