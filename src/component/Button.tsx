import { FC, ButtonHTMLAttributes } from "react";

interface ButtonProps {
  text: string;
  className?: string;
  onClick?: () => void;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

const Button: FC<ButtonProps> = ({
  text,
  onClick,
  type = "button",
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${className} w-full rounded-md bg-gradient-to-br from-brand-400 to-brand-900 px-5 py-2 font-bold text-white sm:w-1/2 lg:max-w-sm`}
    >
      {text}
    </button>
  );
};

export default Button;
