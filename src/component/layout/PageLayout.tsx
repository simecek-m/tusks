import Topbar from "component/layout/widget/TopBar";
import { FC, PropsWithChildren } from "react";

const PageLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <Topbar />
      <div className="flex grow flex-col overflow-auto">{children}</div>
    </div>
  );
};

export default PageLayout;
