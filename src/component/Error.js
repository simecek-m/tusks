import React from "react";
import errorImg from "assets/image/404.svg";
import "component/Error.sass";

function Error() {
  return (
    <div>
      <h1 className="title">Oooooooops!</h1>
      <img src={errorImg} alt="error" />
      <p className="text-primary">Something went wrong!</p>
      <p className="text-secondary">Please try again later...</p>
    </div>
  );
}

export default Error;
