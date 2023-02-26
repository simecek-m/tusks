import { useAuth0 } from "@auth0/auth0-react";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { MY_PROFILE_ENDPOINT, PROFILES_ENDPOINT } from "constant/endpoints";
import { IProfile } from "type";

interface TusksApiFunctions {
  fetchMyProfile: () => Promise<AxiosResponse<IProfile>>;
  postRegistration: (profile: IProfile) => Promise<AxiosResponse<IProfile>>;
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

  const fetchMyProfile = async (): Promise<AxiosResponse<IProfile>> => {
    return client.get<IProfile>(MY_PROFILE_ENDPOINT);
  };

  const postRegistration = async (
    profile: IProfile
  ): Promise<AxiosResponse<IProfile>> => {
    return client.post<IProfile>(PROFILES_ENDPOINT, profile);
  };

  return {
    fetchMyProfile,
    postRegistration,
  };
};

export default useTusksApi;
