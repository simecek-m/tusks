import React from "react";
import Lottie from "react-lottie";
import loadingAnimation from "assets/animation/loading.json";
import errorAnimation from "assets/animation/error.json";
import "component/animation/Loading.sass";

function Loading({ loading, error, children }) {
  const loadingAnimationOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const errorAnimationOptions = {
    loop: true,
    autoplay: true,
    animationData: errorAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return loading ? (
    <Lottie
      options={loadingAnimationOptions}
      isClickToPauseDisabled={true}
      width={400}
      height={400}
      style={{ marginTop: "100px" }}
    />
  ) : error ? (
    <Lottie
      options={errorAnimationOptions}
      isClickToPauseDisabled={true}
      width={400}
      height={300}
      style={{ marginTop: "100px" }}
    />
  ) : (
    <div className="loading-component complete">{children}</div>
  );
}

export default Loading;
