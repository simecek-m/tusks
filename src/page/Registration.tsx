import { useAuth0 } from "@auth0/auth0-react";
// import { useMutation } from "@tanstack/react-query";
import Button from "component/Button";
import Card from "component/Card";
import IconButton from "component/IconButton";
import Input from "component/Input";
import Title from "component/Title";
import { AVATAR_IMG } from "constant/assets";
// import useTusksApi from "hook/api";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { CgClose } from "react-icons/cg";
import { IProfile } from "type";

const Registration: FC = () => {
  const { user, logout } = useAuth0();
  // const { postRegistration } = useTusksApi();
  // const { mutate } = useMutation(postRegistration);
  const { handleSubmit, register } = useForm<IProfile>();
  const submit = (profile: IProfile) => {
    console.log(profile);
    // TODO: mutate data -> send POST request
  };

  return (
    <div className="flex h-max w-screen justify-center bg-gradient-to-br from-brand-400 to-brand-900 md:h-screen">
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
                className="aspect-square w-1/2 rounded-3xl object-cover drop-shadow-xl"
              />
              <form
                onSubmit={handleSubmit(submit)}
                className="flex w-full flex-col"
              >
                <Input
                  label="username"
                  defaultValue={user?.nickname}
                  {...register("username")}
                />
                <Input
                  label="first name"
                  defaultValue={user?.given_name}
                  {...register("firstName")}
                />
                <Input
                  label="last name"
                  defaultValue={user?.family_name}
                  {...register("lastName")}
                />
                <Input
                  label="e-mail"
                  type="email"
                  defaultValue={user?.email}
                  {...register("email")}
                />
                <Button
                  text="continue"
                  type="submit"
                  className="mt-4 min-w-full"
                />
                <input value={user?.sub} hidden readOnly {...register("id")} />
                <input
                  value={user?.picture}
                  hidden
                  readOnly
                  {...register("picture")}
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
