const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const passport = require('passport');
const userVal = require('../controllers/user.controller');
const User = require('../models/User');
const authToken = require('../controllers/auth.controller');

// Register
router.post('/register', asyncHandler(register), login);

async function register(req, res, next) {
    // Checando se o usuário já possui cadastro no banco de dados
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) {
        return res.status(400).send('Este e-mail já existe!');
    }

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