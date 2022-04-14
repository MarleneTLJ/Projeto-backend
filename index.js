const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
// Importa os routes
const authRoute = require('./routes/auth');
const courseRoute = require('./routes/courses');

app.use(bodyParser.json());
dotenv.config();

// Conecta no BD
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () =>
    console.log('Conectado no banco de dados!')
);

// ativa o CORS - Cross Origin Resource Sharing
app.use(cors());

// Middleware
app.use(express.json());
// Rotas middlewares
app.use('/api/auth', authRoute);
app.use('/api/courses', courseRoute);

app.listen(3000, () => console.log('Servidor rodando!'));
