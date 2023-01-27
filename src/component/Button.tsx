import { FC } from "react";

interface ButtonProps {
  text: string;
  className: string;
  onClick: () => void;
}

const Button: FC<ButtonProps> = ({ text, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`${className} w-full rounded-md bg-gradient-to-br from-brand-400 to-brand-900 px-5 py-2 font-bold text-white sm:w-1/2 lg:max-w-sm`}
    >
      {text}
    </button>
  );
};

export default Button;
