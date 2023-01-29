import { FC } from "react";

type TitleType = "brand" | "color";

interface TitleProps {
  text: string;
  type?: TitleType;
  className?: string;
}

const Title: FC<TitleProps> = ({ text, type = "brand", className }) => {
  return (
    <h1
      className={`${className} ${
        type === "brand"
          ? "bg-gradient-to-br from-brand-400 to-brand-900 bg-clip-text text-transparent"
          : ""
      } inline-block text-5xl font-black`}
    >
      {text}
    </h1>
  );
};

export default Title;
