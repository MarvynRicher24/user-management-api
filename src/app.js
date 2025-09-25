const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const usersRoutes = require('./routes/users.routes');
const errorHandler = require('./middlewares/error.middleware');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/users', usersRoutes);

app.use(errorHandler);

module.exports = app;