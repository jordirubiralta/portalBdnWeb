const router = require('express').Router();

const Incident = require('../models/incident');

router.get('/incidents', async (req, res) => {
    const incidents = await Incident.find().sort({date: 'desc'}).lean();
    console.log(incidents);
    res.render('ok');
});

module.exports = router;
