import { LOCATION_CHANGE, push } from "react-router-redux";

export const SET_ACTIVE_PAGE = "SET_ACTIVE_PAGE";

export const navigateToLogin = () => dispatch => {
  dispatch(push("/login"));
};

export const navigateToDashboard = () => dispatch => {
  dispatch(push("/dashboard"));
};

export const navigateToRegister = () => dispatch => {
  dispatch(push("/register"));
};

export const navigateToLeagues = () => dispatch => {
  dispatch(push("/leagues"));
};

export const navigateToPlayers = () => dispatch => {
  dispatch(push("/players"));
};

export const navigateToDraft = () => dispatch => {
  dispatch(push("/draft"));
};

export const navigateToProfile = () => dispatch => {
  dispatch(push("/profile"));
};

const defaultState = {
  location: null
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case LOCATION_CHANGE: {
      const { pathname } = action.payload;
      return {
        ...state,
        location: pathname
      };
    }

    default:
      return state;
  }
};

export const getLocation = state => state.location;
