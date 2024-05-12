const router = require('express').Router();

const homeRoute = require('./home-route');
const apiRoute = require('./api');

router.use('/', homeRoute);
router.use('/api', apiRoute);

module.exports = router;