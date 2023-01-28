import { useAuth0 } from "@auth0/auth0-react";
import Button from "component/Button";
import { FC } from "react";

const Registration: FC = () => {
  const { logout } = useAuth0();
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-xl font-bold">Registration</h1>
      <div>First time here?</div>
      <Button text="cancel" onClick={() => logout()} />
    </div>
  );
};

export default Registration;
