const router = require('express').Router();

const Event = require('../models/event');
const Organizator = require('../models/organizator');
const { isAuthenticated } = require('../helpers/auth');

router.get('/events/add', isAuthenticated, async (req, res) => {
    const organizator = await Organizator.findById(req.user.id).lean();
    res.render('events/new-event', { admin: organizator.admin });
});

router.post('/events/new-event', isAuthenticated,  async (req, res) => {
    const { title, description, location } = req.body;
    const errors = [];
    if (!title) {
        errors.push({text: 'Falta afegir un títol'})
    }
    if (!description) {
        errors.push({text: 'Falta afegir una descripció'});
    }
    if (errors.length > 0) {
        res.render('events/new-event', {
            errors,
            title,
            description,
            location,
            date
        });
    } else {
        const newEvent = new Event({ title, description, location });
        newEvent.organizator = req.user.name;
        newEvent.user = req.user.id;
        await newEvent.save();
        req.flash('success_msg', 'Esdeveniment creat correctament');
        res.redirect('/events')
    }
});

router.get('/events', isAuthenticated, async (req, res) => {
    const organizator = await Organizator.findById(req.user.id).lean();
    const events = await Event.find({ user: req.user.id }).sort({date: 'desc'}).lean();
    res.render('events/all-events', { events: events, admin: organizator.admin });
});

router.get('/events/edit/:id', async (req, res) => {
    const organizator = await Organizator.findById(req.user.id).lean();
    const event = await Event.findById(req.params.id).lean();
    res.render('events/edit-event', { event: event, admin: organizator.admin });
});

router.put('/events/edit-event/:id', isAuthenticated, async (req, res) => {
    const {title, description, date, location } = req.body;
    await Event.findByIdAndUpdate(req.params.id, { title, description, date, location });
    req.flash('success_msg', 'Esdeveniment actualitzat correctament');
    res.redirect('/events')
});

router.delete('/events/delete/:id', isAuthenticated, async (req, res) => {
    await Event.findByIdAndRemove(req.params.id);
    req.flash('success_msg', 'Esdeveniment esborrat correctament');
    res.redirect('/events')
});

module.exports = router;
