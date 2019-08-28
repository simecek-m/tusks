import { ACTION_TYPE_LOGIN, ACTION_TYPE_LOGOUT } from 'store/actions';

const initialState = {
  user: null
};

function reducer (state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPE_LOGIN:
      return {
        ...state,
        user: action.payload
      };
    case ACTION_TYPE_LOGOUT:
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
};

export default reducer;
