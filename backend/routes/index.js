const express = require('express');
const { login, createUser, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateLogin, validateCreateUser } = require('../middlewares/validation');
const { cardsRoutes } = require('./cards');
const { userRoutes } = require('./users');
const NotFoundError = require('../errors/NotFoundError');

const routes = express.Router();

routes.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

routes.post('/signup', express.json(), validateCreateUser, createUser);
routes.post('/signin', express.json(), validateLogin, login);

routes.use('/users', auth, userRoutes);
routes.use('/cards', auth, cardsRoutes);
routes.use('/logout', logout);

// Логаут по заданию не требуется, но мне захотелось его сделать.
// Локально работал, а удалённо не хочет, уже очень долго бьюсь.
// Буду очень рад, если укажете на проблему

routes.use((req, res, next) => {
  next(new NotFoundError('Cтраница не найдена'));
});

module.exports.routes = routes;
