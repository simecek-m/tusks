import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, ReactElement } from "react";

export interface CardProps {
  children: ReactElement;
  onClose?: () => void;
}

export const Card: FC<CardProps> = ({ children, onClose }) => {
  return (
    <div className="relative m-auto w-full max-w-4xl rounded-3xl bg-white p-10 shadow-lg dark:bg-slate-800">
      <button
        className="absolute top-0 right-0 m-1 flex h-10 w-10 items-center justify-center gap-2 rounded-full bg-gray-900 text-white transition duration-300 hover:bg-primary-600"
        onClick={onClose}
      >
        <FontAwesomeIcon icon="close" />
      </button>
      {children}
    </div>
  );
};

export default Card;
