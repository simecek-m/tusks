import React from 'react';
import jsonwebtoken from 'jsonwebtoken';
import 'component/UserWidget.sass'
import { connect } from 'react-redux';
import { formatString } from 'helper/string'
import { withRouter } from 'react-router-dom';

function UserWidget({ user, history}){
  const info = jsonwebtoken.decode(user);
  return (
    <span onClick={() => history.push('/profile')} id="user-widget">
      <img src={info.picture} alt="profile"/>
      <span>{ formatString(info.name, 20) }</span>
    </span>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
};

export default withRouter(connect(mapStateToProps)(UserWidget));