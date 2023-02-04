import { useAuth0 } from "@auth0/auth0-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import Button from "component/Button";
import Card from "component/Card";
import IconButton from "component/IconButton";
import Input from "component/Input";
import Title from "component/Title";
import { AVATAR_IMG } from "constant/assets";
import { PROFILES_ME_QUERY_KEY } from "constant/queries";
import useTusksApi from "hook/api";
import { FC, useRef } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IProfile } from "type";
import { PROFILE_SCHEMA } from "validation";

const Registration: FC = () => {
  const queryClient = useQueryClient();
  const { user, logout } = useAuth0();
  const { postRegistration } = useTusksApi();

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<IProfile>({
    resolver: yupResolver(PROFILE_SCHEMA),
    mode: "onChange",
  });

  const usernameInputRef = useRef<HTMLInputElement | null>();
  const { ref, ...rest } = register("username");

  const { mutate } = useMutation<AxiosResponse<IProfile>, AxiosError, IProfile>(
    (profile: IProfile) => postRegistration(profile)
  );

  const submit = (profile: IProfile) => {
    mutate(profile, {
      onSuccess: (response: AxiosResponse<IProfile>) => {
        queryClient.setQueryData([PROFILES_ME_QUERY_KEY], response.data);
      },
      onError: (error) => {
        if (error.response?.status === 409) {
          setError("username", { message: "Username already taken!" });
          usernameInputRef.current?.focus();
        } else {
          toast.error(
            `Something went wrong, ${error?.response?.status ?? error.message}!`
          );
        }
      },
    });
  };

  return (
    <div className="flex h-screen w-screen justify-center overflow-auto bg-gradient-to-br from-brand-400 to-brand-900 p-5 md:p-10">
      <Card className="relative">
        <>
          <IconButton
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
            icon="close"
            className="absolute top-0 right-0 h-10 w-10 rounded-full p-0"
          />
          <div className="flex-col">
            <div className="flex flex-col items-center">
              <Title className="text-gray-900">Welcome</Title>
              <p className="mb-5 text-center font-light">
                before you continue please checkout your personal data
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-5 md:flex-row md:gap-10">
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
                  defaultValue={user?.family_name
                    ?.toLocaleLowerCase()
                    .normalize("NFD")
                    .replace(/\p{Diacritic}/gu, "")}
                  error={errors.username}
                  prefix="@"
                  ref={(e) => {
                    ref(e);
                    usernameInputRef.current = e;
                  }}
                  {...rest}
                />
                <Input
                  label="first name"
                  defaultValue={user?.given_name}
                  error={errors.firstName}
                  {...register("firstName")}
                />
                <Input
                  label="last name"
                  defaultValue={user?.family_name}
                  error={errors.lastName}
                  {...register("lastName")}
                />
                <Input
                  label="e-mail"
                  type="email"
                  defaultValue={user?.email}
                  error={errors.email}
                  {...register("email")}
                />
                <Button
                  text="continue"
                  type="submit"
                  disabled={!isValid}
                  isSubmitting={isSubmitting}
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
