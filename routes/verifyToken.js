const jwt = require('jsonwebtoken');

module.exports = {
  generateToken,
};

function generateToken(user) {
  const token = JSON.stringify(user);

  // Se não estiver logado, ele nega o acesso
  if (!token) {
      return res.status(401).send('Acesso negado!');
  }

  return jwt.sign(token, process.env.TOKEN_SECRET);
}