import { IconProp } from "@fortawesome/fontawesome-svg-core";
import clsx from "clsx";
import ButtonIcon from "component/button/ButtonIcon";
import { ButtonHTMLAttributes, FC } from "react";
import { ActionType } from "type";
import { motion } from "framer-motion";

const ButtonVariants: Record<ActionType, string> = {
  primary:
    "bg-primary-700 hover:bg-primary-800 dark:bg-primary-400 dark:hover:bg-primary-500",
  error: "bg-red-600 hover:bg-red-700 dark:bg-red-400 dark:hover:bg-red-500",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconProp;
  hoverIcon: IconProp;
  variant?: ActionType;
  isDisabled?: boolean;
  isSubmitting?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
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
    <motion.button
      onClick={(e) => {
        onClick && onClick(e);
        e.stopPropagation();
      }}
      type={type}
      disabled={isDisabled || isSubmitting}
      whileHover="hover"
      className={clsx(
        "flex w-full shrink-0 flex-row items-center justify-center gap-2 overflow-hidden rounded-full py-2 pl-2 pr-5 font-bold text-slate-100 transition duration-300 dark:text-slate-900 sm:w-fit",
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
