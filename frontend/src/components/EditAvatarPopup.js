import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, overlayClose }) {
  const userAvatar = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(userAvatar.current.value);
  } 

  return (
    <PopupWithForm name="avatar-edit" title="Обновить аватар" isOpen={ isOpen } onClose={ onClose } onSubmit={ handleSubmit } overlayClose={ overlayClose }>
    <input ref={ userAvatar } type="url" name="profile-edit-avatar" className="popup__input popup__input_field_avatar" id="field_avatar" placeholder="Ссылка" required />
    <span className="popup__input-error popup__input-error_field_avatar"></span>
    </PopupWithForm>
    )
}

export default EditAvatarPopup;