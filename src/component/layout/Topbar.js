import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, faUser } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { switchTheme } from "store/actions";
import "component/layout/Topbar.sass";
import UserWidget from "component/user/UserWidget";
import { useState } from "react";

export function Topbar({ user, theme, switchTheme }) {
  const [isUserWidgetVisible, switchUserWidgetVisibility] = useState(false);
  function getIcon(theme) {
    switch (theme) {
      case "light":
        return faMoon;
      default:
        return faSun;
    }
  }
  return (
    <>
      <div id="topbar-component">
        <FontAwesomeIcon
          className="icon"
          icon={getIcon(theme)}
          color="white"
          size="xl"
          onClick={() => switchTheme()}
        />
        {user && (
          <FontAwesomeIcon
            className="icon"
            icon={faUser}
            color="white"
            size="xl"
            onClick={() => switchUserWidgetVisibility(!isUserWidgetVisible)}
          />
        )}
      </div>
      {user && isUserWidgetVisible && <UserWidget />}
    </>
  );
}

const mapStateToProps = state => {
  return {
    theme: state.theme,
    user: state.user
  };
};

export default connect(mapStateToProps, { switchTheme })(Topbar);
