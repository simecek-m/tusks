import { func, string } from "prop-types";
import "component/button/Button.module.sass";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Button({
  color = "var(--brand)",
  onColor = "var(--on-brand)",
  icon,
  onClick,
  children,
}) {
  return (
    <motion.button
      onClick={onClick}
      initial={{
        color,
        background: "var(--transparent)",
        border: `2px solid ${color}`,
      }}
      whileHover={{
        color: onColor,
        background: color,
      }}
      whileTap={{ scale: 0.95 }}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      {children}
    </motion.button>
  );
}

Button.propTypes = {
  icon: string,
  onClick: func.isRequired,
};
