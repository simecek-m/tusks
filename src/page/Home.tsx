import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "component/button/Button";
import Menu from "component/menu/Menu";
import Title from "component/Title";
import { INDEX_PATH } from "constant/paths";
import { useTheme } from "provider/ThemeProvider";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { IMenuListItem } from "type";

const Home: FC = () => {
  const { loginWithPopup, isLoading, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const { changeTheme } = useTheme();

  const themeItems: IMenuListItem[] = [
    {
      icon: "sun",
      text: "light",
      onClick: () => changeTheme("light"),
    },
    {
      icon: "moon",
      text: "dark",
      onClick: () => changeTheme("dark"),
    },
    {
      icon: "palette",
      text: "system",
      onClick: () => changeTheme("system"),
    },
  ];

  if (isLoading) {
    return <div>loading</div>;
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center p-4">
      <div className="absolute top-2 right-2 flex select-none flex-col items-end gap-1">
        <Menu items={themeItems}>
          <FontAwesomeIcon
            icon="brush"
            className="cursor h-4 w-4 cursor-pointer rounded-full bg-white p-2 shadow-lg transition duration-300 hover:bg-slate-200 dark:bg-slate-700"
          />
        </Menu>
      </div>
      <Title>Tusks</Title>
      <p>not everyone has the memory of an elephant</p>
      {isAuthenticated ? (
        <Button
          icon="right-long"
          hoverIcon="door-open"
          onClick={() => navigate(INDEX_PATH)}
        >
          Continue
        </Button>
      ) : (
        <div className="mt-10 flex w-full flex-col items-center gap-2">
          <Button
            icon="lock"
            hoverIcon="key"
            onClick={() =>
              loginWithPopup({
                authorizationParams: { prompt: "select_account" },
              })
            }
          >
            Sign In
          </Button>
        </div>
      )}
    </div>
  );
};

export default Home;
