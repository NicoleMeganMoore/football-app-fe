import gql from "graphql-tag";

export const CANCEL_LEAGUE_INVITATION_MUTATION = gql`
  mutation CancelLeagueInvitation($leagueId: String!) {
    cancelLeagueInvitation(leagueId: $leagueId)
  }
`;

export const NOT_READY_TO_DRAFT_MUTATION = gql`
  mutation NotReadyToDraft($leagueId: Int!) {
    notReadyToDraft(leagueId: $leagueId) {
      id
    }
  }
`;

export const READY_TO_DRAFT_MUTATION = gql`
  mutation ReadyToDraft($leagueId: Int!) {
    readyToDraft(leagueId: $leagueId) {
      id
      draftStatus {
        draftInProgress
        firstPlayer {
          id
          first_name
          last_name
          email
        }
        nextTurn
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
    }
  }
`;

export const CREATE_LEAGUE_MUTATION = gql`
  mutation CreateLeague($leagueInput: LeagueInput!) {
    createLeague(leagueInput: $leagueInput) {
      id
      league_name
      user_list {
        id
        first_name
        last_name
        email
      }
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
