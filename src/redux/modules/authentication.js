import { REHYDRATE } from "redux-persist";
import { LOCATION_CHANGE, push } from "react-router-redux";
// import { push } from "react-router-redux";
// import { routerReducer } from "react-router-redux";

import axios from "axios";
import _ from "lodash";

export const SIGN_IN_USER = "SIGN_IN_USER";
export const SIGN_IN_USER_SUCCESS = "SIGN_IN_USER_SUCCESS";
export const SIGN_IN_USER_FAILURE = "SIGN_IN_USER_FAILURE";

export const SIGN_OUT_USER = "SIGN_OUT_USER";

export const NAVIGATE_TO_DASHBOARD = "NAVIGATE_TO_DASHBOARD";
export const NAVIGATE_TO_LOGIN = "NAVIGATE_TO_LOGIN";

export const signInUser = (email, password) => async (dispatch, getState) => {
  dispatch({ type: SIGN_IN_USER, payload: { email, password } });

  try {
    const axiosInstance = axios.create({
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });

    const requestBody = {
      query: `
        query {
          login(email: "${email}", password: "${password}") {
            userId
            token
            tokenExpiration
          }
        }
      `
    };

    const response = await axiosInstance.post(
      "http://localhost:8080/graphql",
      JSON.stringify(requestBody)
    );

    return dispatch({
      type: SIGN_IN_USER_SUCCESS,
      payload: _.get(response, "data.data.login.token")
    });
  } catch (err) {
    dispatch({ type: "SIGN_IN_USER_FAILURE" });
    throw err;
  }
};

export const signOutUser = () => (dispatch, getState) => {
  dispatch({ type: "SIGN_OUT_USER" });
};

const defaultState = {
  token: null,
  location: null
};

export const navigateToLogin = pathname => dispatch => {
  dispatch({
    payload: pathname,
    type: NAVIGATE_TO_LOGIN
  });

  return;
};

export const navigateToDashboard = pathname => dispatch => {
  dispatch(push("/dashboard"));
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SIGN_IN_USER: {
      return {
        ...state,
        isSigningInUser: true
      };
    }

    case SIGN_IN_USER_SUCCESS: {
      const token = action.payload;
      return {
        ...state,
        token: token,
        isAuthenticated: true,
        isSigningInUser: false
      };
    }

    case SIGN_IN_USER_FAILURE: {
      return {
        ...state,
        isSigningInUser: false
      };
    }

    case SIGN_OUT_USER: {
      return {
        ...state,
        token: null,
        isAuthenticated: false
      };
    }

    // case CREATE_USER: {
    //   return state;
    // }

    // case CREATE_USER_SUCCESS: {
    //   return state;
    // }

    // case CREATE_USER_FAILURE: {
    //   return state;
    // }
    case LOCATION_CHANGE: {
      const { pathname } = action.payload;
      console.log("path changed to:");
      console.log(pathname);
      return {
        ...state,
        location: pathname
      };
    }

    case REHYDRATE: {
      const incoming = action.payload
        ? action.payload.authentication
        : undefined;
      if (incoming) {
        return { ...state, ...incoming };
      }
      return state;
    }

    default:
      return state;
  }
};

export const getIsAuthenticated = state => state.isAuthenticated;
