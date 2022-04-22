const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const passport = require('passport');
const userVal = require('../controllers/user.controller');
const authToken = require('../controllers/auth.controller');

// Register
router.post('/register', asyncHandler(register), login);

async function register(req, res, next) {
    let user = await userVal.insert(req.body);
    user = user.toObject();
    delete user.hashedPassword;
    req.user = user;
    next();
}

// Login
router.post('/login', passport.authenticate('local', {session: false}), login);

function login(req, res) {
    let user = req.user;
    let token = authToken.generateToken(user);
    res.json({ user, token });
}

router.get('/me', passport.authenticate('jwt', { session: false }), login);

module.exports = router;