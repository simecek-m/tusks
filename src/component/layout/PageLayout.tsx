import Topbar from "component/layout/topbar/TopBar";
import { FC, PropsWithChildren } from "react";

const PageLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <Topbar />
      {children}
    </div>
  );
};

export default PageLayout;
