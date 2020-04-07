const router = require('express').Router();

const Poll = require('../models/poll');
const Organizator = require('../models/organizator');
const { isAuthenticated } = require('../helpers/auth');

router.get('/polls/add', isAuthenticated, async (req, res) => {
    const organizator = await Organizator.findById(req.user.id).lean();
    res.render('polls/new-poll', { admin: organizator.admin });
});

router.post('/polls/new-event', isAuthenticated,  async (req, res) => {
    const { question } = req.body;
    const errors = [];
    if (question) {
        const newPoll = new Poll({ question });
        await newPoll.save();
        req.flash('success_msg', 'Enquesta creada correctament');
        res.redirect('/polls')
    }
});

router.get('/polls', isAuthenticated, async (req, res) => {
    const organizator = await Organizator.findById(req.user.id).lean();
    const polls = await Poll.find().sort({date: 'desc'}).lean();
    res.render('polls/all-polls', { polls: polls, admin: organizator.admin });
});

router.delete('/polls/delete/:id', async (req, res) => {
    await Poll.findByIdAndRemove(req.params.id);
    req.flash('success_msg', 'Enquesta esborrada correctament');
    res.redirect('/polls')
});


module.exports = router;
