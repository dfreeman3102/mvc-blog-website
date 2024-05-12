const router = require('express').Router();
const userRoute = require('./user-route');
const blogRoute = require('./blog-route');

router.use('/user', userRoute);
router.use('/blog', blogRoute);

module.exports = router;