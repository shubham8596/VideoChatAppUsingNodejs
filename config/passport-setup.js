const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.serializeUser(function(user, done) {
    
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID:"972605042244-ag8lb3a3m7qtccljcqqtbpmfciim1mqd.apps.googleusercontent.com",
    clientSecret:"R1nybV--aWA3IFLi4cMl91oZ",
    callbackURL:"http://localhost:3000/signup"
  },
  function(request, accessToken, refreshToken, profile, done) {
    console.log(profile)
    return done(null, profile);
  }
));
