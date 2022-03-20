import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main({ onEditAvatarClick, onEditProfileClick, onAddPlaceClick, onCardClick, cards, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-wrapper">
          <img src={ currentUser.avatar } alt="Кусто" className="profile__avatar" />
          <button className="profile__avatar-button" onClick={ onEditAvatarClick } ></button>
        </div>
        <div className="profile__info">
          <div className="profile__main">
            <h1 className="profile__title">{ currentUser.name }</h1>
            <button type="button" aria-label="редактировать профиль" className="profile__edit-button" onClick={ onEditProfileClick }></button>
          </div>
          <p className="profile__subtitle">{ currentUser.about }</p>
        </div>
        <button type="button" aria-label="добавить карточку" className="profile__add-button" onClick={ onAddPlaceClick }></button>
      </section>
      <section className="cards">
        <ul className="cards__list">
          { cards.map(({ _id, ...card }) =>
            <Card cardData={ { ...card, _id } } key={ _id } onCardClick={ onCardClick } onCardLike={ onCardLike } onCardDelete={ onCardDelete } />
          ) }
        </ul>
      </section>
    </main>
  );
}

export default Main;


