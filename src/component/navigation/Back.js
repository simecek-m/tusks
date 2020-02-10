import React from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import "component/navigation/Back.sass";
import ReactTooltip from "react-tooltip";

export function Back({ history }) {
  const goBack = () => {
    history.goBack();
  };
  return (
    <span>
      <FontAwesomeIcon
        data-for="tooltip-back"
        data-tip="Go Back"
        id="back-component"
        onClick={() => goBack()}
        icon={faChevronLeft}
      />
      <ReactTooltip
        id="tooltip-back"
        place="bottom"
        type="light"
        effect="solid"
        delayShow={1000}
      />
    </span>
  );
}

export default withRouter(Back);
