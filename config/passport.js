const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// Setting up the local strategy for Passport
passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await User.findUserByEmail(username);
            if (!user) {
                return done(null, false, { message: 'Incorrect username or password' });
            }

            const isMatch = await User.verifyPassword(password, user.password);
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Incorrect username or password' });
            }
        } catch (error) {
            return done(error);
        }
    }
));

// Serializing the user instance to store in the session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserializing the user from the session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findUserByEmail(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

module.exports = passport;
