import gql from "graphql-tag";

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
  }
`;
