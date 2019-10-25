import React from "react";
import errorImg from "assets/image/404.svg";
import "component/error/Error.sass";
import Title from "component/common/Title";
import { faBug } from "@fortawesome/free-solid-svg-icons";
import { withTranslation } from "react-i18next";

function Error({ t }) {
  return (
    <div>
      <Title text={t("error.title")} icon={faBug} />
      <img src={errorImg} alt="error" />
      <p className="text-primary">{t("error.primary")}</p>
      <p className="text-secondary">{t("error.secondary")}</p>
    </div>
  );
}

export default withTranslation()(Error);
