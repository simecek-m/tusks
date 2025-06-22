import { FC } from "react";

interface TitleProps {
  children: string;
}

export const Title: FC<TitleProps> = ({ children }) => {
  return (
    <h1 className="font-heading text-brand-light dark:text-brand-dark inline-block text-5xl font-black">
      {children}
    </h1>
  );
};
