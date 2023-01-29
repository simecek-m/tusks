import { FC } from "react";

interface TitleProps {
  text: string;
  className?: string;
}

const Title: FC<TitleProps> = ({ text, className }) => {
  return (
    <h1
      className={`${className} inline-block bg-gradient-to-br from-brand-400 to-brand-900 bg-clip-text text-5xl font-black text-transparent`}
    >
      {text}
    </h1>
  );
};

export default Title;
