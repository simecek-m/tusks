import { useAuth0 } from "@auth0/auth0-react";
import axios, { AxiosInstance } from "axios";
import {
  MY_PROFILE_ENDPOINT,
  PROFILES_ENDPOINT,
  TAGS_ENDPOINT,
  TEAMS_ENDPOINT,
} from "constant/endpoints";
import { INewTag, IProfile, ITag, NewTeam, Team, TeamDetail } from "type";

export const useTusksApi = () => {
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

  const fetchAllTags = (): Promise<Array<ITag>> => {
    return client.get<never, Array<ITag>>(TAGS_ENDPOINT);
  };

  const createNewTag = (tag: INewTag): Promise<ITag> => {
    return client.post<never, ITag>(TAGS_ENDPOINT, tag);
  };

  const deleteTag = (id: string): Promise<ITag> => {
    return client.delete<never, ITag>(`${TAGS_ENDPOINT}/${id}`);
  };

  const fetchAllMyTeams = (): Promise<Array<Team>> => {
    return client.get<never, Array<Team>>(TEAMS_ENDPOINT);
  };

  const createNewTeam = (team: NewTeam): Promise<Team> => {
    return client.post<never, Team>(TEAMS_ENDPOINT, team);
  };

  const fetchTeamById = (id: string): Promise<TeamDetail> => {
    return client.get<never, TeamDetail>(`${TEAMS_ENDPOINT}/${id}`);
  };

  return {
    fetchMyProfile,
    postRegistration,
    deactivateProfile,
    fetchAllTags,
    createNewTag,
    deleteTag,
    fetchAllMyTeams,
    createNewTeam,
    fetchTeamById,
  };
};
