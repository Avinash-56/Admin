import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_USERS,
  LOGOUT,
  DELETE_USER

} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  user: null,
  isAuthenticated: null,
  users: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
      };
      
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:  
      localStorage.removeItem("token");
      return {
        ...state,
        user:null,
        users:[],
        token: null,
        isAuthenticated: false,
      };
      case DELETE_USER:
        return {
          ...state,
          users: state.users.filter(user => user._id !== payload)
        };
    case LOAD_USERS:
      return {
        ...state,
        users: payload
      } 

    default:
      return state;
  }
}
