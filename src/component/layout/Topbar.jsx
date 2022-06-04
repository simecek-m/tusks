import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserWidget from "component/user/UserWidget";
import { useTheme } from "provider/theme";
import { useEffect, useRef, useState } from "react";
import styles from "component/layout/Topbar.module.sass";

export default function Topbar() {
  const { user } = useAuth0();
  const { theme, switchTheme } = useTheme();
  const [isUserWidgetVisible, setUserWidgetVisibility] = useState(false);
  const ref = useRef();

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
      <div id={styles.topbar}>
        <FontAwesomeIcon
          className={styles.icon}
          icon={theme === "dark" ? "sun" : "moon"}
          color="white"
          onClick={switchTheme}
        />
        {user && (
          <FontAwesomeIcon
            className={styles.icon}
            icon="user"
            color="white"
            onClick={() => setUserWidgetVisibility(!isUserWidgetVisible)}
          />
        )}
      </div>
      {user && isUserWidgetVisible && <UserWidget innerRef={ref} />}
    </>
  );
}
