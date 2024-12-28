import { FC, PropsWithChildren } from "react";

export const Card: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-fit bg-white shadow-lg dark:bg-gray-900">{children}</div>
  );
};
