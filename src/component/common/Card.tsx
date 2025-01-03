import { cn } from "helper/style";
import { FC, PropsWithChildren } from "react";

interface CardProps extends PropsWithChildren {
  className?: string;
}

export const Card: FC<CardProps> = ({ children, className }) => {
  return (
    <div className={cn(className, "w-fit bg-white shadow-lg dark:bg-gray-900")}>
      {children}
    </div>
  );
};
