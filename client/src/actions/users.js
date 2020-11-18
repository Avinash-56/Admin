import axios from "axios";
import { LOGIN_SUCCESS, LOGIN_FAIL, LOAD_USER, AUTH_ERROR, DELETE_USER, LOAD_USERS, REGISTER_SUCCESS, REGISTER_FAIL, LOGOUT} from './types'
import {setAlert} from './alert'
import setAuthToken from '../utils/setAuthToken'

export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get("/api/users/me");

  
      dispatch({ type: LOAD_USER, payload: res.data });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };

export const loadAllUsers = ()=>async dispatch =>{
    try {
        const res = await axios.get("/api/users")
        dispatch({
            type: LOAD_USERS,
            payload: res.data
        })   


    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
    }
    

}
  


export const login = (email, password) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    const body = JSON.stringify({ email, password });
  
    try {
      const res = await axios.post("/api/users", body, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());
      dispatch(loadAllUsers())
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
  
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

  export const register = ({ name, email, password }) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    const body = JSON.stringify({ name, email, password });
  
    try {
      console.log(body)  
      const res = await axios.post("/api/users/register", body, config);
      console.log(res.data)
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
      dispatch(loadAllUsers())
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
  
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

  export const deleteUser = (id) =>async (dispatch)=>{
      try {
        await axios.delete(`/api/users/${id}`) 

        dispatch({
            type: DELETE_USER,
            payload: id
        })
        
      } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
          errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
      }
  }
  
  
  export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT });
  };