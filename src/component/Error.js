import React from "react";
import errorImg from "assets/image/404.svg";
import "component/Error.sass";
import Title from "component/Title";
import { faBug } from "@fortawesome/free-solid-svg-icons";

function Error() {
  return (
    <div>
      <Title text="Oooooooops!" icon={faBug} />
      <img src={errorImg} alt="error" />
      <p className="text-primary">Something went wrong!</p>
      <p className="text-secondary">Please try again later...</p>
    </div>
  );
}

export default Error;
