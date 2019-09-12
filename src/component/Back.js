import React from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import 'component/Back.sass';

function Back ({ history }) {

  const goBack = () => {
    history.goBack();
  }
  return (
    <FontAwesomeIcon id="back-component" onClick={() => goBack()} icon={ faChevronLeft } />
  )
}

export default withRouter(Back);
