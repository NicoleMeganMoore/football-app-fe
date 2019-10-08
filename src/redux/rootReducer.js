import storage from "redux-persist/lib/storage";

// import createCompressor from "redux-persist-transform-compress";

import { persistCombineReducers } from "redux-persist";
import { routerReducer } from "react-router-redux";

import authenticationReducer, * as fromAuthentication from "./modules/authentication";
import locationReducer, * as fromLocation from "./modules/location";
import seasonReducer, * as fromSeason from "./modules/season";
import userReducer, * as fromUser from "./modules/user";

const appReducer = persistCombineReducers(
  {
    blacklist: [
      // "authentication",
      "location",
      "router"
      // "user"
    ],
    key: "primary",
    storage
  },
  {
    authentication: authenticationReducer,
    location: locationReducer,
    season: seasonReducer,
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
      authentication: undefined,
      location: undefined,
      season: undefined,
      router: undefined,
      user: undefined
    };
  }
  return appReducer(state, action);
};

// AUTHENTICATION
export const getTokens = state =>
  fromAuthentication.getTokens(state.authentication);
export const getIsAuthenticated = state =>
  fromAuthentication.getIsAuthenticated(state.authentication);
export const getIsSigningIn = state =>
  fromAuthentication.getIsSigningIn(state.authentication);
export const getIsCreatingUser = state =>
  fromAuthentication.getIsCreatingUser(state.authentication);

// LOCATION
export const getLocation = state => fromLocation.getLocation(state.location);

// USER
export const getUser = state => fromUser.getUser(state.user);
export const getLeagues = state => fromUser.getLeagues(state.user);
// export const getIsFetchingLeagues = state =>
//   fromUser.getIsFetchingLeagues(state.user);
export const getIsFetchingUser = state =>
  fromUser.getIsFetchingUser(state.user);
export const getIsCreatingLeague = state =>
  fromUser.getIsCreatingLeague(state.user);

// SEASON
export const getCurrentWeek = state => fromSeason.getCurrentWeek(state.season);
export const getIsDraftDay = state => fromSeason.getIsDraftDay(state.season);
export const getNextDraftDay = state =>
  fromSeason.getNextDraftDay(state.season);
export const getIsFetchingSeasonDetails = state =>
  fromSeason.getIsFetchingSeasonDetails(state.season);
