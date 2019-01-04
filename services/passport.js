const passport = require('passport');
const GoogleStratergy = require('passport-google-oauth20');
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
    new GoogleStratergy({
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({googleId: profile.id})
        .then((existingUser) => {
          if (existingUser) {
              //We already have a record
              done(null, existingUser);
          }else{
              //create a new user
            new User({googleId: profile.id})
            .save()
            .then(user => done(null, user));
          }
        });
        
    })
  );