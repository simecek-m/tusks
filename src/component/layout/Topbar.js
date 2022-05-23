import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "component/layout/Topbar.sass";
import UserWidget from "component/user/UserWidget";
import { useTheme } from "provider/theme";
import { useEffect, useRef, useState } from "react";

export default function Topbar() {
  // TODO: inject authentication
  const user = null;

  const [isUserWidgetVisible, setUserWidgetVisibility] = useState(false);
  const ref = useRef();
  const { theme, switchTheme } = useTheme();

  useEffect(() => {
    const clickOutsideHandler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setUserWidgetVisibility(false);
      }
    };
    document.addEventListener("mousedown", clickOutsideHandler);
    return () => {
      document.removeEventListener("mousedown", clickOutsideHandler);
    };
  }, []);
  return (
    <>
      <div id="topbar-component">
        <FontAwesomeIcon
          className="icon"
          icon={theme === "dark" ? "sun" : "moon"}
          color="white"
          size="xl"
          onClick={switchTheme}
        />
        {user && (
          <FontAwesomeIcon
            className="icon"
            icon="user"
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
