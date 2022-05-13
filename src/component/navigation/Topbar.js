import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { switchTheme } from "store/actions";
import "component/navigation/Topbar.sass";

export function Topbar({ theme, switchTheme }) {
  function getIcon(theme) {
    switch (theme) {
      case "light":
        return faMoon;
      default:
        return faSun;
    }
  }
  return (
    <div id="topbar-component">
      <FontAwesomeIcon
        className="icon"
        icon={getIcon(theme)}
        color="white"
        size="xl"
        onClick={() => switchTheme()}
      />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    theme: state.theme
  };
};

export default connect(mapStateToProps, { switchTheme })(Topbar);
