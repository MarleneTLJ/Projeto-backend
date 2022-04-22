const app = require('./config/express');
const config = require('./config/config');
const mongoose = require('mongoose');

// Conecta no BD
mongoose.connect(config.mongo, { useNewUrlParser: true }, () =>
    console.log('Conectado no banco de dados!')
);

app.listen(3000, () => console.log('Servidor rodando!'));
