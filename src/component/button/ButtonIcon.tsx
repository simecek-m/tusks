import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { FC } from "react";
import { ActionType } from "type";

const buttonIconStyle =
  "h-4 w-4 rounded-full p-2 dark:text-slate-700 text-white";

const ButtonIconVariants: Record<ActionType, string> = {
  primary: "bg-primary-700 dark:bg-primary-300",
  error: "bg-red-700 dark:bg-red-300",
};

interface ButtonIconProps {
  icon: IconProp;
  hoverIcon?: IconProp;
  variant?: ActionType;
  isSubmitting?: boolean;
  isDisabled?: boolean;
}

const ButtonIcon: FC<ButtonIconProps> = ({
  icon,
  hoverIcon,
  variant = "primary",
  isSubmitting = false,
  isDisabled = false,
}) => {
  return (
    <div className="relative flex">
      <FontAwesomeIcon
        icon={isDisabled ? "xmark" : isSubmitting ? "circle-notch" : icon}
        className={clsx(
          buttonIconStyle,
          ButtonIconVariants[variant],
          {
            "translate-y-0 transition duration-500 ease-in-out group-hover:-translate-y-10":
              !!hoverIcon && !isSubmitting && !isDisabled,
          },
          { "animate-spin": !!isSubmitting && !isDisabled }
        )}
      />
      {hoverIcon && !isSubmitting && !isDisabled && (
        <FontAwesomeIcon
          icon={hoverIcon}
          className={clsx(
            buttonIconStyle,
            ButtonIconVariants[variant],
            "absolute translate-y-10 transition duration-500 ease-in-out group-hover:translate-y-0"
          )}
        />
      )}
    </div>
  );
};

export default ButtonIcon;
