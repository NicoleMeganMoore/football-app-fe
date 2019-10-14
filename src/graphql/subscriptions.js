import gql from "graphql-tag";

export const DRAFT_UPDATED_SUBSCRIPTION = gql`
  subscription DraftUpdated($leagueId: Int!) {
    draftUpdated(leagueId: $leagueId) {
      _id
      id
      league_name
      user_list {
        id
        first_name
        last_name
        email
      }
      opponent
      draftStatus {
        draftInProgress
        firstPlayer {
          id
          first_name
          last_name
          email
        }
        nextTurn
        roundNumber
        activePlayer {
          id
          first_name
          last_name
          email
        }
        readyToDraft {
          id
          email
          first_name
          last_name
        }
      }
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
