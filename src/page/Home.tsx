import { useAuth0 } from "@auth0/auth0-react";
import Button from "component/button/Button";
import ThemeSwitcher from "component/ThemeSwitcher";
import Title from "component/Title";
import { INDEX_PATH } from "constant/paths";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const Home: FC = () => {
  const { loginWithPopup, isLoading, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>loading</div>;
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center p-4">
      <ThemeSwitcher />
      <Title>Tusks</Title>
      <p>not everyone has the memory of an elephant</p>
      <div className="mt-10 flex w-full flex-col items-center">
        {isAuthenticated ? (
          <Button
            icon="right-long"
            hoverIcon="door-open"
            onClick={() => navigate(INDEX_PATH)}
          >
            Continue
          </Button>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default Home;
