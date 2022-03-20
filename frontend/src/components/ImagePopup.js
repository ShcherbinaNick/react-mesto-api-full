function ImagePopup(props) {
  const { card, onClose, overlayClose } = props
  const { link, name } = card

  return (
    <article className={ `popup popup_type_image ${ card.link !== '' ? "popup_active" : "" }` } onClick={ overlayClose }>
      <figure className="popup__figure">
        <button type="button" aria-label="закрыть" className="popup__close-button" onClick={ onClose }></button>
        <img src={ link ? link: '' } alt={`карточка с названием ${ name }`} className="popup__figure-image" />
        <figcaption className="popup__figure-title">{ name } </figcaption>
      </figure>
    </article>
  );
}

export default ImagePopup;
