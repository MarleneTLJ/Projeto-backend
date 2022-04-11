const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
// Importa os routes
const authRoute = require('./routes/auth');

dotenv.config();

// Conecta no BD
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () =>
    console.log('Conectado no banco de dados!')
);

// ativa o CORS - Cross Origin Resource Sharing
app.use(cors());

// Middleware
app.use(express.json());
// Route middlewares
app.use('/api/auth', authRoute);

app.listen(3000, () => console.log('Servidor rodando!'));
