import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { motion } from "framer-motion";
import { cn } from "helper/style";

interface ButtonIconProps {
  icon: IconProp;
  hoverIcon: IconProp;
  isSubmitting?: boolean;
  isDisabled?: boolean;
}

export const ButtonIcon: FC<ButtonIconProps> = ({
  icon,
  hoverIcon,
  isSubmitting = false,
  isDisabled = false,
}) => {
  const MotionIcon = motion(FontAwesomeIcon);
  const isActive = !isDisabled && !isSubmitting;
  return (
    <div className="relative flex">
      <MotionIcon
        initial={{ scale: 1 }}
        variants={isActive ? { hover: { scale: 0 } } : {}}
        icon={isDisabled ? "xmark" : isSubmitting ? "circle-notch" : icon}
        className={cn({
          "animate-spin": !!isSubmitting && !isDisabled,
        })}
      />
      <MotionIcon
        icon={hoverIcon}
        initial={{ scale: 0 }}
        variants={isActive ? { hover: { scale: 1 } } : {}}
        className="absolute"
      />
    </div>
  );
};
