import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { PROFILES_ME_QUERY_KEY } from "constant/queries";
import { useTusksApi } from "hook/api";
import { AuthenticationError } from "page/AuthenticationError";
import { Loading } from "page/Loading";
import { Registration } from "page/Registration";
import React, { createContext, ReactElement, useContext } from "react";
import { IProfile, IUserProfileContext } from "type";

const UserProfileContext = createContext<IUserProfileContext>({
  profile: undefined,
  updateProfile: () => null,
});

interface UserProfileProviderProps {
  children: React.ReactNode;
}

export const useUserProfile = (): IUserProfileContext => {
  return useContext(UserProfileContext);
};

export const UserProfileProvider = ({
  children,
}: UserProfileProviderProps): ReactElement => {
  const { fetchMyProfile } = useTusksApi();
  const queryClient = useQueryClient();

  const {
    data: profile,
    isPending,
    error,
  } = useQuery<IProfile, AxiosError>({
    queryKey: [PROFILES_ME_QUERY_KEY],
    queryFn: fetchMyProfile,
  });

  const updateProfile = (newProfile: IProfile): void => {
    queryClient.setQueryData<IProfile | undefined>(
      [PROFILES_ME_QUERY_KEY],
      () => newProfile,
    );
  };

  if (isPending) return <Loading />;

  if (error) {
    const message = error.message;
    const status = error.response?.status;
    switch (status) {
      case 404:
        return <Registration />;
      default:
        return <AuthenticationError message={message} />;
    }
  }

  return (
    <UserProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};
