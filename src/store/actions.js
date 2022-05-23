export const ACTION_TYPE_LOGIN = "ACTION_TYPE_LOGIN";
export const ACTION_TYPE_LOGOUT = "ACTION_TYPE_LOGOUT";
export const ACTION_TYPE_LOCALE = "ACTION_TYPE_LOCALE";

export function login(user) {
  return {
    type: ACTION_TYPE_LOGIN,
    payload: user,
  };
}

export function logout() {
  return {
    type: ACTION_TYPE_LOGOUT,
  };
}

export function setLocale(locale) {
  return {
    type: ACTION_TYPE_LOCALE,
    payload: locale,
  };
}
