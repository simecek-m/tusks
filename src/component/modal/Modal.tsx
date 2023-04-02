import { AnimatePresence, motion } from "framer-motion";
import { useClickOutside } from "hook/clickOutside";
import { FC, PropsWithChildren } from "react";

interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalBodyRef = useClickOutside(onClose, isOpen);
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute top-0 left-0 z-40 flex h-screen w-screen items-center justify-center bg-black bg-opacity-70"
        >
          <motion.div
            ref={modalBodyRef}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="m-4 flex w-fit max-w-3xl flex-col rounded-3xl bg-white p-6 dark:bg-gray-800"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
