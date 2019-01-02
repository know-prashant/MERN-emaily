const express = require('express');
const passport = require('passport');
const GoogleStratergy = require('passport-google-oauth20');
const keys = require('./config/keys');
const app = express();

passport.use(
  new GoogleStratergy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  }, (accessToken) => {
      console.log(accessToken);
  })
);

app.get(
  '/auth/google', 
  passport.authenticate('google', {
    scope: ['profile','email']
  })
);
  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
 
