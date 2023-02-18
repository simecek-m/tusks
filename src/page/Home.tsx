import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Button from "component/button/Button";
import Title from "component/Title";
import { INDEX_PATH } from "constant/paths";
import { useTheme } from "provider/ThemeProvider";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home: FC = () => {
  const { loginWithPopup, isLoading, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [isExpanded, setExpand] = useState<boolean>(false);
  const { changeTheme } = useTheme();

  if (isLoading) {
    return <div>loading</div>;
  }

  // TODO: encapsulate the theme switcher into its own component
  return (
    <div className="flex h-screen flex-col items-center justify-center p-4">
      <div className="absolute top-2 right-2 flex select-none flex-col items-end gap-1">
        <FontAwesomeIcon
          icon="brush"
          onClick={() => setExpand(!isExpanded)}
          className="cursor h-4 w-4 cursor-pointer rounded-full bg-white p-2 shadow-lg transition duration-300 hover:bg-slate-200 dark:bg-slate-700"
        />
        <div
          className={clsx(
            "z-10 flex-col gap-1 rounded-xl bg-white p-1 shadow-lg transition duration-300 dark:bg-slate-700",
            {
              flex: isExpanded,
            },
            {
              hidden: !isExpanded,
            }
          )}
        >
          <div
            className="flex cursor-pointer flex-row items-center gap-2 rounded-xl px-3 py-2 hover:bg-slate-200 dark:hover:bg-slate-800"
            onClick={() => {
              setExpand(false);
              changeTheme("light");
            }}
          >
            <FontAwesomeIcon icon="lightbulb" />
            <span>light</span>
          </div>
          <div
            className="flex cursor-pointer flex-row items-center gap-2 rounded-xl px-3 py-2 hover:bg-slate-200 dark:hover:bg-slate-800"
            onClick={() => {
              setExpand(false);
              changeTheme("dark");
            }}
          >
            <FontAwesomeIcon icon="moon" />
            <span>dark</span>
          </div>
          <div
            className="flex cursor-pointer flex-row items-center gap-2 rounded-xl px-3 py-2 hover:bg-slate-200 dark:hover:bg-slate-800"
            onClick={() => {
              setExpand(false);
              changeTheme("system");
            }}
          >
            <FontAwesomeIcon icon="palette" />
            <span>system</span>
          </div>
        </div>
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
