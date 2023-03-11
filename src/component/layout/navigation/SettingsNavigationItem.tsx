import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { FC } from "react";
import { NavLink } from "react-router-dom";

interface SettingsNavigationItemProps {
  icon: IconProp;
  text: string;
  to: string;
}

const SettingsNavigationItem: FC<SettingsNavigationItemProps> = ({
  icon,
  text,
  to,
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        clsx(
          "flex cursor-pointer flex-row items-center gap-2 rounded-full py-3 px-4 hover:bg-gray-100 hover:dark:bg-slate-800",
          { "text-primary-600 dark:text-primary-400": isActive }
        )
      }
    >
      <FontAwesomeIcon icon={icon} fixedWidth />
      <span className="capitalize">{text}</span>
    </NavLink>
  );
};

export default SettingsNavigationItem;
