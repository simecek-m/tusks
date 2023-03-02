import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { PROFILES_ME_QUERY_KEY } from "constant/queries";
import useTusksApi from "hook/api";
import Loading from "page/Loading";
import Registration from "page/Registration";
import { createContext, ReactElement, useContext, useState } from "react";
import { IProfile, IUserProfileContext } from "type";
import AuthenticationError from "page/AuthenticationError";

const UserProfileContext = createContext<IUserProfileContext | null>(null);

interface UserProfileProviderProps {
  children: React.ReactNode;
}

export const useUserProfile = (): IUserProfileContext => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw Error(
      "You are trying to access UserProfile context out of its Provider!"
    );
  } else {
    return context;
  }
};

const UserProfileProvider = ({
  children,
}: UserProfileProviderProps): ReactElement => {
  const { fetchMyProfile } = useTusksApi();
  const [profile, setProfile] = useState<IProfile>();

  const { isLoading, error } = useQuery<AxiosResponse<IProfile>, AxiosError>(
    [PROFILES_ME_QUERY_KEY],
    fetchMyProfile,
    {
      onSuccess: (response) => setProfile(response.data),
    }
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

export default UserProfileProvider;
