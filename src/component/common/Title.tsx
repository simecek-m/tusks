import { FC } from "react";

interface TitleProps {
  children: string;
}

export const Title: FC<TitleProps> = ({ children }) => {
  return (
    <h1 className="inline-block font-heading text-5xl font-black text-brand-light dark:text-brand-dark">
      {children}
    </h1>
  );
};
