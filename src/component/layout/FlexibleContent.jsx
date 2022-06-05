import styles from "component/layout/FlexibleContent.module.sass";
import { bool, oneOf } from "prop-types";

export default function FlexibleContent({
  flexDirection = "row",
  center = false,
  children,
}) {
  return (
    <div
      id={styles.layout}
      className={`
        ${flexDirection === "column" ? styles["direction-column"] : null} 
        ${center ? styles.center : null}
      `}
    >
      {children}
    </div>
  );
}

FlexibleContent.propTypes = {
  flexDirection: oneOf(["row", "column"]),
  center: bool,
};
