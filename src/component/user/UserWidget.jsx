import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Popup from "component/layout/Popup";
import styles from "component/user/UserWidget.module.sass";
import { useTheme } from "provider/theme";
import { motion } from "framer-motion";

export default function UserWidget({ hide }) {
  const { user, logout } = useAuth0();
  const { theme } = useTheme();

  return (
    <Popup hide={hide}>
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 100, opacity: 0 }}
        id={styles.widget}
        className={`${theme === "dark" ? styles.dark : ""}`}
      >
        <img
          id={styles.picture}
          src={user.picture}
          alt="user"
          referrerPolicy="no-referrer"
        />
        <div id={styles.texts}>
          <h3>{user.name}</h3>
          <div>{user.email}</div>
        </div>
        <div id={styles.logout} onClick={logout}>
          <FontAwesomeIcon
            icon="person-walking-dashed-line-arrow-right"
            size="xl"
          />
        </div>
      </motion.div>
    </Popup>
  );
}
