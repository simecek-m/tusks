import {
  ACTION_TYPE_LOGIN,
  ACTION_TYPE_LOGOUT,
  ACTION_TYPE_LOCALE,
  ACTION_SWITCH_THEME
} from "store/actions";

import { DEFAULT_LOCALE } from "conf";

export const initialState = {
  user: null,
  locale: DEFAULT_LOCALE,
  theme: "light"
};

function reducer(state = initialState, action) {
  console.log(`new action: ${action.type}`);
  switch (action.type) {
    case ACTION_TYPE_LOGIN:
      return {
        ...state,
        user: action.payload
      };
    case ACTION_TYPE_LOGOUT:
      return {
        ...state,
        locale: DEFAULT_LOCALE,
        user: null
      };
    case ACTION_TYPE_LOCALE:
      return {
        ...state,
        locale: action.payload
      };
    case ACTION_SWITCH_THEME:
      const theme = switchTheme(state.theme);
      return {
        ...state,
        theme: theme
      };
    default:
      return state;
  }
}

function switchTheme(theme) {
  switch (theme) {
    case "light":
      return "dark";
    default:
      return "light";
  }
}

export default reducer;
