const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const Card = require('../models/card');

module.exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({}).populate(['owner', 'likes']);
    if (cards) {
      res.status(200).send(cards);
    }
  } catch (err) {
    next(err);
  }
};

module.exports.createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({
      name,
      link,
      owner: req.user._id,
    });
    if (card) {
      res.status(201).send(card);
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Переданы невалидные данные'));
    } else {
      next(err);
    }
  }
};

module.exports.deleteCard = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { cardId } = req.params;

    const card = await Card.findById(cardId);
    if (!card) {
      throw new NotFoundError('Карточки с таким id не найдено');
    }

    const cardOwner = card.owner.valueOf();
    if (cardOwner !== userId) {
      throw new ForbiddenError('Удалять можно только свои карточки');
    }

    const removeCard = await Card.findByIdAndRemove(cardId);
    if (!removeCard) {
      throw new NotFoundError('Неверный id карточки');
    }
    res.send({ message: 'Карточка удалена' });
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Неправильный id карточки'));
    } else {
      next(err);
    }
  }
};

module.exports.setCardLike = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const cardLike = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).populate(['owner', 'likes']);
    if (cardLike) {
      res.send(cardLike);
    } else {
      throw new NotFoundError('Нет карточки для лайка');
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Неправильный id карточки'));
    } else {
      next(err);
    }
  }
};

module.exports.deleteCardLike = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const cardLike = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).populate(['owner', 'likes']);
    if (cardLike) {
      res.send(cardLike);
    } else {
      throw new NotFoundError('Нет карточки для дизлайка');
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Неправильный id карточки'));
    } else {
      next(err);
    }
  }
};
