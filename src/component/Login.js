import React from 'react';
import 'component/Login.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

function Login() {
  return (
    <div>
      <h1 className="title">React-To-Do</h1>
      <h2 className="sub-title">Login into our todo app through your Google account.</h2>
      <div className="login-methods">
        <div className="login-method">
          <FontAwesomeIcon className="icon" icon={ faGoogle }/>
          <a href="https://www.google.cz" target="blank">Google</a>
        </div>
      </div>
    </div>
  )
}

export default Login;
