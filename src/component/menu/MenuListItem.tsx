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
      className="flex w-full cursor-pointer flex-row items-center gap-2 rounded-xl px-3 py-2 hover:bg-slate-200 dark:hover:bg-slate-800"
    >
      <FontAwesomeIcon icon={icon} />
      <span>{children}</span>
    </button>
  );
};

export default MenuListItem;
