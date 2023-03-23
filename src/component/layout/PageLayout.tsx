import ControlWidget from "component/layout/widget/ControlWidget";
import { FC, PropsWithChildren } from "react";

const PageLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <ControlWidget />
      {children}
    </div>
  );
};

export default PageLayout;
