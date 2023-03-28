import { AnimatePresence } from "framer-motion";
import { FC, PropsWithChildren } from "react";
import { motion } from "framer-motion";

interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute top-0 left-0 z-40 flex h-screen w-screen items-center justify-center bg-black bg-opacity-70"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="m-2 flex w-full max-w-3xl flex-col rounded-3xl bg-white p-6 dark:bg-gray-800 md:w-1/2"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
