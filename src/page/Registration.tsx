import { useAuth0 } from "@auth0/auth0-react";
import Button from "component/Button";
import Card from "component/Card";
import IconButton from "component/IconButton";
import Input from "component/Input";
import Title from "component/Title";
import { AVATAR_IMG } from "constant/assets";
import { FC } from "react";
import { CgClose } from "react-icons/cg";

const Registration: FC = () => {
  const { user, logout } = useAuth0();
  return (
    <div className="flex h-max w-screen justify-center bg-gradient-to-br from-brand-400 to-brand-900 sm:h-screen">
      <Card className="relative">
        <>
          <IconButton
            onClick={logout}
            icon={<CgClose />}
            className="absolute top-0 right-0 h-10 w-10 rounded-full p-0"
          />
          <div className="flex-col p-5 sm:w-[50vw]">
            <div className="flex w-full flex-col items-center">
              <Title
                text="Welcome"
                className="mb-2 text-4xl text-gray-900"
                type="color"
              />
              <p className="mb-5 text-center">
                before you continue please checkout your personal data
              </p>
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row md:gap-10">
              <img
                src={user?.picture ?? AVATAR_IMG}
                alt="profile picture"
                className="aspect-square w-1/3 rounded-3xl object-cover drop-shadow-xl"
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
      </Card>
    </div>
  );
};

export default Registration;
