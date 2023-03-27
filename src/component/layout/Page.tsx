import { FC, PropsWithChildren } from "react";

const Page: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex h-screen w-full flex-col gap-5 overflow-auto p-2 pt-8 pb-8 md:pb-0">
      {children}
    </div>
  );
};

export default Page;
