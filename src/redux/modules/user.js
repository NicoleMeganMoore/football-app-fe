import { REHYDRATE } from "redux-persist";
import _get from "lodash/get";

import { graphqlRequest } from "../../js/graphqlService";
import * as fromRoot from "../rootReducer";

export const FETCH_USER_DETAILS = "FETCH_USER_DETAILS";
export const FETCH_USER_DETAILS_SUCCESS = "FETCH_USER_DETAILS_SUCCESS";
export const FETCH_USER_DETAILS_FAILURE = "FETCH_USER_DETAILS_FAILURE";

export const CREATE_LEAGUE = "CREATE_LEAGUE";
export const CREATE_LEAGUE_SUCCESS = "CREATE_LEAGUE_SUCCESS";
export const CREATE_LEAGUE_FAILURE = "CREATE_LEAGUE_FAILURE";

export const FETCH_LEAGUES = "FETCH_LEAGUES";
export const FETCH_LEAGUES_SUCCESS = "FETCH_LEAGUES_SUCCESS";
export const FETCH_LEAGUES_FAILURE = "FETCH_LEAGUES_FAILURE";

export const FETCH_LEAGUE = "FETCH_LEAGUE";
export const FETCH_LEAGUE_SUCCESS = "FETCH_LEAGUE_SUCCESS";
export const FETCH_LEAGUE_FAILURE = "FETCH_LEAGUE_FAILURE";

export const fetchUserDetails = () => async (dispatch, getState) => {
  dispatch({ type: FETCH_USER_DETAILS });

  const state = getState();
  const { accessToken } = fromRoot.getTokens(state);

  const query = `
    query {
      user {
        id
        first_name
        last_name
        email
        leagues {
          id
          league_name
          user_list { id first_name last_name email }
          opponent
          settings {
            pts_per_passing_yd
            pts_per_passing_td
            pts_per_passing_int
            pts_per_rushing_yd
            pts_per_rushing_td
            pts_per_receiving_yd
            pts_per_receiving_td
            pts_per_return_td
            pts_per_two_pt_conversion
            pts_per_fumble
            pts_per_reception
          }
        }
      }
    }
  `;

  try {
    const response = await graphqlRequest(query, accessToken);
    dispatch({
      type: FETCH_USER_DETAILS_SUCCESS,
      payload: _get(response, "user")
    });
    return response;
  } catch (err) {
    dispatch({ type: FETCH_USER_DETAILS_FAILURE });
    return err;
  }
};

export const fetchLeagues = () => (dispatch, getState) => {
  dispatch({ type: FETCH_LEAGUES });

  const state = getState();
  const { accessToken } = fromRoot.getTokens(state);

  const query = `
    query {
      leagues {
        _id
        id
        league_name
        user_list { id first_name last_name email }
        opponent
        settings {
          pts_per_passing_yd
          pts_per_passing_td
          pts_per_passing_int
          pts_per_rushing_yd
          pts_per_rushing_td
          pts_per_receiving_yd
          pts_per_receiving_td
          pts_per_return_td
          pts_per_two_pt_conversion
          pts_per_fumble
          pts_per_reception
        }
      }
    }
  `;

  return graphqlRequest(query, accessToken)
    .then(response => {
      dispatch({
        type: FETCH_LEAGUES_SUCCESS,
        payload: _get(response, "leagues")
      });
      return Promise.resolve(response);
    })
    .catch(err => {
      dispatch({ FETCH_LEAGUES_FAILURE });
      return Promise.reject(err);
    });
};

export const fetchLeagueById = id => dispatch => {
  dispatch({ type: FETCH_LEAGUE });

  const query = `
    query {
      league(league_id: "${id}") {
        league_name
        user_list { id first_name last_name email }
        opponent
      }
    }
  `;

  return graphqlRequest(query)
    .then(response => {
      dispatch({
        type: FETCH_LEAGUE_SUCCESS,
        payload: _get(response, "league")
      });
      return Promise.resolve(response);
    })
    .catch(err => {
      dispatch({ FETCH_LEAGUE_FAILURE });
      return Promise.reject(err);
    });
};

export const createLeague = () => async (dispatch, getState) => {
  dispatch({ type: CREATE_LEAGUE });

  const state = getState();
  const { accessToken } = fromRoot.getTokens(state);

  const query = `
    mutation {
      createLeague(leagueInput: { opponent: "nicolemcrawford@shaw.ca" }) {
        _id
        id
        league_name
        user_list { id first_name last_name email }
        opponent
        settings {
          pts_per_passing_yd
          pts_per_passing_td
          pts_per_passing_int
          pts_per_rushing_yd
          pts_per_rushing_td
          pts_per_receiving_yd
          pts_per_receiving_td
          pts_per_return_td
          pts_per_two_pt_conversion
          pts_per_fumble
          pts_per_reception
        }
      }
    }
  `;

  try {
    const response = await graphqlRequest(query, accessToken);
    dispatch({
      type: CREATE_LEAGUE_SUCCESS,
      payload: _get(response, "createLeague")
    });
    return response;
  } catch (err) {
    dispatch({ CREATE_LEAGUE_FAILURE });
    return err;
  }
};

const defaultState = {
  leagues: [],
  isCreatingLeague: false,
  isFetchingLeagues: false,
  inviteLeague: null
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_USER_DETAILS: {
      return {
        ...state,
        isFetchingUserDetails: true
      };
    }

    case FETCH_USER_DETAILS_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isFetchingUserDetails: false
      };
    }

    case FETCH_USER_DETAILS_FAILURE: {
      return {
        ...state,
        isFetchingUserDetails: false
      };
    }

    case FETCH_LEAGUES: {
      return {
        ...state,
        isFetchingLeagues: true
      };
    }

    case FETCH_LEAGUES_SUCCESS: {
      return {
        ...state,
        leagues: action.payload,
        isFetchingLeagues: false
      };
    }

    case FETCH_LEAGUES_FAILURE: {
      return {
        ...state,
        isFetchingLeagues: false
      };
    }

    case FETCH_LEAGUE: {
      return {
        ...state,
        isFetchingLeague: true
      };
    }

    case FETCH_LEAGUE_SUCCESS: {
      return {
        ...state,
        inviteLeague: action.payload,
        isFetchingLeague: false
      };
    }

    case FETCH_LEAGUE_FAILURE: {
      return {
        ...state,
        isFetchingLeague: false
      };
    }

    case CREATE_LEAGUE: {
      return {
        ...state,
        isCreatingLeague: true
      };
    }

    case CREATE_LEAGUE_SUCCESS: {
      const newLeagues = [...state.leagues, action.payload];
      return {
        ...state,
        leagues: newLeagues,
        isCreatingLeague: false
      };
    }

    case CREATE_LEAGUE_FAILURE: {
      return {
        ...state,
        isCreatingLeague: false
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

export const getLeagues = state => state.leagues;
export const getIsCreatingLeague = state => state.isCreatingLeague;
export const getIsFetchingLeagues = state => state.isFetchingLeagues;
