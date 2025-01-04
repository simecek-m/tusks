import { ProfileWidget } from "component/layout/topbar/ProfileWidget";
import { ThemeSwitcher } from "component/layout/topbar/ThemeSwitcher";

export const Topbar = () => {
  return (
    <div className="z-40 flex w-full select-none justify-end">
      <div className="right-3 top-3 flex w-full flex-row items-center justify-end gap-2 bg-surface-light py-3 px-2 shadow-sm dark:bg-surface-dark md:absolute md:w-fit md:rounded-full md:py-2">
        <ThemeSwitcher />
        <ProfileWidget />
      </div>
    </div>
  );
};
