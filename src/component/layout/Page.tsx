import { FC, PropsWithChildren } from "react";

const Page: FC<PropsWithChildren> = ({ children }) => {
  return <div className="h-full overflow-auto">{children}</div>;
};

export default Page;
