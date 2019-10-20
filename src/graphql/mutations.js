import gql from "graphql-tag";

export const CANCEL_LEAGUE_INVITATION_MUTATION = gql`
  mutation CancelLeagueInvitation($leagueId: Int!) {
    cancelLeagueInvitation(leagueId: $leagueId)
  }
`;

export const RESEND_INVITATION_MUTATION = gql`
  mutation ResendLeagueInvitation($leagueId: Int!) {
    resendLeagueInvitation(leagueId: $leagueId)
  }
`;

export const NOT_READY_TO_DRAFT_MUTATION = gql`
  mutation NotReadyToDraft($leagueId: Int!) {
    notReadyToDraft(leagueId: $leagueId) {
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
          _id
          id
          first_name
          last_name
          email
        }
        nextTurn
        roundNumber
        activePlayer {
          _id
          id
          first_name
          last_name
          email
        }
        readyToDraft {
          _id
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

export const START_DRAFT_MUTATION = gql`
  mutation StartDraft($leagueId: Int!) {
    startDraft(leagueId: $leagueId) {
      _id
      id
      league_name
      user_list {
        _id
        id
        first_name
        last_name
        email
      }
      opponent
      draftStatus {
        draftInProgress
        firstPlayer {
          _id
          id
          first_name
          last_name
          email
        }
        nextTurn
        roundNumber
        activePlayer {
          _id
          id
          first_name
          last_name
          email
        }
        readyToDraft {
          _id
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

export const DRAFT_PLAYER_MUTATION = gql`
  mutation DraftPlayer($leagueId: Int!, $playerId: Int!) {
    draftPlayer(leagueId: $leagueId, playerId: $playerId) {
      _id
      id
      league_name
      user_list {
        _id
        id
        first_name
        last_name
        email
      }
      opponent
      draftStatus {
        draftInProgress
        firstPlayer {
          _id
          id
          first_name
          last_name
          email
        }
        nextTurn
        roundNumber
        activePlayer {
          _id
          id
          first_name
          last_name
          email
        }
        readyToDraft {
          _id
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

export const READY_TO_DRAFT_MUTATION = gql`
  mutation ReadyToDraft($leagueId: Int!) {
    readyToDraft(leagueId: $leagueId) {
      _id
      id
      league_name
      user_list {
        _id
        id
        first_name
        last_name
        email
      }
      opponent
      draftStatus {
        draftInProgress
        firstPlayer {
          _id
          id
          first_name
          last_name
          email
        }
        nextTurn
        roundNumber
        activePlayer {
          _id
          id
          first_name
          last_name
          email
        }
        readyToDraft {
          _id
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

export const ACCEPT_LEAGUE_INVITATION_MUTATION = gql`
  mutation AcceptLeagueInvitation($leagueId: Int!) {
    addUserToLeague(leagueId: $leagueId) {
      _id
      id
      league_name
      user_list {
        _id
        id
        first_name
        last_name
        email
      }
      opponent
      draftStatus {
        draftInProgress
        firstPlayer {
          _id
          id
          first_name
          last_name
          email
        }
        nextTurn
        roundNumber
        activePlayer {
          _id
          id
          first_name
          last_name
          email
        }
        readyToDraft {
          _id
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
