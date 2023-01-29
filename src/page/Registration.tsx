import { useAuth0 } from "@auth0/auth0-react";
import Button from "component/Button";
import IconButton from "component/IconButton";
import Input from "component/Input";
import Title from "component/Title";
import { AVATAR_IMG } from "constant/assets";
import { FC } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";

const Registration: FC = () => {
  const { logout, user } = useAuth0();
  return (
    <>
      <IconButton
        text="back"
        icon={<FaLongArrowAltLeft />}
        className="fixed top-0 left-0"
        onClick={logout}
      />
      <div className="m-auto mt-[10vh] flex h-full w-full flex-col p-5 sm:w-[50vw]">
        <Title text="First time here?" className="text-3xl" />
        <p className="mb-5">
          Before you continue to app, please check your personal data and
          register new tusks account:
        </p>
        <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row md:gap-10">
          <img
            src={user?.picture ?? AVATAR_IMG}
            alt="profile picture"
            className="w-1/2 rounded-2xl drop-shadow-xl"
          />
          <form className="flex w-full flex-col">
            <Input
              placeholder="username"
              name="username"
              defaultValue={user?.nickname}
            />
            <Input
              placeholder="first name"
              name="firstName"
              defaultValue={user?.given_name}
            />
            <Input
              placeholder="last name"
              name="lastname"
              defaultValue={user?.family_name}
            />
            <Input
              placeholder="e-mail"
              name="email"
              type="email"
              defaultValue={user?.email}
            />
            <Button
              text="continue"
              onClick={() => console.log("submitted")}
              className="mt-4 min-w-full"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Registration;
