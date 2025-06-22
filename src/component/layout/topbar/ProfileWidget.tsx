import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "@tanstack/react-router";
import { Menu } from "component/menu/Menu";
import { SETTINGS_PATH } from "constant/paths";
import { useUserProfile } from "provider/UserProfileProvider";
import { IMenuListItem } from "type";

export const ProfileWidget = () => {
  const { logout } = useAuth0();
  const { profile } = useUserProfile();
  const router = useRouter();
  const profileMenuList: IMenuListItem[] = [
    {
      icon: "gear",
      text: "Settings",
      onClick: () => {
        router.navigate({ to: SETTINGS_PATH });
      },
    },
    {
      icon: "door-open",
      text: "Logout",
      onClick: () =>
        logout({ logoutParams: { returnTo: window.location.origin } }),
    },
  ];

  return (
    <>
      {profile && (
        <Menu items={profileMenuList}>
          <div className="hover:text-primary-600 dark:hover:text-primary-400 flex items-center justify-center">
            <img src={profile?.picture} className="h-7 w-7 rounded-full" />
          </div>
        </Menu>
      )}
    </>
  );
};
