import React from "react";
import { InfoTooltipContext } from "../contexts/infoTooltipContext";

export default function InfoTooltip(props) {
  const infoTooltipContext = React.useContext(InfoTooltipContext);

  return (
    <section className={`popup ${props.isOpen && 'popup_opened'}`}
      id="popup__infoTooltip"
    >
      <div className="infoTooltip popup__container">
        <img className="infoTooltip__icon"
          src={infoTooltipContext.imgPath}
          alt="Результат регистрации"
        />
        <p className="infoTooltip__caption">
          {infoTooltipContext.text}
        </p>
        <button onClick={props.onClose}
          type="button"
          className="popup__close-button"        >
        </button>
      </div>
    </section>
  )
}
