import { FC, ButtonHTMLAttributes } from "react";

interface ButtonProps {
  text: string;
  className?: string;
  onClick?: () => void;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  text,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${className} w-full rounded-md bg-gradient-to-br from-brand-400 to-brand-900 px-5 py-2 font-bold text-white disabled:from-gray-500 disabled:to-gray-500 sm:w-1/2 lg:max-w-sm`}
    >
      {text}
    </button>
  );
};

export default Button;
