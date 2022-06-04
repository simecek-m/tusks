import { func } from "prop-types";
import styles from "component/button/Button.module.sass";

export default function Button({ onClick, children }) {
  return (
    <button onClick={onClick} className={styles.button}>
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: func.isRequired,
};
