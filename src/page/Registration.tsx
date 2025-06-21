import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Button } from "component/button/Button";
import { Title } from "component/common/Title";
import { Input } from "component/form/Input";
import { PageContent } from "component/layout/PageContent";
import { PageLayout } from "component/layout/PageLayout";
import { AVATAR_IMG } from "constant/assets";
import { PROFILES_ME_QUERY_KEY } from "constant/queries";
import { useTusksApi } from "hook/api";
import { useToast } from "provider/ToastProvider";
import { useUserProfile } from "provider/UserProfileProvider";
import { FC, useRef } from "react";
import { useForm } from "react-hook-form";
import { IProfile } from "type";
import { PROFILE_SCHEMA } from "validation";
import * as yup from "yup";

type ProfileForm = yup.InferType<typeof PROFILE_SCHEMA>;

export const Registration: FC = () => {
  const queryClient = useQueryClient();
  const { user, logout } = useAuth0();
  const { toast } = useToast();
  const { postRegistration } = useTusksApi();

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isValid },
  } = useForm<ProfileForm>({
    resolver: yupResolver(PROFILE_SCHEMA),
    mode: "onChange",
  });

  const usernameInputRef = useRef<HTMLInputElement | null>();
  const { ref, ...rest } = register("username");

  const { updateProfile } = useUserProfile();

  const { mutateAsync, isPending } = useMutation<
    IProfile,
    AxiosError,
    IProfile
  >({
    mutationFn: postRegistration,
  });

  const submit = (newProfile: IProfile): Promise<IProfile> => {
    return mutateAsync(newProfile, {
      onSuccess: (profile: IProfile) => {
        updateProfile(profile);
        queryClient.setQueryData([PROFILES_ME_QUERY_KEY], profile);
      },
      onError: (error) => {
        if (error.response?.status === 409) {
          setError("username", { message: "Username already taken!" });
          usernameInputRef.current?.focus();
        } else {
          toast({
            icon: "warning",
            title: "Hooops",
            description: `${error?.response?.status ?? error.message}`,
          });
        }
      },
    });
  };

  return (
    <PageLayout>
      <div className="bg-background-light dark:bg-background-dark flex w-full grow flex-col overflow-auto">
        <PageContent>
          <div className="bg-surface-light dark:bg-surface-dark relative m-auto w-full max-w-4xl rounded-3xl p-10 text-black shadow-lg dark:text-white">
            <button
              className="bg-background-light hover:bg-brand-light dark:bg-background-dark dark:hover:bg-brand-dark absolute top-0 right-0 m-1 flex h-10 w-10 items-center justify-center gap-2 rounded-full text-black transition duration-300 hover:text-white dark:text-white dark:hover:text-black"
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              <FontAwesomeIcon icon="close" />
            </button>
            <div className="flex flex-col">
              <div className="flex flex-col items-center">
                <Title>Welcome</Title>
                <p className="mb-5 text-center font-light">
                  checkout your personal data please
                </p>
              </div>
              <form
                onSubmit={handleSubmit(submit)}
                className="flex flex-col items-end gap-5"
              >
                <div className="flex w-full flex-col items-center justify-center gap-5 sm:flex-row">
                  <img
                    src={user?.picture ?? AVATAR_IMG}
                    alt="profile picture"
                    className="rounded-squircle aspect-square w-1/2 object-cover shadow-2xl"
                  />
                  <div className="flex w-full flex-col">
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
                    <input
                      value={user?.sub}
                      hidden
                      readOnly
                      {...register("id")}
                    />
                    <input
                      value={user?.picture}
                      hidden
                      readOnly
                      {...register("picture")}
                    />
                  </div>
                </div>
                <Button
                  icon="arrow-right"
                  hoverIcon="check"
                  type="submit"
                  isDisabled={!isValid}
                  isSubmitting={isPending}
                >
                  continue
                </Button>
              </form>
            </div>
          </div>
        </PageContent>
      </div>
    </PageLayout>
  );
};
