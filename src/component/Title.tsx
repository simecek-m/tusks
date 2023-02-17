import { FC } from "react";

interface TitleProps {
  children: string;
}

const Title: FC<TitleProps> = ({ children }) => {
  return (
    <h1 className="inline-block bg-gradient-to-br from-primary-400 to-primary-900 bg-clip-text font-heading text-5xl font-black text-transparent">
      {children}
    </h1>
  );
};

export default Title;
