import React from 'react';

import './Error.sass'
import errorImg from '../assets/image/404.svg';

function Error(props){
  console.log(props);  
  return (
    <div>
      <h1 className="title">Oooooooops</h1>
      <img src={errorImg} alt="error"/>
      <p className="text-primary">Something went wrong!</p>
      <p className="text-secondary">Please try again later...</p>
    </div>
  )
}

export default Error;