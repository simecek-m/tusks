import { cn } from "helper/style";
import React, { FC } from "react";

interface MenuListProps {
  visible: boolean;
  children?: React.ReactNode;
}

export const MenuList: FC<MenuListProps> = ({ visible, children }) => {
  return (
    <div
      className={cn(
        "bg-surface-light dark:bg-surface-dark absolute top-full right-0 z-10 mt-4 flex-col gap-1 rounded-3xl p-1 shadow-lg transition duration-300 md:mt-3",
        {
          hidden: !visible,
        },
      )}
    >
      {children}
    </div>
  );
};
