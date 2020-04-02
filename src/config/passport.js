const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Organizator = require('../models/organizator');

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    const organizator = await Organizator.findOne({email: email});
    if (!organizator) {
        return done(null, false, {message: 'L\'usuari no existeix'});
    } else {
        const match = await organizator.matchPassword(password);
        if (match) {
            return done(null, organizator);
        } else {
            return done(null, false, {message: 'Contrasenya incorrecte'});
        }
    }
}));

passport.serializeUser((organizator, done) => {
    done(null, organizator.id);
});

passport.deserializeUser((id, done) => {
    Organizator.findById(id, (err, organizator) => {
        done(err, organizator);
    })
});