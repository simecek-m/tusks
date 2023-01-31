import { IProfile } from "type";
import * as yup from "yup";

export const PROFILE_SCHEMA: yup.SchemaOf<IProfile> = yup.object({
  email: yup.string().email().required(),
  firstName: yup.string().required(),
  id: yup.string().required(),
  lastName: yup.string().required(),
  picture: yup.string().required(),
  username: yup.string().required(),
});
