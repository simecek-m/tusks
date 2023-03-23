import ProfileWidget from "component/layout/widget/ProfileWidget";
import ThemeSwitcher from "component/layout/widget/ThemeSwitcher";

const ControlWidget = () => {
  return (
    <div className="absolute top-2 right-2 flex select-none flex-row items-center justify-center gap-2 rounded-full bg-white py-2 px-3 shadow-lg dark:bg-slate-700">
      <ThemeSwitcher />
      <ProfileWidget />
    </div>
  );
};

export default ControlWidget;
