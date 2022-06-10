import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "component/user/UserWidget.module.sass";
import { useTheme } from "provider/theme";
import { motion } from "framer-motion";

export default function UserWidget({ innerRef }) {
  const { user, logout } = useAuth0();
  const { theme } = useTheme();
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      id={styles.widget}
      className={`${theme === "dark" ? styles.dark : ""}`}
      ref={innerRef}
    >
      <img id={styles.picture} src={user.picture} alt="user" />
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
  );
}
