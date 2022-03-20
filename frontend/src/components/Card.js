import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ cardData, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext)

  const { name, link, likes, owner } = cardData;

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = owner._id === currentUser._id;
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `card__delete ${ isOwn ? '' : 'card__delete_hidden' }`
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = likes.some(i => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `card__like-button ${ isLiked ? 'card__like-button_active' : '' }`
  ); 

  const handleCardClick = () => {
    onCardClick(cardData)
  }

  const handleLikeClick = () => {
    onCardLike(cardData)
  }

  const handleCardDelete = () => {
    onCardDelete(cardData)
  }

  return (
    <li className="card">
      <div className="card__image-container">
        <div className="card__image-wrap">
          <img src={ link } alt={`карточка с названием ${ name }`} className="card__image" onClick={ handleCardClick }/>
        </div>
      </div>
      <button type="button" aria-label="удалить" className={ cardDeleteButtonClassName } onClick={ handleCardDelete }></button>
      <div className="card__text">
        <h2 className="card__name">{ name }</h2>
        <div className="card__like-container">
          <button type="button" aria-label="поставить лайк" className={ cardLikeButtonClassName } onClick={ handleLikeClick }></button>
          <p className="card__like-counter">{ likes.length }</p>
        </div>
      </div>
    </li>
  );
}

export default Card;