const express = require('express');
const users = require('./controllers/users');

const routes = express();

routes.post('/cadastro', users.registerUser);
routes.post('/envio', users.sendEmail);

module.exports = routes;