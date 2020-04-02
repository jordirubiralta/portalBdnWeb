const router = require('express').Router();

const Organizator = require('../models/organizator');

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

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
        const emailOrganizator = Organizator.findOne({email: email});
        if (emailOrganizator) {
            req.flash('error_msg', 'Aquest correu ja existeix');
            res.redirect('/users/signup');
        }
        const newOrganizator = new Organizator({name, email, password})
        newOrganizator = newOrganizator.encryptPassword(password);
        await newOrganizator.save();
        res.redirect('/')
    }
});
module.exports = router;
