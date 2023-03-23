import { useAuth0 } from "@auth0/auth0-react";
import axios, { AxiosInstance } from "axios";
import { MY_PROFILE_ENDPOINT, PROFILES_ENDPOINT } from "constant/endpoints";
import { IProfile } from "type";

interface TusksApiFunctions {
  fetchMyProfile: () => Promise<IProfile>;
  postRegistration: (profile: IProfile) => Promise<IProfile>;
  deactivateProfile: () => Promise<IProfile>;
}

const useTusksApi = (): TusksApiFunctions => {
  const { getAccessTokenSilently } = useAuth0();

  const client: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL,
  });

  client.interceptors.request.use(async (config) => {
    const accessToken = await getAccessTokenSilently();
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  });

  client.interceptors.response.use(async (response) => {
    return response.data;
  });

  const fetchMyProfile = async (): Promise<IProfile> => {
    return client.get<never, IProfile>(MY_PROFILE_ENDPOINT);
  };

  const postRegistration = async (profile: IProfile): Promise<IProfile> => {
    return client.post<never, IProfile>(PROFILES_ENDPOINT, profile);
  };

  const deactivateProfile = (): Promise<IProfile> => {
    return client.delete<never, IProfile>(MY_PROFILE_ENDPOINT);
  };

  return {
    fetchMyProfile,
    postRegistration,
    deactivateProfile,
  };
};

export default useTusksApi;
