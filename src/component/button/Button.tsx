import { IconProp } from "@fortawesome/fontawesome-svg-core";
import clsx from "clsx";
import ButtonIcon from "component/button/ButtonIcon";
import { ButtonHTMLAttributes, FC } from "react";
import { ActionType } from "type";

const ButtonVariants: Record<ActionType, string> = {
  primary:
    "border-primary-700 dark:border-primary-300 text-primary-700 dark:text-primary-300",
  error: "border-red-700 dark:border-red-300 text-red-700 dark:text-red-300",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconProp;
  hoverIcon?: IconProp;
  variant?: ActionType;
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
        "group flex w-full shrink-0 flex-row items-center justify-center gap-2 overflow-hidden rounded-full border-4 bg-transparent py-2 px-2 pr-5 font-bold sm:w-fit",
        { "cursor-wait": isSubmitting },
        { "cursor-not-allowed opacity-60": isDisabled },
        ButtonVariants[variant]
      )}
    >
      <ButtonIcon
        icon={icon}
        variant={variant}
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
