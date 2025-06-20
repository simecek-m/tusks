import { FC } from "react";

interface HeadingProps {
  text: string;
  description?: string;
}

export const Heading: FC<HeadingProps> = ({ text, description }) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <span className="text-3xl font-black">{text}</span>
      <hr className="border-primary-600 dark:border-primary-400 rounded-full border-4" />
      <span className="font-light text-gray-500 dark:text-gray-400">
        {description}
      </span>
    </div>
  );
};
