const router = require('express').Router();
const bcrypt = require('bcryptjs/dist/bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const authToken = require('./verifyToken');
const { registerValidation, loginValidation } = require('../validation');

// Register
router.post('/register', async (req, res) => {
    // Validando os dados antes de criar um usuário
    const { error } = registerValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Checando se o usuário já possui cadastro no banco de dados
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) {
        return res.status(400).send('Este e-mail já existe!');
    }

    // Hash nas senhas
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Cria um novo usuário
    const user = new User({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch(err){
        res.status(400).send(err);
    }
});

// Login
router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    // Checando se o email não existe
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send('E-mail não foi encontrado');
        // O correto seria "E-mail ou senha é inválido!" por quesitos de segurança, mas mantive esta mensagem para melhor entendimento do que posso estar fazendo errado durante o desenvolvimento
        // Irei mudar para "E-mail ou senha é inválido!" no final do projeto
    }
    // Se a senha está correta
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
        return res.status(400).send('Senha incorreta');
        // O correto seria "E-mail ou senha é inválido!" por quesitos de segurança, mas mantive esta mensagem para melhor entendimento do que posso estar fazendo errado durante o desenvolvimento
        // Irei mudar para "E-mail ou senha é inválido!" no final do projeto
    }

    // Cria e atribui um token
    // const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    // res.header('auth-token', token).send(token);

    let token = authToken.generateToken(user);
    res.json({ user, token });
});

module.exports = router;