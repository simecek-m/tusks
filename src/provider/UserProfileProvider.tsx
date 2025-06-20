import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { PROFILES_ME_QUERY_KEY } from "constant/queries";
import { useTusksApi } from "hook/api";
import { AuthenticationError } from "page/AuthenticationError";
import { Loading } from "page/Loading";
import { Registration } from "page/Registration";
import React, {
  createContext,
  ReactElement,
  useContext,
  useState,
} from "react";
import { IProfile, IUserProfileContext } from "type";

const UserProfileContext = createContext<IUserProfileContext>({
  profile: undefined,
  setProfile: () => null,
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
  const [profile, setProfile] = useState<IProfile>();

  const { isLoading, error } = useQuery<IProfile, AxiosError>(
    [PROFILES_ME_QUERY_KEY],
    fetchMyProfile,
    {
      onSuccess: (profile) => setProfile(profile),
    },
  );

  if (isLoading) return <Loading />;

  if (error) {
    const message = error.message;
    const status = error.response?.status;
    switch (status) {
      case 404:
        return <Registration onRegister={setProfile} />;
      default:
        return <AuthenticationError message={message} />;
    }
  }

  return (
    <UserProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};
