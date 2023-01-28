import { useAuth0 } from "@auth0/auth0-react";
import IconButton from "component/IconButton";
import { FC } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";

const Registration: FC = () => {
  const { logout } = useAuth0();
  return (
    <>
      <IconButton
        text="back"
        icon={<FaLongArrowAltLeft />}
        className="absolute"
        onClick={logout}
      />
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="text-xl font-bold">Registration</h1>
        <div>First time here?</div>
      </div>
    </>
  );
};

export default Registration;
