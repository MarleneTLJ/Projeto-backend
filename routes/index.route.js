const express = require('express');
const authRoute = require('./auth.route');
const courseRoute = require('./courses.route');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/courses', courseRoute);

module.exports = router;