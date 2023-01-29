import { FC, ReactElement } from "react";

interface CardProps {
  children: ReactElement;
  className?: string;
}

export const Card: FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={`${className} m-auto h-fit w-fit bg-white py-10 px-20 sm:rounded-3xl`}
    >
      {children}
    </div>
  );
};

export default Card;
