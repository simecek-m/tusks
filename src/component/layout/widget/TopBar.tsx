import ProfileWidget from "component/layout/widget/ProfileWidget";
import ThemeSwitcher from "component/layout/widget/ThemeSwitcher";

const Topbar = () => {
  return (
    <div className="z-40 flex w-full select-none justify-end">
      <div className="right-3 top-3 flex w-full flex-row items-center justify-end gap-2 bg-white py-3 px-2 shadow-sm dark:bg-gray-900 md:absolute md:w-fit md:rounded-full md:py-2">
        <ThemeSwitcher />
        <ProfileWidget />
      </div>
    </div>
  );
};

export default Topbar;
