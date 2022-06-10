import styles from "component/layout/FlexibleContent.module.sass";
import { bool, oneOf } from "prop-types";
import { motion } from "framer-motion";

export default function FlexibleContent({
  flexDirection = "row",
  center = false,
  children,
}) {
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      id={styles.layout}
      className={`
        ${flexDirection === "column" ? styles["direction-column"] : null} 
        ${center ? styles.center : null}
      `}
    >
      {children}
    </motion.div>
  );
}

FlexibleContent.propTypes = {
  flexDirection: oneOf(["row", "column"]),
  center: bool,
};
