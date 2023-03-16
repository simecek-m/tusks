import { motion } from "framer-motion";
import { FC } from "react";

const Spinner: FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0.2, scale: 1 }}
      animate={{ opacity: 1, scale: 0.5 }}
      transition={{
        repeat: Infinity,
        repeatType: "reverse",
        duration: 0.5,
      }}
      className="h-20 w-20 rounded-full bg-primary-600 dark:bg-primary-300"
    ></motion.div>
  );
};

export default Spinner;
