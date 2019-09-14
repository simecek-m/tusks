import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import 'component/Button.sass';


function Button ({ icon = null, text = 'Button', type="default", onClick = null }) {
  return (
    <span className={`button-component ${type}`} onClick={onClick}>
      <FontAwesomeIcon className="button-component-icon" icon={icon} />
      <span className="text">{text}</span>
    </span>
  )
}

export default Button;
