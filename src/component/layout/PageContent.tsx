import clsx from "clsx";
import { FC, PropsWithChildren } from "react";

interface PageContentProps extends PropsWithChildren {
  className?: string;
}

export const PageContent: FC<PageContentProps> = ({ children, className }) => {
  return (
    <div
      className={clsx(
        "flex w-full grow flex-col overflow-auto p-4 md:p-8",
        className
      )}
    >
      {children}
    </div>
  );
};
