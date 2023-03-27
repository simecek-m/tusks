import ControlWidget from "component/layout/widget/ControlWidget";
import { FC, PropsWithChildren } from "react";

const PageLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <ControlWidget />
      {children}
    </>
  );
};

export default PageLayout;
