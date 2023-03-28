import clsx from "clsx";
import { FC } from "react";

interface MenuListProps {
  visible: boolean;
  children?: React.ReactNode;
}

const MenuList: FC<MenuListProps> = ({ visible, children }) => {
  return (
    <div
      className={clsx(
        "absolute top-full right-0 z-10 mt-4 flex-col gap-1 rounded-3xl bg-white p-1 shadow-lg transition duration-300 dark:bg-gray-900 md:mt-3",
        {
          hidden: !visible,
        }
      )}
    >
      {children}
    </div>
  );
};

export default MenuList;
