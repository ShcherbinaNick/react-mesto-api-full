const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const UnAuthtorizedError = require('../errors/UnauthorizedError');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictRequestError = require('../errors/ConflictRequestError');

const { NODE_ENV, JWT_SECRET } = process.env;
const SALT_ROUNDS = 10;

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequestError('Неправильные почта или пароль');
    }
    const user = await User.findUserByCredentials(email, password);
    if (user) {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.cookie('token', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        domain: '.shcherbinanick.mesto.nomoredomains.work',
      }).status(200).send({ message: 'Аутентификация пройдена' });
    }
  } catch (err) {
    next(new UnAuthtorizedError('Требуется авторизация'));
  }
};

module.exports.logout = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new UnAuthtorizedError('Вы должны быть залогинены, чтобы выйти');
    }
    res.clearCookie('token', {
      httpOnly: true,
      domain: '.shcherbinanick.mesto.nomoredomains.work',
    }).send({ message: 'Вы вышли из учётной записи' });
  } catch (err) {
    next(err);
  }
};

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    if (users) {
      res.status(200).send(users);
    }
  } catch (err) {
    next(err);
  }
};

module.exports.getMe = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const currentUser = await User.findById(_id);
    if (!currentUser) {
      throw new NotFoundError('Пользователя с таким id нет');
    }
    res.status(200).send(currentUser);
  } catch (err) {
    next(err);
  }
};

module.exports.getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (user) {
      res.status(200).send(user);
    } else {
      throw new NotFoundError('Пользователь не найден');
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные'));
    } else {
      next(err);
    }
  }
};

module.exports.createUser = async (req, res, next) => {
  try {
    const {
      name, about, avatar, email, password,
    } = req.body;
    const hashedPass = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.create({
      name, about, avatar, email, password: hashedPass,
    });
    if (user) {
      res.status(201).send({ message: `Спасибо за регистрацию, ${user.name}!` });
    }
  } catch (err) {
    if (err.code === 11000) {
      next(new ConflictRequestError('Пользователь с такой почтой уже существует'));
    } else if (err.name === 'ValidationError') {
      next(new BadRequestError('Переданы невалидные данные'));
    }
    next(err);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      { name, about },
      { new: true, runValidators: true },
    );
    if (updatedUser) {
      res.send(updatedUser);
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Переданы невалидные данные'));
    } else {
      next(err);
    }
  }
};

module.exports.updateAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      { avatar },
      { new: true, runValidators: true },
    );
    if (updatedUser) {
      res.send(updatedUser);
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Переданы невалидные данные'));
    } else {
      next(err);
    }
  }
};
