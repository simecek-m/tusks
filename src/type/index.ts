export interface IProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  picture: string;
}

export interface IUserProfileContext {
  profile: IProfile | undefined;
}
