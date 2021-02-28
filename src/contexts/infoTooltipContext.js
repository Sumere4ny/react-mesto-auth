import React from "react";
import iconOk from '../images/icon-ok.svg';
import iconFail from '../images/icon-cross.svg';

export const InfoTooltipContext = React.createContext();

export const infoTooltipCaptions = {
  success: {
    text: 'Вы успешно зарегистрировались!',
    imgPath: iconOk
  },
  fail: {
    text: 'Что-то пошло не так!\n' +
      'Попробуйте ещё раз.',
    imgPath: iconFail
  }
}
