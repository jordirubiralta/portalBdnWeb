const router = require('express').Router();

const Incident = require('../models/incident');
const Organizator = require('../models/organizator');
const { isAuthenticated } = require('../helpers/auth');

router.get('/incidents', isAuthenticated, async (req, res) => {
    const organizator = await Organizator.findById(req.user.id).lean();
    const incidents = await Incident.find().sort({date: 'desc'}).lean();
    console.log(incidents)
    res.render('incidents/all-incidents', { incidents: incidents, admin: organizator.admin });
});

router.put('/incidents/edit-incident/:id', async (req, res) => {
    console.log(req.params.id)
    await Incident.findByIdAndUpdate(req.params.id, { resolved: true});
    req.flash('success_msg', 'Incidència resolta');
    res.redirect('/incidents')
});

module.exports = router;
