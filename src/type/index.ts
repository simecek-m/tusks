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

export interface ThemedColor {
  light: string;
  dark: string;
}

export interface INewTag {
  label: string;
  color: ThemedColor;
}

export interface ITag extends INewTag {
  id: string;
  owner: string;
}

export type Todo = {
  isCompleted: boolean;
  label: string;
};

export type ModalState = {
  isOpen: boolean;
  onClose: () => void;
};

export type NewTeam = {
  name: string;
  description: string;
  icon: string;
  color: ThemedColor;
};

export type Team = NewTeam & {
  members: Array<TeamMember>;
};

export type TeamMember = {
  user: string;
  role: Role;
  pending: boolean;
};

// type values
export const AVAILABLE_MEMEBR_ROLES = [
  "owner",
  "admin",
  "editor",
  "viewer",
] as const;

export type Role = (typeof AVAILABLE_MEMEBR_ROLES)[number];
