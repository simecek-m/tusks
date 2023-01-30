import { useAuth0 } from "@auth0/auth0-react";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { IProfile } from "type";

interface TuskApiFunctions {
  fetchMyProfile: () => Promise<AxiosResponse<IProfile>>;
  postRegistration: () => Promise<AxiosResponse<IProfile>>;
}

const useTusksApi = (): TuskApiFunctions => {
  const { getAccessTokenSilently } = useAuth0();

  const getTusksApiClient: () => Promise<AxiosInstance> = async () => {
    const accessToken = await getAccessTokenSilently();
    return axios.create({
      baseURL: process.env.REACT_APP_TODO_API_URL,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  const fetchMyProfile = async () => {
    const client = await getTusksApiClient();
    return client.get<IProfile>("/profiles/me");
  };

  const postRegistration = async () => {
    const client = await getTusksApiClient();
    return client.post<IProfile>("/profiles");
  };

  return {
    fetchMyProfile,
    postRegistration,
  };
};

export default useTusksApi;
