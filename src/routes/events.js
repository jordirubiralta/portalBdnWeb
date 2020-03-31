const router = require('express').Router();

const Event = require('../models/event');

router.get('/events/add', (req, res) => {
    res.render('events/new-event');
});

router.post('/events/new-event', async (req, res) => {
    const { title, description } = req.body;
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
        const newEvent = new Event({ title, description });
        await newEvent.save();
        res.redirect('/events')
    }
});

router.get('/events', async (req, res) => {
    const events = await Event.find().sort({date: 'desc'}).lean();
    console.log(events[1]);
    res.render('events/all-events', { events: events });
});

module.exports = router;
