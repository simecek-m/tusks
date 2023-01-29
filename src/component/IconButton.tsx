import { FC } from "react";

interface IconButtonProps {
  icon: JSX.Element;
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
      className={`${className} text-md m-1 flex flex-row items-center justify-center gap-2 rounded-xl bg-gray-900 font-bold text-white transition duration-300 hover:bg-brand-600`}
      onClick={onClick}
    >
      {icon}
      {text}
    </button>
  );
};

export default IconButton;
