import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { FC } from "react";

const buttonIconStyle =
  "h-4 w-4 rounded-full bg-white bg-opacity-25 p-2 text-white";

interface ButtonIconProps {
  icon: IconProp;
  hoverIcon?: IconProp;
  isSubmitting?: boolean;
  isDisabled?: boolean;
}

const ButtonIcon: FC<ButtonIconProps> = ({
  icon,
  hoverIcon,
  isSubmitting = false,
  isDisabled = false,
}) => {
  return (
    <div className="relative flex">
      <FontAwesomeIcon
        icon={isDisabled ? "xmark" : isSubmitting ? "circle-notch" : icon}
        className={clsx(
          buttonIconStyle,
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
            "absolute translate-y-10 transition duration-500 ease-in-out group-hover:translate-y-0 "
          )}
        />
      )}
    </div>
  );
};

export default ButtonIcon;
