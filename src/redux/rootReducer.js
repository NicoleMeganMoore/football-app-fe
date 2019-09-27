import storage from "redux-persist/lib/storage";

// import createCompressor from "redux-persist-transform-compress";

import { persistCombineReducers } from "redux-persist";
import { routerReducer } from "react-router-redux";

import authenticationReducer, * as fromAuthentication from "./modules/authentication";
import locationReducer, * as fromLocation from "./modules/location";
import userReducer, * as fromUser from "./modules/user";

const appReducer = persistCombineReducers(
  {
    blacklist: ["location", "router"],
    key: "primary",
    storage
  },
  {
    authentication: authenticationReducer,
    location: locationReducer,
    router: routerReducer,
    user: userReducer
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
      location: locationReducer,
      authentication: undefined,
      user: undefined
    };
  }
  return appReducer(state, action);
};

// AUTHENTICATION
export const getToken = state =>
  fromAuthentication.getToken(state.authentication);
export const getIsAuthenticated = state =>
  fromAuthentication.getIsAuthenticated(state.authentication);
export const getIsSigningIn = state =>
  fromAuthentication.getIsSigningIn(state.authentication);
export const getIsCreatingUser = state =>
  fromAuthentication.getIsCreatingUser(state.authentication);

// LOCATION
export const getLocation = state => fromLocation.getLocation(state.location);

// USER
export const getLeagues = state => fromUser.getLeagues(state.user);
export const getIsFetchingLeagues = state =>
  fromUser.getIsFetchingLeagues(state.user);
export const getIsCreatingLeague = state =>
  fromUser.getIsCreatingLeague(state.user);
