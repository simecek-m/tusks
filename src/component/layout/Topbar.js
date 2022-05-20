import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, faUser } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { switchTheme } from "store/actions";
import "component/layout/Topbar.sass";
import UserWidget from "component/user/UserWidget";
import { useEffect, useRef, useState } from "react";

export function Topbar({ user, theme, switchTheme }) {
  const [isUserWidgetVisible, setUserWidgetVisibility] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const clickOutsideHandler = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        setUserWidgetVisibility(false);
      }
    };
    document.addEventListener("mousedown", clickOutsideHandler);
    return () => {
      document.removeEventListener("mousedown", clickOutsideHandler);
    };
  }, []);
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
            onClick={() => setUserWidgetVisibility(!isUserWidgetVisible)}
          />
        )}
      </div>
      {user && isUserWidgetVisible && <UserWidget innerRef={ref} />}
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
