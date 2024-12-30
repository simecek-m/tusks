import clsx from "clsx";
import { FC, PropsWithChildren } from "react";

interface CardProps extends PropsWithChildren {
  className?: string;
}

export const Card: FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={clsx(className, "w-fit bg-white shadow-lg dark:bg-gray-900")}
    >
      {children}
    </div>
  );
};
