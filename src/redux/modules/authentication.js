import { REHYDRATE } from "redux-persist";
import { LOCATION_CHANGE, push } from "react-router-redux";
// import { push } from "react-router-redux";
// import { routerReducer } from "react-router-redux";

import axios from "axios";
import _ from "lodash";

export const CREATE_USER = "CREATE_USER";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const CREATE_USER_FAILURE = "CREATE_USER_FAILURE";

export const SIGN_IN_USER = "SIGN_IN_USER";
export const SIGN_IN_USER_SUCCESS = "SIGN_IN_USER_SUCCESS";
export const SIGN_IN_USER_FAILURE = "SIGN_IN_USER_FAILURE";

export const SIGN_OUT_USER = "SIGN_OUT_USER";

export const NAVIGATE_TO_DASHBOARD = "NAVIGATE_TO_DASHBOARD";
export const NAVIGATE_TO_LOGIN = "NAVIGATE_TO_LOGIN";

export const CLEAR_TOKEN = "CLEAR_TOKEN";

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

export const clearToken = () => (dispatch, getState) => {
  dispatch({ type: CLEAR_TOKEN });
};

export const signOutUser = () => (dispatch, getState) => {
  dispatch({ type: SIGN_OUT_USER });
  dispatch(clearToken());
  dispatch(navigateToLogin());
};

export const navigateToLogin = () => dispatch => {
  dispatch(push("/login"));
};

export const navigateToDashboard = () => dispatch => {
  dispatch(push("/dashboard"));
};

export const navigateToRegister = () => dispatch => {
  dispatch(push("/register"));
};

export const createUser = (
  firstName,
  lastName,
  email,
  password
) => async dispatch => {
  dispatch({ type: CREATE_USER });

  const axiosInstance = axios.create({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });

  const requestBody = {
    query: `
      mutation {
        createUser(userInput: { first_name: "${firstName}", last_name: "${lastName}", email: "${email}", password: "${password}"}) {
          id
          first_name
          last_name
          email
        }
      }
    `
  };

  try {
    const response = await axiosInstance.post(
      "http://localhost:8080/graphql",
      JSON.stringify(requestBody)
    );

    dispatch({
      type: CREATE_USER_SUCCESS,
      payload: _.get(response, "data.data.createUser")
    });

    if (_.get(response, "data.errors")) {
      return Promise.reject(_.get(response, "data.errors[0].message"));
    }

    return Promise.resolve();
  } catch (err) {
    dispatch({ type: CREATE_USER_FAILURE });
    return Promise.reject();
  }
};

const defaultState = {
  token: null,
  location: null,
  isSigningInUser: false,
  isCreatingUser: false
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
        isAuthenticated: false
      };
    }

    case CREATE_USER: {
      return {
        ...state,
        isCreatingUser: true
      };
    }

    case CREATE_USER_SUCCESS: {
      return {
        ...state,
        isCreatingUser: false,
        user: action.payload
      };
    }

    case CREATE_USER_FAILURE: {
      return {
        ...state,
        isCreatingUser: false
      };
    }

    case CLEAR_TOKEN: {
      return {
        ...state,
        token: null
      };
    }

    case LOCATION_CHANGE: {
      const { pathname } = action.payload;
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
export const getIsSigningIn = state => state.isSigningInUser;
export const getIsCreatingUser = state => state.getIsCreatingUser;
