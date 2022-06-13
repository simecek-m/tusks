import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserWidget from "component/user/UserWidget";
import { useTheme } from "provider/theme";
import styles from "component/layout/Topbar.module.sass";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

export default function Topbar() {
  const { user } = useAuth0();
  const { theme, switchTheme } = useTheme();
  const [isUserWidgetVisible, setUserWidgetVisibility] = useState(false);
  const hideUserWidget = () => setUserWidgetVisibility(false);

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
        {isUserWidgetVisible && <UserWidget hide={hideUserWidget} />}
      </AnimatePresence>
    </>
  );
}
