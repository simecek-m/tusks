import { motion } from "framer-motion";
import { FC } from "react";

export const Spinner: FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0.2, scale: 1 }}
      animate={{ opacity: 1, scale: 0.5 }}
      transition={{
        repeat: Infinity,
        repeatType: "reverse",
        duration: 0.5,
      }}
      className="bg-brand-light dark:bg-brand-dark h-20 w-20 rounded-full"
    ></motion.div>
  );
};
