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
  profile: IProfile | undefined;
}

export interface IMenuListItem {
  icon: IconProp;
  text: string;
  onClick: () => void;
}

export type ActionType = "primary" | "error";
