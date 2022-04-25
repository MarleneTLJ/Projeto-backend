const jwt = require('jsonwebtoken');
const config = require('../config/config')

module.exports = {
  generateToken,
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