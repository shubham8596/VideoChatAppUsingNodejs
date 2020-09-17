const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.serializeUser(function(user, done) {
    
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID:GOOGLE_CLIENT_ID,
    clientSecret:GOOGLE_CLIENT_SECRET,
    callbackURL:"http://localhost:3000/signup"
  },
  function(request, accessToken, refreshToken, profile, done) {
    console.log(profile)
    return done(null, profile);
  }
));
