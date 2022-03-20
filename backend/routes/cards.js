const express = require('express');
const {
  getCards, createCard, deleteCard, setCardLike, deleteCardLike,
} = require('../controllers/cards');
const { validateCreateCard, validateCardId } = require('../middlewares/validation');

const cardsRoutes = express.Router();

cardsRoutes.get('/', getCards);
cardsRoutes.post('/', express.json(), validateCreateCard, createCard);
cardsRoutes.delete('/:cardId', validateCardId, deleteCard);
cardsRoutes.put('/:cardId/likes', validateCardId, setCardLike);
cardsRoutes.delete('/:cardId/likes', validateCardId, deleteCardLike);

module.exports.cardsRoutes = cardsRoutes;
