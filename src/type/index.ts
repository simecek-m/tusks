import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface IProfile {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  picture: string;
}

export interface IUserProfileContext {
  profile?: IProfile;
  setProfile: (profile: IProfile) => void;
}

export interface IMenuListItem {
  icon: IconProp;
  text: string;
  onClick: () => void;
}

export type ActionType = "primary" | "error";

export interface IColor {
  light: string;
  dark: string;
}

export interface INewTag {
  label: string;
  color: IColor;
}

export interface ITag extends INewTag {
  id: string;
  owner: string;
}

export type Todo = {
  isCompleted: boolean;
  label: string;
};
