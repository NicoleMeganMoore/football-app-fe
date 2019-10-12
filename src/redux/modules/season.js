import _get from "lodash/get";
import moment from "moment";

import { mySportsFeedRequest } from "../../js/mySportsFeedService";
// import * as fromRoot from "../rootReducer";

export const FETCH_SEASON_DETAILS = "FETCH_SEASON_DETAILS";
export const FETCH_SEASON_DETAILS_SUCCESS = "FETCH_SEASON_DETAILS_SUCCESS";
export const FETCH_SEASON_DETAILS_FAILURE = "FETCH_SEASON_DETAILS_FAILURE";

export const FETCH_SEASON_SCHEDULE = "FETCH_SEASON_SCHEDULE";
export const FETCH_SEASON_SCHEDULE_SUCCESS = "FETCH_SEASON_SCHEDULE_SUCCESS";
export const FETCH_SEASON_SCHEDULE_FAILURE = "FETCH_SEASON_SCHEDULE_FAILURE";

export const fetchSeasonDetails = () => async (dispatch, getState) => {
  // dispatch({ type: FETCH_SEASON_DETAILS });
  // const todaysDate = moment().format("YYYYMMDD");

  // try {
  //   const seasonResponse = await mySportsFeedRequest(
  //     `https://api.mysportsfeeds.com/v1.2/pull/nfl/current_season.json?fordate=${todaysDate}`,
  //     1
  //   );
  //   const seasonDetails = _get(
  //     seasonResponse,
  //     "data.currentseason.season[0].details"
  //   );
  //   dispatch({ type: FETCH_SEASON_DETAILS_SUCCESS, payload: seasonDetails });
  // const seasonStartTuesday = moment(seasonDetails.startDate).subtract(2, "d");
  // const currentWeek = moment().diff(seasonStartTuesday, "week") + 1;

  // const weekGamesResponse = await mySportsFeedRequest(
  //   `https://api.mysportsfeeds.com/v2.1/pull/nfl/current/week/${currentWeek}/games.json`,
  //   2
  // );

  // const weekGames = _get(weekGamesResponse, "data.games");
  // console.log("array of game ids");
  // const gameIds = weekGames.map(game => {
  //   return _get(game, "schedule.id");
  // });

  // const playerResponse = await mySportsFeedRequest(
  //   "https://api.mysportsfeeds.com/v2.1/pull/nfl/players.json?rosterstatus=assigned-to-roster&position=QB,RB,WR,TE",
  //   2
  // );

  // const statAbbrvs =
  //   "Yds,Sacks,Int,Rec,Fum,2PTMade,2PTPassMade,2PTPassRec,2PTRushMade";
  // const playerStatsResponse = await mySportsFeedRequest(
  //   `https://api.mysportsfeeds.com/v2.1/pull/nfl/2019-regular/player_stats_totals.json?position=QB,RB,WR,TE`,
  //   2
  // );

  // const customPlayerArray = _get(
  //   playerStatsResponse,
  //   "data.playerStatsTotals"
  // ).map(player => {
  //   const playerInfo = player.player;
  //   const playerStats = player.stats;
  //   return {
  //     id: _get(playerInfo, "id"),
  //     first_name: _get(playerInfo, "firstName"),
  //     last_name: _get(playerInfo, "lastName"),
  //     image_url: _get(playerInfo, "officialImageSrc"),
  //     position: _get(playerInfo, "primaryPosition"),
  //     team_abbrv: _get(playerInfo, "currentTeam.abbreviation"),
  //     team_id: _get(playerInfo, "currentTeam.id"),
  //     stats: {
  //       season_passYards: _get(playerStats, "passing.passYards"),
  //       season_passTD: _get(playerStats, "passing.passTD"),
  //       season_passInt: _get(playerStats, "passing.passInt"),
  //       season_rushYards: _get(playerStats, "rushing.rushYards"),
  //       season_rushTD: _get(playerStats, "rushing.rushTD"),
  //       season_recYards: _get(playerStats, "receiving.recYards"),
  //       season_recTD: _get(playerStats, "receiving.recTD"),
  //       season_krTD: _get(playerStats, "kickoffReturns.krTD"),
  //       season_prTD: _get(playerStats, "puntReturns.prTD"),
  //       season_twoPtMade: _get(playerStats, "twoPointAttempts.twoPtMade"),
  //       season_twoPtPassMade: _get(
  //         playerStats,
  //         "twoPointAttempts.twoPtPassMade"
  //       ),
  //       season_twoPtPassRec: _get(
  //         playerStats,
  //         "twoPointAttempts.twoPtPassRec"
  //       ),
  //       season_twoPtRushMade: _get(
  //         playerStats,
  //         "twoPointAttempts.twoPtRushMade"
  //       ),
  //       season_fumble: _get(playerStats, "fumbles.fumbles"),
  //       season_receptions: _get(playerStats, "receiving.receptions")
  //     }
  //   };
  // });

  // console.log(customPlayerArray);
  //   current_passYards: Int
  //   current_passTD: Int
  //   current_passInt: Int
  //   current_rushYards: Int
  //   current_rushTD: Int
  //   current_recYards: Int
  //   current_recTD: Int
  //   current_krTD: Int
  //   current_prTD: Int
  //   current_twoPtMade: Int
  //   current_twoPtPassMade: Int
  //   current_twoPtPassRec: Int
  //   current_twoPtRushMade: Int
  //   current_fumble: Int
  //   current_receptions: Int

  // ?stats=${statAbbrvs}

  // "passing": {
  //   "passYards": 134, // Yds
  //   "passSacks": 3, // Sacks
  //   "passInt": 0, // Int
  // },
  // "rushing": {
  //   "rushYards": 60, // Yds
  // },
  // "receiving": {
  //   "receptions": 0, // Rec
  //   "recYards": 0, // Yds
  // },
  // "fumbles": {
  //   "fumbles": 1, // Fum
  // },
  // "twoPointAttempts": {
  //   "twoPtMade": 0, // 2PTMade
  //   "twoPtPassMade": 0, // 2PTPassMade
  //   "twoPtPassRec": 0, // 2PTPassRec
  //   "twoPtRushMade": 0 // 2PTRushMade
  // }
  // }

  // const playerIds = playerResponse.data.players.map(player => {
  //   return player.player.id;
  // });

  // let playerIdsString = "";
  // playerIds.forEach((playerId, i) => {
  //   playerIdsString = playerIdsString.concat(
  //     `${playerId}${i !== playerIds.length - 1 ? "," : ""}`
  //   );
  // });

  // console.log(playerIdsString);
  // const playerStatsResponse = await mySportsFeedRequest(
  //   `https://api.mysportsfeeds.com/v2.1/pull/nfl/current/player_stats_totals.json?players=${playerIdsString}`,
  //   2
  // );

  return Promise.resolve();
  // } catch (error) {
  //   console.log("SOMETHING WENT WRONG");
  //   console.log(error);
  //   dispatch({ type: FETCH_SEASON_DETAILS_FAILURE });
  // }
};

export const fetchSeasonSchedule = () => (dispatch, getState) => {
  dispatch({ type: FETCH_SEASON_SCHEDULE });
  // axiosInstance
  //   .get(
  //     "https://api.mysportsfeeds.com/v1.2/pull/nfl/current/full_game_schedule.json"
  //   )
  //   .then(response => {
  //   })
  //   .catch(error => {
  //   });
  // axiosInstance
  //   .get(
  //     "https://api.mysportsfeeds.com/v1.2/pull/nfl/2019-regular/active_players.json"
  //   )
  //   .then(response => {
  //   })
  //   .catch(error => {
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
      const nextDraftDay = moment()
        .day(2 + 7)
        // .tz("America/New_York")
        .startOf("day");
      // .unix();

      return {
        ...state,
        isDraftDay,
        nextDraftDay,
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
export const getNextDraftDay = state => state.nextDraftDay;
export const getIsFetchingSeasonDetails = state =>
  state.getIsFetchingSeasonDetails;
