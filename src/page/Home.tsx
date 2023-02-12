import { useAuth0 } from "@auth0/auth0-react";
import Button from "component/Button";
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
      <Title className="text-6xl">Tusks</Title>
      <p>not everyone has the memory of an elephant</p>
      {isAuthenticated ? (
        <Button
          icon="right-long"
          hoverIcon="door-open"
          onClick={() => navigate(INDEX_PATH)}
        >
          continue
        </Button>
      ) : (
        <div className="mt-10 flex w-full flex-col items-center gap-2">
          <Button icon="lock" hoverIcon="key" onClick={loginWithPopup}>
            login
          </Button>
        </div>
      )}
    </div>
  );
};

export default Home;
