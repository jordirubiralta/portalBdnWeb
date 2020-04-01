const router = require('express').Router();

router.get('/incidents', async (req, res) => {
    const incidents = await Event.find().sort({date: 'desc'}).lean();
    console.log(incidents);
    res.render('ok');
});

module.exports = router;
