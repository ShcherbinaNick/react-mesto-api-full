const express = require('express');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateLogin, validateCreateUser } = require('../middlewares/validation');
const { cardsRoutes } = require('./cards');
const { userRoutes } = require('./users');
const NotFoundError = require('../errors/NotFoundError');

const routes = express.Router();

routes.post('/signup', express.json(), validateCreateUser, createUser);
routes.post('/signin', express.json(), validateLogin, login);

routes.use('/users', auth, userRoutes);
routes.use('/cards', auth, cardsRoutes);

routes.use((req, res, next) => {
  next(new NotFoundError('Cтраница не найдена'));
});

module.exports.routes = routes;
