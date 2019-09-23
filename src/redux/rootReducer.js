import storage from "redux-persist/lib/storage";

// import createCompressor from "redux-persist-transform-compress";

import { persistCombineReducers } from "redux-persist";
import { routerReducer } from "react-router-redux";

import authenticationReducer, * as fromAuthentication from "./modules/authentication";

const appReducer = persistCombineReducers(
  {
    blacklist: ["location", "router"],
    key: "primary",
    storage
  },
  {
    authentication: authenticationReducer,
    router: routerReducer
  }
);

export default (state, action) => {
  if (
    [
      fromAuthentication.SIGN_OUT_USER,
      fromAuthentication.SIGN_IN_USER
    ].includes(action.type)
  ) {
    // eslint-disable-next-line no-param-reassign
    state = {
      ...state,
      // location      : locationReducer,
      authentication: undefined
    };
  }
  return appReducer(state, action);
};

export const getIsAuthenticated = state =>
  fromAuthentication.getIsAuthenticated(state.authentication);
