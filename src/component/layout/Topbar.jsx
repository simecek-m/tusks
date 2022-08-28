import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ThemeSwitch from "component/control/ThemeSwitch";
import styles from "component/layout/Topbar.module.sass";
import UserWidget from "component/user/UserWidget";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Topbar() {
  const { user } = useAuth0();
  const [isUserWidgetVisible, setUserWidgetVisibility] = useState(false);
  const hideUserWidget = () => setUserWidgetVisibility(false);

  return (
    <>
      <div id={styles.topbar}>
        <ThemeSwitch />
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
