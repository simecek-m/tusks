import { IconProp } from "@fortawesome/fontawesome-svg-core";
import clsx from "clsx";
import ButtonIcon from "component/button/ButtonIcon";
import { ButtonHTMLAttributes, FC } from "react";
import { ActionType } from "type";
import { motion } from "framer-motion";

const BASE_BUTTON_STYLE =
  "bg-transparent hover:text-white dark:hover:text-black flex shrink-0 flex-row items-center justify-center gap-2 overflow-hidden border-4 py-2 pl-2 pr-5 font-bold transition duration-300";

const ButtonVariants: Record<ActionType, string> = {
  primary:
    "text-brand-light dark:text-brand-dark border-brand-light dark:border-brand-dark hover:bg-brand-light dark:hover:bg-brand-dark hover:dark:text-black",
  error:
    "text-error-light dark:text-error-dark border-error-light dark:border-error-dark hover:bg-error-light dark:hover:bg-error-dark",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconProp;
  hoverIcon: IconProp;
  variant?: ActionType;
  isDisabled?: boolean;
  isSubmitting?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
}

const Button: FC<ButtonProps> = ({
  onClick,
  type = "button",
  isDisabled = false,
  isSubmitting = false,
  icon,
  variant = "primary",
  hoverIcon,
  className,
  children,
}) => {
  return (
    <motion.button
      onClick={(e) => {
        onClick && onClick(e);
        e.stopPropagation();
      }}
      type={type}
      disabled={isDisabled || isSubmitting}
      whileHover="hover"
      className={clsx(
        className,
        BASE_BUTTON_STYLE,
        { "cursor-wait": isSubmitting },
        { "cursor-not-allowed opacity-60": isDisabled },
        ButtonVariants[variant]
      )}
    >
      <ButtonIcon
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
    </motion.button>
  );
};

export default Button;
