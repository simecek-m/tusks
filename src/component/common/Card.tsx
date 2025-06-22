import { cn } from "helper/style";
import { FC, PropsWithChildren } from "react";

interface CardProps extends PropsWithChildren {
  className?: string;
  onClick?: () => void;
}

export const Card: FC<CardProps> = ({ children, className, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        className,
        "w-fit rounded-xl bg-white shadow-lg dark:bg-gray-900",
      )}
    >
      {children}
    </div>
  );
};
