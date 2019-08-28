import React from 'react';
import 'component/Login.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import { login } from 'store/actions';

function Login({login}) {

  const loginSuccessCallback = (response) => {
    const jwt = response.tokenId;
    if (jwt) {
      login(response.tokenId);
    } else {
      console.error('No JWT received!');
    }
  };

  const loginFailCallback = (error) => {
    console.error(error);
  };

  return (
    <div>
      <h1 className="title">React-To-Do</h1>
      <h2 className="sub-title">Login into our todo app through your Google account.</h2>
      <div className="login-methods">
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_API_CLIENT_ID}
          onSuccess={loginSuccessCallback}
          onFailure={loginFailCallback}
          render={renderProps => (
            <div onClick={renderProps.onClick} className="login-method">
              <FontAwesomeIcon className="icon" icon={ faGoogle }/>
              <span className="authority">Google</span>
            </div>
          )}
        />
      </div>
    </div>
  )
}

export default connect(null, { login })(Login);
