const express = require('express');
const authRoute = require('./auth.route');
const courseRoute = require('./courses.route');
const clientRoute = require('./clients.route');
const saleRoute = require('./sales.route');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/courses', courseRoute);
router.use('/clients', clientRoute);
router.use('/sales', saleRoute);

module.exports = router;