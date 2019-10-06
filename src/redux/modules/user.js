import { REHYDRATE } from "redux-persist";
import _get from "lodash/get";
import _filter from "lodash/filter";

import {
  graphqlRequest
  // graphqlSubscribe
} from "../../js/graphqlService";

import * as fromRoot from "../rootReducer";

export const FETCH_USER_DETAILS = "FETCH_USER_DETAILS";
export const FETCH_USER_DETAILS_SUCCESS = "FETCH_USER_DETAILS_SUCCESS";
export const FETCH_USER_DETAILS_FAILURE = "FETCH_USER_DETAILS_FAILURE";

export const CREATE_LEAGUE = "CREATE_LEAGUE";
export const CREATE_LEAGUE_SUCCESS = "CREATE_LEAGUE_SUCCESS";
export const CREATE_LEAGUE_FAILURE = "CREATE_LEAGUE_FAILURE";

export const FETCH_LEAGUE = "FETCH_LEAGUE";
export const FETCH_LEAGUE_SUCCESS = "FETCH_LEAGUE_SUCCESS";
export const FETCH_LEAGUE_FAILURE = "FETCH_LEAGUE_FAILURE";

export const ACCEPT_LEAGUE_INVITATION = "ACCEPT_LEAGUE_INVITATION";
export const ACCEPT_LEAGUE_INVITATION_SUCCESS =
  "ACCEPT_LEAGUE_INVITATION_SUCCESS";
export const ACCEPT_LEAGUE_INVITATION_FAILURE =
  "ACCEPT_LEAGUE_INVITATION_FAILURE";

export const CANCEL_LEAGUE_INVITATION = "CANCEL_LEAGUE_INVITATION";
export const CANCEL_LEAGUE_INVITATION_SUCCESS =
  "CANCEL_LEAGUE_INVITATION_SUCCESS";
export const CANCEL_LEAGUE_INVITATION_FAILURE =
  "CANCEL_LEAGUE_INVITATION_FAILURE";

export const subscribeToLeage = () => async (dispatch, getState) => {};

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
          matches { id week }
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

export const fetchLeagueById = id => (dispatch, getState) => {
  dispatch({ type: FETCH_LEAGUE });
  const state = getState();
  const { accessToken } = fromRoot.getTokens(state);

  const query = `
    query {
      league(league_id: "${id}") {
        league_name
        user_list { id first_name last_name email }
        opponent
      }
    }
  `;

  return graphqlRequest(query, accessToken)
    .then(response => {
      dispatch({
        type: FETCH_LEAGUE_SUCCESS,
        payload: _get(response, "league")
      });
      return Promise.resolve(_get(response, "league"));
    })
    .catch(err => {
      dispatch({ FETCH_LEAGUE_FAILURE });
      return Promise.reject(err);
    });
};

export const createLeague = args => async (dispatch, getState) => {
  dispatch({ type: CREATE_LEAGUE });

  const state = getState();
  const { accessToken } = fromRoot.getTokens(state);

  const query = `
    mutation {
      createLeague(leagueInput: {
        opponent: "${args.opponentValue}"
        pts_per_passing_yd: ${args.passing_yd}
        pts_per_passing_td: ${args.passing_td}
        pts_per_passing_int: ${args.passing_int}
        pts_per_rushing_yd: ${args.rushing_yd}
        pts_per_rushing_td: ${args.rushing_td}
        pts_per_receiving_yd: ${args.receiving_yd}
        pts_per_receiving_td: ${args.receiving_td}
        pts_per_return_td: ${args.return_td}
        pts_per_two_pt_conversion: ${args.two_pt_conversion}
        pts_per_fumble: ${args.fumble}
        pts_per_reception: ${args.reception}
      }) {
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
    return Promise.resolve(response);
  } catch (err) {
    dispatch({ type: CREATE_LEAGUE_FAILURE });
    return Promise.reject(err);
  }
};

export const cancelLeagueInvitation = leagueId => async (
  dispatch,
  getState
) => {
  dispatch({ type: CANCEL_LEAGUE_INVITATION });

  const state = getState();
  const { accessToken } = fromRoot.getTokens(state);

  const query = `
    mutation {
      cancelLeagueInvitation(leagueId: "${leagueId}")
    }
  `;

  try {
    const response = await graphqlRequest(query, accessToken);
    dispatch({
      type: CANCEL_LEAGUE_INVITATION_SUCCESS,
      payload: leagueId
    });
    return Promise.resolve(response);
  } catch (err) {
    dispatch({ type: CANCEL_LEAGUE_INVITATION_FAILURE });
    return Promise.reject(err);
  }
};

export const acceptLeagueInvitation = leagueId => async (
  dispatch,
  getState
) => {
  dispatch({ type: ACCEPT_LEAGUE_INVITATION });

  const state = getState();
  const { accessToken } = fromRoot.getTokens(state);

  const query = `
    mutation {
      addUserToLeague(leagueId: "${leagueId}") {
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
      type: ACCEPT_LEAGUE_INVITATION_SUCCESS,
      payload: _get(response, "addUserToLeague")
    });
    return response;
  } catch (err) {
    dispatch({ type: ACCEPT_LEAGUE_INVITATION_FAILURE });
    return err;
  }
};

const defaultState = {
  leagues: [],
  isCreatingLeague: false,
  isFetchingUser: false,
  inviteLeague: null
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_USER_DETAILS: {
      return {
        ...state,
        isFetchingUser: true
      };
    }

    case FETCH_USER_DETAILS_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isFetchingUser: false
      };
    }

    case FETCH_USER_DETAILS_FAILURE: {
      return {
        ...state,
        isFetchingUser: false
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

    case CANCEL_LEAGUE_INVITATION: {
      return {
        ...state,
        isCancellingLeagueInvitation: true
      };
    }

    case CANCEL_LEAGUE_INVITATION_SUCCESS: {
      const leagueId = action.payload;
      const newLeagues = _filter(
        state.leagues,
        league => league.id !== leagueId
      );
      return {
        ...state,
        leagues: newLeagues,
        isCancellingLeagueInvitation: false
      };
    }

    case CANCEL_LEAGUE_INVITATION_FAILURE: {
      return {
        ...state,
        isCancellingLeagueInvitation: false
      };
    }

    case REHYDRATE: {
      const incoming = action.payload ? action.payload.user : undefined;
      if (incoming) {
        return { ...state.user, ...incoming };
      }
      return state;
    }

    default:
      return state;
  }
};

export const getUser = state => ({
  email: state.email,
  firstName: state.first_name,
  lastName: state.last_name
});

export const getLeagues = state => state.leagues;
export const getIsCreatingLeague = state => state.isCreatingLeague;
export const getIsFetchingLeagues = state => state.isFetchingLeagues;
export const getIsFetchingUser = state => state.isFetchingUser;
