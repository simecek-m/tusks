import { useState } from "react";

export const useModal = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  return { isOpen, onClose: () => setOpen(false), onOpen: () => setOpen(true) };
};
