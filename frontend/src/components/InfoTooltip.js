import successIcon from '../images/success.svg';
import failIcon from '../images/fail.svg';

const InfoTooltip = ({ isOpen, onClose, isSuccess }) => {

  return (
   <article className= { `tooltip ${ isOpen ? "tooltip_active" : '' }` } name="tooltip">
    <div className="tooltip__container">
      <button type="button" aria-label="закрыть" className="tooltip__close-button" onClick={ onClose }></button>
      <img src={ isSuccess ? successIcon : failIcon } alt="зеленая галочка" className="tooltip__icon" />
      <h2 className="tooltip__message"> { isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'} </h2>
    </div>
  </article>
  )
}

export default InfoTooltip;