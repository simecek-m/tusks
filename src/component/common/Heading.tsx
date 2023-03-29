import { FC } from "react";

interface HeadingProps {
  text: string;
  description?: string;
}

const Heading: FC<HeadingProps> = ({ text, description }) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <span className="text-3xl font-black">{text}</span>
      <hr className="rounded-full border-4 border-primary-600 dark:border-primary-400" />
      <span className="font-light text-gray-500 dark:text-gray-400">
        {description}
      </span>
    </div>
  );
};

export default Heading;
