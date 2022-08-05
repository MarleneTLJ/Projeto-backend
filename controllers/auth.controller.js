const jwt = require('jsonwebtoken');
const config = require('../config/config')

module.exports = {
  generateToken,
  verifyToken
};

// Gera o token
function generateToken(user) {
  const token = JSON.stringify(user);

  // Se não estiver logado, ele nega o acesso
  if (!token) {
      return res.status(401).send('Acesso negado!');
  }

  return jwt.sign(token, config.tknSecret);
}

function verifyToken (req, res, next) {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).send('Acesso Negado!');
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Token inválido!');
  }
}