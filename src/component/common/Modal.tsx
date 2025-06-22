import { AnimatePresence, motion } from "motion/react";
import { useClickOutside } from "hook/clickOutside";
import { FC, PropsWithChildren } from "react";

interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalBodyRef = useClickOutside(onClose, isOpen);
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute top-0 left-0 z-40 flex h-screen w-screen items-center justify-center bg-black/80"
        >
          <motion.div
            ref={modalBodyRef}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="bg-surface-light dark:bg-surface-dark m-4 flex w-fit max-w-3xl flex-col rounded-xl p-10"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
