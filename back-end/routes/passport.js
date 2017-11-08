var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mongoURL = "mongodb://localhost:27017/login";
var kafka = require('./kafka/client');
var gs = require('passport-google-oauth').OAuth2Strategy;
var configAuth = require('../config/auth');
var User = require('../models/user');

module.exports = function(passport) {
    passport.use('login', new LocalStrategy(function(username , password, done) {
        console.log('in passport');
        kafka.make_request('login_topic',{"username":username,"password":password , number: 1}, function(err,results){
            console.log('in result');
            console.log(results.code);
                if(results.code == 200){
                    //console.log(results);
                    done(null,results);
                }
                else {
                    done(null,false);
                }

        });

    }));

    passport.use(new gs({
            clientID: configAuth.googleAuth.clientID,
            clientSecret: configAuth.googleAuth.clientSecret,
            callbackURL: configAuth.googleAuth.callbackURL
        },
        function(accessToken, refreshToken, profile, done) {
            process.nextTick(function(){
                User.findOne({'google.id': profile.id}, function(err, user){
                    if(err)
                        return done(err);
                    if(user)
                        return done(null, user);
                    else {
                        var newUser = new User();
                        newUser.google.id = profile.id;
                        newUser.google.token = accessToken;
                        newUser.google.name = profile.displayName;
                        newUser.google.email = profile.emails[0].value;

                        newUser.save(function(err){
                            if(err)
                                throw err;
                            return done(null, newUser);
                        });
                        console.log(profile);
                    }
                });
            });
        }

    ));







};


