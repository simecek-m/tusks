import { FC, ReactElement } from "react";

interface CardProps {
  children: ReactElement;
  className?: string;
}

export const Card: FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={`${className} m-auto h-fit w-fit bg-white p-10 sm:rounded-3xl`}
    >
      {children}
    </div>
  );
};

export default Card;
