import { useAuth0 } from "@auth0/auth0-react";
import Button from "component/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { loginWithRedirect, isLoading, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>loading</div>;
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center p-4">
      <h1 className="inline-block bg-gradient-to-br from-brand-400 to-brand-900 bg-clip-text text-5xl font-black text-transparent">
        Tusks
      </h1>
      <p>not everyone has the memory of an elephant</p>
      {isAuthenticated ? (
        <Button
          text="continue"
          className="mt-5"
          onClick={() => navigate("/")}
        />
      ) : (
        <Button text="login" className="mt-5" onClick={loginWithRedirect} />
      )}
    </div>
  );
};

export default Home;
