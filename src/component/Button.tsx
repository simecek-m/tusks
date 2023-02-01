import { FC, ButtonHTMLAttributes } from "react";

interface ButtonProps {
  text: string;
  className?: string;
  onClick?: () => void;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled?: boolean;
  isSubmitting?: boolean;
}

const Button: FC<ButtonProps> = ({
  text,
  onClick,
  type = "button",
  disabled = false,
  isSubmitting = false,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${className} ${
        isSubmitting ? "cursor-wait from-gray-500 to-gray-500" : ""
      } w-full rounded-md bg-gradient-to-br from-brand-400 to-brand-900 px-5 py-2 font-bold text-white disabled:from-gray-500 disabled:to-gray-500 sm:w-1/2 lg:max-w-sm`}
    >
      {isSubmitting ? "sending" : text}
    </button>
  );
};

export default Button;
