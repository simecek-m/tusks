import { cn } from "helper/style";
import { FC } from "react";

interface MenuListProps {
  visible: boolean;
  children?: React.ReactNode;
}

export const MenuList: FC<MenuListProps> = ({ visible, children }) => {
  return (
    <div
      className={cn(
        "absolute top-full right-0 z-10 mt-4 flex-col gap-1 rounded-3xl bg-surface-light p-1 shadow-lg transition duration-300 dark:bg-surface-dark md:mt-3",
        {
          hidden: !visible,
        }
      )}
    >
      {children}
    </div>
  );
};
