const router = require('express').Router();

const Organizator = require('../models/organizator');

const passport = require('passport');

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/events',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/users/signup', async (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];
    if (password != confirm_password) {
        errors.push({text: 'Les contrasenyes no són iguals'});
    }
    if (password.length < 4) {
        errors.push({text: 'La contrasenya ha de tenir com a mínim 4 caràcters'});
    }
    if (errors.length > 0) {
        res.render('users/signup', {errors, name, email, password, confirm_password});
    } else {
        const emailOrganizator = await Organizator.findOne({email: email});
        if (emailOrganizator) {
            req.flash('error_msg', 'Aquest correu ja existeix');
            res.redirect('/users/signup');
        }
        const newOrganizator = new Organizator({name, email, password})
        newOrganizator.password = await newOrganizator.encryptPassword(password);
        await newOrganizator.save();
        req.flash('success_msg', 'Usuari registrat correctament');
        res.redirect('/users/signin')
    }
});
module.exports = router;
