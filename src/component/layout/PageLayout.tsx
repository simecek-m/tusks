import { Topbar } from "component/layout/topbar/TopBar";
import { cn } from "helper/style";
import { FC, PropsWithChildren } from "react";

interface PageLayoutProps extends PropsWithChildren {
  className?: string;
}

export const PageLayout: FC<PageLayoutProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        className,
        "flex h-screen w-screen flex-col overflow-hidden",
      )}
    >
      <Topbar />
      {children}
    </div>
  );
};
