import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

interface IconButtonProps {
  icon: IconProp;
  text?: string;
  className?: string;
  onClick?: () => void;
}

const IconButton: FC<IconButtonProps> = ({
  icon,
  text,
  onClick,
  className,
}) => {
  return (
    <button
      className={`${className} text-md m-1 flex flex-row items-center justify-center gap-2 rounded-full bg-gray-900  font-bold text-white transition duration-300 hover:bg-brand-600`}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} />
      {text}
    </button>
  );
};

export default IconButton;
