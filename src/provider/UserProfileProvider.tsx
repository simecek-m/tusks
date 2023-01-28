import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { PROFILES_ME_QUERY_KEY } from "constant/queries";
import useTusksApi from "hook/api";
import Registration from "page/Registration";
import { createContext, ReactElement, useContext, useState } from "react";
import { IProfile, IUserProfileContext } from "type";

const DEFAULT_CONTEXT_VALUE: IUserProfileContext = {
  profile: undefined,
};

const UserProfileContext = createContext<IUserProfileContext>(
  DEFAULT_CONTEXT_VALUE
);

interface UserProfileProviderProps {
  children: React.ReactNode;
}

export const useUserProfile = (): IUserProfileContext =>
  useContext(UserProfileContext);

const UserProfileProvider = ({
  children,
}: UserProfileProviderProps): ReactElement => {
  const { fetchMyProfile } = useTusksApi();
  const [profile, setProfile] = useState<IProfile>();

  const { isLoading, error } = useQuery(
    [PROFILES_ME_QUERY_KEY],
    fetchMyProfile,
    {
      onSuccess: (response) => setProfile(response.data),
    }
  );

  if (isLoading) return <div>loading</div>;

  if (error && (error as AxiosError).response?.status === 404) {
    return <Registration />;
  }

  return (
    <UserProfileContext.Provider value={{ profile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export default UserProfileProvider;
