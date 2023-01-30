export interface IProfile {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  picture: string;
}

export interface IUserProfileContext {
  profile: IProfile | undefined;
}
