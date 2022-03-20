const express = require('express');
const {
  getUsers, getUserById, updateUser, updateAvatar, getMe,
} = require('../controllers/users');
const { validateGetUserById, validateUpdateUser, validateUpdateAvatar } = require('../middlewares/validation');

const userRoutes = express.Router();

userRoutes.get('/', getUsers);
userRoutes.get('/me', getMe);
userRoutes.get('/:userId', validateGetUserById, getUserById);
userRoutes.patch('/me', express.json(), validateUpdateUser, updateUser);
userRoutes.patch('/me/avatar', express.json(), validateUpdateAvatar, updateAvatar);

module.exports.userRoutes = userRoutes;
