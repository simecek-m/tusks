import React from "react";
import Title from "component/common/Title";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { withTranslation } from "react-i18next";
import Back from "component/navigation/Back";
import Settings from "component/menu/Settings";
import Lottie from "react-lottie";
import loadingAnimation from "assets/animation/loading.json";
import errorAnimation from "assets/animation/error.json";
import writeAnimation from "assets/animation/write.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import "component/page/About.sass";

function About({ t }) {
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

  const writeAnimationOptions = {
    loop: true,
    autoplay: true,
    animationData: writeAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div id="about-component" className="animated fadeIn">
      <Settings />
      <Back />
      <Title text={t("about.title")} icon={faInfoCircle} />
      <div className="section">
        <h2>{t("about.author")}</h2>
        <div>Martin Šimeček</div>
        <div className="links">
          <a
            href="https://github.com/simecek-m"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FontAwesomeIcon className="author-link-icon" icon={faGithub} />
          </a>
          <a
            href="https://simecek.dev"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FontAwesomeIcon className="author-link-icon" icon={faLink} />
          </a>
        </div>
      </div>
      <div className="section">
        <h2>{t("about.animations")}</h2>
        <div>
          {t("about.animationDescription", {
            name: "Skeleton UI",
            author: "Surani's Fun World"
          })}
        </div>
        <a
          href="https://lottiefiles.com/4463-hi"
          rel="noopener noreferrer"
          target="_blank"
        >
          <FontAwesomeIcon className="lottie-link-icon" icon={faLink} />
          Lottie Files
        </a>
        <Lottie
          options={loadingAnimationOptions}
          isClickToPauseDisabled={true}
          width={400}
          height={250}
        />
        <hr />
        <div>
          {t("about.animationDescription", {
            name: "Not Found",
            author: "Oscar Daniel Martínez Núñez"
          })}
        </div>
        <a
          href="https://lottiefiles.com/4339-not-found"
          rel="noopener noreferrer"
          target="_blank"
        >
          <FontAwesomeIcon className="lottie-link-icon" icon={faLink} />
          Lottie Files
        </a>
        <Lottie
          options={errorAnimationOptions}
          isClickToPauseDisabled={true}
          width={400}
          height={250}
        />
        <hr />
        <div>
          {t("about.animationDescription", {
            name: "Write",
            author: "kinoko"
          })}
        </div>
        <a
          href="https://lottiefiles.com/5729-write"
          rel="noopener noreferrer"
          target="_blank"
        >
          <FontAwesomeIcon className="lottie-link-icon" icon={faLink} />
          Lottie Files
        </a>
        <Lottie
          options={writeAnimationOptions}
          isClickToPauseDisabled={true}
          width={400}
          height={250}
        />
      </div>
    </div>
  );
}

export default withTranslation()(About);
