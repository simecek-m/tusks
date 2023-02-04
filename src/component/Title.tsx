import { FC } from "react";

interface TitleProps {
  children: string;
  className?: string;
}

const Title: FC<TitleProps> = ({ children, className }) => {
  return (
    <h1
      className={`${className} inline-block bg-gradient-to-br from-brand-400 to-brand-900 bg-clip-text font-brand text-5xl font-black text-transparent`}
    >
      {children}
    </h1>
  );
};

export default Title;
