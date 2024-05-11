import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

interface MenuListItemProps {
  icon: IconProp;
  children: string;
  onClick: () => void;
}

const MenuListItem: FC<MenuListItemProps> = ({ icon, children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex w-full cursor-pointer flex-row items-center gap-2 rounded-full px-3 py-2 hover:bg-background-light dark:hover:bg-background-dark"
    >
      <FontAwesomeIcon icon={icon} fixedWidth />
      <span className="whitespace-nowrap">{children}</span>
    </button>
  );
};

export default MenuListItem;
