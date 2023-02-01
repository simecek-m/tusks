import { FC, ReactElement } from "react";

interface CardProps {
  children: ReactElement;
  className?: string;
}

export const Card: FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={`${className} m-auto w-full max-w-4xl rounded-3xl bg-white px-5 py-10 md:px-20 md:py-20`}
    >
      {children}
    </div>
  );
};

export default Card;
