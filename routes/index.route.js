const express = require('express');
const authRoute = require('./auth.route');
const courseRoute = require('./courses.route');
const clientRoute = require('./clients.route');
const saleRoute = require('./sales.route');
const clientInfoRoute = require('./client_info.route');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/courses', courseRoute);
router.use('/clients', clientRoute);
router.use('/sales', saleRoute);
router.use('/client_info', clientInfoRoute);

module.exports = router;