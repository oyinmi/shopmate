/* jshint esversion: 6 */

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(null, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true
},
    function (request,accessToken, refreshToken, profile, done) {
        // use the profile info (mainly profile id) to check if the user is registered in your db.
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return done(err, user);
        });
        // console.log(profile);
        // return done(null,profile);
    }
));