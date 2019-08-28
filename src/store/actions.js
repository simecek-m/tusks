export const ACTION_TYPE_LOGIN = "ACTION_TYPE_LOGIN";
export const ACTION_TYPE_LOGOUT = "ACTION_TYPE_LOGOUT";

export function login (user) {
  return {
    type: ACTION_TYPE_LOGIN,
    payload: user
  }
};

export function logout () {
  return{
    type: ACTION_TYPE_LOGOUT
  }
};
