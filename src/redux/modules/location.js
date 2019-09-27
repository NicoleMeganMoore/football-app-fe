import { REHYDRATE } from "redux-persist";
import { LOCATION_CHANGE, push } from "react-router-redux";

export const SET_ACTIVE_PAGE = "SET_ACTIVE_PAGE";

export const setActivePage = page => dispatch => {
  dispatch({ type: SET_ACTIVE_PAGE, payload: page });
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

export const navigateToTeams = () => dispatch => {
  dispatch(push("/teams"));
};

export const navigateToPlayers = () => dispatch => {
  dispatch(push("/players"));
};

export const navigateToProfile = () => dispatch => {
  dispatch(push("/profile"));
};

const defaultState = {
  activePage: "dashboard",
  location: null
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_ACTIVE_PAGE: {
      return {
        ...state,
        activePage: action.payload
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
      // const incoming = action.payload ? action.payload.location : undefined;
      // if (incoming) {
      //   return { ...state.location, ...incoming };
      // }
      return state;
    }

    default:
      return state;
  }
};

export const getLocation = state => state.location;
export const getActivePage = state => state.activePage;
