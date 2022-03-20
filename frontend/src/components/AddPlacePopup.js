import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddplaceSubmit, overlayClose }) {
  const [ cardName, setCardName ] = React.useState('');
  const [ cardImgLink, setCardImgLink ] = React.useState('');

  const handleCardNameChange = (e) => {
    setCardName(e.target.value)
  }

  const handleCardImgLinkChange = (e) => {
    setCardImgLink(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddplaceSubmit({
      name: cardName,
      link: cardImgLink
    })
  }

  React.useEffect(() => {
      setCardName('')
      setCardImgLink('')
  }, [isOpen] );

  return (
    <PopupWithForm name="new-card" title="Новое место" isOpen={ isOpen } onClose={ onClose } overlayClose={ overlayClose } onSubmit={ handleSubmit } >
    <input value={ cardName || "" } onChange={ handleCardNameChange } type="text" name="card-input-name" className="popup__input popup__input_field_card " id="field_card" placeholder="Название" minLength="2" maxLength="30" required />
    <span className="popup__input-error popup__input-error_field_card"></span>
    <input value={ cardImgLink || "" } onChange={ handleCardImgLinkChange } type="url" name="card-input-link" className="popup__input popup__input_field_link " id="field_link" placeholder="Ссылка на картинку" required />
    <span className="popup__input-error popup__input-error_field_link"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;