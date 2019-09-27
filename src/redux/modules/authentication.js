import { REHYDRATE } from "redux-persist";

import _get from "lodash/get";

import { graphqlRequest } from "../../js/graphqlService";

import { navigateToLogin } from "./location";

// import * as fromRoot from "../rootReducer";

export const CREATE_USER = "CREATE_USER";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const CREATE_USER_FAILURE = "CREATE_USER_FAILURE";

export const SIGN_IN_USER = "SIGN_IN_USER";
export const SIGN_IN_USER_SUCCESS = "SIGN_IN_USER_SUCCESS";
export const SIGN_IN_USER_FAILURE = "SIGN_IN_USER_FAILURE";

export const SIGN_OUT_USER = "SIGN_OUT_USER";

export const CLEAR_TOKEN = "CLEAR_TOKEN";

export const clearToken = () => dispatch => {
  dispatch({ type: CLEAR_TOKEN });
};

export const signInUser = (email, password) => async dispatch => {
  dispatch({ type: SIGN_IN_USER, payload: { email, password } });

  const query = `
    query {
      login(email: "${email}", password: "${password}") {
        userId
        token
        tokenExpiration
      }
    }
  `;
  try {
    const response = await graphqlRequest(query);
    dispatch({
      type: SIGN_IN_USER_SUCCESS,
      payload: _get(response, "login.token")
    });
    return Promise.resolve();
  } catch (err) {
    dispatch({ type: SIGN_IN_USER_FAILURE });
    return Promise.reject(err);
  }
};

export const signOutUser = () => (dispatch, getState) => {
  dispatch({ type: SIGN_OUT_USER });
  dispatch(clearToken());
  dispatch(navigateToLogin());
};

export const createUser = (
  firstName,
  lastName,
  email,
  password
) => dispatch => {
  dispatch({ type: CREATE_USER });

  const query = `
    mutation {
      createUser(userInput: { first_name: "${firstName}", last_name: "${lastName}", email: "${email}", password: "${password}"}) {
        id
        first_name
        last_name
        email
      }
    }
  `;

  return graphqlRequest(query)
    .then(response => {
      dispatch({
        type: CREATE_USER_SUCCESS,
        payload: _get(response, "createUser")
      });
      return Promise.resolve();
    })
    .catch(err => {
      dispatch({ type: CREATE_USER_FAILURE });
      return Promise.reject(err);
    });
};

const defaultState = {
  isAuthenticated: false,
  token: null,
  isSigningInUser: false,
  isCreatingUser: false
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SIGN_IN_USER: {
      return {
        ...state,
        isAuthenticated: false,
        isSigningInUser: true
      };
    }

    case SIGN_IN_USER_SUCCESS: {
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        isSigningInUser: false
      };
    }

    case SIGN_IN_USER_FAILURE: {
      return {
        ...state,
        token: undefined,
        isAuthenticated: false,
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

    case REHYDRATE: {
      const incoming = action.payload
        ? action.payload.authentication
        : undefined;

      if (incoming) {
        return { ...state.authentication, ...incoming };
      }
      return state;
    }

    default:
      return state;
  }
};

export const getToken = state => state.token;
export const getIsAuthenticated = state => state.isAuthenticated;
export const getIsSigningIn = state => state.isSigningInUser;
export const getIsCreatingUser = state => state.getIsCreatingUser;
