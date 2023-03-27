import TopBar from "component/layout/widget/TopBar";
import { FC, PropsWithChildren } from "react";
import Page from "component/layout/Page";

const PageLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <TopBar />
      <Page>{children}</Page>
    </div>
  );
};

export default PageLayout;
