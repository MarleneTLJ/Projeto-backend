const express = require('express');
const authRoute = require('./auth.route');
const courseRoute = require('./courses.route');
const clientRoute = require('./clients.route');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/courses', courseRoute);
router.use('/clients', clientRoute);

module.exports = router;