import React from 'react';
import 'component/Login.sass';
import googleLogo from 'assets/image/google-logo.svg';

function Login() {
  return (
    <div className="">
      <h1 className="title">React-To-Do</h1>
      <h2 className="sub-title">Login into our todo app through your Google account.</h2>
      <div className="login-methods">
        <div className="login-method">
          <a href="https://www.google.cz" target="blank">Google</a>
          <img className="logo" src={googleLogo} alt="google logo"/>
        </div>
      </div>
    </div>
  )
}

export default Login;
