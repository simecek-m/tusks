import { FC, PropsWithChildren } from "react";

const PageContent: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex w-full grow flex-col overflow-auto p-4 md:p-8">
      {children}
    </div>
  );
};

export default PageContent;
