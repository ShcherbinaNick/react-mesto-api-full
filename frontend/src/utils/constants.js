export const profileSelector = '.popup_type_profile-edit';
export const cardEditSelector = '.popup_type_new-card';
export const fullImageSelector = '.popup_type_image';
export const profileNameSelector = '.profile__title';
export const profileInfoSelector = '.profile__subtitle';
export const avatarPopupSelector = '.popup_type_avatar-edit';
export const avatarImageSelector = '.profile__avatar';
export const popupWithConfirmationSelector = '.popup_type_card-delete'

// Список карточек
export const cardsTemplate = '.cards-template';
// Переменная popup
const profilePopup = document.querySelector('.popup_type_profile-edit'); // попап профиля
// Переменные формы
export const nameInput = profilePopup.querySelector('.popup__input_field_name'); // поле ввода профиля
export const jobInput = profilePopup.querySelector('.popup__input_field_description'); // поле ввода рода деятельности
// Переменные кнопок
export const popupOpenBtn = document.querySelector('.profile__edit-button'); // редактирование профиля
export const addCard = document.querySelector('.profile__add-button'); // добавить карточку
export const avatarEditBtn = document.querySelector('.profile__avatar-button') // поменять картинку
// Список карточек в разметке
export const cardsList = document.querySelector('.cards__list');
// Объект для форм
export const formValidators = {}

// Валидация форм из задания
export const configValidator = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  popupCloseBtn: '.popup__close-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__error',
  errorClass: 'popup__input-error'
}