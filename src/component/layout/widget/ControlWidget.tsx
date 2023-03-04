import ProfileWidget from "component/layout/widget/ProfileWidget";
import ThemeSwitcher from "component/layout/widget/ThemeSwitcher";
import { useUserProfile } from "provider/UserProfileProvider";

const ControlWidget = () => {
  const { profile } = useUserProfile();
  return (
    <div className="absolute top-2 right-2 flex select-none flex-row rounded-full bg-white p-1 px-2 shadow-lg dark:bg-slate-700">
      {profile && <ProfileWidget />}
      <ThemeSwitcher />
    </div>
  );
};

export default ControlWidget;
