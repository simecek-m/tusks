import ThemeSwitcher from "component/ThemeSwitcher";
import { FC, PropsWithChildren } from "react";

const PageLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <ThemeSwitcher />
      {children}
    </div>
  );
};

export default PageLayout;
