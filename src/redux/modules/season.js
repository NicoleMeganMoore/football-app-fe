import { REHYDRATE } from "redux-persist";
import _get from "lodash/get";
import moment from "moment";

import { mySportsFeedRequest } from "../../js/mySportsFeedService";
import * as fromRoot from "../rootReducer";

export const FETCH_SEASON_DETAILS = "FETCH_SEASON_DETAILS";
export const FETCH_SEASON_DETAILS_SUCCESS = "FETCH_SEASON_DETAILS_SUCCESS";
export const FETCH_SEASON_DETAILS_FAILURE = "FETCH_SEASON_DETAILS_FAILURE";

export const FETCH_SEASON_SCHEDULE = "FETCH_SEASON_SCHEDULE";
export const FETCH_SEASON_SCHEDULE_SUCCESS = "FETCH_SEASON_SCHEDULE_SUCCESS";
export const FETCH_SEASON_SCHEDULE_FAILURE = "FETCH_SEASON_SCHEDULE_FAILURE";

export const fetchSeasonDetails = () => (dispatch, getState) => {
  dispatch({ type: FETCH_SEASON_DETAILS });
  const todaysDate = moment().format("YYYYMMDD");

  return mySportsFeedRequest(
    `https://api.mysportsfeeds.com/v1.2/pull/nfl/current_season.json?fordate=${todaysDate}`
  )
    .then(response => {
      const seasonDetails = _get(
        response,
        "data.currentseason.season[0].details"
      );

      dispatch({ type: FETCH_SEASON_DETAILS_SUCCESS, payload: seasonDetails });
      return Promise.resolve();
    })
    .catch(error => {
      dispatch({ type: FETCH_SEASON_DETAILS_FAILURE });
      return Promise.reject();
    });
};

export const fetchSeasonSchedule = () => (dispatch, getState) => {
  dispatch({ type: FETCH_SEASON_SCHEDULE });

  // axiosInstance
  //   .get(
  //     "https://api.mysportsfeeds.com/v1.2/pull/nfl/current/full_game_schedule.json"
  //   )
  //   .then(response => {
  //     console.log(response);
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
};

const defaultState = {
  activeWeek: undefined,
  seasonStart: undefined,
  seasonEnd: undefined
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_SEASON_DETAILS: {
      return {
        ...state,
        isFetchingSeasonDetails: true
      };
    }

    case FETCH_SEASON_DETAILS_SUCCESS: {
      const seasonDetails = action.payload;
      const seasonStartTuesday = moment(seasonDetails.startDate).subtract(
        2,
        "d"
      );
      const currentWeek = moment().diff(seasonStartTuesday, "week") + 1;

      const isDraftDay = moment().weekday() === 2 || moment().weekday() === 3;

      return {
        ...state,
        isDraftDay,
        currentWeek,
        seasonStart: seasonDetails.startDate,
        seasonEnd: seasonDetails.endDate,
        intervalType: seasonDetails.intervalType,
        seasonDisplayName: seasonDetails.name,
        seasonSlugName: seasonDetails.slug,
        isFetchingSeasonDetails: false
      };
    }

    case FETCH_SEASON_DETAILS_FAILURE: {
      return {
        ...state,
        isFetchingSeasonDetails: false
      };
    }
    // case REHYDRATE: {
    //   const incoming = action.payload ? action.payload.user : undefined;
    //   if (incoming) {
    //     return { ...state.user, ...incoming };
    //   }
    //   return state;
    // }

    default:
      return state;
  }
};

export const getCurrentWeek = state => state.currentWeek;
export const getIsDraftDay = state => state.isDraftDay;
