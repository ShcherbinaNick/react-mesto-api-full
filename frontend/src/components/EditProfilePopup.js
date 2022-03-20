import React, { useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, overlayClose }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [ name, setName ] = React.useState('')
  const [ description, setDescription ] = React.useState('')

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  useEffect(() => {
    if (isOpen) {
    setName(currentUser.name);
    setDescription(currentUser.about);
    }
  }, [ isOpen, currentUser ]); 


  return (
    <PopupWithForm name="profile-edit" title="Редактировать профиль" isOpen={ isOpen } onClose={ onClose } overlayClose={ overlayClose }  onSubmit={ handleSubmit }>
      <input value={ name } onChange={ handleNameChange } type="text" name="profile-input-name" className="popup__input popup__input_field_name " id="field_name" placeholder="Имя" minLength="2" maxLength="40" required />
      <span className="popup__input-error popup__input-error_field_name"></span>
      <input value={ description } onChange={ handleDescriptionChange } type="text" name="profile-input-description" className="popup__input popup__input_field_description " id="field_description" placeholder="Род деятельности" minLength="2" maxLength="200" required />
      <span className="popup__input-error popup__input-error_field_description"></span>
    </PopupWithForm>
    )
}

export default EditProfilePopup;