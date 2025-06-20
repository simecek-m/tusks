import { ProfileWidget } from "component/layout/topbar/ProfileWidget";
import { ThemeSwitcher } from "component/layout/topbar/ThemeSwitcher";

export const Topbar = () => {
  return (
    <div className="z-40 flex w-full justify-end select-none">
      <div className="bg-surface-light dark:bg-surface-dark top-3 right-3 flex w-full flex-row items-center justify-end gap-2 px-2 py-3 shadow-xs md:absolute md:w-fit md:rounded-full md:py-2">
        <ThemeSwitcher />
        <ProfileWidget />
      </div>
    </div>
  );
};
