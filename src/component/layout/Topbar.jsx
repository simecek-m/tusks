import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserWidget from "component/user/UserWidget";
import { useTheme } from "provider/theme";
import { useEffect, useRef, useState } from "react";
import styles from "component/layout/Topbar.module.sass";
import { AnimatePresence } from "framer-motion";
import { useClickOutside, useKeyPress } from "hooks/interaction";

export default function Topbar() {
  const { user } = useAuth0();
  const { theme, switchTheme } = useTheme();
  const [isUserWidgetVisible, setUserWidgetVisibility] = useState(false);
  const ref = useRef();
  const hideUserWidget = () => setUserWidgetVisibility(false);

  const { addClickOutsideEvent, removeClickOutsideEvent } = useClickOutside(
    ref,
    hideUserWidget
  );

  const { addOnKeyDownEvent, removeOnKeyDownEvent } = useKeyPress(
    "Escape",
    hideUserWidget
  );
  useEffect(() => {
    if (isUserWidgetVisible) {
      addClickOutsideEvent();
      addOnKeyDownEvent();
    } else {
      removeClickOutsideEvent();
      removeOnKeyDownEvent();
    }
  }, [
    isUserWidgetVisible,
    addClickOutsideEvent,
    removeClickOutsideEvent,
    addOnKeyDownEvent,
    removeOnKeyDownEvent,
  ]);

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
            onClick={(e) => {
              e.stopPropagation();
              setUserWidgetVisibility(!isUserWidgetVisible);
            }}
          />
        )}
      </div>
      <AnimatePresence>
        {user && isUserWidgetVisible && <UserWidget innerRef={ref} />}
      </AnimatePresence>
    </>
  );
}
