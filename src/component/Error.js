import React from 'react';

import './Error.sass'
import errorImg from '../assets/image/404.svg';

function Error(){
  return (
    <div>
      <h1 class="title">Oooooooops</h1>
      <img src={errorImg} alt="error"/>
      <p class="text-primary">Something went wrong!</p>
      <p class="text-secondary">Please try again later...</p>
    </div>
  )
}

export default Error;