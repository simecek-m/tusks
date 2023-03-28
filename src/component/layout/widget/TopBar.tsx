import ProfileWidget from "component/layout/widget/ProfileWidget";
import ThemeSwitcher from "component/layout/widget/ThemeSwitcher";

const Topbar = () => {
  return (
    <div className="flex w-full select-none justify-end md:pr-2 md:pt-2">
      <div className="right-3 top-3 flex w-full flex-row items-center justify-end gap-2 bg-white py-2 px-3 shadow-lg dark:bg-slate-700 md:absolute md:w-fit md:rounded-full">
        <ThemeSwitcher />
        <ProfileWidget />
      </div>
    </div>
  );
};

export default Topbar;
