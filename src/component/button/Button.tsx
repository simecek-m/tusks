import { IconProp } from "@fortawesome/fontawesome-svg-core";
import clsx from "clsx";
import IconButton from "component/button/ButtonIcon";
import { ButtonHTMLAttributes, FC } from "react";

type ButtonVariant = "primary" | "destructive";

const ButtonVariants: Record<ButtonVariant, string> = {
  primary: "bg-primary-700",
  destructive: "bg-red-600",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconProp;
  hoverIcon?: IconProp;
  children: string;
  variant?: ButtonVariant;
  isDisabled?: boolean;
  isSubmitting?: boolean;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({
  onClick,
  type = "button",
  isDisabled = false,
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
      disabled={isDisabled || isSubmitting}
      className={clsx(
        "group flex w-full flex-row items-center justify-center gap-2 overflow-hidden rounded-full py-2 px-2 pr-5 font-bold text-white sm:w-fit",
        { "cursor-wait": isSubmitting },
        { "cursor-not-allowed opacity-60": isDisabled },
        ButtonVariants[variant]
      )}
    >
      <IconButton
        icon={icon}
        hoverIcon={hoverIcon}
        isDisabled={isDisabled}
        isSubmitting={isSubmitting}
      />
      <span
        className={clsx("capitalize", {
          "font-normal italic": !!isSubmitting && !isDisabled,
        })}
      >
        {isSubmitting && !isDisabled ? "processing" : children}
      </span>
    </button>
  );
};

export default Button;
