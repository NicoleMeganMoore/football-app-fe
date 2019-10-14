import gql from "graphql-tag";

export const PLAYERS_QUERY = gql`
  query Players {
    players {
      _id
      id
      first_name
      last_name
      image_url
      position
      team_abbrv
      team_id
      stats {
        season_passing_yd
        season_passing_td
        season_passing_int
        season_rushing_yd
        season_rushing_td
        season_receiving_yd
        season_receiving_td
        season_return_td
        season_two_pt_made
        season_two_pt_pass_rec
        season_fumble
        season_reception
        current_passing_yd
        current_passing_td
        current_passing_int
        current_rushing_yd
        current_rushing_td
        current_receiving_yd
        current_receiving_td
        current_return_td
        current_two_pt_made
        current_two_pt_pass_rec
        current_fumble
        current_reception
      }
    }
  }
`;

export const LEAGUE_QUERY = gql`
  query League($league_id: Int!) {
    league(league_id: $league_id) {
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

export const USER_QUERY = gql`
  query {
    user {
      id
      first_name
      last_name
      email
      leagues {
        id
        league_name
        user_list {
          id
          first_name
          last_name
          email
        }
        matches {
          id
          week
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
    currentDetails {
      current_week
      is_draft_day
      next_draft_day
    }
  }
`;
