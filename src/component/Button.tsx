import { FC, ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ButtonVariant = "primary" | "destructive";

const ButtonVariants: Record<ButtonVariant, string> = {
  primary: "bg-primary-700",
  destructive: "bg-red-600",
};

export interface ButtonProps {
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled?: boolean;
  isSubmitting?: boolean;
  onClick?: () => void;
  children: string;
  icon: IconProp;
  hoverIcon: IconProp;
  variant?: ButtonVariant;
}

const Button: FC<ButtonProps> = ({
  onClick,
  type = "button",
  disabled = false,
  isSubmitting = false,
  icon,
  variant = "primary",
  hoverIcon,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        { "cursor-wait": isSubmitting },
        ButtonVariants[variant],
        "group flex w-full flex-row items-center justify-center gap-2 overflow-hidden rounded-full py-2 px-2 pr-5 font-bold text-white disabled:cursor-not-allowed disabled:opacity-40 sm:w-fit"
      )}
    >
      {!disabled && (
        <div className="relative flex">
          {icon && (
            <FontAwesomeIcon
              icon={icon}
              className="h-4 w-4 translate-y-0 rounded-full bg-white bg-opacity-25 p-2 text-white transition duration-500 ease-in-out group-hover:-translate-y-10"
            />
          )}
          {hoverIcon && (
            <FontAwesomeIcon
              icon={hoverIcon}
              className="absolute h-4 w-4 translate-y-10 rounded-full bg-white bg-opacity-25 p-2 text-white transition duration-500 ease-in-out group-hover:translate-y-0"
            />
          )}
        </div>
      )}
      {disabled && (
        <FontAwesomeIcon
          icon="xmark"
          className="h-4 w-4 rounded-full bg-white bg-opacity-25 p-2 text-white"
        />
      )}
      <span className="">{isSubmitting ? "processing" : children}</span>
    </button>
  );
};

export default Button;
