import React from 'react';
import 'component/Logout.sass';
import { connect } from 'react-redux';
import { logout, } from 'store/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import ReactTooltip from 'react-tooltip';

function Logout ({ logout }) {
  return (
    <span className="logout-widget" onClick={() => logout()}>
      <FontAwesomeIcon data-for="logout" data-tip="Logout" className="icon" icon={faSignOutAlt} />
      <ReactTooltip id="logout" place="left" type="light" effect="solid" delayShow={1000}/>
    </span>
  )
}

export default connect(null, { logout })(Logout);
