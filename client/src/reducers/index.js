import { combineReducers } from "redux";
import alert from './alert'
import user from './user'

// import auth from "./auth";


export default combineReducers({
    alert,
    user
});