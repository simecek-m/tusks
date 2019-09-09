import React from 'react';
import 'component/Logout.sass';
import { connect } from 'react-redux';
import { logout, } from 'store/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


function Logout ({ logout }) {
  return (
    <span className="logout-widget" onClick={() => logout()}>
      <FontAwesomeIcon className="icon" icon={faSignOutAlt} />
    </span>
  )
}

export default connect(null, { logout })(Logout);
