import { func, string } from "prop-types";
import "component/button/Button.module.sass";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Button({ icon, onClick, children }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{
        background: "var(--brand)",
        scale: 1,
        color: "var(--on-brand)",
      }}
      whileHover={{
        background: "var(--brand-variant)",
        scale: 1.1,
      }}
      transition={{ scale: { type: "spring", stiffness: 300 } }}
      whileTap={{ background: "var(--gray-400)", scale: 0.95 }}
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
